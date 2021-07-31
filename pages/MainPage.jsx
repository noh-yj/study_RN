import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Content, Left, Right } from 'native-base';
import HeaderComponent from '../components/HeaderComponent';
import CardComponent from '../components/CardComponent';
import { getData, getNextData } from '../config/firebaseFunctions';

import { Entypo } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function MainPage({ navigation }) {
  const [data, setData] = useState([]);
  const [next, setNext] = useState(0);
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
    // readyData();
    getData(setNext, setData);
  }, []);

  // const readyData = async () => {
  //   const data = await getData(setNext);
  //   setData(data);
  // };

  return (
    <Container>
      <HeaderComponent />
      {data.length === 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          ListHeaderComponent={() => {
            return (
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
                      <Text style={{ fontWeight: '700' }}>
                        wegram을 전하세요
                      </Text>
                    </Col>
                  </Grid>
                </Animatable.View>

                <Grid style={{ padding: 20 }}>
                  <Text style={{ color: 'grey' }}>FROM THE DIARY</Text>
                </Grid>
              </Content>
            );
          }}
          onEndReachedThreshold={0}
          onEndReached={async () => {
            let nextData = await getNextData(next, setNext);
            if (nextData == 0) {
              return false;
            } else {
              let newData = [...data, ...nextData];
              setData(newData);
            }
          }}
          renderItem={(data) => {
            return (
              <CardComponent content={data.item} navigation={navigation} />
            );
          }}
          numColumns={1}
          keyExtractor={(item) => item.date.toString()}
        ></FlatList>
      )}
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
