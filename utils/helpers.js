import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

export const FLASHCARDS_STORAGE_KEY = 'Flashcards:decks'

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then( (result) => {
    return JSON.parse(result)
  })
}

function getDeckKeys() {

}

export function saveDeckTitle(title) {
  const deck = {
    title: title,
    questions: []
  }

  AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({[title]:deck}))
}
