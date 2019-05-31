import React, { Component } from 'react';
import { createSwitchNavigator, createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

import SplashScreen from '../Screens/Splash/index';
import LoginScreen from '../Screens/Login';
import MainTabNaviagtor from './MainTabNavigator';

const RootSwitchNavigator = createSwitchNavigator({
    Splash: SplashScreen,
    Login: LoginScreen,
    Home: MainTabNaviagtor
},
    {
        initialRouteName: 'Splash'
    }
)


const AppContainer = createAppContainer(RootSwitchNavigator);

export default class RootNavigator extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppContainer />
        )
    }
}