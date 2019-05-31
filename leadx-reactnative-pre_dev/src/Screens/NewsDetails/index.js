import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';

export default class NewsDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.navigation.state.params.data
        }
    }

    static navigationOptions = {
        title: 'Sales news',
        headerBackTitle: null,
        headerTintColor: 'green',
        headerTitleStyle: {
            flex: 1,
            color: '#ffffff',
            fontSize: 16,
        },
        headerStyle: {
            backgroundColor: '#2A2F47'
        },
        headerLeftContainerStyle: {
            marginLeft: 10
        },
        headerTitleContainerStyle: {
            marginLeft: -10,
        },
        headerBackImage: () => {
            return (
                <Image source={require('../../Assets/icons/arrow-left.png')} style={{ width: 18, height: 13, }} />
            )
        }
    };
    render() {
        const { navigation } = this.props;
        const pic = navigation.getParam('pic', 'NO-PIC');
        const name = navigation.getParam('name', 'NO-NAME');
        const postDate = navigation.getParam('postDate', 'NO-DATE');
        const newsImage = navigation.getParam('newsImage', 'NO-IMG');
        const news = navigation.getParam('news', 'NO-NEWS');
        const newsDetails = navigation.getParam('newsDetails', 'NO-DETAILS');
        return (
            <ScrollView style={styles.container}>
                <View style={styles.newsContainer} >
                    <View style={styles.newsCardHeader}>
                        <View style={{ flex: 0 }}>
                            <Image source={{ uri: this.state.item.user.user_avatar }} style={{ width: 27, height: 30, borderRadius: 5 }} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#232F44', fontFamily: 'OpenSans-Regular', marginLeft: 10 }}>{this.state.item.user.name}</Text>
                        </View>
                        <View style={{ flex: 0, justifyContent: 'center' }}>
                            <Text style={{ color: '#9c9bb2', fontSize: 8, fontFamily: 'OpenSans-Regular' }}>{moment(this.state.item.updated_at).fromNow()}</Text>
                        </View>
                    </View>

                    <View >
                        <Image source={{ uri: this.state.item.cover_image }} style={{ width: '100%', height: 268 }} />
                    </View>
                    <View style={{ padding: 20 }}>
                        <View>
                            <Text style={{ fontSize: 14, fontFamily: 'OpenSans-Regular', fontWeight: 'bold', color: '#232F44', textAlign: 'left' }}>
                                {this.state.item.title}
                            </Text>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ fontSize: 12, color: '#232F44', fontFamily: 'OpenSans-Regular', textAlign: 'left' }}>
                                {this.state.item.news_body}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F1F8'
    },
    newsContainer: {
        backgroundColor: '#FFFFFF'
    },
    newsCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        paddingTop: 9,
        paddingBottom: 9
    },
    headerContainer: {
        paddingLeft: 16,
        paddingTop: 25,
        paddingBottom: 15
    },
    newsHeader: {
        fontSize: 20,
        color: '#2A2F47',
        fontWeight: '800'
    },

    feedCard: {
        flexDirection: 'row'
    },

    ImageContainer: {
        flex: 0,
    },
    AvtarImage: {
        margin: 10,
        width: 54,
        height: 54,
        borderRadius: 8,
        backgroundColor: 'powderblue'
    },

    WordContainer: {
        flex: 0,
        marginRight: 20,
        paddingRight: 20,
    },
    headLine: {
        fontSize: 14,
        fontWeight: '500',
        color: '#363636',
        marginRight: 15,
        paddingRight: 15,
        marginTop: 22,
    },
    lastSeen: {
        fontSize: 12,
        color: '#363636',
        marginBottom: 12,
    },
})