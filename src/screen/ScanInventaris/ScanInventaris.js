import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner'
import CustomButton from '../../component/CustomButton'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

const ScanInventaris = ({ navigation, route }) => {
    const idInventaris = route.params.idInventaris

    const [textStatus, setTextStatus] = useState('')

    const onScanned = e => {
        console.log(idInventaris)
        if (e.data == idInventaris) {
            alert('Success');
        } else {
            setTextStatus('Error : ' + e.data)
        }
    }
    return (
        <QRCodeScanner
            onRead={onScanned}
            reactivate={true}
            showMarker={true}
            reactivateTimeout={500}
            topContent={
                <Text style={styles.textStatus}>{textStatus}</Text>
            }

        />



    )
}

export default ScanInventaris

const styles = StyleSheet.create({
    textStatus: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})