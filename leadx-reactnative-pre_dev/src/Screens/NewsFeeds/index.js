import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ToastAndroid, ImageBackground, Image, Alert, ProgressBarAndroid, ProgressViewIOS, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newsFeedList } from '../../Networking/API/newsAPI';
import { getFeeds } from './dispatcher';
import AddModal from '../../Components/addModal';
import moment from 'moment';


const mapStateToProps = (state) => {
    return {
        feedsDataSource: state.feeds.feedsList
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getFeeds }, dispatch)
}

class NewsFeedsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addClicked: false,
            feedsActivePage: 0,
            feedsData: this.props.feedsDataSource ? this.props.feedsDataSource : [],
            endOfFeeds: false
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#2A2F47',
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
    })

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.feedsDataSource !== prevState.feedsDataSource) {
            return {
                feedsData: nextProps.feedsDataSource
            }
        }
    }

    addClickHandler = () => {
        this.setState({
            addClicked: !this.state.addClicked,
        })
    }

    async componentDidMount() {
        this.props.navigation.setParams({
            handleAddClick: this.addClickHandler
        });

        this.getMoreFeeds(0);
    }

    getMoreFeeds = async (pageNumber) => {
        pageNumber = (pageNumber === undefined) ? this.state.feedsActivePage + 1 : pageNumber;
        await this.setState({
            feedsActivePage: pageNumber
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
                "limit": 12
            }
        }
        var feeds = await newsFeedList(getFeedParams);
        if (feeds) {
            if (feeds.length !== 0) {
                await this.props.getFeeds(feeds);
            } else {
                await this.setState({
                    endOfFeeds: true
                }, () => {
                    Platform.OS === 'android' ? ToastAndroid.show('No more feeds found', ToastAndroid.SHORT) : null
                })
            }
        } else {
            Alert.alert('Oops! Something went wrong.');
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.feedsData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        item.action_type == '1'
                            ? <TouchableOpacity
                                key={item.id}
                                style={{ overflow: 'hidden', flexDirection: 'row', borderRadius: 4, marginBottom: 5 }}
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

                            : <TouchableOpacity key={item.id}
                                style={{ overflow: 'hidden', flexDirection: 'row', backgroundColor: '#232f44', borderRadius: 4, marginBottom: 5 }}
                            >
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
                    ListHeaderComponent={() => {
                        return <View>
                            <View style={styles.headerContainer}>
                                <Text style={styles.newsHeader}>SALES NEWS</Text>
                            </View>
                        </View>
                    }}
                    ListFooterComponent={() => {
                        return !this.state.endOfFeeds
                            ? <View style={{ alignItems: 'center', justifyContent: 'center', height: 72, backgroundColor: '#FFFFFF', borderRadius: 4, marginTop: 5 }}>
                                {
                                    Platform.OS === 'android'
                                        ? <ProgressBarAndroid />
                                        : <ProgressViewIOS />
                                }
                            </View>
                            : null
                    }}
                    onEndReached={async () => {
                        !this.state.endOfFeeds && await this.getMoreFeeds();
                    }}
                    onEndReachedThreshold={0.1}
                />
                <AddModal visible={this.state.addClicked} addClickHandler={this.addClickHandler} myProps={this.props.navigation} />
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedsScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F1F7',
        padding: 5
    },
    headerContainer: {
        paddingLeft: 16,
        paddingTop: 25,
        paddingBottom: 15,
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