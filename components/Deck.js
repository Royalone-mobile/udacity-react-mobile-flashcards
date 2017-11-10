import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'

class Deck extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddQuestion')}>
          <Text>Add Question</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Quiz')}>
          <Text>Take Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Deck
