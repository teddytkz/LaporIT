import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import CustomDateInput from '../../CustomDateInput'

const CustomFieldDate = ({ fieldName, valueTextInput }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textField}>{fieldName}</Text>
            <CustomDateInput />
        </View>
    )
}

export default CustomFieldDate

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        // paddingHorizontal: 5,
        paddingVertical: 10
    },
    textField: {
        fontWeight: 'bold',
        marginBottom: 3,
    },
    textInput: {
        backgroundColor: '#F3F3F3',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
    }
})