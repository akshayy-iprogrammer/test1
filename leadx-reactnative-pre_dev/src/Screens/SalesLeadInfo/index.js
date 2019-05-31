import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import LeadStepper from '../../Components/stepper';
import moment from 'moment';

export default class SalesLeadInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            leadData: props.navigation.getParam('data'),
            stepperData: [],
            lead_status_logs: [{
                created_at: "2019-05-22T13:00:08.000Z",
                lead_status: { name: "New" },
                lead_status_id: 1
            },
            {
                created_at: "2019-05-24T13:00:08.000Z",
                lead_status: { name: "Lead" },
                lead_status_id: 1
            },
         {
                created_at: "2019-05-24T13:00:08.000Z",
                lead_status: { name: "Lead" },
                lead_status_id: 1
            }]
        };
    };

    componentDidMount() {
        let stepperData = this.state.lead_status_logs.map((log, index) => {
            return {
                'duration': moment(log.created_at).fromNow(true).split(' ')[0],
                'unit': moment(log.created_at).fromNow(true).split(' ')[1]
            }
        });
        console.log(stepperData);
        this.setState({ stepperData })
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{ backgroundColor: '#FFFFFF', flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: '#EBEBEF' }}>
                    <View style={{ justifyContent: 'center', paddingRight: 10, width: '35%' }}>
                        <Text style={{ fontSize: 13, fontFamily: 'OpenSans-Regular', color: '#2A2F47', fontWeight: 'bold' }}>Sales {'\n'}Representative</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Image source={{ uri: this.state.leadData.createdBy.user_avatar }} style={{ width: 30, height: 30, marginRight: 10, marginLeft: 10, overflow: 'hidden', borderRadius: 5 }} />
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Regular', color: '#232F44', fontWeight: 'normal' }}>{this.state.leadData.createdBy.name}</Text>
                            <Text style={{ flex: 1, fontSize: 12, fontFamily: 'OpenSans-Regular', color: '#9c9bb2', fontWeight: 'normal', }}>Sales Representative</Text>
                        </View>
                    </View>

                </View>

                <View style={{ backgroundColor: '#FFFFFF', padding: 15, borderBottomWidth: 1, borderBottomColor: '#EBEBEF' }}>
                    <View style={{ flex: 1, flexDirection: 'row', paddingRight: 5 }}>
                        <Text style={styles.textKey}>Pipeline Stage</Text>
                        <Text style={styles.textValue}>{this.state.leadData.lead_status.name}</Text>
                    </View>
                    <LeadStepper stepperData={this.state.stepperData} />

                </View>

                <View style={{ backgroundColor: '#FFFFFF', padding: 15, borderBottomWidth: 1, borderBottomColor: '#EBEBEF' }}>
                    <View style={{ flex: 1, flexDirection: 'row', paddingRight: 5 }}>
                        <Text style={styles.textKey}>Name of project or services</Text>
                        <Text style={styles.textValue}>{this.state.leadData.lead_title}</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: '#FFFFFF', padding: 15, borderBottomWidth: 1, borderBottomColor: '#EBEBEF' }}>
                    <View style={{ flex: 1, flexDirection: 'row', paddingRight: 5 }}>
                        <Text style={styles.textKey}>Company</Text>
                        <Text style={styles.textValue}>{this.state.leadData.contact_company.company_name}</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: '#FFFFFF', padding: 15, borderBottomWidth: 1, borderBottomColor: '#EBEBEF' }}>
                    <View style={{ flex: 1, flexDirection: 'row', paddingRight: 5 }}>
                        <Text style={styles.textKey}>Project will take place in</Text>
                        <Text style={styles.textValue}>{this.state.leadData.contact_company.country.name}</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: '#FFFFFF', padding: 15, borderBottomWidth: 1, borderBottomColor: '#EBEBEF' }}>
                    <View style={{ flex: 1, flexDirection: 'row', paddingRight: 5 }}>
                        <Text style={styles.textKey}>Expected closing date</Text>
                        <Text style={styles.textValue}>{this.state.leadData.expected_closing_date}</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: '#FFFFFF', padding: 15, borderBottomWidth: 1, borderBottomColor: '#EBEBEF' }}>
                    <View style={{ flex: 1, flexDirection: 'row', paddingRight: 5 }}>
                        <Text style={styles.textKey}>Value of sales</Text>
                        <Text style={styles.textValue}>{this.state.leadData.lead_status.name}</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: '#FFFFFF', padding: 15, borderBottomWidth: 1, borderBottomColor: '#EBEBEF' }}>
                    <View style={{ flex: 1, flexDirection: 'row', paddingRight: 5 }}>
                        <Text style={styles.textKey}>Sales team</Text>
                        <Text style={styles.textValue}>-</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#ffffff' },
    textKey: { fontSize: 13, fontFamily: 'OpenSans-Regular', color: '#273344', fontWeight: '600', width: '35%' },
    textValue: { flex: 1, fontSize: 14, fontFamily: 'OpenSans-Regular', color: '#273344', fontWeight: 'normal', flexWrap: 'wrap', marginLeft: '3%', alignSelf: 'center' }
})