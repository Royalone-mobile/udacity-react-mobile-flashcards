import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

export function saveDeckTitle(title) {
  const deck = {
    title: title,
    questions: []
  }
  
  AsyncStorage.setItem(title, JSON.stringify(deck))
}
