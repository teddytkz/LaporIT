import { StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-native-date-picker'

const CustomDateInput = () => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [dateValue, setDateValue] = useState('')

    useEffect(() => {
        setDateValue(formatDate(date))
    }, [])

    const formatDate = (today) => {
        let month = String(today.getMonth() + 1).padStart(2, '0')
        let day = String(today.getDate()).padStart(2, '0');
        let year = today.getFullYear()
        let date = [year, month, day].join('-')
        return date
    }

    return (
        <Pressable
            onPress={() => setOpen(true)}>
            <TextInput
                editable={false}
                style={styles.textInput}
                value={dateValue}
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
    )
}

export default CustomDateInput

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: '#F3F3F3',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
    }
})