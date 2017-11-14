import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { darkBlue, textGray } from '../utils/colors'

export default function HeaderTitle ({ title, subtitle }) {
  return (
    <View>
      <Text style={styles.headerTitle}>{title}</Text>
      <Text style={styles.headerSubtitle}>{subtitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: darkBlue,
    textAlign: 'center'
  },
  headerSubtitle: {
    color: textGray,
    textAlign: 'center'
  }
})
