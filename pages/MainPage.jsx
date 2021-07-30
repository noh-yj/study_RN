import React, { useEffect } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Content, Left, Right } from 'native-base';
import HeaderComponent from '../components/HeaderComponent';
import CardComponent from '../components/CardComponent';
import data from '../data.json';
import { Entypo } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function MainPage({ navigation }) {
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
  }, []);
  return (
    <Container>
      <HeaderComponent />
      <Content>
        <Animatable.View
          animation="pulse"
          easing="ease-out"
          iterationCount={'infinite'}
          direction="alternate"
        >
          <Grid style={styles.banner}>
            <Col size={1} style={{ padding: 20 }}>
              <Entypo name="paper-plane" size={24} color="deeppink" />
            </Col>
            <Col size={6} style={{ padding: 15 }}>
              <Text>이야기 하고 싶은 친구들에게</Text>
              <Text style={{ fontWeight: '700' }}>wegram을 전하세요</Text>
            </Col>
          </Grid>
        </Animatable.View>

        <Grid style={{ padding: 20 }}>
          <Text style={{ color: 'grey' }}>FROM THE DIARY</Text>
        </Grid>
        <View style={{ marginTop: -20 }}>
          {data.diary.map((content) => {
            return (
              <CardComponent
                content={content}
                key={content.id}
                navigation={navigation}
              />
            );
          })}
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#F6F6F6',
    height: 70,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },
});
