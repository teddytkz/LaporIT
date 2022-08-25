import { StyleSheet, Text, View, LogBox } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Router from './router'

const App = () => {
  LogBox.ignoreLogs([
    "ViewPropTypes will be removed",
    "ColorPropType will be removed",
  ])
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>

  )
}

export default App

const styles = StyleSheet.create({})