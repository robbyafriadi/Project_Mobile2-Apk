import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {TextInput, Button, HelperText} from 'react-native-paper';

import Domain from '../builds/Domain';

export default function LoginScreen({navigation}) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [e_username, setE_Username] = useState();
  const [e_password, setE_Password] = useState();

  const doLogin = async () => {
    await fetch(`${Domain.ipAddress}/api/loginuser`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.status == 'success') {
          navigation.push('HomeScreen', {username:username,});
          console.log('User Success Login');
          console.log({username:username,});
        } else {
          setE_Username(json.email);
          setE_Password(json.password);
          console.log('error Email and Password');
          // console.log(email:email);
          // console.log(password:password);
        }
        if (json.status == 'error') {
          setE_Username(json.message + ' Email/Password, please try again');
          console.log('Error Login');
        }
      })
      .catch(err => console.log(err));
  };

  const doReset = () => {
    setUsername('');
    setPassword('');
  };

  return (
    <View id="Warp" style={styles.Warp}>
      <View style={styles.Field}>
        <View id="header">
          <View id="title" style={{alignItems: 'center'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 24,
                textDecorationLine: 'underline',
                color: 'black'
              }}>
              Aplikasi
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 30, color: 'black'}}>RENTAL MOBIL</Text>
          </View>
        </View>
        <View
          style={{backgroundColor: '#4bf', borderRadius: 10, marginTop: 20}}>
          <View
            id="FormLogin"
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 10,
              margin: 5,
            }}>
            <View
              style={{alignItems: 'center', borderBottomWidth: 1, padding: 5}}>
              <Text style={{fontSize: 24, fontWeight: 'bold', color: '#4bf'}}>
                LOGIN HERE
              </Text>
            </View>
            <View style={{padding: 10}}>
              <View>
                <TextInput
                  style={styles.Input}
                  value={username}
                  onChangeText={value => setUsername(value)}
                  label="Username"
                  autoCapitalize="characters"
                />
                {e_username ? (
                  <HelperText type="error" visible={e_username}>
                    {e_username}
                  </HelperText>
                ) : (
                  ''
                )}
                <TextInput
                  style={styles.Input}
                  value={password}
                  onChangeText={value => setPassword(value)}
                  label="Password"
                  secureTextEntry={true}
                />
                {e_password ? (
                  <HelperText type="error" visible={e_password}>
                    {e_password}
                  </HelperText>
                ) : (
                  ''
                )}
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={() => doReset()}>
                <Text style={{textDecorationLine: 'underline'}}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View id="Button" style={{marginTop: 30, alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#4bf',
              alignItems: 'center',
              borderRadius: 7,
              width: '70%',
            }}
            onPress={() => doLogin()}>
            <Text
              style={{
                color: 'white',
                padding: 10,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              borderRadius: 7,
              width: '70%',
              marginTop: 10,
            }}
            onPress={() => navigation.navigate('DaftarUser')}>
            <Text
              style={{
                color: '#666',
                padding: 10,
                fontSize: 20,
                textDecorationLine: 'underline',
              }}>
              Daftar Baru
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Warp: {
    backgroundColor: '#cfefff',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  Field: {
    width: '75%',
    position: 'relative',
  },
  Input: {
    height: 50,
    margin: 12,
    borderRadius: 5,
    backgroundColor: '#cfefff',
    fontSize: 14,
  },
});
