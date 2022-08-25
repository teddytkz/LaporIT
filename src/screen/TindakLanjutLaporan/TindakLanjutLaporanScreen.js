import { StyleSheet, Text, View, TouchableOpacity, PermissionsAndroid, Button, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomFieldInput from '../../component/CustomFieldInput'
import { BASE_URL } from '../../config'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import Modal from "react-native-modal";
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import CustomButton from '../../component/CustomButton'
import CustomFieldButton from '../../component/CustomFieldButton'
import { ScrollView } from 'react-native-virtualized-view';
import CustomFieldSelect from '../../component/CustomFieldSelect'
import { EmptyImage } from '../../assets/images'

const TindakLanjutLaporan = ({ navigation, route }) => {

    useEffect(() => {
        dataLaporan()
        itemTindakan()
    }, [])

    const [namaPelapor, setNamaPelapor] = useState('')
    const [namaRuangan, setNamaRuangan] = useState('')
    const [namaPemakai, setNamaPemakai] = useState('')
    const [namaBarang, setNamaBarang] = useState('')
    const [keluhan, setKeluhan] = useState('')

    //State For Images
    const [sourceImages, setSourceImages] = useState(EmptyImage)
    const [nameImages, setNameImages] = useState('')

    //State Visible Modal
    const [isModalVisible, setModalVisible] = useState(false);

    //State Tindakan
    const [openTindakan, setOpenTindakan] = useState(false);
    const [valueTindakan, setValueTindakan] = useState([]);
    const [itemsTindakan, setItemsTindakan] = useState([])

    //State Kategori Perbaikan
    const [openKategoriPerbaikan, setOpenKategoriPerbaikan] = useState(false)
    const [itemKategoriPerbaikan, setItemKategoriPerbaikan] = useState([
        { label: 'Hardware', value: 'Hardware' },
        { label: 'Software', value: 'Software' },
        { label: 'Jaringan', value: 'Jaringan' },
    ])
    const [valueKategoriPerbaikan, setValueKategoriPerbaikan] = useState([])

    const [disabledBtnSimpan, setDisabledBtnSimpn] = useState(false)
    const [loadingBtnSimpan, setLoadingBtnSimpan] = useState(false)

    let idLaporan = route.params.idLaporan
    const dataLaporan = async () => {
        const formData = new FormData();
        formData.append("id_laporan", idLaporan);
        const dataPelaporan = await axios({
            url: `${BASE_URL}/inventaris/data_laporan`,
            method: 'POST',
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
        setNamaPelapor(dataPelaporan.data.nama_pelapor)
        setNamaRuangan(dataPelaporan.data.ruangan)
        setNamaPemakai(dataPelaporan.data.pemakai)
        setNamaBarang(dataPelaporan.data.nama_barang)
        setKeluhan(dataPelaporan.data.keluhan)
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const selectImage = async (pilihan) => {
        const grantedCamera = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "App Camera Permission",
                message: "App needs access to your camera ",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "App Camera Permission",
                message: "App needs access to your camera ",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );

        const options = {
            selectionLimit: 0,
            mediaType: 'mixed',
            includeBase64: false,
        };

        if (pilihan == 'camera') {
            launchCamera(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = { uri: response.uri, fileName: response.fileName };
                    setSourceImages(source)
                    setNameImages(source.fileName)
                    setModalVisible(false)
                    // You can also display the image using data:
                    // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                }
            });
        } else {
            launchImageLibrary(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = { uri: response.uri, fileName: response.fileName };
                    setSourceImages(source)
                    setNameImages(source.fileName)
                    setModalVisible(false)
                }
            });
        }
    }

    const itemTindakan = async () => {
        const listTindakan = await axios.get(`${BASE_URL}/inventaris/get_solusi`)
        setItemsTindakan(listTindakan.data)
    }

    const sendData = async () => {
        try {
            if (loadingBtnSimpan == true) {
                return
            }
            if (valueKategoriPerbaikan.length == 0 || valueTindakan.length == 0) {
                return alert('Kategori Perbaikan / Tindakan Kosong')

            }
            if (nameImages.length == 0) {
                return alert('Gambar Kosong')
            }
            setLoadingBtnSimpan(true)
            const formData = new FormData()
            formData.append("id_laporan", idLaporan)
            formData.append('tindakan', valueTindakan.toString())
            formData.append('kategori_perbaikan', valueKategoriPerbaikan.toString())
            formData.append("image", {
                uri: Platform.OS === "android" ? sourceImages.uri : sourceImages.uri.replace("file://", ""),
                name: `dummy${Date.now()}.jpg`,
                type: 'image/*'
            })
            const dataPelaporan = await axios({
                url: `${BASE_URL}/inventaris/send_data`,
                method: 'POST',
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            setLoadingBtnSimpan(false)
            Alert.alert(
                "Sukse Menyimpan Tindakan",
                "==||==",
                [

                    { text: "OK", onPress: () => { navigation.pop(1) } }
                ]
            )

        } catch (error) {
            alert('ERROR' + error)
        }
    }

    return (
        <SafeAreaView style={styles.containerUtama}>
            <ScrollView>
                <View style={styles.containerSatu}>
                    <CustomFieldInput fieldName={'Nama Pelapor'} value={namaPelapor} editable={false} />
                    <CustomFieldInput fieldName={'Ruangan'} value={namaRuangan} editable={false} />
                    <CustomFieldInput fieldName={'Pemakai'} value={namaPemakai} editable={false} />
                    <CustomFieldInput fieldName={'Nama Barang'} value={namaBarang} editable={false} />
                    <CustomFieldInput fieldName={'Keluhan'} value={keluhan} editable={false} />
                    <CustomFieldSelect fieldName={'Jenis Perbaikan'}
                        open={openKategoriPerbaikan}
                        setOpen={setOpenKategoriPerbaikan}
                        items={itemKategoriPerbaikan}
                        setItems={setItemKategoriPerbaikan}
                        value={valueKategoriPerbaikan}
                        setValue={setValueKategoriPerbaikan}
                        mode={'BADGE'}
                        multiple={false}
                    />
                    <CustomFieldSelect fieldName={'Tindakan'}
                        open={openTindakan}
                        value={valueTindakan}
                        items={itemsTindakan}
                        setOpen={setOpenTindakan}
                        setValue={setValueTindakan}
                        // setItems={setItemsTindakan}
                        mode={'BADGE'}
                        multiple={true}
                    />
                    <CustomFieldButton fieldName={'Pilih File'} value={'Select File'} onPress={toggleModal} />
                    <Image source={sourceImages} style={{ width: 256, height: 256 }} />
                    <View style={{ alignItems: 'center' }}>
                        <CustomButton text={loadingBtnSimpan ? 'Loading ...' : 'Simpan'} onPress={sendData} />
                    </View>
                    <Modal
                        isVisible={isModalVisible}
                        style={{
                            justifyContent: 'flex-end', margin: 0
                        }}
                        onBackdropPress={toggleModal}
                        onBackButtonPress={toggleModal}
                        animationIn="fadeIn"
                        animationOut="fadeOut"
                        hideModalContentWhileAnimating={true}
                        animationInTiming={1000}
                        animationOutTiming={200}
                        useNativeDriver
                    >
                        <View style={{
                            flex: 0.15,
                            backgroundColor: 'white',

                            marginHorizontal: 10,
                            marginBottom: 10,
                            borderRadius: 10
                        }}>
                            <Pressable style={{
                                alignItems: 'center',
                                borderBottomColor: 'gray',
                                borderBottomWidth: 1,
                                marginLeft: 5,
                                marginRight: 5,
                                paddingVertical: 17
                            }} onPress={() => selectImage('camera')}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 17,
                                }}>Launch Camera</Text>
                            </Pressable >
                            <Pressable style={{
                                alignItems: 'center',
                                marginLeft: 5,
                                marginRight: 5,
                                paddingVertical: 17
                            }}
                                onPress={() => selectImage('files')}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 17,
                                }}>Open Gallery</Text>
                            </Pressable>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TindakLanjutLaporan

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
        marginBottom: 5
    }
})