import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { LeadInfoTabs } from '../../../../Navigation/MainTabNavigator/MyPipeline/myPipelineLeadInfoTabNavigator';
import LeadTabComponent from '../../../../Components/leadTab';
import { getLeadList } from '../../../../Networking/API/Lead/leadApi';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLeadListData, ongoingTabControl } from '../../dispatcher';
import AsyncStorage from '@react-native-community/async-storage';

const mapStateToProps = (state) => {
    return {
        salesLeadList: state.salesCommunity.salesLeadList
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getLeadListData, ongoingTabControl }, dispatch)
}

class SalesCommunityOngoingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterExpanded: false,
            salesLeadList: this.props.salesLeadList ? this.props.salesLeadList : []
        }
        this.newLeadClicked = this.newLeadClicked.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.salesLeadList !== prevState.salesLeadList) {
            return {
                salesLeadList: nextProps.salesLeadList,
            }
        }
    }

    leadTabClicked = (item) => {
        this.props.screenProps.navigate('SalesLeadInfo', { 'data': item });
    }

    async componentDidMount() {
        var userId = await AsyncStorage.getItem('userId').then((value) => {
            return parseInt(value);
        });

        const params = {
            "arrayFilters": [
                {

                }
            ],
            "selectFilters": ["id", "lead_title", "expected_closing_date", "lead_value", "is_confidential", "notes"],
            "sort": {
                "field": "id",
                "sortOrder": "ASC"
            },
            "paginate": {
                "page": 0,
                "limit": 50
            },
            "from": "sales_community",
            "user_id": userId
        }
        var salesLeads = await getLeadList(params);

        if (salesLeads) {
            await this.props.getLeadListData(salesLeads.rows);
        } else {
            console.log('something went wrong');
        }
    }

    newLeadClicked() {
        this.props.screenProps.navigate('AddLead');
    }

    render() {
        const didBlurSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                var activeTabIndex = 0;
                this.props.ongoingTabControl({ 'index': activeTabIndex, 'length': this.state.salesLeadList.length });
            }
        );
        if (this.state.salesLeadList.length !== 0) {
            var activeTabIndex = 0;
            this.props.ongoingTabControl({ 'index': activeTabIndex, 'length': this.state.salesLeadList.length });
        }

        return (
            <ScrollView style={styles.mainContainer} contentContainerStyle={{ flex: 2 }} >
                <View style={{ padding: 15, paddingBottom: 10 }}>
                    <TouchableOpacity style={{ ...styles.captureButtons, backgroundColor: '#2A2F47' }} onPress={() => this.newLeadClicked()}>
                        <Image source={require('../../../../Assets/icons/plus.png')} style={styles.buttonIcons} />
                        <Text style={{ ...styles.customText, color: '#FFFFFF', marginLeft: 5 }}>Capture new lead</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ padding: 5, paddingTop: 0, paddingBottom: 10 }}>
                    <View style={{ backgroundColor: '#FFFFFF' }}>
                        <TouchableOpacity style={{ ...styles.captureButtons }} onPress={() => { this.setState({ filterExpanded: !this.state.filterExpanded }) }}>
                            <Text style={{ ...styles.customText, color: '#000000', marginRight: 5 }}>Filter</Text>
                            {
                                this.state.filterExpanded === true
                                    ? <Image source={require('../../../../Assets/icons/arrow-up.png')} style={styles.buttonIcons} />
                                    : <Image source={require('../../../../Assets/icons/arrow-down.png')} style={styles.buttonIcons} />
                            }
                        </TouchableOpacity>
                        {
                            this.state.filterExpanded === true
                                ? <View style={{ padding: 12 }}>
                                    <Text style={styles.customText}>Filter by stages</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <TouchableOpacity style={styles.filterTabs}>
                                            <Text style={{ ...styles.customText, fontSize: 14, color: '#00804A' }}>Lead</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.filterTabs}>
                                            <Text style={{ ...styles.customText, fontSize: 14, color: '#00804A' }}>Opportunity</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.filterTabs}>
                                            <Text style={{ ...styles.customText, fontSize: 14, color: '#00804A' }}>Proposal</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <TouchableOpacity style={styles.filterTabs}>
                                            <Text style={{ ...styles.customText, fontSize: 14, color: '#00804A' }}>Negotiation</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.filterTabs}>
                                            <Text style={{ ...styles.customText, fontSize: 14, color: '#00804A' }}>Closed</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{ ...styles.customText, marginTop: 11 }}>Search by keyword</Text>
                                    <View style={{ marginTop: 5 }}>
                                        <TextInput placeholder="Enter keyword" style={styles.filerSearchBox}></TextInput>
                                    </View>
                                    <View style={{ marginTop: 15 }}>
                                        <TouchableOpacity style={styles.filterSearchButton}>
                                            <Text style={{ ...styles.customText, color: '#FFFFFF' }}>Search</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                : null
                        }
                    </View>
                </View>
                <View>
                    {
                        this.state.salesLeadList.map((item, index) => {
                            return (
                                <LeadTabComponent item={item} navigationOn={true} key={index} tabClicked={this.leadTabClicked} />
                            )
                        })
                    }
                </View>
            </ScrollView>
        )
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(SalesCommunityOngoingScreen);

const styles = StyleSheet.create({
    captureButtons: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonIcons: {
        width: 13,
        height: 13
    },
    filterTabs: {
        padding: 25,
        paddingTop: 11,
        paddingBottom: 11,
        borderWidth: 1,
        borderColor: '#3f9e53',
        borderRadius: 5,
        marginRight: 5
    },
    filerSearchBox: {
        borderWidth: 1,
        borderColor: '#EBEBF0',
        borderRadius: 5,
        padding: 15
    },
    filterSearchButton: {
        backgroundColor: '#2A2F47',
        alignItems: 'center',
        padding: 15,
        justifyContent: 'center',
        borderRadius: 5
    }
})