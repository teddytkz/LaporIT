import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker'

const CustomFieldSelect = ({ fieldName, items, open, value, setOpen, setValue, setItems, mode, multiple }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textField}>{fieldName}</Text>
            {/* <Pressable style={styles.buttonAction} onPress={onPress}>
                <Text style={styles.textButton}>{value}</Text>
            </Pressable> */}
            <DropDownPicker
                onBackdropPress={open}
                items={items}
                open={open}
                value={value}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                mode={mode}
                multiple={multiple}
                style={styles.dropdown}
                // autoScroll={true}
                badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
                dropDownDirection="TOP"
                searchable={true}
                listMode="SCROLLVIEW"
            ></DropDownPicker>
        </View>
    )
}

export default CustomFieldSelect

const styles = StyleSheet.create({
    container: {
        marginVertical: 5
    },
    textField: {
        fontWeight: 'bold',
        marginBottom: 3,
    },
    dropdown: {
        marginVertical: 5,
    }
})