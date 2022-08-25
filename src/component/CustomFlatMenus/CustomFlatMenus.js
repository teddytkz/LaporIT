import { StyleSheet, Text } from 'react-native'
import React from 'react'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

const CustomFlatMenus = ({ item, onPress }) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Text style={styles.namaLengkap}>{item.nama_lengkap}</Text>
            <Text style={styles.namaRuangan}>{item.nama_ruangan}</Text>
            <Text>{item.nama_barang}</Text>
        </Pressable>
    )
}

export default CustomFlatMenus

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 2,
        marginHorizontal: 5,
        borderRadius: 10
    },
    namaLengkap: {
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 2
    },
    namaRuangan: {

    }
})