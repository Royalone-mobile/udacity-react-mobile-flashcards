import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import ActionButton from './ActionButton'
import { white } from '../utils/colors'
import { saveDeckTitle, getDeck } from '../utils/helpers'

class AddDeck extends Component {
  state = {
    title: ""
  }

  clearTitle = () => {
    this.setState({title: ""})
  }

  addDeck = () => {
    saveDeckTitle(this.state.title)
    getDeck(this.state.title).then((deck) => this.props.navigation.navigate('Deck', {deck, refreshDecks: this.props.navigation.state.params.refreshDecks}))
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="position" style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput style={styles.input} onChangeText={(title) => this.setState({ title })} value={this.state.title} />
        <ActionButton onPress={this.addDeck}>
          <Text>Create Deck</Text>
        </ActionButton>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
    padding: 10
  },
  title: {
    fontSize: 48,
    marginBottom: 25,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5
  }
})

export default AddDeck
