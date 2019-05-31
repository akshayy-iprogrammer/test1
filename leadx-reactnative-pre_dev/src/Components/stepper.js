import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { STEPS_COLOR } from '../Constants/stepperColors';

export default class LeadStepper extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', marginTop: 5, height: 39, backgroundColor: '#DCE0E7',overflow: 'hidden', borderRadius: 4}}>
                {
                    this.props.stepperData.map((data, index) => {
                        return (
                            <View key={index} style={{ flex: 0, justifyContent: 'center', width: '20%', flexDirection: 'row', backgroundColor: STEPS_COLOR[index] }}>
                                {
                                <View style={[styles.triangle, {borderBottomColor:  index !== 0 ? STEPS_COLOR[index-1] : 'transparent'}]} />
                                }
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: -30 }}>
                                    <Text style={styles.textKey}>{data.duration}</Text>
                                    <Text style={styles.textValue}>{data.unit}</Text>
                                </View>
                            </View>
                        )
                    })
                }
                {
                this.props.stepperData.lenght !== 5
                ? <View style={[styles.triangle,{ borderBottomColor:  STEPS_COLOR[this.props.stepperData.length - 1]}]} />
                : null
                }
                
            </View>
        )
    }

}
const styles = StyleSheet.create({

    triangle: {
        height: 39,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 19.5,
        borderRightWidth: 19.5,
        borderBottomWidth: 7,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        transform: [
            { rotate: '90deg' }
        ],
    },
    textKey: { fontSize: 14, fontWeight: '600', color: '#ffffff' },
    textValue: { fontSize: 10, fontWeight: 'normal',
        fontStyle: 'normal', color: '#ffffff' },
})
