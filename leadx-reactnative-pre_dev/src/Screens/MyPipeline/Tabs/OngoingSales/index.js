import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ProgressBarAndroid,
    ProgressViewIOS,
    TextInput,
    ScrollView,
    Platform
} from 'react-native';
import LeadTabComponent from '../../../../Components/leadTab';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getLeadsList } from '../../../../Networking/API/myPipeline/piplineAPI';
import { ongoingTabControl, setOngoingLeads, refresh } from '../../dispatcher';
import AsyncStorage from '@react-native-community/async-storage';


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ ongoingTabControl, setOngoingLeads, refresh }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        pipelineLeadList: state.pipeline.ongoingLeadsList,
        refreshAll: state.pipeline.refreshAll
    }
}

class OngoingSalesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterExpanded: false,
            leadList: this.props.pipelineLeadList ? this.props.pipelineLeadList : [],
            refresh: this.props.refreshAll ? this.props.refreshAll : false
        }
        this.newLeadClicked = this.newLeadClicked.bind(this);
        this.infoTabClicked = this.infoTabClicked.bind(this);
    }

    async componentDidMount() {
        await this.getMyPipelineOngoingData();
    }

    getMyPipelineOngoingData = async () => {
        var userId = await AsyncStorage.getItem('userId').then((value) => {
            return parseInt(value);
        });

        const ongoingSales = {
            "arrayFilters": [
                {}
            ],
            "selectFilters": [
                "id",
                "lead_title",
                "expected_closing_date",
                "lead_value",
                "is_confidential",
                "notes"
            ],
            "sort": {
                "field": "id",
                "sortOrder": "ASC"
            },
            "paginate": {
                "page": 0,
                "limit": 50
            },
            "from": "my_pipeline",
            "user_id": userId
        }

        var leadList = await getLeadsList(ongoingSales);
        if (leadList) {
            await this.props.setOngoingLeads(leadList.rows);
        } else {
            console.log('ERROR:', err);
        }
        this.props.refresh(false);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.pipelineLeadList !== prevState.pipelineLeadList || nextProps.refreshAll !== prevState.refreshAll) {
            return {
                leadList: nextProps.pipelineLeadList,
                refresh: nextProps.refreshAll
            }
        }
    }

    async componentDidMount() {
        const ongoingSales = {
            "arrayFilters": [
                {}
            ],
            "selectFilters": [
                "id",
                "lead_title",
                "expected_closing_date",
                "lead_value",
                "is_confidential",
                "notes"
            ],
            "sort": {
                "field": "id",
                "sortOrder": "ASC"
            },
            "paginate": {
                "page": 0,
                "limit": 24
            }
        }

        var leadList = await getLeadsList(ongoingSales);
        if (leadList) {
            await this.props.setOngoingLeads(leadList.rows);
        } else {
            console.log('ONGOINGERROR:', err);
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.pipelineLeadList !== prevState.pipelineLeadList) {
            return {
                leadList: nextProps.pipelineLeadList
            }
        }
    }

    newLeadClicked() {
        this.props.screenProps.navigate('AddLead');
    }

    infoTabClicked(item) {
        this.props.screenProps.navigate('LeadInfo', { 'data': item });
    }

    render() {
        const didBlurSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                var activeTabIndex = 0;
                this.getMyPipelineOngoingData();
                this.props.ongoingTabControl({ 'index': activeTabIndex, 'length': this.state.leadList.length });
            }
        );

        if (this.state.leadList.length !== 0) {
            var activeTabIndex = 0;
            this.props.ongoingTabControl({ 'index': activeTabIndex, 'length': this.state.leadList.length });
        }

        if (this.state.refresh) {
            this.getMyPipelineOngoingData();
        }
        const tabs = this.state.leadList.map((item, index) => {
            return (
                <LeadTabComponent item={item} navigationOn={true} key={index} tabClicked={this.infoTabClicked} />
            )
        })
        return (
            <ScrollView style={styles.mainContainer} contentContainerStyle={{ flex: 2 }} >
                <View style={{ padding: 15, paddingBottom: 10 }}>
                    <TouchableOpacity style={{ ...styles.captureButtons, backgroundColor: '#2A2F47' }} onPress={() => this.newLeadClicked()}>
                        <Image source={require('../../../../Assets/icons/plus.png')} style={styles.buttonIcons} />
                        <Text style={{ ...styles.customText, color: '#FFFFFF', marginLeft: 5 }}>Capture New Lead</Text>
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
                {tabs}
            </ScrollView >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OngoingSalesScreen)

const styles = StyleSheet.create({
    mainContainer: {
        // flex: 1,
        backgroundColor: '#F1F1F8'
    },
    customText: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 12
    },
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
        borderColor: '#00804A',
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