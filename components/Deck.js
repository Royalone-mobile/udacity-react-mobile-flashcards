import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,  } from 'react-native'
import { white, gray, textGray, darkBlue } from '../utils/colors'
import ActionButton from './ActionButton'
import DisabledButton from './DisabledButton'

/**
* TODO: Add Card and Take Quiz buttons should be a tabbar style buttons
* TODO: Should display the list of cards for this deck, that can be deleted individually.
*/

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params

    return {
      headerTitle: <View>
        <Text style={styles.headerTitle}>{deck.title}</Text>
        <Text style={styles.headerSubtitle}>{deck.questions.length} Cards</Text>
      </View>
    }
  }

  state = {
    deck: this.props.navigation.state.params.deck
  }

  refreshDeck = deck => {
    this.setState({ deck })

    this.props.navigation.state.params.refreshDecks()
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
    backgroundColor: white,
    padding: 10,
    paddingTop: 22
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
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: darkBlue,
    textAlign: 'center'
  },
  headerSubtitle: {
    color: textGray,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5
  }
})
