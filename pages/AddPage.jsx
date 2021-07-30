import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  Container,
  Header,
  Content,
  Left,
  Icon,
  Right,
  Text,
  Button,
  Thumbnail,
  Item,
  Input,
  Form,
  Textarea,
} from 'native-base';
import HeaderComponent from '../components/HeaderComponent';
import style from 'react-native-image-blur-loading/src/style';
const background2 = require('../assets/background2.png');
const loading = require('../assets/loading.gif');
const data = require('../data.json');
const imageWidth = Dimensions.get('window').width / 3;

import * as firebase from 'firebase';
import 'firebase/firestore';

import { addDiary, imageUpload } from '../config/firebaseFunctions';

const tempImage =
  'https://firebasestorage.googleapis.com/v0/b/sparta-study-plus.appspot.com/o/lecture%2F6-min.png?alt=media&token=bbc87679-4084-40ad-b6cd-01e808983fa4';

export default function AddPage({ navigation }) {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState('');

  const [image, setImage] = useState(tempImage);
  const [imageUri, setImageUri] = useState('');

  const [progress, setProgress] = useState(false);

  useEffect(() => {
    getPermission();
  }, []);

  const getPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('게시글을 업로드하려면 사진첩 권한이 필요합니다.');
      }
    }
  };

  const upload = async () => {
    console.log('업로드 준비중!');
    setProgress(true);
    const currentUser = firebase.auth().currentUser;
    let date = new Date();
    let getTime = date.getTime();
    let data = {
      title: title,
      author: currentUser.email,
      desc: content,
      image: image,
      date: getTime,
      uid: currentUser.uid,
    };
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const imageUrl = await imageUpload(blob, getTime);
    data.image = imageUrl;

    let result = await addDiary(data);
    if (result) {
      Alert.alert('글이 성공적으로 등록되었습니다!');
      setTitle('');
      setContent('');
      setImage(tempImage);
      setImageUri('');
      setProgress(false);
      navigation.push('TabNavigator');
    } else {
      setProgress(false);
    }
  };

  const pickImage = async () => {
    console.log('이미지 선택');
    let imageData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0,
    });

    getImageUrl(imageData);
  };

  const getImageUrl = async (imageData) => {
    setImageUri(imageData.uri);
  };

  return (
    <Container>
      {progress === false ? null : (
        <Image source={loading} style={styles.progress} />
      )}
      <HeaderComponent />
      <Content>
        <Image
          source={background2}
          style={{ width: '95%', height: 100, borderRadius: 10 }}
        />

        {imageUri == '' ? (
          <Grid style={styles.imageUpload} onPress={pickImage}>
            <Text style={styles.imageUploadPlus}>+</Text>
          </Grid>
        ) : (
          <TouchableOpacity onPress={pickImage}>
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          </TouchableOpacity>
        )}

        <Item regular style={styles.title}>
          <Input
            placeholder="다이어리 제목을 입력해주세요!"
            style={{ fontSize: 13 }}
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
        </Item>
        <Form style={styles.contentLayout}>
          <Textarea
            rowSpan={5}
            bordered
            placeholder="내용을 입력해주세요"
            style={styles.content}
            onChangeText={(text) => setContent(text)}
            value={content}
          />
        </Form>
        <Button full style={styles.uploadButton} onPress={() => upload()}>
          <Text>등록</Text>
        </Button>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  imageUpload: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'grey',
    borderStyle: 'dashed',
    width: '90%',
    height: 200,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    borderRadius: 10,
    width: '90%',
    height: 200,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  imageUploadPlus: {
    textAlign: 'center',
    width: '100%',
    fontSize: 90,
    fontWeight: '300',
    color: 'grey',
  },
  title: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  contentLayout: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  content: { borderRadius: 10, fontSize: 13 },
  uploadButton: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: 'pink',
  },
  progress: {
    width: 100,
    height: 100,
    borderRadius: 100,
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
    zIndex: 2,
  },
});
