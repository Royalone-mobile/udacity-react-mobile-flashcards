import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { white, gray } from '../utils/colors'
import ActionButton from './ActionButton'
import DisabledButton from './DisabledButton'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params

    return {
      title: deck.title
    }
  }

  state = {
    deck: this.props.navigation.state.params.deck
  }

  refreshDeck = deck => {
    this.setState({ deck })
  }


  render() {
    const {deck} = this.state

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.subtitle}>{deck.questions.length} Cards</Text>
        </View>
        <View>
          <ActionButton onPress={() => this.props.navigation.navigate('AddCard', {deck, refreshDeck: this.refreshDeck})}>
            <Text>Add Card</Text>
          </ActionButton>
          {deck.questions.length ? (
            <ActionButton onPress={() => this.props.navigation.navigate('Quiz', {deck})}>
              <Text>Take Quiz</Text>
            </ActionButton>
          ) : (
            <DisabledButton>
              <Text>Take Quiz</Text>
            </DisabledButton>
          )}
        </View>
      </View>
    )
  }
}

export default Deck

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: gray,
    padding: 10
  },
  deck: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: white,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 25,
    marginTop: 10,
    marginBottom: 10,
    flexShrink: 0
  },
  title: {
    fontSize: 48,
    marginBottom: 15,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 24,
    textAlign: 'center',
    color: 'grey'
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5
  }
})
