import React from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { Header, Left, Right } from 'native-base';
import { Entypo } from '@expo/vector-icons';
const logo = require('../assets/logo.png');

function HeaderComponent() {
  return (
    <Header>
      <Left>
        <TouchableOpacity>
          <Image source={logo} style={styles.logoImage} />
        </TouchableOpacity>
      </Left>
      <Right style={{ marginRight: 10 }}>
        <Entypo name="dots-three-horizontal" size={24} color="deeppink" />
      </Right>
    </Header>
  );
}

const styles = StyleSheet.create({
  logoImage: {
    width: 100,
    resizeMode: 'contain',
    marginLeft: 10,
  },
});

export default HeaderComponent;
