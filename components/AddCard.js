import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import { white, gray, darkGray, textGray, black } from '../utils/colors'
import ActionButton from './ActionButton'
import DisabledButton from './DisabledButton'
import { addCardToDeck } from '../utils/helpers'
import { NavigationActions } from 'react-navigation'
import TextButton from './TextButton'

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    addCard = () => {
      const {deck} = navigation.state.params

      deck.questions.push({
        question: navigation.state.params.question,
        answer: navigation.state.params.answer
      })

      addCardToDeck(deck)

      navigation.goBack()
      navigation.state.params.refreshDeck(deck);
    }

    return {
      title: "New Card",
      headerRight: <View>{navigation.state.params.question && navigation.state.params.answer ? (
        <TextButton onPress={() => addCard()}><Text style={styles.white}>Add Card</Text></TextButton>
      ) : (
        <Text style={[styles.white, styles.disabled, styles.headerRight]}>Add Card</Text>
      )}</View>
    }
  }

  // state = {
  //   deck: {},
  //   question: "",
  //   answer: ""
  // }

  // componentWillMount() {
  //   const {deck} = this.props.navigation.state.params;
  //   this.setState((state) => ({
  //     ...state,
  //     deck
  //   }))
  // }

  updateQuestion(question) {
    const {navigation} = this.props
    navigation.setParams({question})

    // this.setState((state) => ({
    //   ...state,
    //   question
    // }))
  }

  updateAnswer(answer) {
    const {navigation} = this.props
    navigation.setParams({answer})

    // this.setState((state) => ({
    //   ...state,
    //   answer
    // }))
  }

  render() {
    const {state} = this.props.navigation
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput placeholder="Question" autoFocus={true}  placeholderTextColor={textGray} style={styles.input} onChangeText={(question) => this.updateQuestion( question)} value={state.params.question} />
          <TextInput placeholder="Answer" placeholderTextColor={textGray} style={[styles.input, styles.inputLast]} onChangeText={(answer) => this.updateAnswer( answer)} value={state.params.answer} />
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
    backgroundColor: gray,
    paddingTop: 15
  },
  form: {
    backgroundColor: white,
    paddingLeft: 15,
    shadowColor: black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 0
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5
  },
  input: {
    fontSize:14,
    borderBottomWidth: 1,
    borderColor: darkGray,
    paddingTop: 15,
    paddingBottom: 15
  },
  inputLast: {
    borderBottomWidth: 0
  },
  white: {
    color: white
  },
  disabled: {
    fontSize: 16,
    opacity: 0.5,
    paddingRight: 20
  }
})
