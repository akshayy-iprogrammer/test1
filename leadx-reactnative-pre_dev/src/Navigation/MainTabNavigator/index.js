import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import ActivitiesScreen from '../../Screens/Activities';
import ShopScreen from '../../Screens/Shop';
import SalesStack from './SalesCommunity/salesCommunityStack';
import PipeStackNavigator from './MyPipeline/myPipelineStack';
import NewsIcon from '../../Assets/icons/news.png';
import SalesIcon from '../../Assets/icons/sales.png';
import PipelineIcon from '../../Assets/icons/my-pipeline.png';
import ActivitiesIcon from '../../Assets/icons/activities.png';
import ShopIcon from '../../Assets/icons/shop.png';
import AsyncStorage from '@react-native-community/async-storage';
import NewsStackNavigator from './News/newsStackNavigator';


const mainTabNavigator = createBottomTabNavigator({
    News: {
        screen: NewsStackNavigator,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: ({ focused, tintColor }) => focused ? <Text style={{ fontSize: 9, alignSelf: 'center', color: '#232F44' }}>News</Text> : null,
            tabBarIcon: ({ focused, tintColor }) => (
                <Image source={require('../../Assets/icons/news.png')} style={{ width: 26, height: 26 }} />
            )

        }),
    },
    Sales: {
        screen: SalesStack,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: ({ focused, tintColor }) => focused ? <Text style={{ fontSize: 9, alignSelf: 'center', color: '#232F44' }}>Sales Community</Text> : null,
            tabBarIcon: ({ focused, tintColor }) => (
                <Image source={require('../../Assets/icons/sales.png')} style={{ width: 26, height: 26 }} />
            )
        }),
    },
    MyPipeline: {
        screen: PipeStackNavigator,
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
            ),
            tabBarVisible: AsyncStorage.getItem('userType') === 'basic' ? false : true
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
            headerBackTitle: null,
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
            activeBackgroundColor: '#d3edd7',
        },
        // tabBarComponent: (props) => <CustomTabBar {...props} />
    }
)

// const ValidRoutes = ['News', 'Sales', 'MyPipeline'];

// const CustomTabBar = props => {
//     return (
//         <View style={{ flexDirection: 'row' }}>
//             {
//                 props.navigation.state.routes.map((route, index) => {
//                     return ValidRoutes.includes(route.key)
//                         ? <TouchableOpacity
//                             key={index}
//                             style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderColor: 'black' }}
//                             onPress={() => { props.navigation.navigate(route.key) }}
//                         >
//                             <Image source={getIcons(route.key)} style={{ width: 20, height: 20 }} />
//                             <Text>{route.key}</Text>
//                         </TouchableOpacity>
//                         : null
//                 })
//             }
//         </View>
//     )
// }

// const getIcons = (route) => {
//     switch (route) {
//         case 'News':
//             return NewsIcon
//             break;
//         case 'Sales':
//             return SalesIcon
//             break;
//         case 'MyPipeline':
//             return PipelineIcon
//             break;
//         case 'Activities':
//             return ActivitiesIcon
//             break;
//         case 'ShopsAndTutorials':
//             return ShopIcon
//             break;
//         default:
//             return null
//     }
// }

const AppContainer = createAppContainer(mainTabNavigator);

export default class MainTabNaviagtor extends Component {
    render() {
        return (
            <AppContainer />
        )
    }
}