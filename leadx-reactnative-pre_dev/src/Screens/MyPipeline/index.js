import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, StatusBar, ImageBackground, TouchableOpacity, RefreshControl } from 'react-native';
import { AppContainer } from '../../Navigation/MainTabNavigator/MyPipeline/myPipelineTopTabNavigator.';
import AddModal from '../../Components/addModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getInfo } from '../../Networking/API/myPipeline/piplineAPI';
import { setPipeInfo, refresh } from './dispatcher';
import AsyncStorage from '@react-native-community/async-storage';
import { tsImportEqualsDeclaration } from '@babel/types';



const mapStateToProps = (state) => {
    return {
        activeTabIndex: state.pipeline.activeTabIndex,
        ongoinglength: state.pipeline.ongoinglength,
        contactLength: state.pipeline.contactLength,
        pipeInfo: state.pipeline.pipelineInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ setPipeInfo, refresh }, dispatch)
}

class PipeHomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addClicked: false,
            activeTabIndex: this.props.activeTabIndex ? this.props.activeTabIndex : 0,
            ongoingTabLength: this.props.ongoinglength ? this.props.ongoinglength : 0,
            contactTabLength: this.props.contactLength ? this.props.contactLength : 0,
            infoData: this.props.pipeInfo ? this.props.pipeInfo : {},
            username: '',
            userAvatar: '',
            refreshing: false
        }
        this.addClickHandler = this.addClickHandler.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <View style={{ flexDirection: 'row', marginBottom: 12, marginTop: 12 }}>
                <TouchableOpacity style={{ padding: 7, backgroundColor: '#3E4561', borderRadius: 5, marginRight: 12 }}
                    onPress={() =>
                        navigation.state.params.handleAddClick()
                    }>
                    <Image source={require('../../Assets/icons/plus-1.png')} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>

            </View>
        ),
    })

    addClickHandler() {
        this.setState({
            addClicked: !this.state.addClicked,
        })
    }

    async componentDidMount() {
        this.props.navigation.setParams({
            handleAddClick: this.addClickHandler
        });

        await this.getData();

        AsyncStorage.getItem('username').then((value) => {
            this.setState({
                username: value
            })
        });
        AsyncStorage.getItem('avatar').then((value) => {
            this.setState({
                userAvatar: value
            })
        })
    }

    getData = async () => {
        const pipeHomeParams = {
            "revenueType": "my_pipeline"
        }

        var info = await getInfo(pipeHomeParams);
        if (info) {
            await this.props.setPipeInfo(info);
        } else {
            console.log('PIPEINFO Failure');
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.activeTabIndex !== prevState.activeTabIndex
            || nextProps.pipeInfo !== prevState.pipeInfo
            || nextProps.ongoinglength !== prevState.ongoinglength
            || nextProps.contactLength !== prevState.contactLength) {
            return {
                activeTabIndex: nextProps.activeTabIndex,
                ongoingTabLength: nextProps.ongoinglength,
                contactTabLength: nextProps.contactLength,
                infoData: nextProps.pipeInfo
            }
        }
    }

    _onRefresh = async () => {
        this.setState({ refreshing: true });
        this.props.refresh(true);
        await this.getData().then(() => {
            this.setState({ refreshing: false });
        });
    }

    render() {
        if (this.state.activeTabIndex === 0) {
            var length = (this.state.ongoingTabLength * 72) + 150;
        } else {
            var length = this.state.contactTabLength * 38;
        }
        return (
            <View style={styles.container}>
                <StatusBar translucent={false} backgroundColor={'#232739'} />
                <ScrollView style={styles.container}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    <View style={styles.headerContainer}>
                        <Text style={styles.pipeHeader}>MY PIPELINE</Text>
                    </View>
                    <ImageBackground source={require('../../Assets/icons/graph.png')} style={styles.profileContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.profileImageContainer}>
                                <Image source={{ uri: this.state.userAvatar }} style={styles.profileImage} />
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 15 }}>
                                <Text style={styles.profileName}>{this.state.username}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 23 }}>
                            <View style={styles.infoTextContainer}>
                                <Text style={{ ...styles.customText, fontSize: 40, color: '#00C854' }}>{this.state.infoData.revenue ? this.state.infoData.revenue : ''}</Text>
                                <Text style={{ ...styles.customText, fontSize: 12 }}>Revenue, <Text>{this.state.infoData.account ? this.state.infoData.account.currency.short_name : ''}</Text></Text>
                            </View>
                            <View style={styles.infoTextContainer}>
                                <Text style={{ ...styles.customText, fontSize: 40, color: '#00C854' }}>{this.state.infoData ? this.state.infoData.leadsTotal : ''}</Text>
                                <Text style={{ ...styles.customText, fontSize: 12 }}>Leads total</Text>
                            </View>
                            <View style={styles.infoTextContainer}>
                                <Text style={{ ...styles.customText, fontSize: 40, color: '#00C854' }}>{this.state.infoData ? this.state.infoData.hitRate : ''}</Text>
                                <Text style={{ ...styles.customText, fontSize: 12 }}>Hit rate, %</Text>
                            </View>
                        </View>
                        {/* <View style={styles.floatingBox}>
                            <Text style={{ ...styles.customText, fontSize: 16, color: '#FFFFFF' }}>675</Text>
                            <Text style={{ ...styles.customText, color: '#FFFFFF', fontSize: 9 }}>points</Text>
                        </View> */}
                    </ImageBackground>
                    <View style={{ ...styles.tabContainer, minHeight: length }}>
                        <AppContainer screenProps={this.props.navigation} />
                    </View>
                </ScrollView>
                <AddModal visible={this.state.addClicked} addClickHandler={this.addClickHandler} myProps={this.props.navigation} />
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PipeHomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F1F8'
    },
    headerContainer: {
        paddingLeft: 16,
        paddingTop: 25,
        paddingBottom: 15
    },
    pipeHeader: {
        fontSize: 20,
        color: '#2A2F47',
        fontWeight: '800'
    },
    profileContainer: {
        padding: 17,
        backgroundColor: '#FFFFFF',
        paddingBottom: 38
    },
    customText: {
        fontFamily: 'OpenSans-Regular'
    },
    floatingStar: {
        width: 18,
        height: 18,
        position: 'absolute',
        right: -8,
        top: -8
    },
    floatingBox: {
        width: 53,
        height: 39,
        padding: 5,
        backgroundColor: '#00C854',
        position: "absolute",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        right: 10,
        top: -15
    },
    profileImageContainer: {
        flex: 0,
        justifyContent: 'center',
        padding: 1,
        borderWidth: 2,
        borderColor: '#FDCA00',
        borderRadius: 5
    },
    profileName: {
        fontSize: 18,
        color: '#2A2F47',
        fontWeight: 'bold',
        fontFamily: 'OpenSans-Regular'
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 5
    },
    tabContainer: {
        marginTop: 25,
        justifyContent: 'space-around'
    },
    infoTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})