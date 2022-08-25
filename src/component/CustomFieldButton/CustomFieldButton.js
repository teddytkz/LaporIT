import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

const CustomFieldButton = ({ fieldName, value, onPress }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textField}>{fieldName}</Text>
            <Pressable
                style={styles.buttonAction}
                onPress={onPress}
            >
                <Text style={styles.textButton}>{value}</Text>
            </Pressable>
        </View>
    )
}

export default CustomFieldButton

const styles = StyleSheet.create({
    container: {
        marginVertical: 5
    },
    textField: {
        fontWeight: 'bold',
        marginBottom: 3,
    },
    buttonAction: {
        alignItems: 'center',
        backgroundColor: '#007bff',
        width: '80%',
        paddingVertical: 10,
        marginVertical: 5,
        borderRadius: 10

    },
    textButton: {
        color: 'white',
        fontWeight: 'bold'
    }
})