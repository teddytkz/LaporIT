import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomFlatMenu from '../../component/CustomFlatMenu';
import axios from 'axios';
import {BASE_URL} from '../../config';

const LaporanKerusakan = ({navigation, route}) => {
  useEffect(() => {
    laporan();
    const refreshData = navigation.addListener('focus', () => {
      laporan();
    });
  }, []);

  const [dataLaporan, setDataLaporan] = useState([]);

  const laporan = async () => {
    const listLaporan = await fetch(`${BASE_URL}/inventaris/list_laporan`);
    const json = await listLaporan.json();
    setDataLaporan(json);
  };

  const tindakLanjut = async idLaporan => {
    navigation.navigate('Kedatangan Petugas Laporan', {
      idLaporan: idLaporan,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dataLaporan}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <CustomFlatMenu
            item={item}
            onPress={() => {
              tindakLanjut(item.id);
            }}
          />
        )}></FlatList>
    </SafeAreaView>
  );
};

export default LaporanKerusakan;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});
