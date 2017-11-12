import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { purple, white } from '../utils/colors'

export default function Header ({ children, style = {} }) {
  return (
    <Text style={styles.header}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 36,
    fontWeight: 'bold'
  }
})
