import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const CustomFieldInput = ({ fieldName, value, editable }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textField}>{fieldName}</Text>
            <TextInput
                value={value}
                style={styles.textInput}
                editable={(editable == false || editable == '' ? false : true)}
                multiline={true}
            />
        </View>
    )
}

export default CustomFieldInput

const styles = StyleSheet.create({
    container: {
        marginVertical: 5
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
        paddingHorizontal: 10,
        marginVertical: 5
    }
})