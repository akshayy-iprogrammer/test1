import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    ProgressBarAndroid,
    ProgressViewIOS,
    Platform,
    FlatList,
    ToastAndroid,
    Alert
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddModal from '../../Components/addModal';
import { newsList, newsFeedList } from '../../Networking/API/newsAPI';
import { getNews, getFeeds } from './dispatcher';
import moment from 'moment';
import FeedsList from '../Feeds/index';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getNews, getFeeds }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        news: state.news.newsCardData,
    }
}

class NewsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addClicked: false,
            newsData: this.props.news ? this.props.news : [],
            newsActivePage: 0,
            feedsActivePage: 0,
            endOfnews: false
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#2A2F47',
        },
        headerLeft: () => {
            return (
                < View >
                    <Image source={require('../../Assets/icons/stack-logo.png')} style={{ width: 100, height: 25 }} />
                </View >
            )
        },
        headerRight: (
            <View style={{ flexDirection: 'row', marginBottom: 12, marginTop: 12 }}>
                <TouchableOpacity style={{ padding: 7, backgroundColor: '#3E4561', borderRadius: 5, marginRight: 12 }}
                    onPress={() =>
                        navigation.state.params.handleAddClick()
                    }
                >
                    <Image source={require('../../Assets/icons/plus-1.png')} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>

            </View>
        ),
        headerBackTitle: null,
        headerLeftContainerStyle: {
            paddingLeft: 23
        },
    })

    addClickHandler = () => {
        this.setState({
            addClicked: !this.state.addClicked
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.news !== prevState.news) {
            return {
                newsData: nextProps.news,
            }
        }
    }

    async componentDidMount() {
        this.props.navigation.setParams({
            handleAddClick: this.addClickHandler

        });
        const feedParams = {
            "arrayFilters": [{
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
        var feeds = await newsFeedList(feedParams);
        if (feeds) {
            await this.props.getFeeds(feeds);
        } else {
            console.log('failure');
        }
        const newsParams = {
            "arrayFilters": [
                {
                    "is_active": 1,
                    "is_deleted": 0
                }
            ],
            "selectFilters": [],
            "sort": {
                "field": "id",
                "sortOrder": "ASC"
            },
            "paginate": {
                "page": 0,
                "limit": 3
            }
        }
        var news = await newsList(newsParams);
        if (news) {
            await this.props.getNews(news);
        } else {
            Alert.alert('Oops! something went wrong.');
        }
    }

    getMoreNews = async () => {
        await this.setState({
            newsActivePage: this.state.newsActivePage + 1
        })
        const getNewsParams = {
            "arrayFilters": [
                {
                    "is_active": 1,
                    "is_deleted": 0
                }
            ],
            "selectFilters": [],
            "sort": {
                "field": "id",
                "sortOrder": "ASC"
            },
            "paginate": {
                "page": this.state.newsActivePage,
                "limit": 3
            }
        }
        var news = await newsList(getNewsParams);
        if (news) {
            if (news.length !== 0) {
                await this.props.getNews(news);
            } else {
                this.setState({
                    endOfnews: true
                }, () => {
                    Platform.OS === 'android' ? ToastAndroid.show('No more news found', ToastAndroid.SHORT) : null
                })
            }
        } else {
            Alert.alert('Oops! something went wrong.');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent={false} backgroundColor={'#232739'} />
                <View>
                    <FlatList
                        data={this.state.newsData}
                        renderItem={({ item }) =>
                            <View style={styles.newsContainer} key={item.id}>
                                <View style={styles.newsCardHeader}>
                                    <View style={{ flex: 0 }}>
                                        <Image source={{ uri: item.user.user_avatar }} style={styles.newsAvatar} />
                                    </View>
                                    <View style={{ flex: 1, marginLeft: 10 }}>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#232F44' }}>{item.user.name}</Text>
                                    </View>
                                    <View style={{ flex: 0, alignItems: 'flex-end' }}>
                                        <Text style={{ color: '#9c9bb2', fontSize: 8 }}>
                                            {
                                                moment(item.updated_at).fromNow()
                                            }
                                        </Text>
                                    </View>
                                </View>
                                <TouchableWithoutFeedback style={{ alignItems: 'center', }}
                                    onPress={() => this.props.navigation.navigate('NewsDetails', { "data": item })}
                                >
                                    <Image source={{ uri: item.cover_image }} style={{ width: '100%', height: 230 }} />
                                </TouchableWithoutFeedback>
                                <View style={{ padding: 14 }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#232F44' }}>
                                        {item.title}
                                    </Text>
                                </View>
                            </View>
                        }
                        ListHeaderComponent={() => {
                            return <View>
                                <View style={styles.headerContainer}>
                                    <Text style={styles.newsHeader}>SALES NEWS</Text>
                                </View>
                                <FeedsList navigation={this.props.navigation} />
                            </View>
                        }}
                        ListFooterComponent={() => {
                            return !this.state.endOfnews
                                ? <View style={{ ...styles.newsContainer, height: 330, justifyContent: 'center' }}>
                                    {Platform.OS === 'android'
                                        ? <ProgressBarAndroid />
                                        : <ProgressViewIOS />
                                    }
                                </View>
                                : null
                        }}
                        keyExtractor={(item, id) => id.toString()}
                        onEndReached={() => !this.state.endOfnews ? this.getMoreNews() : null}
                        onEndReachedThreshold={0.2}
                    />
                </View>
                <AddModal visible={this.state.addClicked} addClickHandler={this.addClickHandler} myProps={this.props.navigation} />
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F1F8',
        padding: 5
    },
    headerContainer: {
        padding: 15,
        paddingTop: 30
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