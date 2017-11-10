import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'

class DeckList extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck')}>
          <Text>View Deck</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

export default DeckList
