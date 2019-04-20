import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './src/screens/Home';
import StartActivity from './src/screens/StartActivity';
import DuringActivity from './src/screens/DuringActivity';
import AfterActivity from './src/screens/AfterActivity';
import TakePhoto from './src/screens/TakePhoto';
import Rewards from './src/screens/Rewards';
import History from './src/screens/History';
import HistoryDetail from './src/screens/HistoryDetail';


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
        StartActivity: StartActivity,
        DuringActivity: DuringActivity,
        AfterActivity: AfterActivity,
        TakePhoto: TakePhoto,
        Rewards: Rewards,
        History: History,
        HistoryDetail: HistoryDetail
    },
    {
        initialRouteName: 'Home'
    }
);

const AppContainer = createAppContainer(Root);