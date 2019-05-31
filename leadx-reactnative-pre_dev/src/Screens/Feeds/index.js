import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, Alert, Image, ProgressBarAndroid, ProgressViewIOS, ToastAndroid, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newsFeedList } from '../../Networking/API/newsAPI';
import { getFeeds } from '../News/dispatcher';
import moment from 'moment';


const mapStateToProps = (state) => {
    return {
        feeds: state.news.feedList
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getFeeds }, dispatch)
}

class FeedsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedsActivePage: 0,
            feedsData: this.props.feeds ? this.props.feeds : [],
            endOfFeeds: false
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.feeds !== prevState.feeds) {
            return {
                feedsData: nextProps.feeds
            }
        }
    }

    getMoreFeeds = async () => {
        await this.setState({
            feedsActivePage: this.state.feedsActivePage + 1
        })
        const getFeedParams = {
            "arrayFilters": [
                {
                    "is_deleted": 0
                }
            ],
            "selectFilters": ["action_type", "created_at", "updated_at"],
            "sort": {
                "field": "id",
                "sortOrder": "DESC"
            },
            "paginate": {
                "page": this.state.feedsActivePage,
                "limit": 3
            }
        }
        var feeds = await newsFeedList(getFeedParams);
        if (feeds) {
            if (feeds.length !== 0) {
                await this.props.getFeeds(feeds);
            } else {
                this.setState({
                    endOfFeeds: true
                }, () => {
                    Platform.OS === 'android' ? ToastAndroid.show('No more feeds found', ToastAndroid.SHORT) : null
                })
            }
        } else {
            Alert.alert('Oops! somethingwen wrong.');
        }
    }


    render() {
        return (
            <View>
                <FlatList
                    data={this.state.feedsData}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        item.action_type == '1'
                            ? <TouchableOpacity
                                key={item.id}
                                onPress={() => { this.props.navigation.navigate('NewsFeedsScreen') }}
                                style={{ overflow: 'hidden', flexDirection: 'row', width: 300, borderRadius: 4, marginRight: 5 }}
                            >
                                <ImageBackground source={require('../../Assets/icons/rounded-rectangle-2.png')} style={{ width: '100%', height: 'auto', flexDirection: 'row', }}>
                                    <View style={styles.ImageContainer}>
                                        <Image style={styles.AvtarImage} source={{ uri: item.user.user_avatar }} />
                                    </View>
                                    <View style={styles.WordContainer}>
                                        <Text style={styles.headLine}>
                                            <Text style={{ fontWeight: "bold" }}>{item.user.name} </Text>
                                            <Text> has won a contract with </Text>
                                            <Text style={{ fontWeight: "bold" }}>{item.contact_company.company_name}</Text>
                                        </Text>
                                        <Text style={styles.lastSeen}>{moment(item.created_at).fromNow()}</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>

                            : <TouchableOpacity key={item.id} onPress={() => this.props.navigation.navigate('NewsFeedsScreen')} style={{ flexDirection: 'row', width: 300, backgroundColor: '#232f44', borderRadius: 4, marginLeft: 5, marginRight: 10 }}>
                                <View style={styles.ImageContainer}>
                                    <Image style={styles.AvtarImage} source={{ uri: item.user.user_avatar }} />
                                </View>
                                <View style={styles.WordContainer}>
                                    <Text style={styles.headLine}>
                                        <Text style={{ fontWeight: "bold" }}>{item.user.name} </Text>
                                        <Text> has entered a new lead with </Text>
                                        <Text style={{ fontWeight: "bold" }}>{item.contact_company.company_name}</Text>
                                    </Text>
                                    <Text style={styles.lastSeen}>{moment(item.updated_at).fromNow()}</Text>
                                </View>
                            </TouchableOpacity>
                    }
                    ListFooterComponent={() => {
                        return !this.state.endOfFeeds
                            ? <View style={{ alignItems: 'center', justifyContent: 'center', width: 300, height: 72, backgroundColor: '#FFFFFF', borderRadius: 4, marginLeft: 5, marginRight: 10 }}>
                                {
                                    Platform.OS === 'android'
                                        ? <ProgressBarAndroid />
                                        : <ProgressViewIOS />
                                }
                            </View>
                            : null
                    }}
                    onEndReached={() => !this.state.endOfFeeds ? this.getMoreFeeds() : null}
                    onEndReachedThreshold={1}
                />
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedsList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F1F8',
        padding: 5
    },
    headerContainer: {
        paddingLeft: 16,
        paddingTop: 25,
        paddingBottom: 15
    },
    newsHeader: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 20,
        fontWeight: '800',
        color: '#232f44'
    },
    newsContainer: {
        backgroundColor: '#FFFFFF',
        marginTop: 10,
    },
    newsCardHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    ImageContainer: {
        flex: 0,
    },
    newsAvatar: {
        width: 22,
        height: 22
    },
    AvtarImage: {
        margin: 10,
        width: 54,
        height: 54,
        borderRadius: 8,
        backgroundColor: 'powderblue'
    },
    AvtarImage: {
        margin: 12,
        width: 30,
        height: 30,
        borderRadius: 6,
        backgroundColor: 'powderblue'
    },
    WordContainer: {
        flex: 0,
        marginRight: 15,
        paddingRight: 15,
    },
    headLine: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 12,
        color: '#FFFFFF',
        marginRight: 15,
        paddingRight: 15,
        marginTop: 13,
    },
    lastSeen: {
        fontSize: 10,
        color: '#FFFFFF',
        marginBottom: 12,
        marginTop: 4,
        opacity: 0.6
    },
})