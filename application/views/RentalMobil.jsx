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
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import Domain from '../builds/Domain';

export default function RentalMobil({route, navigation}) {
  const [Msg, setMsg] = useState();
  const [DataMobil, setDataMobil] = useState();

  const [loading, setLoading] = useState(false);
  const [Refresh, setRefresh] = useState(false);

  const getDataMobil = async () => {
    await fetch(`${Domain.ipAddress}/api/mobil`, {
    // await fetch('https://rentalmobil9.xyz/api/mobil', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.success == true) {
          setDataMobil(json.data);
          setLoading(false);
        }
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

  return loading ? (
    <View style={styles.LoadingStatus}>
      <StatusBar barStyle="light-content" animated={true} />
      <ActivityIndicator size="large" color="blue" />
    </View>
  ) : (
    <View id="Warp" style={styles.Warp}>
      <View>
        <StatusBar barStyle="light-content" animated={true} />
        <View style={{padding: 10, alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 30, color: 'black'}}>
            List Data Mobil
          </Text>
        </View>

        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={Refresh}
              onRefresh={() => {
                getDataMobil();
                setRefresh(false);
              }}
            />
          }
          data={DataMobil}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <View id="ListMobil" style={styles.ListMobil}>
              <View id="DataMobil" style={styles.DataMobil}>
                <View id="PhotoMobil" style={styles.PhotoMobil}>
                  {/* <Text>{`${Domain.ipAddress}/storage` + item.gambar}</Text> */}
                  <Image
                    source={
                      item.gambar == ''
                        ? `${require('../img/mobil.jpg')}`
                        : {
                            uri: `${Domain.ipAddress}/storage/` + item.gambar,
                          }
                    }
                    style={{height: 190, width: '100%'}}
                  />
                </View>

                <View id="ListDataMobil" style={styles.ListDataMobil}>
                  <Text
                    style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                    {item.nama_mobil} ({item.tahun_mobil})
                  </Text>
                  <Text>
                    {item.kursi} Seat - {item.transmisi}
                  </Text>
                  <Text style={{color: '#1ad', fontWeight: 'bold'}}>
                    Rp.{item.harga_sewa},- per 12 Jam
                  </Text>
                </View>

                <View id="StatusMobil" style={styles.StatusMobil}>
                  <Text
                    style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                    {item.keterangan}
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: 'flex-end',
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={styles.Btn_Container}>
                    <TouchableOpacity
                      style={styles.Btn_Sewa}
                      onPress={() =>
                        navigation.navigate('TransaksiRental', {
                          id_mobil: item.id_mobil,
                        })
                      }>
                      <Text style={{color: 'white', fontSize: 16}}>Sewa</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.Btn_Container}>
                    <TouchableOpacity
                      style={styles.Btn_Detail}
                      onPress={() =>
                        navigation.navigate('DetailDataMobil', {
                          id_mobil: item.id_mobil,
                        })
                      }>
                      <Text style={{color: 'white', fontSize: 16}}>Detail</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Warp: {
    backgroundColor: '#cfefff',
    height: '100%',
    padding: 5,
    paddingBottom: 70,
  },
  LoadingStatus: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ListMobil: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  PhotoMobil: {
    height: 200,
  },
  DataMobil: {
    width: '95%',
    backgroundColor: 'white',
    margin: 10,
    marginTop: 0,
    padding: 10,
    borderColor: '#4bf',
    borderWidth: 2,
    borderRadius: 10,
  },
  ListDataMobil: {
    borderTopWidth: 1,
    padding: 5,
    borderColor: '#2bf',
  },
  StatusMobil: {
    padding: 3,
    marginTop: 5,
    marginBottom: 10,
  },
  Btn_Container: {
    flex: 1,
    margin: 3,
    padding: 2,
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
    fontSize: 16,
    alignItems: 'center',
  },
});
