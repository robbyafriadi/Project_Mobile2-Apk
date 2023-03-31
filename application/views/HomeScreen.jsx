import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useState} from 'react';

export default function HomeScreen({navigation}) {
  const [username, setUsername] = useState();
  return (
    <View style={styles.Warp}>
      <View>
        <View id="Header">
          <Text>Home Screen</Text>
        </View>
        <View></View>
        <View>
          <Button
            title="Rental Mobil"
            onPress={() =>
              navigation.navigate('RentalMobil', {username: username})
            }
          />
          
        </View>
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
    alignItems: 'center',
  },
});
