import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import TextButton from './components/TextButton'
import { white, purple, black, darkBlue} from './utils/colors'
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
}, {
  initialRouteParams: {
    edit: false
  },
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
