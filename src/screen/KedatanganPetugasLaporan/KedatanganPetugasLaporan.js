import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-navigation';
import CustomButton from '../../component/CustomButton';
import {BASE_URL} from '../../config';
import {ScrollView} from 'react-native-virtualized-view';
import CustomFieldInput from '../../component/CustomFieldInput';
import axios from 'axios';

const KedatanganPetugasLaporan = ({navigation, route}) => {
  const [namaPelapor, setNamaPelapor] = useState('');
  const [namaRuangan, setNamaRuangan] = useState('');
  const [namaPemakai, setNamaPemakai] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [keluhan, setKeluhan] = useState('');

  useEffect(() => {
    checkProsesLaporan();
    dataLaporan();
  }, []);

  let idLaporan = route.params.idLaporan;
  const dataLaporan = async () => {
    const formData = new FormData();
    formData.append('id_laporan', idLaporan);
    const dataPelaporan = await axios({
      url: `${BASE_URL}/inventaris/data_laporan`,
      method: 'POST',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    });
    setNamaPelapor(dataPelaporan.data.nama_pelapor);
    setNamaRuangan(dataPelaporan.data.ruangan);
    setNamaPemakai(dataPelaporan.data.pemakai);
    setNamaBarang(dataPelaporan.data.nama_barang);
    setKeluhan(dataPelaporan.data.keluhan);
  };

  const onPressProsesLaporan = async () => {
    const formData = new FormData();
    formData.append('id_laporan', idLaporan);
    const prosesLaporan = await axios({
      url: `${BASE_URL}/maintenance/proses_laporan`,
      method: 'POST',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    });
    if (prosesLaporan.data.status == '200') {
      navigation.navigate('Tindak Lanjut Laporan', {
        idLaporan: idLaporan,
      });
    }
  };

  const checkProsesLaporan = async () => {
    const formData = new FormData();
    formData.append('id_laporan', idLaporan);
    const prosesLaporan = await axios({
      url: `${BASE_URL}/maintenance/check_proses_laporan`,
      method: 'POST',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    });
    if (prosesLaporan.data.status == 1) {
      navigation.navigate('Tindak Lanjut Laporan', {
        idLaporan: idLaporan,
      });
    }
  };

  return (
    <SafeAreaView style={styles.containerUtama}>
      <ScrollView>
        <View style={styles.containerSatu}>
          <CustomFieldInput
            fieldName={'Nama Pelapor'}
            value={namaPelapor}
            editable={false}
          />
          <CustomFieldInput
            fieldName={'Ruangan'}
            value={namaRuangan}
            editable={false}
          />
          <CustomFieldInput
            fieldName={'Pemakai'}
            value={namaPemakai}
            editable={false}
          />
          <CustomFieldInput
            fieldName={'Nama Barang'}
            value={namaBarang}
            editable={false}
          />
          <CustomFieldInput
            fieldName={'Keluhan'}
            value={keluhan}
            editable={false}
          />
          <View style={{alignItems: 'center'}}>
            <CustomButton
              text={'Proses Laporan'}
              onPress={onPressProsesLaporan}></CustomButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default KedatanganPetugasLaporan;

const styles = StyleSheet.create({
  containerUtama: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    // paddingBottom: 10
  },
  containerSatu: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 5,
  },
});
