import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ActivityList from '../../../../Components/EventsList';
const dataSource = [
    {
        date: "26 January,2018",
        content: [
            {
                "time": "12:00",
                "title": "phone call",
                "type": "remainder",
                "Name": "John Watson",
                "companyName": "Telenor"
            },
            {
                "title": "Prepare for workshop with telenor",
                "type": "checklist"
            },

        ],
    },
    {
        date: "27 January,2018",
        content:
            [
                {
                    "time": "10:00",
                    "title": "Meeting",
                    "type": "meeting",
                    "Name": "John Watson",
                    "companyName": "Telenor"

                },
                {
                    "title": "phone call",
                    "type": "checklist"
                },

            ]
    }

];



export default class PlannedEventScreen extends Component {
    constructor(props) {
        super(props)

    }
    
    newLeadClicked(){
        
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', padding: 15, }}>
                    <View style={styles.button}>
                        <TouchableOpacity style={{ ...styles.captureButtons, backgroundColor: '#2A2F47' }} onPress={() => this.newLeadClicked()}>
                            <Image source={require('../../../../Assets/icons/plus.png')} style={styles.buttonIcons} />
                            <Text style={{ ...styles.customText, color: '#FFFFFF', marginLeft: 10 }}>Add new sales activity</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity style={{ ...styles.captureButtons, backgroundColor: '#2A2F47' }} onPress={() => this.newLeadClicked()}>
                            <Image source={require('../../../../Assets/icons/plus.png')} style={styles.buttonIcons} />
                            <Text style={{ ...styles.customText, color: '#FFFFFF', marginLeft: 7 }}>Add new task</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{}}>
                    <ActivityList data={dataSource} />
                </View>
            </View>

        );



    }




}
const styles = StyleSheet.create({

    captureButtons: {
        padding: 5,
        flexDirection: "row",
        borderRadius: 5,
        justifyContent: "center",
        height: 50,
        alignItems: "center",
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
        width: 180,
        padding: 2,
    },
   

})