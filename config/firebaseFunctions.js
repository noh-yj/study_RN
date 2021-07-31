import * as firebase from 'firebase';
import 'firebase/firestore';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function registration(nickName, email, password, navigation) {
  try {
    console.log(nickName, email, password);
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection('users').doc(currentUser.uid).set({
      email: currentUser.email,
      nickName: nickName,
    });
    Alert.alert('회원가입 성공!');
    await AsyncStorage.setItem('session', email);
    navigation.push('TabNavigator');
  } catch (err) {
    Alert.alert('무슨 문제가 있는 것 같아요! => ', err.message);
  }
}

export async function signIn(email, password, navigation) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    await AsyncStorage.setItem('session', email);
    navigation.push('TabNavigator');
  } catch (err) {
    Alert.alert('로그인에 문제가 있습니다! ', err.message);
  }
}

export async function logout(navigation) {
  try {
    console.log('로그아웃!!');
    const currentUser = firebase.auth().currentUser;
    await AsyncStorage.removeItem('session');
    await firebase.auth().signOut();
    navigation.push('SignInPage');
  } catch (err) {
    Alert.alert('로그 아웃에 문제가 있습니다! ', err.message);
  }
}

export async function addDiary(content) {
  try {
    const db = firebase.firestore();
    let userRef = await db.collection('users').doc(content.uid);

    let data = await userRef.get().then((doc) => {
      return doc.data();
    });

    content.author = data.nickname;
    await db
      .collection('diary')
      .doc(content.date + 'D')
      .set(content);
    return true;
  } catch (err) {
    Alert.alert('글 작성에 문제가 있습니다! ', err.message);
    return false;
  }
}

export async function imageUpload(blob, date) {
  const storageRef = firebase
    .storage()
    .ref()
    .child('diary/' + date);
  const snapshot = await storageRef.put(blob);
  const imageUrl = await snapshot.ref.getDownloadURL();
  blob.close();

  return imageUrl;
}

export async function getData(setNext, setData) {
  try {
    let data = [];
    const db = firebase.firestore();
    const first = db.collection('diary').orderBy('date', 'desc').limit(5);

    const snapshot = await first.get();
    const currentUser = firebase.auth().currentUser;
    // snapshot.docs.map((doc) => {
    //   console.log("[페이지네이션 01]")
    //   data.push(doc.data());
    // });
    let last;
    if (snapshot.docs.length !== 0) {
      last = snapshot.docs[snapshot.docs.length - 1];
    }
    setNext(last.data().date);
    let count = 0;
    let limit = snapshot.docs.length;

    snapshot.docs.map(async (doc) => {
      console.log('[페이지네이션 01]');
      let d = doc.data();
      const like = await db
        .collection('diary')
        .doc(d.date + 'D')
        .collection('likes')
        .doc(currentUser.uid)
        .get();

      if (like.data() == undefined) {
        d.like = false;
      } else {
        d.like = true;
      }

      //count 갯수가 불러온 게시글 갯수만큼 늘어났다면
      //게시글 상태를 관리할 타이밍!
      count += 1;
      data.push(d);
      if (count == limit) {
        setData(data);
      }
    });
    // return data
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getNextData(nextDate, setNext) {
  try {
    let data = [];
    const db = firebase.firestore();
    const next = db
      .collection('diary')
      .orderBy('date', 'desc')
      .startAfter(nextDate)
      .limit(5);
    const snapshot = await next.get();
    snapshot.docs.map((doc) => {
      console.log('[페이지네이션 Next]');
      doc.data();
      data.push(doc.data());
    });

    let last;
    if (snapshot.docs.length !== 0) {
      last = snapshot.docs[snapshot.docs.length - 1];
      setNext(last.data().date);
      return data;
    } else {
      return 0;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function addComment(comment) {
  try {
    const db = firebase.firestore();
    let userRef = await db.collection('users').doc(comment.uid);

    let data = await userRef.get().then((doc) => {
      return doc.data();
    });

    comment.author = data.nickname;
    await db
      .collection('comment')
      .doc(comment.date + 'D')
      .set(comment);

    return true;
  } catch (err) {
    Alert.alert('댓글 작성에 문제가 있습니다! ', err.message);
    return false;
  }
}

export async function getComment(did) {
  const db = firebase.firestore();
  let data = [];
  let snapshot = await db.collection('comment').where('did', '==', did).get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    return 0;
  } else {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
      data.push(doc.data());
    });

    return data;
  }
}

export async function doLike(uid, did, like) {
  console.log(uid, did);
  try {
    const db = firebase.firestore();
    const date = new Date();
    const getTime = date.getTime();
    console.log(did);
    //좋아요 -> 해제
    if (like == true) {
      await db
        .collection('diary')
        .doc(did)
        .collection('likes')
        .doc(uid)
        .delete();
    } else {
      //해제 -> 좋아요
      await db.collection('diary').doc(did).collection('likes').doc(uid).set({
        date: getTime,
      });
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
