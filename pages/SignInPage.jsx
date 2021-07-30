import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Container, Content, Form, Item, Input, Label } from 'native-base';
import ItemInput from '../components/ItemInput';
import { signIn } from '../config/firebaseFunctions';
import Loading from './Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
const bImage = require('../assets/background.png');

export default function SignInPage({ navigation }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
    setTimeout(() => {
      AsyncStorage.getItem('session', (err, result) => {
        console.log('ASYNCSTORAGE', result);
        if (result) {
          navigation.push('TabNavigator');
        } else {
          setReady(true);
        }
      });
      setReady(true);
    }, 1000);
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const goSignUp = () => {
    navigation.navigate('SignUpPage');
  };

  const doSignIn = () => {
    if (email === '') {
      setEmailError('이메일을 입력해주세요');
    } else {
      setEmailError('');
    }

    if (password == '') {
      setPasswordError('비밀번호를 입력해주세요');
    } else {
      setPasswordError('');
    }
    signIn(email, password, navigation);
  };

  const setEmailFunc = (itemInputEmail) => {
    setEmail(itemInputEmail);
  };
  const setPasswordFunc = (itemInputPassword) => {
    setPassword(itemInputPassword);
  };

  return ready ? (
    <Container style={styles.container}>
      <ImageBackground source={bImage} style={styles.backgroundImage}>
        <Content contentContainerStyle={styles.content} scrollEnabled={false}>
          <Text style={styles.title}>
            <Text style={styles.highlite}>we</Text>gram
          </Text>
          <Form style={styles.form}>
            <ItemInput
              title={'이메일'}
              type={'email'}
              setFunc={setEmailFunc}
              error={emailError}
            />
            <ItemInput
              title={'비밀번호'}
              type={'password'}
              setFunc={setPasswordFunc}
              error={passwordError}
            />
          </Form>

          {/* <Button style={styles.snsSignUp}>
            <Text>Facebook 로그인</Text>
          </Button> */}
          <TouchableOpacity style={styles.emailSignIn} onPress={doSignIn}>
            <Text
              style={{
                color: '#fff',
              }}
            >
              Email 로그인
            </Text>
          </TouchableOpacity>
          <TouchableOpacity full style={styles.emailSignUp} onPress={goSignUp}>
            <Text
              style={{
                color: '#333',
              }}
            >
              회원가입
            </Text>
          </TouchableOpacity>
        </Content>
      </ImageBackground>
    </Container>
  ) : (
    <Loading />
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, .5)',
    margin: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
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
  label: {
    color: '#fff',
  },
  input: {
    color: '#fff',
  },
  snsSignUp: {
    alignSelf: 'center',
    width: 250,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#4667a5',
  },
  emailSignIn: {
    alignItems: 'center',
    width: 250,
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: '#333',
    height: 40,
    justifyContent: 'center',
  },
  emailSignUp: {
    alignItems: 'center',
    width: 250,
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#333',
    height: 40,
    justifyContent: 'center',
  },
});
