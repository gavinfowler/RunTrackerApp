import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './src/screens/Home';
import StartActivity from './src/screens/StartActivity';
import DuringActivity from './src/screens/DuringActivity';
import AfterActivity from './src/screens/AfterActivity';


export default class App extends Component {
    render() {
        return (
            <AppContainer />
        );
    }
}

const Root = createStackNavigator(
    {
        Home: Home,
        StartActivity:StartActivity,
        DuringActivity: DuringActivity,
        AfterActivity:AfterActivity,
    },
    {
        initialRouteName: 'Home'
    }
);

const AppContainer = createAppContainer(Root);