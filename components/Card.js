import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, Modal, AlertIOS, Animated } from 'react-native'
import { white, gray, darkBlue, darkGray, black, red, lightGray } from '../utils/colors'
import { truncateText, addCardToDeck } from '../utils/helpers'
import { Entypo } from '@expo/vector-icons'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


class Card extends Component {
  state = {
    translateX: new Animated.Value(0),
    edit: false,
    touch: false
  }

  onSwipeLeft(gestureState) {
    Animated.timing(
      this.state.translateX,
      {
        toValue: -100,
        duration: 200,
      }
    ).start();
    //this.setState({transform: [{translateX: -100}]})
  }
  onSwipeRight(gestureState) {
    Animated.timing(
      this.state.translateX,
      {
        toValue: 0,
        duration: 200,
      }
    ).start();
  }

  removeCard = (deck, card) => {
    deck.questions.splice(card, 1)

    addCardToDeck(deck)
    this.props.refreshDeck(deck)
  }


  render() {
    const {card, deck, refreshDeck, index} = this.props
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <GestureRecognizer
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}
        config={config}>
        <Animated.View style={{flex: 1, flexDirection: 'row', transform: [{translateX:this.state.translateX}]}}>
          <View style={{flex: 1}}>
            <View style={[styles.card]}>
              <Text style={[styles.title]}>
                { truncateText(card.question) }
              </Text>
              <Text>
                { truncateText(card.answer) }
              </Text>
            </View>
          </View>
          <TouchableHighlight onPress={() => this.removeCard(deck, index)} underlayColor={red} style={styles.deleteBtn}>
            <View>
              <Text style={styles.deleteBtnText}>Delete</Text>
            </View>
          </TouchableHighlight>
        </Animated.View>
      </GestureRecognizer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: gray
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: white,
    borderBottomWidth: 1,
    borderColor: gray,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    flexShrink: 0
  },
  title: {
    fontSize: 18,
    color: black
  },
  count: {
    fontSize: 18,
    textAlign: 'right',
    color: black
  },
  deleteBtn: {
    flex: 1,
    position: 'absolute',
    backgroundColor: red,
    width: 100,
    right: -100,
    paddingTop: 23,
    paddingBottom: 23,
    borderBottomWidth: 1,
    borderColor: red,
    margin: 0
  },
  deleteBtnText: {
    fontSize: 18,
    color: white,
    textAlign: 'center'
  },
  tabBar: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: white,
    padding: 10,
    paddingTop: 18,
    paddingBottom: 18
  }
})

export default Card
