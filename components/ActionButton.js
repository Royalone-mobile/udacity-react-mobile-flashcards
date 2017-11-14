import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { darkBlue, white } from '../utils/colors'

export default function ActionButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: darkBlue,
    padding: 15,
    margin: 10,
    borderRadius: 8
  },
  buttonText: {
    color: white,
    fontSize: 18,
    textAlign: 'center'
  }
})
