import { StyleSheet, FlatList, Pressable, TextInput, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import { BASE_URL } from '../../config'
import axios from 'axios'
import CustomFlatMenus from '../../component/CustomFlatMenus'
import DatePicker from 'react-native-date-picker'

const MaintenanceTerjadwalScreen = ({ navigation, route }) => {

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [dateValue, setDateValue] = useState('')
    const [dataMaintenance, setDataMaintenance] = useState([])

    useEffect(() => {
        setDateValue(formatDate(date))
        getDataMaintenance(dateValue)
        const refreshData = navigation.addListener('focus', () => {
            getDataMaintenance(dateValue)
        })
    }, [])



    const formatDate = (today) => {
        let month = String(today.getMonth() + 1).padStart(2, '0')
        let day = String(today.getDate()).padStart(2, '0');
        let year = today.getFullYear()
        let date = [year, month, day].join('-')
        return date
    }

    const getDataMaintenance = async (date) => {
        const maintenanceData = await fetch(`${BASE_URL}/maintenance/get_list_maintenance?date=${date}`)
        const json = await maintenanceData.json()
        setDataMaintenance(json)
    }

    const verfQr = async (idInven) => {
        navigation.navigate('Tindakan Maintenance Terjadwal', {
            idInventaris: idInven
        })
    }

    return (
        <SafeAreaView>
            <View>
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
                            getDataMaintenance(formatDate(date))
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                </Pressable>
            </View>
            <View style={styles.listMaintenance}>
                <ScrollView>

                    <FlatList
                        data={dataMaintenance}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (<CustomFlatMenus item={item} onPress={() => { verfQr(item.id_inventaris) }} />)}
                    >
                    </FlatList>


                </ScrollView>
            </View>
        </SafeAreaView >
    )
}

export default MaintenanceTerjadwalScreen

const styles = StyleSheet.create({
    containerDate: {
        backgroundColor: 'white',
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    listMaintenance: {
        paddingBottom: 10,
        marginBottom: 5,
        marginTop: 3
    },
    textInput: {
        backgroundColor: '#F3F3F3',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
    }
})