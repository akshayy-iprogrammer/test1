import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation';
import OngoingSalesScreen from '../../../../Screens/MyPipeline/Tabs/OngoingSales/index';
import ContactsScreen from '../../../../Screens/MyPipeline/Tabs/Contacts';

const MyPipelineTabs = createMaterialTopTabNavigator({
    'Ongoing Sales': {
        screen: OngoingSalesScreen
    },
    Contacts: {
        screen: ContactsScreen
    },
}, {
        navigationOptions: ({ naviggation }) => ({
            headerBackTitle: null,
            tabBarVisible: true,
            swipeEnabled: true,
            animationEnabled: true,
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

export const AppContainer = createAppContainer(MyPipelineTabs);