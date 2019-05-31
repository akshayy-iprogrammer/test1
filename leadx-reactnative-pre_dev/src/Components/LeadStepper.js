import React, { Component } from 'react';
import { View,  StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { STEPS_COLOR } from '../Constants/appConstants';

export default class LeadStepper extends Component{

    constructor() {
        super();
    }
    
    render(){

        return(
                <View style={{ flex: 1, flexDirection: 'row', marginTop:5, height : 39, width: '100%', backgroundColor: '#DCE0E7' }}>                
                    {
                        this.props.stepperData.map((data,index) => {
                            return (
                                   <View  key={index} style={{ height : 39, width: '20%', backgroundColor: STEPS_COLOR[index]}}>
                                        <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center'}}>
                                            <Text style={{fontSize: 9, color: '#ffffff' }}>{data.duration}</Text>
                                            <Text style={{fontSize: 9 , color: '#ffffff'}}>{data.unit}</Text>
                                        </View>

                                      {/* <View style={[styles.triangle, {borderBottomColor:STEPS_COLOR[index+1]}]} /> */}
                                    </View>
                            )
                        })
                    }
                </View>
            )
    }
    
}
const styles = StyleSheet.create({
   
    triangle: {
        width: 8,
        height: 39,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 27,
        borderRightWidth: 27,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        transform: [
            { rotate: '90deg' }
        ],
       
    }
})