import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

const CustomButton = ({ text, onPress, disabled }) => {
    return (
        <Pressable
            onPress={onPress}
            style={styles.container}
            disabled={(disabled == 'true') ? true : false}

        >
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#007bff',
        width: '80%',
        paddingVertical: 20,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10
    },
    text: {
        color: 'white',
        fontWeight: 'bold'
    }
})