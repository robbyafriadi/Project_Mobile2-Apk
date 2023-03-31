import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {TextInput, Avatar, Button} from 'react-native-paper';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';

import Domain from '../builds/Domain';

export default function TransaksiRental({
  route,
  navigation,
  navigation: {goBack},
}) {
  const [Msg, setMsg] = useState();
  const [DataMobil, setDataMobil] = useState();
  const [id_mobil, setIdMobil] = useState();
  const [nama_mobil, setNamaMobil] = useState();
  const [merk_mobil, setMerkMobil] = useState();
  const [tahun_mobil, setTahunMobil] = useState();
  const [plat_mobil, setPlatMobil] = useState();
  const [bahan_bakar, setBahanBakar] = useState();
  const [transmisi, setTransmisi] = useState();
  const [kursi, setKursi] = useState();
  const [harga_sewa, setHargaSewa] = useState();
  const [gambar, setGambar] = useState();
  const [keterangan, setKeterangan] = useState();
  const [deskripsi, setDeskripsi] = useState();
  const [p3k, setP3K] = useState();
  const [charger, setCharger] = useState();
  const [ac, setAC] = useState();
  const [audio, setAudio] = useState();

  const [date, setDate] = useState(new Date());

  const [pic, setPic] = useState(null);
  const [uriimage, setUriImage] = useState();
  const [typeimage, setTypeImage] = useState();
  const [filenameimage, setFileNameImage] = useState();

  const [loading, setLoading] = useState(false);
  const [Refresh, setRefresh] = useState(false);

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const options = {
    title: 'Select Image',
    type: 'library',
    option: {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
    },
  };

  const optionsTakePicture = {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhoto: true,
      mediaType: 'photo',
      includeBase64: true,
      includeExtra: true,
    },
  };

  const takePicture = async () => {
    const result = await launchCamera(options, response => {
      if (response.didCancel) {
        setToastMsg('Canceled Selection Image');
      } else if (response.errorCode == 'permission') {
        setToastMsg('Not Permission');
      } else if (response.errorCode == 'others') {
        setToastMsg(response.errorMessage);
        // } else if (response.assets[0].fileSize > 4194304) {
        //   Alert.alert('Maximum File 4Mb', 'Please Choise Other', [{text: 'OK'}]);
      } else {
        setPic(response.assets[0].uri);
        setUriImage(response.assets[0].uri);
        setTypeImage(response.assets[0].type);
        setFileNameImage(response.assets[0].fileName);
      }
    });
    console.log(result);
  };
  const removeImage = () => {
    setPic(null);
    setToastMsg('Picture Success to Remove');
  };

  const getDataMobil = () => {
    fetch(`${Domain.ipAddress}/api/mobil/${route.params.id_mobil}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.success == true) {
          setDataMobil(json.data);
          setIdMobil(json.data.id_mobil);
          setNamaMobil(json.data.nama_mobil);
          setMerkMobil(json.data.merk_mobil);
          setTahunMobil(json.data.tahun_mobil);
          setPlatMobil(json.data.plat_mobil);
          setBahanBakar(json.data.bahan_bakar);
          setTransmisi(json.data.transmisi);
          setKursi(json.data.kursi);
          setHargaSewa(json.data.harga_sewa);
          setGambar(json.data.gambar);
          setKeterangan(json.data.keterangan);
          setDeskripsi(json.data.deskripsi);
          setP3K(json.data.p3k);
          setCharger(json.data.charger);
          setAC(json.data.ac);
          setAudio(json.data.audio);
        }
        console.log(json);
        setLoading(false);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getDataMobil();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getDataMobil();
    }, []),
  );

  return (
    <View id="Warp" style={styles.Warp}>
      <View>
        <ScrollView>
          <View style={{padding: 10, alignItems: 'center'}}>
            <Text style={styles.Header}>SEWA MOBIL</Text>
          </View>
          <View id="body" style={styles.Body}>
            <View
              id="GroupDataMobil"
              style={{
                borderWidth: 1,
                padding: 10,
                marginBottom: 20,
                backgroundColor: '#cfefff',
                borderRadius: 7,
                borderColor: '#4bf',
              }}>
              <View id="GroupData">
                <Text
                  id="TitleGroup"
                  style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
                  Data Mobil
                </Text>
                <View id="DataMobil">
                  <Text style={styles.DataMobil}>
                    - Nama Mobil : {nama_mobil}
                  </Text>
                  <Text style={styles.DataMobil}>
                    - Merk Mobil : {merk_mobil}
                  </Text>
                  <Text style={styles.DataMobil}>
                    - Plat Mobil : {plat_mobil}
                  </Text>
                  <Text style={styles.DataMobil}>
                    - Jumlah Kursis : {kursi} seat
                  </Text>
                  <Text style={styles.DataMobil}>
                    - Harga Sewa : Rp.{harga_sewa},- per Hari
                  </Text>
                </View>
              </View>
            </View>
            <View id="GroupDataPenyewa" style={{marginBottom: 20}}>
              <View>
                <Text
                  id="TitleGroup"
                  style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
                  Data Penyewa
                </Text>
                <View id="DataPenyewa">
                  <TextInput
                    style={styles.InputDataRental}
                    label="ID Penyewa"
                  />
                  <TextInput
                    style={styles.InputDataRental}
                    label="NIK Penyewa"
                  />
                  <TextInput
                    style={styles.InputDataRental}
                    label="Nama Penyewa"
                  />
                  <TextInput
                    style={styles.InputDataRental}
                    label="Alamat Penyewa"
                  />
                  <TextInput
                    style={styles.InputDataRental}
                    label="No. HP Penyewa"
                  />
                </View>
              </View>
            </View>
            <View id="GroupDataRental">
              <View>
                <Text
                  id="TitleGroup"
                  style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
                  Data Rental
                </Text>
                <View id="DataRental">
                  <View
                    style={{
                      marginLeft: 20,
                      marginRight: 20,
                      margin: 5,
                      backgroundColor: '#cfefff',
                      padding: 5,
                      borderRadius: 5,
                    }}>
                    <Text style={{fontSize: 14, color: 'black', padding: 5}}>
                      Tanggal Rental
                    </Text>
                    <DatePicker
                      style={{
                        height: 30,
                        backgroundColor: '#cfefff',
                        width: 250,
                        alignSelf: 'center',
                      }}
                      mode="date"
                      date={date}
                      onDateChange={setDate}
                    />
                  </View>
                  {/* <TextInput
                    style={styles.InputDataRental}
                    label="Durasi Rental"
                    keyboardType="numeric"
                  /> */}

                  {/* <View id="Picture" style={{marginTop: 5}}>
                    <TouchableOpacity
                      onPress={() => uploadImage()}
                      style={{
                        width: '100%',
                        height: 200,
                        padding: 3,
                        borderWidth: 1,
                        marginBottom: 10,
                      }}
                      underLayColor="rgba(0,0,0,0)">
                      <Image size={250} source={{uri: pic}} />
                    </TouchableOpacity>
                    <Button
                      style={{backgroundColor: 'green', marginBottom: 5}}
                      mode="contained"
                      onPress={() => takePicture()}>
                      Take
                    </Button>
                    <Button
                      style={{backgroundColor: 'red'}}
                      mode="contained"
                      onPress={() => removeImage()}>
                      Remove
                    </Button>
                  </View> */}
                </View>
              </View>
            </View>
            <View id="footer">
              <View id="Button" style={{marginTop: 30, alignItems: 'center'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#4bf',
                    alignItems: 'center',
                    borderRadius: 7,
                    width: '70%',
                  }}
                  // onPress={() => doLogin()}
                >
                  <Text
                    style={{
                      color: 'white',
                      padding: 10,
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}>
                    Selanjutnya
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    borderRadius: 7,
                    width: '70%',
                    marginTop: 10,
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
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Warp: {
    width: '98%',
    padding: 10,
    alignSelf: 'center',
    backgroundColor: '#cfefff',
    flex: 1,
  },
  Header: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
    textDecorationLine: 'underline',
  },
  Body: {
    backgroundColor: 'white',
    borderColor: '#4bf',
    borderWidth: 2,
    padding: 10,
  },
  // PhotoMobil: {
  //   height: 230,
  //   marginBottom: 5,
  //   backgroundColor: 'white',
  // },
  DataMobil: {
    marginLeft: 20,
    marginRight: 20,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    color: 'black',
  },
  InputDataRental: {
    marginLeft: 20,
    marginRight: 20,
    margin: 5,
    height: 50,
    fontSize: 14,
    color: 'black',
    backgroundColor: '#cfefff',
  },
});
