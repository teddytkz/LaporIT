import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../../component/CustomButton';
import {LaporITsLogo, LaporITLogo} from '../../assets/images';

const HomeScreen = ({navigation}) => {
  const onPressMaintenance = () => {
    navigation.navigate('Maintenance Terjadwal');
  };

  const onPressLaporanKerusakan = () => {
    navigation.navigate('Laporan Kerusakan', {momo: 'nice'});
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image source={LaporITLogo} style={styles.logoIT} />
      <CustomButton
        text={'Laporan Kerusakan'}
        onPress={onPressLaporanKerusakan}
      />
      <CustomButton
        text={'Maintenance Terjadwal'}
        onPress={onPressMaintenance}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  logoIT: {
    width: 200,
    height: 230,
    paddingBottom: 50,
    marginBottom: 50,
  },
});
