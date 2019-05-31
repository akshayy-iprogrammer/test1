import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import NewsScreen from '../../../Screens/News/index';
import NewsFeedsScreen from '../../../Screens/NewsFeeds';
import NewsDetailsScreen from '../../../Screens/NewsDetails';
import FeedDetailsScreen from '../../../Screens/NewsFeeds/feedDetails';
import AddLeadScreen from '../../../Screens/AddLead';
import AddContactScreen from '../../../Screens/AddContact';


const NewsStack = createStackNavigator({
    NewsScreen: {
        screen: NewsScreen
    },
    NewsDetails: {
        screen: NewsDetailsScreen
    },
    NewsFeedsScreen: {
        screen: NewsFeedsScreen,
        navigationOptions: (navigation) => ({
            title: 'Sales news',
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
    FeedsDetalesScreen: {
        screen: FeedDetailsScreen,
        navigationOptions: (navigation) => ({
            title: 'Sales news feed',
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

},
    {
        initialRouteName: 'NewsScreen'
    }
)


const AppContainer = createAppContainer(NewsStack);

export default class NewsStackNavigator extends Component {
    render() {
        return <AppContainer />
    }
}
