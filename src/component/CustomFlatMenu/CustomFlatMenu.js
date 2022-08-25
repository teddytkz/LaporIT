import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

const CustomFlatMenu = ({ item, onPress }) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Text style={styles.namapelapor}>{item.nama_pelapor}</Text>
            <Text style={styles.textBarang}>{item.nomor_tiket}</Text>
        </Pressable>
    )
}

export default CustomFlatMenu

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginHorizontal: 5,
        marginVertical: 2,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 4
    },
    namapelapor: {
        fontSize: 17,
        fontWeight: 'bold'
    }
})