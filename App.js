import React from 'react';
import {View, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { white, darkBlue} from './utils/colors'
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
    screen: DeckList,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkBlue,
      }
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkBlue,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkBlue,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkBlue,
      }
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
        <FlashcardsStatusBar backgroundColor={darkBlue} barStyle="light-content" />
        <MainNavigator />
      </View>
    );
  }
}
