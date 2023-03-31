import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import Domain from '../builds/Domain';

export default function DetailDataMobil({
  route,
  navigation: {goBack},
  navigation,
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

  const [loading, setLoading] = useState(false);
  const [Refresh, setRefresh] = useState(false);

  const getDetailDataMobil = () => {
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
    getDetailDataMobil();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getDetailDataMobil();
    }, []),
  );

  return loading ? (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <ActivityIndicator size={30} color="blue" />
    </View>
  ) : (
    <ScrollView>
      <View id="Warp" style={styles.Warp}>
        <View id="DetailDataMobil" style={styles.DetailDataMobil}>
          <View id="PhotoMobil" style={styles.PhotoMobil}>
            <Image
              source={
                gambar == ''
                  ? `${require('../img/mobil.jpg')}`
                  : {
                      uri: `${Domain.ipAddress}/storage/` + gambar,
                    }
              }
              style={{height: 190, width: '100%'}}
            />
          </View>
          <View id="DataMobil" style={styles.DataMobil}>
            <View style={styles.DataGroup}>
              <Text style={styles.GroupTitle}>NAMA MOBIL</Text>
              <Text style={styles.GroupDetail}>{nama_mobil}</Text>
            </View>
            <View style={styles.DataGroup}>
              <Text style={styles.GroupTitle}>MERK MOBIL</Text>
              <Text style={styles.GroupDetail}>{merk_mobil}</Text>
            </View>
            <View style={styles.DataGroup}>
              <Text style={styles.GroupTitle}>TAHUN MOBIL</Text>
              <Text style={styles.GroupDetail}>{tahun_mobil}</Text>
            </View>
            <View style={styles.DataGroup}>
              <Text style={styles.GroupTitle}>PLAT MOBIL</Text>
              <Text style={styles.GroupDetail}>{plat_mobil}</Text>
            </View>
            <View style={styles.DataGroup}>
              <Text style={styles.GroupTitle}>BAHAN BAKAR</Text>
              <Text style={styles.GroupDetail}>{bahan_bakar}</Text>
            </View>
            <View style={styles.DataGroup}>
              <Text style={styles.GroupTitle}>TRANSMISI</Text>
              <Text style={styles.GroupDetail}>{transmisi}</Text>
            </View>
            <View style={styles.DataGroup}>
              <Text style={styles.GroupTitle}>KURSI</Text>
              <Text style={styles.GroupDetail}>{kursi}</Text>
            </View>
            <View style={styles.DataGroup}>
              <Text style={styles.GroupTitle}>HARGA SEWA</Text>
              <Text style={styles.GroupDetail}>
                Rp.{harga_sewa},- per 12 Jam
              </Text>
            </View>
            <View style={styles.DataGroup}>
              <Text style={styles.GroupTitle}>KELENGKAPAN</Text>
              <Text style={styles.GroupDetail}>AC : {ac}</Text>
              <Text style={styles.GroupDetail}>P3K : {p3k}</Text>
              <Text style={styles.GroupDetail}>Charger : {charger}</Text>
              <Text style={styles.GroupDetail}>Audio : {audio}</Text>
              <Text style={styles.GroupDetail}>Lain : {}</Text>
            </View>
            <View style={styles.DataGroup}>
              <Text style={styles.GroupTitle}>DESKRIPSI</Text>
              <Text style={styles.GroupDetail}>{deskripsi}</Text>
            </View>
          </View>
          <View style={styles.Btn_Container}>
            <TouchableOpacity
              style={styles.Btn_Sewa}
              onPress={() =>
                navigation.navigate('TransaksiRental', {
                  id_mobil: id_mobil,
                })
              }>
              <Text style={{color: 'white', fontSize: 20}}>Sewa</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.Btn_Container}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
              }}
              onPress={() => goBack()}>
              <Text
                style={{
                  color: '#666',
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
  );
}

const styles = StyleSheet.create({
  Warp: {
    width: '98%',
    padding: 10,
    alignSelf: 'center',
    backgroundColor: '#cfefff',
  },
  DetailDataMobil: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#2bf',
  },
  PhotoMobil: {
    height: 230,
    marginBottom: 5,
    margin: 10,
    borderWidth: 1,
  },
  DataMobil: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    margin: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  DataGroup: {
    backgroundColor: 'white',
    padding: 10,
  },
  GroupTitle: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  GroupDetail: {
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#2bf',
    fontWeight: 'bold',
    color: 'black',
  },
  Btn_Container: {
    flex: 1,
    // margin: 10,
    padding: 10,
    alignItems: 'center',
  },
  Btn_Detail: {
    backgroundColor: '#2bf',
    padding: 5,
    width: '95%',
    borderRadius: 5,
    fontSize: 16,
    alignItems: 'center',
  },
  Btn_Sewa: {
    backgroundColor: '#2b7',
    padding: 5,
    width: '95%',
    borderRadius: 5,
    alignItems: 'center',
  },
});
