import React, { Component } from 'react';
import { View, StyleSheet, ProgressBarAndroid, ProgressViewIOS, Platform } from 'react-native';


export default class Loader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.outsideContainer}>
                <View>
                    {
                        Platform.OS === 'android'
                            ? <ProgressBarAndroid />
                            : <ProgressViewIOS />
                    }
                </View>


            </View>


        )
    }
}

const styles = StyleSheet.create({

    outsideContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignContent: 'center'
    },

});