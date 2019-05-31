import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import SalesCommunityOngoingScreen from '../../../../Screens/Sales/Tabs/OngoingSales';


const SalesTabs = createMaterialTopTabNavigator({
    'Ongoing Sales': {
        screen: SalesCommunityOngoingScreen,
    }
}, {
        navigationOptions: (props) => ({
            headerBackTitle: null,
            tabBarVisible: true,
            swipeEnabled: true,
            animationEnabled: true
        }),
        tabBarOptions: {
            activeTintColor: '#2A2F47',
            inactiveTintColor: '#A6A9B3',
            style: { backgroundColor: '#FFFFFF', color: '#25a5a1', fontSize: 10, },
            indicatorStyle: { backgroundColor: '#2A2F47' },
            labelStyle: { fontSize: 14, fontWeight: 'bold' },
            upperCaseLabel: false,
            showIcon: false,
        }
    }
)

export const AppContainer = createAppContainer(SalesTabs);