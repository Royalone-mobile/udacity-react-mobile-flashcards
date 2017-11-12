import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Notifications, Permissions } from 'expo'

const FLASHCARDS_STORAGE_KEY = 'Flashcards:decks'
const NOTIFICATION_KEY = 'Flashcards:notifications'

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

export function addCardToDeck(deck) {
  AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({[deck.title]:deck}))
}

function createNotification () {
  return {
    title: 'Complete a quiz!',
    body: "Don't forget to complete a quiz today!",
    ios: {
      sound: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(9)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}
