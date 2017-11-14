import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { white, gray, darkGray, textGray, black, darkBlue } from '../utils/colors'
import HeaderTitle from './HeaderTitle'
import ActionButton from './ActionButton'
import DisabledButton from './DisabledButton'
import { addCardToDeck } from '../utils/helpers'
import { NavigationActions } from 'react-navigation'
import TextButton from './TextButton'
/**
* TODO: Add the ability to add an image
**/

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const {deck, refreshDeck, goBack} = navigation.state.params

    addCard = () => {
      deck.questions.push({
        question: navigation.state.params.question,
        answer: navigation.state.params.answer
      })

      addCardToDeck(deck)
      refreshDeck(deck)

      // A delay was introduced to give time for refreshDeck to execute.
      setTimeout(function() {
        navigation.goBack()
      }, 100)
    }

    return {
      headerTitle: <HeaderTitle title="New Card" subtitle={deck.title} />,
      headerRight: <View>{navigation.state.params.question && navigation.state.params.answer ? (
        <TextButton onPress={() => addCard()}><Feather name='check' size={30} color={darkBlue} /></TextButton>
      ) : (
        <Text style={[styles.disabled, styles.headerRight]}><Feather name='check' size={30} color={textGray} /></Text>
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

  componentDidMount() {
    this.props.navigation.setParams({goBack: this.props.navigation.goBack})
  }


  render() {
    const {state} = this.props.navigation
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.label}>Provide a question and answer</Text>
          <TextInput placeholder="Question" autoFocus={true}  placeholderTextColor={textGray} style={styles.input} onChangeText={(question) => this.updateQuestion( question)} value={state.params.question} />
          <TextInput placeholder="Answer" placeholderTextColor={textGray} style={[styles.input]} onChangeText={(answer) => this.updateAnswer( answer)} value={state.params.answer} />
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
  },
  form: {

  },
  label: {
    padding: 15
  },
  input: {
    fontSize:14,
    backgroundColor: white,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: darkGray,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    marginBottom: 15
  },
  white: {
    color: white
  },
  darkBlue: {
    color: darkBlue
  },
  disabled: {
    fontSize: 16,
    opacity: 0.6,
    paddingRight: 20
  }
})
