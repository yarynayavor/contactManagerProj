/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import AllTabs from './tabs/AllTabs';
import {
  Platform,
  Text,
  View,
  StatusBar
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  render() {
    return (
        <View style={{flex: 1}}>
            <StatusBar translucent={false}
                       backgroundColor="#002733"
                       barStyle="light-content"
                       hidden={false} />
            <AllTabs/>
        </View>
    );
  }
}
