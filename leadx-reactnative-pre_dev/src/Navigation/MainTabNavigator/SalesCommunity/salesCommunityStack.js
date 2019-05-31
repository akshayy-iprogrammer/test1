import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import SalesScreen from '../../../Screens/Sales';
import AddLeadScreen from '../../../Screens/AddLead';
import AddContactScreen from '../../../Screens/AddContact';
import SalesLeadInfoScreen from '../../../Screens/SalesLeadInfo';

const SalesCommunityStack = createStackNavigator({
    SalesHome: {
        screen: SalesScreen,
        navigationOptions: () => ({
            headerStyle: {
                backgroundColor: '#2A2F47',
            },
            headerLeft: () => {
                return (
                    <View >
                        <Image source={require('../../../Assets/icons/stack-logo.png')} style={{ width: 100, height: 25 }} />
                    </View>
                )
            },
            headerLeftContainerStyle: {
                paddingLeft: 23
            },
            headerBackTitle : null,
        })
    },
    AddLead: {
        screen: AddLeadScreen,
        navigationOptions: (navigation) => ({
            title: 'New Lead',
            headerStyle: {
                backgroundColor: '#2A2F47'
            },
            headerTitleStyle: {
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: 'normal'
            },
            headerLeftContainerStyle: {
                marginLeft: 10
            },
            headerTitleContainerStyle: {
                marginLeft: -10
            },
            headerBackImage: () => {
                return (
                    <Image source={require('../../../Assets/icons/arrow-left.png')} style={{ width: 18, height: 13, }} />
                )
            }
        })
    },
    AddContact: {
        screen: AddContactScreen,
        navigationOptions: (navigation) => ({
            title: 'New Contact',
            headerStyle: {
                backgroundColor: '#2A2F47'
            },
            headerTitleStyle: {
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: 'normal'
            },
            headerLeftContainerStyle: {
                marginLeft: 10
            },
            headerTitleContainerStyle: {
                marginLeft: -10
            },
            headerBackImage: () => {
                return (
                    <Image source={require('../../../Assets/icons/arrow-left.png')} style={{ width: 18, height: 13, }} />
                )
            }
        })
    },
    SalesLeadInfo: {
        screen: SalesLeadInfoScreen,
        navigationOptions: (navigation) => ({
            title: 'Lead info',
            headerStyle: {
                backgroundColor: '#2A2F47'
            },
            headerTitleStyle: {
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: 'normal'
            },
            headerLeftContainerStyle: {
                marginLeft: 10
            },
            headerTitleContainerStyle: {
                marginLeft: -10
            },
            headerBackImage: () => {
                return (
                    <Image source={require('../../../Assets/icons/arrow-left.png')} style={{ width: 18, height: 13, }} />
                )
            }
        })
    }
},
    {
        initialRouteName: 'SalesHome'
    }
)

const AppContainer = createAppContainer(SalesCommunityStack);

export default class SalesStack extends Component {
    render() {
        return (
            <AppContainer />
        )
    }
}