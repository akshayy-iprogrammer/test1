import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import NewsScreen from '../../Screens/News';
import SalesScreen from '../../Screens/Sales';
import MyPipeLineScreen from '../../Screens/MyPipeline';
import ActivitiesScreen from '../../Screens/Activities';
import ShopScreen from '../../Screens/Shop';


const mainTabNavigator = createBottomTabNavigator({
    News: {
        screen: NewsScreen,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: ({ focused, tintColor }) => focused ? <Text style={{ fontSize: 9, alignSelf: 'center', color: '#232F44' }}>News</Text> : null,
            tabBarIcon: ({ focused, tintColor }) => (
                <Image source={require('../../Assets/icons/news.png')} style={{ width: 26, height: 26 }} />
            )

        }),
    },
    Sales: {
        screen: SalesScreen,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: ({ focused, tintColor }) => focused ? <Text style={{ fontSize: 9, alignSelf: 'center', color: '#232F44' }}>Sales Community</Text> : null,
            tabBarIcon: ({ focused, tintColor }) => (
                <Image source={require('../../Assets/icons/sales.png')} style={{ width: 26, height: 26 }} />
            )
        }),
    },
    MyPipeline: {
        screen: MyPipeLineScreen,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: ({ focused, tintColor }) => focused ? <Text style={{ fontSize: 9, alignSelf: 'center', color: '#232F44' }}>My Pipeline</Text> : null,
            tabBarIcon: ({ focused, tintColor }) => (
                <Image source={require('../../Assets/icons/my-pipeline.png')} style={{ width: 26, height: 26 }} />
            )
        }),
    },
    Activities: {
        screen: ActivitiesScreen,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: ({ focused, tintColor }) => focused ? <Text style={{ fontSize: 9, alignSelf: 'center', color: '#232F44' }}>Activities</Text> : null,
            tabBarIcon: ({ focused, tintColor }) => (
                <Image source={require('../../Assets/icons/activities.png')} style={{ width: 26, height: 26 }} />
            )
        }),
    },
    ShopsAndTutorials: {
        screen: ShopScreen,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: ({ focused, tintColor }) => focused ? <Text style={{ fontSize: 9, alignSelf: 'center', color: '#232F44' }}>Shops & Tutorials</Text> : null,
            tabBarIcon: ({ focused, tintColor }) => (
                <Image source={require('../../Assets/icons/shop.png')} style={{ width: 26, height: 26 }} />
            )
        }),
    }
},
    {
        navigationOptions: ({ navigation }) => ({
            tabBarVisible: true,
            swipeEnabled: true,
            animationEnabled: true,
        }),
        tabBarOptions: {
            style: {
                height: 60
            },
            labelStyle: {
                fontSize: 9,
            },
            tabStyle: {
                borderLeftWidth: 0.3,
                borderLeftColor: 'lightgrey',
                paddingLeft: 3,
                paddingRight: 3
            },
            activeTintColor: '#232F44',
            inactiveTintColor: '#a5a4a2',
            activeBackgroundColor: '#4DB959',
        }
    }
)

const AppContainer = createAppContainer(mainTabNavigator);

export default class MainTabNaviagtor extends Component {
    render() {
        return (
            <AppContainer />
        )
    }
}