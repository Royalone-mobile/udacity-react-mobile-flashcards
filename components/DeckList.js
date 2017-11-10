import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, ScrollView } from 'react-native'
import { white } from '../utils/colors'
import { getDecks } from '../utils/helpers'

class DeckList extends Component {
  state = {
    decks: {}
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Flashcard Decks"
    }
  }

  render() {
    getDecks().then((decks) => this.setState({decks}))

    return (
      <ScrollView style={styles.container}>
        {Object.keys(this.state.decks).map((key) => {
          return (
            <View style={styles.deck} key={key}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', {deck:key})}>
                <Text style={styles.title}>{ this.state.decks[key].title }</Text>
                <Text style={styles.subtitle}>{
                  this.state.decks[key].questions.length
                } Cards</Text>
              </TouchableOpacity>
            </View>
          )
        })}

      </ScrollView>
    )
  }
}

export default DeckList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
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
