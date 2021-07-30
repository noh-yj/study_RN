import React, { useState } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Header,
  Left,
  Body,
  Right,
} from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { registration } from '../config/firebaseFunctions';

const bImage = require('../assets/background.png');
import ItemInput from '../components/ItemInput';

export default function SignUpPage({ navigation }) {
  const [nickName, setNickName] = useState('');
  const [nickNameError, setNickNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  const doSignUp = () => {
    if (nickName == '') {
      setNickNameError('닉네임을 입력해주세요');
      return;
    } else {
      setNickNameError('');
    }

    if (email == '') {
      setEmailError('이메일을 입력해주세요');
      return false;
    } else {
      setEmailError('');
    }

    if (password == '') {
      setPasswordError('비밀번호를 입력해주세요');
      return false;
    } else {
      setPasswordError('');
    }

    if (passwordConfirm == '') {
      setPasswordConfirmError('비밀번호 확인을 입력해주세요');
      return false;
    } else {
      setPasswordConfirmError('');
    }

    if (password !== passwordConfirm) {
      setPasswordConfirmError('비밀번호가 서로 일치 하지 않습니다.');
      return false;
    } else {
      setPasswordConfirmError('');
    }
    registration(nickName, email, password, navigation);
  };

  return (
    <Container style={styles.container}>
      <ImageBackground style={styles.backgroundImage} source={bImage}>
        <Header transparent>
          <Left>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name="arrowleft" size={24} color="#fff" />
            </TouchableOpacity>
          </Left>
          <Body />
          <Right />
        </Header>
        <Content style={styles.content} scrollEnabled={false}>
          <View style={styles.innerContent}>
            <Text style={styles.title}>
              <Text style={styles.highlite}>we</Text>gram signup
            </Text>
            <Form style={styles.form}>
              <ItemInput
                title={'닉네임'}
                type={'nickName'}
                error={nickNameError}
                setFunc={setNickName}
              />
              <ItemInput
                title={'이메일'}
                type={'email'}
                error={emailError}
                setFunc={setEmail}
              />
              <ItemInput
                title={'비밀번호'}
                type={'password'}
                error={passwordError}
                setFunc={setPassword}
              />
              <ItemInput
                title={'비밀번호 확인'}
                type={'password'}
                error={passwordConfirmError}
                setFunc={setPasswordConfirm}
              />
            </Form>
            <TouchableOpacity style={styles.emailSignUp} onPress={doSignUp}>
              <Text style={{ color: '#fff' }}>등록</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </ImageBackground>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {},
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    margin: 20,
    borderRadius: 20,
  },
  innerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
  },
  highlite: {
    fontSize: 25,
    fontWeight: '700',
    color: 'deeppink',
    textAlign: 'center',
  },
  form: {
    width: 250,
    borderRadius: 10,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 10,
  },

  snsSignUp: {
    alignItems: 'center',
    width: 250,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#4667A5',
    height: 40,
    justifyContent: 'center',
  },
  emailSignUp: {
    alignItems: 'center',
    width: 250,
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: '#333',
    height: 40,
    justifyContent: 'center',
  },
});
