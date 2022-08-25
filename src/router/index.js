import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Home,
  LaporanKerusakan,
  MaintenanceTerjadwal,
  ScanInventaris,
  TindakanMaintenanceTerjadwal,
  TindakLanjutLaporan,
  KedatanganPetugasLaporan,
} from '../screen';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Maintenance Terjadwal"
        component={MaintenanceTerjadwal}
      />
      <Stack.Screen name="Laporan Kerusakan" component={LaporanKerusakan} />
      <Stack.Screen
        name="Tindak Lanjut Laporan"
        component={TindakLanjutLaporan}
      />
      <Stack.Screen name="Scan Inventaris" component={ScanInventaris} />
      <Stack.Screen
        name="Tindakan Maintenance Terjadwal"
        component={TindakanMaintenanceTerjadwal}
      />
      <Stack.Screen
        name="Kedatangan Petugas Laporan"
        component={KedatanganPetugasLaporan}
      />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
