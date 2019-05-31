import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation';
import PlannedEventsScreen from '../../../../Screens/leadInfo/Tabs/PlannedEvents/plannedEvents'



export const LeadInfoTabs = createMaterialTopTabNavigator(
    {
        'Planned events': PlannedEventsScreen
    },
    {
        navigationOptions: (props) => ({
            headerBackTitle: '',
            tabBarVisible: true,
            swipeEnabled: true,
            animationEnabled: true

        }),
        tabBarOptions: {
            activeTintColor: '#2A2F47',
            inactiveTintColor: '#A6A9B3',
            style: { backgroundColor: '#FFFFFF', color: '#25a5a1', fontSize: 10, },
            indicatorStyle: { backgroundColor: '#2A2F47',width:"50%",marginLeft:"25%" },
            labelStyle: { fontSize: 14, fontWeight: 'bold' },
            upperCaseLabel: false,
            showIcon: false,
        }
    }
);
export const AppContainer=createAppContainer(LeadInfoTabs)