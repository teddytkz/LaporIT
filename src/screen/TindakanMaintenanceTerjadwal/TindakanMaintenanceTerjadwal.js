import { StyleSheet, Text, View, SafeAreaView, Pressable, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomFieldInput from '../../component/CustomFieldInput'
import CustomButton from '../../component/CustomButton'
import CustomFieldDate from '../../component/Field/CustomFieldDate/CustomFieldDate'
import CustomFieldSelect from '../../component/CustomFieldSelect'
import DatePicker from 'react-native-date-picker'
import axios from 'axios'
import { BASE_URL } from '../../config'

const TindakanMaintenanceTerjadwal = ({ navigation, route }) => {

    useEffect(() => {
        setDateValue(formatDate(date))
        getDataMaintenance()
    }, [])

    //State Tindakan Perbaikan
    const [openTindakanPerbaikan, setOpenTindakanPerbaikan] = useState(false)
    const [itemTindakanPerbaikan, setItemTindakanPerbaikan] = useState([
        { label: 'Refillink', value: 'Refillink' },
        { label: 'Cek Ink', value: 'Cek Ink' },
        { label: 'Bersihkan PC', value: 'Bersihkan PC' },
    ])
    const [valueTindakanPerbaikan, setValueTindakanPerbaikan] = useState(['Refillink', 'Cek Ink'])

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [dateValue, setDateValue] = useState('')

    const formatDate = (today) => {
        let month = String(today.getMonth() + 1).padStart(2, '0')
        let day = String(today.getDate()).padStart(2, '0');
        let year = today.getFullYear()
        let date = [year, month, day].join('-')
        return date
    }

    const [namaPemakai, setNamaPemakai] = useState('')
    const [namaBarang, setNamaBarang] = useState('')

    const simpanData = async () => {
        let idInventaris = route.params.idInventaris
        let date = dateValue
        const formData = new FormData()
        formData.append('id_inventaris', idInventaris)
        formData.append('date', date)
        formData.append('tindakan', valueTindakanPerbaikan.toString())
        const saveData = await axios({
            url: `${BASE_URL}maintenance/save_tindakan_maintenance_terjadwal`,
            method: 'POST',
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
        })
        // console.log(saveData.data.status)
        if (saveData.data.status == '200') {
            navigation.replace('Maintenance Terjadwal')
        } else {
            alert('Failed Save')
        }
    }

    const getDataMaintenance = async () => {
        let idInventaris = route.params.idInventaris
        const formData = new FormData()
        formData.append('id_inventaris', idInventaris)
        const dataMaintenance = await axios({
            url: `${BASE_URL}maintenance/data_maintenance_terjadwal`,
            method: 'POST',
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
        setNamaPemakai(dataMaintenance.data.nama_pengguna)
        setNamaBarang(dataMaintenance.data.merk)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerView}>
                <CustomFieldInput fieldName={"Pemakai"} editable={false} value={namaPemakai} />
                <CustomFieldInput fieldName={"Nama Barang"} editable={false} value={namaBarang} />
                <Pressable
                    style={styles.containerDate}
                    onPress={() => setOpen(true)}>
                    <Text style={{
                        fontWeight: 'bold',
                        marginBottom: 3,
                    }}>Tanggal Maintenance</Text>
                    <TextInput
                        editable={false}
                        style={styles.textInput}
                        value={dateValue.toString()}
                    />
                    <DatePicker
                        modal
                        open={open}
                        date={date}
                        mode={'date'}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                            setDateValue(formatDate(date))
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                </Pressable>
                <CustomFieldSelect fieldName={'Tindakan'}
                    open={openTindakanPerbaikan}
                    value={valueTindakanPerbaikan}
                    items={itemTindakanPerbaikan}
                    setOpen={setOpenTindakanPerbaikan}
                    setValue={setValueTindakanPerbaikan}
                    // setItems={setItemsTindakan}
                    mode={'BADGE'}
                    multiple={true}
                />
                <View style={{ alignItems: 'center', marginBottom: 30 }}>
                    <CustomButton text={'Simpan'} onPress={simpanData} />
                </View>

            </View>
        </SafeAreaView >
    )
}

export default TindakanMaintenanceTerjadwal

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: 'white',
        flex: 1
    },
    containerView: {
        backgroundColor: 'white',
        paddingHorizontal: 10
    }
})