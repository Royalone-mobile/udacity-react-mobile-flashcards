import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput } from 'react-native'
import ActionButton from './ActionButton'
import { white } from '../utils/colors'
import { saveDeckTitle } from '../utils/helpers'
import { NavigationActions } from 'react-navigation'

class AddDeck extends Component {
  state = {
    title: ""
  }

  clearTitle = () => {
    this.setState({title: ""})
  }

  addDeck = () => {
    saveDeckTitle(this.state.title)
    this.clearTitle()
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput style={styles.input} onChangeText={(title) => this.setState({ title })} value={this.state.title} />
        <ActionButton onPress={this.addDeck}>
          <Text>Create Deck</Text>
        </ActionButton>
      </View>
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
