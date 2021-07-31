import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Item,
  Input,
  Thumbnail,
} from 'native-base';
import ImageBlurLoading from 'react-native-image-blur-loading';
import CommentComponet from '../components/CommentComponent';
import { addComment, getComment } from '../config/firebaseFunctions';
const my = require('../assets/my.png');
import * as firebase from 'firebase';

export default function DetailPage({ navigation, route }) {
  const [commentInput, setCommentInput] = useState('');
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      title: '디테일페이지',
      headerStyle: {
        backgroundColor: '#fff',
        shadowColor: '#fff',
      },
      headerTintColor: 'grey',
      headerShown: true,
      headerBackTitleVisible: false,
    });
    commentLoad(content.date);
  }, []);
  const content = route.params.content;

  const commentLoad = async (did) => {
    let c = await getComment(did + 'D');

    if (c == 0) {
    } else {
      setCommentList(c);
    }
  };

  const commentFunc = async () => {
    let date = new Date();
    let getTime = date.getTime();
    const currentUser = firebase.auth().currentUser;

    let newComment = {
      date: getTime,
      comment: commentInput,
      did: content.date + 'D',
      uid: currentUser.uid,
    };

    let result = await addComment(newComment);
    if (result) {
      Alert.alert('댓글이 정상적으로 저장되었습니다!');
      setCommentInput('');
      setCommentList([...commentList, newComment]);
    }
  };
  return (
    <Container>
      <Content contentContainerStyle={{ alignItems: 'center', marginTop: 20 }}>
        <ImageBlurLoading
          withIndicator
          thumbnailSource={{ uri: content.image }}
          source={{ uri: content.image }}
          style={{ width: '90%', height: 200, borderRadius: 10 }}
        />
        <Text
          style={{
            fontSize: 25,
            fontWeight: '700',
            color: '#333',
            alignSelf: 'flex-start',
            marginLeft: 25,
            marginTop: 20,
          }}
        >
          {content.title}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '700',
            color: 'grey',
            alignSelf: 'flex-start',
            marginLeft: 25,
            marginTop: 20,
          }}
        >
          {content.desc}
        </Text>
        <Item style={{ marginTop: 100 }}>
          <Input
            placeholder="한마디 부탁해요~"
            onChangeText={(text) => {
              setCommentInput(text);
            }}
            value={commentInput}
          />
          <Entypo
            name="paper-plane"
            size={24}
            color="deeppink"
            onPress={commentFunc}
          />
        </Item>
        <List>
          {commentList.map((val, i) => {
            return <CommentComponet comment={val} key={i} />;
          })}
        </List>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({});
