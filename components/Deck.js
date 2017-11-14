import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { white, gray, textGray, darkBlue } from '../utils/colors'
import ActionButton from './ActionButton'
import DisabledButton from './DisabledButton'
import TextButton from './TextButton'
import Card from './Card'

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
      </View>,
      headerRight: <TextButton onPress={() => navigation.navigate('AddCard', {deck, refreshDeck: this.refreshDeck})}><Entypo name='plus' size={30} color={textGray} /></TextButton>
    }
  }

  state = {
    deck: this.props.navigation.state.params.deck
  }

  refreshDeck = deck => {
    this.setState({ deck })
    this.props.navigation.setParams({ deck })
    this.props.navigation.state.params.refreshDecks()
  }


  render() {
    const {deck} = this.state

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
            { deck.questions.map((card, index) => {
              return (
                <Card key={deck.title+`-card-`+index} index={index} deck={deck} card={card} refreshDeck={this.refreshDeck} />
              )
            })}
        </ScrollView>
        <View>
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
    backgroundColor: white,
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
