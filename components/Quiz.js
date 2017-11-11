import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { white } from '../utils/colors'
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
        <View>
          <Text>{this.state.current+1} / {this.state.count} </Text>
        </View>
        { !this.state.complete ? (
          <View>
            { !this.state.answer ? (
              <View>
                <Text style={styles.title}>{card.question}</Text>
                <TextButton onPress={() => this.showAnswer()}>
                  <Text>Answer</Text>
                </TextButton>
              </View>
            ) : (
              <View>
                <Text style={styles.title}>{card.answer}</Text>
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
          <View>
            <Text style={styles.title}>Your Score</Text>
            <Text style={styles.title}>{ this.getScore() }%</Text>
            <ActionButton onPress={() => this.resetQuiz()}>
              <Text>Take Again</Text>
            </ActionButton>
          </View>
        )}



      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
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


export default Quiz
