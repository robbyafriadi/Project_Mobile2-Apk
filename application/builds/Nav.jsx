import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';

import HomeScreen from '../views/HomeScreen';
import RentalMobil from '../views/RentalMobil';
import DetailDataMobil from '../views/DetailDataMobil';
import TransaksiRental from '../views/TransaksiRental';
import DaftarUser from '../views/DaftarUser';
import LoginScreen from '../views/LoginScreen';
import Test from '../views/Test';

export default function Nav() {
  const [username, setUsername] = useState();

  const Stack = createNativeStackNavigator();

  const NavHomeScreen = ({navigation, route}) => ({
    title: 'RENTAL MOBIL',
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTitleStyle: {
      color: 'black',
      fontSize: 24,
      fontWeight: 'bold',
    },
    headerTitleAlign: 'left',
    headerBackVisible: false,
    // headerRight: () => <Text>{route.params.username}</Text>,
  });

  const NavPages = ({route, navigation}) => ({
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTitleStyle: {
      color: 'black',
      fontSize: 24,
      fontWeight: 'bold',
    },
    headerTitleAlign: 'left',
    headerTitle: 'RENTAL MOBIL',
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Navigation">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={NavHomeScreen}
        />
        <Stack.Screen
          name="RentalMobil"
          component={RentalMobil}
          options={NavPages}
        />
        <Stack.Screen
          name="DetailDataMobil"
          component={DetailDataMobil}
          options={NavPages}
        />
        <Stack.Screen
          name="TransaksiRental"
          component={TransaksiRental}
          options={NavPages}
        />
        <Stack.Screen
          name="DaftarUser"
          component={DaftarUser}
          // options={NavPages}
        />
        <Stack.Screen name="Test" component={Test} options={NavPages} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
