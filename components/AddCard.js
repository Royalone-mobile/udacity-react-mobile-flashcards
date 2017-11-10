import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput } from 'react-native'
import { white } from '../utils/colors'
import ActionButton from './ActionButton'
import DisabledButton from './DisabledButton'
import { addCardToDeck } from '../utils/helpers'
import { NavigationActions } from 'react-navigation'

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Add Card"
    }
  }

  state = {
    deck: {},
    question: "",
    answer: ""
  }

  componentWillMount() {
    const {deck} = this.props.navigation.state.params;
    this.setState((state) => ({
      ...state,
      deck
    }))
  }

  updateQuestion(question) {
    this.setState((state) => ({
      ...state,
      question
    }))
  }

  updateAnswer(answer) {
    this.setState((state) => ({
      ...state,
      answer
    }))
  }

  addCard() {
    const {deck} = this.state
    const questions = deck.questions
    const {navigation} = this.props;


    questions.push({
      question: this.state.question,
      answer: this.state.answer
    })

    this.setState((state) => ({
      ...state,
      deck: {
        ...state.deck,
        questions
      }
    }))

    addCardToDeck(deck)

    navigation.goBack()
    navigation.state.params.refreshDeck(deck);
  }


  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>Question</Text>
          <TextInput style={styles.input} onChangeText={(question) => this.updateQuestion( question)} value={this.state.question} />
          <Text style={styles.label}>Answer</Text>
          <TextInput style={styles.input} onChangeText={(answer) => this.updateAnswer( answer)} value={this.state.answer} />
          {(this.state.question && this.state.answer) ? (
            <ActionButton onPress={() => this.addCard()}>
              <Text>Add Card</Text>
            </ActionButton>
          ) : (
            <DisabledButton>
              <Text>Add Card</Text>
            </DisabledButton>
          )}
        </View>
      </View>
    )
  }
}

export default AddCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: white,
    padding: 15
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    marginBottom: 15
  }
})
