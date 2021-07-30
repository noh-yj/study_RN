import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import { Container, Content, Thumbnail } from 'native-base';
import ImageComponent from '../components/ImageComponent';
import HeaderComponent from '../components/HeaderComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { logout } from '../config/firebaseFunctions';

const my = require('../assets/my.png');
const data = require('../data.json');

export default function MyPage({ navigation }) {
  const logOutFunc = () => {
    logout(navigation);
  };
  return (
    <Container>
      <HeaderComponent />
      <Content>
        <Thumbnail large source={my} style={styles.thumbnail} />
        <Text style={styles.myTitle}>Title</Text>
        <Text style={{ alignSelf: 'center' }}>aaa@aaa.com</Text>
        <TouchableOpacity style={{ marginTop: 20 }} onPress={logOutFunc}>
          <Text style={styles.logout}>로그아웃</Text>
        </TouchableOpacity>
        <Grid style={{ marginTop: 30 }}>
          <Col size={3} style={{ alignItems: 'center' }}>
            <Text style={styles.category}>작성한 글</Text>
            <Text style={styles.categoryContent}>7</Text>
          </Col>
          <Col size={3} style={{ alignItems: 'center' }}>
            <Text style={styles.category}>작성한 댓글</Text>
            <Text style={styles.categoryContent}>21</Text>
          </Col>
          <Col size={3} style={{ alignItems: 'center' }}>
            <Text style={styles.category}>방문 횟수</Text>
            <Text style={styles.categoryContent}>321</Text>
          </Col>
        </Grid>
        <Grid style={styles.imageWrap}>
          {data.diary.map((content, idx) => {
            return <ImageComponent image={content.image} key={content.id} />;
          })}
        </Grid>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  thumbnail: { alignSelf: 'center', marginTop: 30 },
  myTitle: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: '700',
  },
  category: { fontWeight: '700' },
  categoryContent: { color: 'deeppink', fontWeight: '700' },
  imageWrap: { flexWrap: 'wrap', marginTop: 20 },
  logout: {
    alignSelf: 'center',
    padding: 10,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
});
