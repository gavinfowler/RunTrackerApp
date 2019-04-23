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
import TypeHistory from './src/screens/TypeHistory';
import SortedHistory from './src/screens/SortedHistory'
import Temp from './src/screens/tempscreen';
import RangeHistory from './src/screens/RangeHistory';


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
        HistoryDetail: HistoryDetail,
        TypeHistory: TypeHistory,
        SortedHistory: SortedHistory,
        RangeHistory: RangeHistory,
        Temp: Temp
    },
    {
        initialRouteName: 'Home'
    }
);

const AppContainer = createAppContainer(Root);