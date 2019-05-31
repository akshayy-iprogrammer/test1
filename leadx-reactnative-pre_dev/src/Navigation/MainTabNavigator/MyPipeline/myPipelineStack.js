import React, { Component } from 'react';
import { View, Image, TextInput } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import PipeHomeScreen from '../../../Screens/MyPipeline/index';
import AddLeadScreen from '../../../Screens/AddLead/index';
import AddContactScreen from '../../../Screens/AddContact/index';
import LeadInfoScreen from '../../../Screens/leadInfo/leadInfo';
import ContactInfo from '../../../Screens/MyPipeline/Tabs/Contacts/ContactInfo';

const PipeStack = createStackNavigator({
    PipeHome: {
        screen: PipeHomeScreen,
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
            headerBackTitle : null,
            headerLeftContainerStyle: {
                paddingLeft: 23
            },

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
                fontWeight: 'normal',
                fontFamily : 'OpenSans-Regular'
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
            },
            headerBackTitle : null,

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
    LeadInfo: {
        screen: LeadInfoScreen,
        navigationOptions: () => ({
            title: 'Lead Info',
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
    ContactInfo: {
        screen: ContactInfo,
        navigationOptions: () => ({
            title: 'Contact Info',
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
})

const AppContainer = createAppContainer(PipeStack);

export default class PipeStackNavigator extends Component {
    render() {
        return (
            <AppContainer screenProps={this.props.navigation} />
        )
    }
}
