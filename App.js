import React from 'react';
import {View, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { white, darkBlue, black, translucent, textGray} from './utils/colors'
import { setLocalNotification } from './utils/helpers'

function FlashcardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ height: Constants.statusBarHeight, backgroundColor }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const MainNavigator = StackNavigator({
  Home: {
    screen: DeckList
  },
  Deck: {
    screen: Deck,
  },
  AddCard: {
    screen: AddCard,
  },
  Quiz: {
    screen: Quiz,
  }
}, {
  navigationOptions: {
    headerTintColor: textGray,
    headerStyle: {
      backgroundColor: white,
      height: 35,
      paddingBottom: 10,
      margin: 0,
      position: 'absolute',
      zIndex: 100,
      top: -10,
      left: 0,
      right: 0,
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 18,
      color: darkBlue
    },
    headerBackTitleStyle: {
      color: textGray,
      fontWeight: 'normal'
    }
  }
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <FlashcardsStatusBar backgroundColor={white} barStyle="dark-content" />
        <MainNavigator />
      </View>
    );
  }
}
