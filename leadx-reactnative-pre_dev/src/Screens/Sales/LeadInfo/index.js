import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView,TouchableOpacity,Image } from 'react-native';
import LeadStepper from '../../../Components/LeadStepper';

export default class SalesLeadInfo extends Component{

    constructor() {
        super();

        this.state = {
          value: '',
          stepperData : [{
             duration: '2',
             unit: 'Hrs'
          },{
            duration: '4',
            unit: 'Days'
          },{
            duration: '6',
            unit: 'Hrs'
          },{
            duration: '8',
            unit: 'Days'
          },{
            duration: '3',
            unit: 'Months'
          }],
          otherData : [{
            key: 'Name of project or services',
            value: 'IoT project'
          },
          {
            key: 'Company',
            value: 'Moog'
          },{
            key: 'Project wil take place in',
            value: 'Vilnius, Lithuania'
          },
          {
            key: 'Expected closing date',
            value: 'January 31, 2019'
          },
          {
            key: 'Value of sales',
            value: '2.5 million EUR'
          },{
            key: 'Sales team',
            value: 'Project manager Rolandas Glemža Architect Vaidotas Zebkus'
          }]
        };
    };
  
    render(){
        return(
            <ScrollView style={styles.container}>
                <View style={{ backgroundColor: '#FFFFFF', flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: '#EBEBEF' }}>
                    
                    <View style={{justifyContent: 'center', paddingRight: 10,width : '35%' }}>
                        <View>
                            <Text style={{ fontSize: 14, color: '#2A2F47', fontWeight:'bold' }}>Sales {'\n'}Representative</Text>
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row'}}> 
                        <Image source={require('../../../Assets/icons/contact-profile.png')} style={{ width: 40, height: 40, marginRight : 10, marginLeft: 10 }} />
                        <Text style={{ fontSize: 13, color: '#232F44', fontWeight:'normal',alignSelf: 'center' }}>Rohit B</Text>
                    </View>
                    
                </View>

                <View style={{ backgroundColor: '#FFFFFF', padding: 10, borderBottomWidth: 1, borderBottomColor: '#EBEBEF' }}>
                  
                   <View style={{ flex: 1, flexDirection: 'row',  paddingRight: 5 }}>                      
                          <Text style={{ fontSize: 14, color: '#2A2F47', fontWeight:'bold',width : '35%' }}>Pipeline Stage</Text>
                          <Text style={{ fontSize: 13, color: '#2A2F47', fontWeight:'normal' ,marginLeft : 10}}>Negotiation </Text>
                  </View>
                  <LeadStepper stepperData = {this.state.stepperData}/>
                </View>
                
                { this.state.otherData.map((data,index) =>
                    {
                    return (
                            <View style={{ backgroundColor: '#FFFFFF', padding: 15, borderBottomWidth: 1, borderBottomColor: '#EBEBEF' }}>
                            <View style={{ flex: 1, flexDirection: 'row'}}>                      
                                    <Text style={{ fontSize: 11, color: '#2A2F47', fontWeight:'bold',width : '35%' }}>{data.key}</Text>
                                    <Text style={{ flex:1, fontSize: 12, color: '#2A2F47', fontWeight:'normal',flexWrap: 'wrap' }}>{data.value} </Text>
                            </View>
                            </View> 
                          )
                    })
                }
                
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    infoTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    base: {

    },
    baseTop: {
        borderLeftWidth: 35,
        borderLeftColor: 'red',
        borderTopWidth: 50,
        borderTopColor: 'transparent',
        borderBottomWidth: 50,
        borderBottomColor: 'transparent',
        height: 0,
        width: 0,
        left: 0,
        right: -35,
        position: 'absolute',
    },
    baseBottom: {
      backgroundColor: 'red',
      marginRight: 0,
      height: 50,
      width: 50
    },
    triangle: {
        width: 8,
        height: 50,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 27,
        borderRightWidth: 27,
        borderBottomWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor:"red",
        transform: [
            { rotate: '90deg' }
        ],
       
    }
})
