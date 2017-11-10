import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { purple, white } from '../utils/colors'

export default function ActionButton ({ children, style = {} }) {
  return (
    <View style={[styles.button]}>
      <Text style={styles.buttonText}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: purple,
    opacity: 0.5,
    padding: 10,
    margin: 10
  },
  buttonText: {
    color: white,
    fontSize: 18,
    textAlign: 'center'
  }
})
