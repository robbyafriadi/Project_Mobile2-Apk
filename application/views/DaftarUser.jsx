import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput, Button, HelperText} from 'react-native-paper';

import Domain from '../builds/Domain';

export default function DaftarUser({navigation: {goBack}}) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [no_hp, setNo_Hp] = useState();
  const [alamat, setAlamat] = useState();
  // const [level, setLevel] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();

  const [e_name, setE_Name] = useState();
  const [e_email, setE_Email] = useState();
  const [e_no_hp, setE_No_Hp] = useState();
  const [e_alamat, setE_Alamat] = useState();
  // const [e_level, setE_Level] = useState();
  const [e_username, setE_Username] = useState();
  const [e_password, setE_Password] = useState();
  const [e_confirmpassword, setE_ConfirmPassword] = useState();

  const [loading, setLoading] = useState(false);
  const [Refresh, setRefresh] = useState(false);

  const SaveData = async () => {
    await fetch(`${Domain.ipAddress}/api/createuser`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        no_hp: no_hp,
        alamat: alamat,
        level: '2',
        username: username,
        password: password,

        // name: 'Khalid Usman',
        // email: 'usmankhalid@gmail.com',
        // no_hp: '082284785977',
        // alamat: 'Padang',
        // level: '2',
        // username: 'USMAN07',
        // password: 'password',
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.status == 'success') {
          ToastAndroid.show(json.message, ToastAndroid.LONG);
          goBack();

          setName('');
          setEmail('');
          setNo_Hp('');
          setAlamat('');
          // setLevel('');
          setUsername('');
          setPassword('');
          setConfirmPassword('');

          // setLoading(false);
        } else {
          setE_Name(json.name);
          setE_Email(json.email);
          setE_No_Hp(json.nohp);
          setE_Alamat(json.alamat);
          // setE_Level(json.level);
          setE_Username(json.username);
          setE_Password(json.password);
          setE_ConfirmPassword(json.confirmpassword);
        }
        console.log(json);
        setLoading(false);
      })
      .catch(error => console.log(error));
  };

  return (
    <View id="Warp" style={styles.Warp}>
      <View id="Field" style={styles.Field}>
        <ScrollView>
          <View id="Header" style={styles.Header}>
            <Text
              style={{
                fontSize: 26,
                fontWeight: 'bold',
                color: 'black',
                textDecorationLine: 'underline',
              }}>
              DAFTAR BARU
            </Text>
          </View>
          <View id="Body" style={styles.Body}>
            <TextInput
              label={'Nama Lengkap'}
              style={styles.Input}
              autoCapitalize="words"
              value={name}
              onChangeText={value => setName(value)}
            />
            {/* {e_name ? <Text style={styles.textError}>{e_name}</Text> : ''} */}
            <TextInput
              label={'Email'}
              style={styles.Input}
              autoComplete="email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={value => setEmail(value)}
            />
            <TextInput
              label={'No. HP'}
              style={styles.Input}
              // autoComplete="number"
              keyboardType="number-pad"
              value={no_hp}
              onChangeText={value => setNo_Hp(value)}
            />
            <TextInput
              label={'Alamat'}
              style={styles.Input}
              autoCapitalize="sentences"
              value={alamat}
              onChangeText={value => setAlamat(value)}
            />
            {/* <TextInput
              style={styles.Pelanggan}
              value="Pelanggan"
              editable={false}
              textColor="white"
            /> */}
            <TextInput
              label={'Username'}
              style={styles.Input}
              autoComplete="name"
              value={username}
              onChangeText={value => setUsername(value)}
              autoCapitalize="none"
            />
            <TextInput
              label={'Password'}
              style={styles.Input}
              value={password}
              onChangeText={value => setPassword(value)}
              secureTextEntry={true}
            />
            {/* <TextInput
              label={'Confirm Password'}
              style={styles.Input}
              value={confirmpassword}
              onChangeText={value => setConfirmPassword(value)}
              secureTextEntry={true}
            /> */}
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#4bf',
                alignItems: 'center',
                borderRadius: 7,
                width: '70%',
                marginBottom: 10,
                marginTop: 15,
              }}>
              <Text
                style={{
                  color: 'white',
                  padding: 10,
                  fontWeight: 'bold',
                  fontSize: 20,
                }}
                onPress={() => SaveData()}>
                Simpan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                borderRadius: 7,
                width: '70%',
              }}
              onPress={() => goBack()}>
              <Text
                style={{
                  color: '#666',
                  padding: 10,
                  fontSize: 20,
                  textDecorationLine: 'underline',
                }}>
                Kembali
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Warp: {
    backgroundColor: '#cfefff',
    alignItems: 'center',
    height: '100%',
    padding: 10,
  },
  Field: {
    width: '100%',
    position: 'relative',
    backgroundColor: 'white',
    borderColor: '#4bf',
    borderWidth: 4,
    padding: 10,
    borderRadius: 15,
  },
  Header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  Body: {},
  Footer: {},
  Input: {
    height: 60,
    margin: 5,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 5,
    backgroundColor: '#cfefff',
    fontSize: 16,
  },
  Pelanggan: {
    height: 40,
    margin: 12,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 5,
    backgroundColor: '#bbb',
    color: 'white',
    fontSize: 12,
  },
  textError: {
    marginTop: 5,
    marginHorizontal: 10,
    color: 'red',
    fontWeight: 'bold',
  },
});
