import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { white, gray, green } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import ActionButton from './ActionButton'
import TextButton from './TextButton'

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Quiz"
    }
  }

  state = {
    questions: [],
    current: 0,
    answer: false,
    correct: 0,
    count: 0,
    complete: false
  }

  componentWillMount() {
    const {deck} = this.props.navigation.state.params
    const questions = deck.questions
    const count = questions.length
    this.setState({ questions, count })
  }

  showAnswer() {
    this.setState({answer: true})
  }

  hideAnswer() {
    this.setState({answer: false})
  }

  correctAnswer() {
    this.setState((state) => {
      correct: state.correct++
    })
    this.nextQuestion()
  }

  nextQuestion() {
    const current = this.state.current + 1
    if (current < this.state.count) {
      this.setState({current, answer: false})
    } else {
      this.setState({complete: true})
      clearLocalNotification()
      .then(setLocalNotification)
    }
  }

  getScore() {
    return ((this.state.correct / this.state.count) * 100).toFixed(1)
  }

  resetQuiz() {
    this.setState({current: 0, correct: 0, complete: false, answer: false})
  }


  render() {
    const card = this.state.questions[this.state.current]

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{this.state.current+1} / {this.state.count} </Text>
        </View>
        { !this.state.complete ? (
          <View style={{ flex: 1, justifyContent: 'space-between'}}>
            { !this.state.answer ? (
              <View style={styles.card}>
                <Text style={styles.text}>{card.question}</Text>
                <TextButton onPress={() => this.showAnswer()}>
                  <Text>Answer</Text>
                </TextButton>
              </View>
            ) : (
              <View style={styles.card}>
                <Text style={styles.text}>{card.answer}</Text>
                <TextButton onPress={() => this.hideAnswer()}>
                  <Text>Question</Text>
                </TextButton>
              </View>
            )}

            <View>
              <ActionButton onPress={() => this.correctAnswer()}>
                <Text>Correct</Text>
              </ActionButton>
              <ActionButton onPress={() => this.nextQuestion()}>
                <Text>Incorrect</Text>
              </ActionButton>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.score}>Your Score</Text>
              <Text style={styles.score}>{ this.getScore() }%</Text>
            </View>
            <View>
              <ActionButton onPress={() => this.resetQuiz()}>
                <Text>Restart Quiz</Text>
              </ActionButton>
              <ActionButton onPress={() => this.props.navigation.goBack()}>
                <Text>Back to Deck</Text>
              </ActionButton>
            </View>
          </View>
        )}



      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: gray,
    padding: 10
  },
  header: {
    padding: 15,
  },
  headerText: {
    fontSize: 16,
    textAlign: 'center'
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
  card: {
    backgroundColor: white,
    padding: 10,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  text: {
    fontSize: 21,
    marginBottom: 15,
    textAlign: 'center'
  },
  score: {
    fontSize: 48,
    marginBottom: 15,
    textAlign: 'center',
    color: green
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


export default Quiz
