import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, StatusBar, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import AddModal from '../../Components/addModal';
import { AppContainer } from '../../Navigation/MainTabNavigator/SalesCommunity/SalesTabNavigator/index';
import LeadTabComponent from '../../Components/leadTab';
import { getRevenueTotalData } from '../../Networking/API/commonAPI';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRevenueTotal } from './dispatcher';


const mapStateToProps = (state) => {
    return {
        revenueTotalData: state.salesCommunity.revenueTotalData,
        salesActiveTabIndex: state.salesCommunity.salesActiveTabIndex,
        salesOngoinglength: state.salesCommunity.salesOngoinglength,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getRevenueTotal }, dispatch)
}


class SalesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addClicked: false,
            activeTabIndex: this.props.salesActiveTabIndex,
            ongoingTabLength: this.props.salesOngoinglength,
            revenueTotalListData: this.props.revenueTotalData ? this.props.revenueTotalData : {},
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.revenueTotalData !== prevState.revenueTotalData
            || nextProps.salesActiveTabIndex !== prevState.salesActiveTabIndex
            || nextProps.salesOngoinglength !== prevState.salesOngoinglength) {
            return {
                revenueTotalListData: nextProps.revenueTotalData,
                activeTabIndex: nextProps.salesActiveTabIndex,
                ongoingTabLength: nextProps.salesOngoinglength,
            }
        }
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

    addClickHandler = () => {
        this.setState({
            addClicked: !this.state.addClicked,
        })
    }

    async componentDidMount() {
        this.props.navigation.setParams({
            handleAddClick: this.addClickHandler
        });
        const params = {
            "revenueType": "sales_community"
        }
        var revenueTotal = await getRevenueTotalData(params);
        if (revenueTotal) {
            await this.props.getRevenueTotal(revenueTotal);
            this.setState({
                loading: false
            })
        } else {
            Alert.alert('Oops! something went wrong.');
        }

    }

    render() {
        if (this.state.activeTabIndex === 0) {
            var length = (this.state.ongoingTabLength * 130) + 150;
        }

        return (
            <View style={styles.container}>
                <ScrollView >
                    <StatusBar translucent={false} backgroundColor={'#232739'} />
                    <View style={styles.headerContainer}>
                        <Text style={styles.pipeHeader}>SALES COMMUNITY</Text>
                    </View>
                    <ImageBackground source={require('../../Assets/icons/graph.png')} style={styles.profileContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 15 }}>
                                <Text style={styles.profileName}>{this.state.revenueTotalListData.account ? this.state.revenueTotalListData.account.name : null}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 23 }}>
                            <View style={styles.infoTextContainer}>
                                <Text style={{ ...styles.customText, fontSize: 36, color: '#00C854' }}>{this.state.revenueTotalListData.revenue}</Text>
                                <Text style={{ ...styles.customText, fontSize: 12 }}>Revenue, {this.state.revenueTotalListData.account ? this.state.revenueTotalListData.account.currency.short_name : ''}</Text>
                            </View>
                            <View style={styles.infoTextContainer}>
                                <Text style={{ ...styles.customText, fontSize: 36, color: '#00C854' }}>{this.state.revenueTotalListData ? this.state.revenueTotalListData.leadsTotal : ''}</Text>
                                <Text style={{ ...styles.customText, fontSize: 12 }}>Leads total</Text>
                            </View>
                            <View style={styles.infoTextContainer}>
                                <Text style={{ ...styles.customText, fontSize: 36, color: '#00C854' }}>{this.state.revenueTotalListData ? this.state.revenueTotalListData.hitRate : ''}</Text>
                                <Text style={{ ...styles.customText, fontSize: 12 }}>Hit rate, %</Text>
                            </View>
                        </View>
                        {/* <View style={styles.floatingBox}>
                        <Text style={{ ...styles.customText, fontSize: 16, color: '#FFFFFF' }}>675</Text>
                        <Text style={{ ...styles.customText, color: '#FFFFFF', fontSize: 9 }}>points</Text>
                    </View> */}
                    </ImageBackground>
                    <View style={{ minHeight: length }}>
                        <AppContainer screenProps={this.props.navigation} activeTab={this.handleChnage} />
                    </View>
                    <AddModal visible={this.state.addClicked} addClickHandler={this.addClickHandler} myProps={this.props.navigation} />
                </ScrollView>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesScreen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1F1F8'
    },
    headerContainer: {
        paddingLeft: 16,
        paddingTop: 25,
        paddingBottom: 15
    },
    pipeHeader: {
        fontSize: 20,
        color: '#232f44',
        fontWeight: '800'
    },
    profileContainer: {
        padding: 17,
        backgroundColor: '#FFFFFF',
        paddingBottom: 41,
        marginBottom: 25
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
        color: '#232F44',
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
        minHeight: 700,
        justifyContent: 'space-around'
    },
    infoTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})