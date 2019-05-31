import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadAppData } from './dispatcher';
import { strings } from '../../Config/languages';

const mapStateToProps = (state) => {
    return { splash: state.splash }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ loadAppData }, dispatch)
}

class SplashScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        AsyncStorage.getItem('lang_key').then((value) => {
            if (value === null) {
                strings.setLanguage('En');
            } else {
                strings.setLanguage(value);
            }
        })
    }

    componentDidMount() {
        setTimeout(() => { this.props.navigation.navigate('Login'); }, 3000);
    }
    render() {
        return (
            <ImageBackground source={require('../../Assets/icons/splash_background.png')} style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'transparent'} />
                <View style={{ padding: 50 }}>
                    <Image source={require('../../Assets/icons/leadXLogo.png')} style={styles.splashLogo} />
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    splashHeader: {
        color: "#FFFFFF",
        fontSize: 20
    },
    splashLogo: {
        width: 263,
        height: 102
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);