import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ProgressBarAndroid, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { AppContainer } from '../../Navigation/MainTabNavigator/MyPipeline/myPipelineLeadInfoTabNavigator/index';
import LeadStepper from '../../Components/stepper';


export default class LeadInfoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.navigation.getParam('data'),
            seeMore: false,
            value: '',
            stepperData: [{
                duration: '2',
                unit: 'Hrs'
            }, {
                duration: '4',
                unit: 'Days'
            }, {
                duration: '6',
                unit: 'Hrs'
            }, {
                duration: '8',
                unit: 'Days'
            }],
            otherData: [{
                key: 'Name of project or services',
                value: 'IoT project'
            },
            {
                key: 'Company',
                value: 'Moog'
            }, {
                key: 'Expected closing date',
                value: '2018-01-01'
            },

            {
                key: 'Value of sales',
                value: '2.5 million EUR'
            }, {
                key: 'Contact person name',
                value: 'John Watson'
            },
            {
                key: 'Contact person phone number',
                value: '986753251'
            },
            {
                key: 'Notes',
                value: 'lorem ipsum denis chipsum kripsum'
            }]
        };

    }

    render() {
        return (

            <View style={styles.container}>
                <ScrollView>
                    {
                        !this.state.seeMore
                            ? <View
                                style={{
                                    backgroundColor: '#FFFFFF',
                                    flexDirection: 'row',
                                    padding: 15,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#EBEBEF',

                                }}
                            >
                                <View style={{ flex: 1, justifyContent: 'center', paddingRight: 10 }}>
                                    <View>
                                        <Text style={{ fontSize: 15, color: '#2A2F47', fontWeight: 'bold' }}>{this.state.data.lead_title}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ alignSelf: 'flex-start' }}>{this.state.data.contact_company.company_name}</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ alignSelf: 'flex-end' }}>{this.state.data.lead_status.name}</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={this.state.data.progress} color="#00AE48" />
                                    </View>
                                </View>
                            </View >
                            : <View style={{ backgroundColor: '#FFFFFF', flexDirection: 'column' }}>
                                {
                                    this.state.data.lead_status_logs.length > 1
                                        ? <View style={{ flex: 4, backgroundColor: '#FFFFFF', padding: 10, borderBottomWidth: 1, borderBottomColor: '#EBEBEF' }}>
                                            <View style={{ flexDirection: 'row', paddingRight: 5 }}>
                                                <Text style={{ fontSize: 14, color: '#2A2F47', fontWeight: 'bold', width: '35%' }}>Pipeline Stage</Text>
                                                <Text style={{ fontSize: 13, color: '#2A2F47', fontWeight: 'normal', marginLeft: 10 }}>{this.state.data.lead_status.name}</Text>
                                            </View>
                                            <LeadStepper stepperData={this.state.stepperData} />

                                            {
                                                this.props.navigation.getParam('data')['status'] == 'Closed' ?
                                                    <View style={{ marginTop: 15 }} >
                                                        <TouchableOpacity style={{ ...styles.ringTheBell, marginTop: 15, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} >
                                                            <Image source={require('../../Assets/icons/forma-1.png')} style={{ width: 12, height: 12, marginRight: 5 }} />
                                                            <Text style={[styles.customText, { color: 'white', fontWeight: 'normal' }]}>Ring the bell</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    : null
                                            }
                                        </View>
                                        : null
                                }
                                <View style={{ flex: 1, padding: 15, borderBottomWidth: 1, borderBottomColor: '#EBEBEF' }}>
                                    <View style={{ flex: 1, flexDirection: 'row', paddingRight: 5 }}>
                                        <Text style={styles.textKey}>Name of project or services</Text>
                                        <Text style={styles.textValue}>{this.state.data.lead_title}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, padding: 15, borderBottomWidth: 1, borderBottomColor: '#EBEBEF' }}>
                                    <View style={{ flex: 1, flexDirection: 'row', paddingRight: 5 }}>
                                        <Text style={styles.textKey}>Company</Text>
                                        <Text style={styles.textValue}>{this.state.data.contact_company.company_name}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, padding: 15, borderBottomWidth: 1, borderBottomColor: '#EBEBEF' }}>
                                    <View style={{ flex: 1, flexDirection: 'row', paddingRight: 5 }}>
                                        <Text style={styles.textKey}>Expected closing date</Text>
                                        <Text style={styles.textValue}>{this.state.data.expected_closing_date}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, padding: 15, borderBottomWidth: 1, borderBottomColor: '#EBEBEF' }}>
                                    <View style={{ flex: 1, flexDirection: 'row', paddingRight: 5 }}>
                                        <Text style={styles.textKey}>Value of sales</Text>
                                        <Text style={styles.textValue}>{this.state.data.lead_value}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, padding: 15, borderBottomWidth: 1, borderBottomColor: '#EBEBEF' }}>
                                    <View style={{ flex: 1, flexDirection: 'row', paddingRight: 5 }}>
                                        <Text style={styles.textKey}>Contact person name</Text>
                                        <Text style={styles.textValue}>{this.state.data.contact_person.name}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, padding: 15, borderBottomWidth: 1, borderBottomColor: '#EBEBEF' }}>
                                    <View style={{ flex: 1, flexDirection: 'row', paddingRight: 5 }}>
                                        <Text style={styles.textKey}>Contact person phone number</Text>
                                        <Text style={styles.textValue}>{this.state.data.contact_person.phone_number}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, padding: 15, borderBottomWidth: 1, borderBottomColor: '#EBEBEF' }}>
                                    <View style={{ flex: 1, flexDirection: 'row', paddingRight: 5 }}>
                                        <Text style={styles.textKey}>Notes</Text>
                                        <Text style={styles.textValue}>{this.state.data.notes}</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: "stretch" }}>
                                    <View style={styles.button}>
                                        <TouchableOpacity style={{ ...styles.captureButtons, backgroundColor: '#2A2F47' }} onPress={() => this.props.navigation.navigate('AddLead', { 'data': this.state.otherData, 'isUpdate': true, 'stepperData': this.state.stepperData })}>
                                            <Text style={{ ...styles.customText, color: '#FFFFFF', marginLeft: 10 }}>Update</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                    }
                    <View style={styles.seeMoreTabContainer}>
                        <TouchableOpacity style={styles.seeMore} onPress={() => this.setState({ seeMore: !this.state.seeMore })}>
                            <Text style={{ fontSize: 12, color: '#232F44' }}>Show {!this.state.seeMore ? 'more' : 'less'} details</Text>
                            {
                                !this.state.seeMore
                                    ? <Image source={require('../../Assets/icons/arrow-down-1.png')} style={{ width: 12, height: 12, marginLeft: 5 }} />
                                    : <Image source={require('../../Assets/icons/arrow-up-1.png')} style={{ width: 12, height: 12, marginLeft: 5 }} />
                            }

                        </TouchableOpacity>
                    </View>
                    {/* <View style={styles.tabContainer}>
                        <AppContainer />
                    </View> */}
                </ScrollView>
            </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F1F8',
    },
    seeMoreTabContainer: {
        padding: 10,
    },
    tabContainer: {
        marginTop: 25,
        minHeight: 400,
        justifyContent: 'space-around',


    },
    seeMore: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14,
        backgroundColor: '#FFFFFF',
        borderRadius: 3,

    },
    buttonIcons: {
        width: 13,
        height: 13
    },
    customText: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 12
    },
    button: {

        padding: 10,

        justifyContent: "center",

    },
    captureButtons: {
        padding: 10,
        flexDirection: "row",
        borderRadius: 5,
        justifyContent: "center",
        height: 50,
        alignItems: "center",
    },
    textKey: {
        fontSize: 13,
        fontFamily: 'OpenSans-Regular',
        color: '#273344',
        fontWeight: '600',
        width: '35%'
    },
    textValue: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'OpenSans-Regular',
        color: '#273344',
        fontWeight: 'normal',
        flexWrap: 'wrap',
        marginLeft: '3%',
        alignSelf: 'center'
    },
    ringTheBell: {
        backgroundColor: '#51b660',
        borderRadius: 4,
        padding: 14
    }

})