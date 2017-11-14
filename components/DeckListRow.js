import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, Modal, AlertIOS, Animated } from 'react-native'
import { white, gray, darkBlue, darkGray, black, red, lightGray } from '../utils/colors'
import { getDecks, saveDeckTitle, truncateText } from '../utils/helpers'
import { Entypo } from '@expo/vector-icons'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


class DeckList extends Component {
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
          <TouchableHighlight style={{flex: 1 }} underlayColor='transparent' onShowUnderlay={() => {this.setState({touch: true})}} onHideUnderlay={() => {this.setState({touch: false})}} activeOpacity={1} onPress={() => navigate('Deck', {deck, refreshDecks})}>
            { this.state.touch ? (
              <View style={[styles.deck, {backgroundColor: lightGray}]}>
                <Text style={[styles.title]}>
                  { truncateText(deck.title) }
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={[styles.count]}>{
                    deck.questions.length
                  }</Text>
                  <Entypo name='chevron-small-right' size={24} color={black} />
                </View>
              </View>
            ) : (
              <View style={[styles.deck]}>
                <Text style={[styles.title]}>
                  { truncateText(deck.title) }
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.count}>{
                    deck.questions.length
                  }</Text>
                  <Entypo name='chevron-small-right' size={24} color={darkGray} />
                </View>
              </View>
            )}
          </TouchableHighlight>
          <TouchableHighlight onPress={() => removeDeck(deck.title)} underlayColor={red} style={styles.deleteBtn}>
            <View>
              <Text style={styles.deleteBtnText}>Delete</Text>
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
    paddingTop: 14,
    paddingBottom: 14,
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
