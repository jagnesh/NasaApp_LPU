import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import AppNavigator from './src/navigation/AppNavigator'
import { Provider } from 'react-redux'
import Store from './src/reducers/Store'


export default class App extends Component {
  render() {
    return (
      <Provider store={Store()}>
        <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />
        <AppNavigator />
      </Provider>
    )
  }
}

