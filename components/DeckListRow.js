import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, Modal, AlertIOS, Animated } from 'react-native'
import { white, gray, darkBlue, darkGray } from '../utils/colors'
import { getDecks, saveDeckTitle, truncateText } from '../utils/helpers'
import { Entypo } from '@expo/vector-icons'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


class DeckList extends Component {
  state = {
    translateX: new Animated.Value(0),
    // translateX: 0,
    edit: false
  }

  onSwipeLeft(gestureState) {
    Animated.timing(
      this.state.translateX,
      {
        toValue: -100,
        duration: 500,
      }
    ).start();
    //this.setState({transform: [{translateX: -100}]})
  }
  onSwipeRight(gestureState) {
    Animated.timing(
      this.state.translateX,
      {
        toValue: 0,
        duration: 500,
      }
    ).start();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.edit !== this.state.edit) {
      this.setState({edit: nextProps.edit})
      if (nextProps.edit) {
        Animated.timing(
          this.state.translateX,
          {
            toValue: -100,
            duration: 300,
          }
        ).start();
        // this.setState({translateX: -100})
      } else {
        Animated.timing(
          this.state.translateX,
          {
            toValue: 0,
            duration: 300,
          }
        ).start();
        // this.setState({translateX: 0})
      }
    }
  }



  render() {
    const {deck, navigate, removeDeck, refreshDecks} = this.props
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
          <TouchableHighlight style={{flex: 1}} underlayColor={darkBlue} onPress={() => navigate('Deck', {deck, refreshDecks})}>
            <View style={styles.deck}>
              <Text style={styles.title}>{ truncateText(deck.title) }</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.count}>{
                  deck.questions.length
                }</Text>
                <Entypo name='chevron-small-right' size={24} color={darkGray} />
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => removeDeck(deck.title)} underlayColor='red' style={{position: 'absolute', backgroundColor: 'red', width: 100, right: -100, padding: 15}}>
            <View>
              <Text style={{fontSize: 24, color: white }}>Delete</Text>
            </View>
          </TouchableHighlight>
        </Animated.View>
      </GestureRecognizer>
    )
  }
}

export default DeckList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: gray
  },
  deck: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: white,
    borderBottomWidth: 1,
    borderColor: gray,
    padding: 15,
    flexShrink: 0,
  },
  title: {
    fontSize: 24
  },
  modal: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 150,
    height: 150,
    backgroundColor: darkBlue
  },
  count: {
    fontSize: 24,
    textAlign: 'right',
    color: darkGray
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
