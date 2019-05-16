import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Text, StyleSheet, StatusBar, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { strings } from '../../Config/languages';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
                <KeyboardAvoidingView behavior="padding" enabled>
                    <StatusBar translucent={true} backgroundColor={'transparent'} />
                    <View style={styles.logoContainer}>
                        <Image source={require('../../Assets/icons/Logo.png')} style={{ height: 72, width: 72 }} />
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={{ ...styles.textStyles, fontSize: 28, lineHeight: 38 }}>Welcome to <Text style={{ fontWeight: 'bold' }}>Lead X</Text></Text>
                        </View>
                        <View style={styles.subTitleContainer}>
                            <Text style={{ ...styles.textStyles, fontSize: 14, lineHeight: 19 }}>Before we begin, please login into your account</Text>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View>
                            <TextInput style={styles.inputBox} placeholder="Enter Username" placeholderTextColor="#A7B1C3" />
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <TextInput style={styles.inputBox} placeholder="Enter Password" placeholderTextColor="#A7B1C3" />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.loginButton} onPress={() => this.props.navigation.navigate('Home')}>
                            <Text style={{ ...styles.textStyles, lineHeight: 18, fontSize: 14 }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.forgetContainer}>
                        <View style={styles.forgotPwdBox}>
                            <Text style={styles.textStyles}>Forgot your <Text style={{ textDecorationLine: 'underline' }}>Password</Text>?</Text>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#232f44',
        padding: 50
    },
    textStyles: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'Roboto-Regular'
    },
    logoContainer: {
        marginTop: 57,
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoContainer: {
        marginTop: 45,
    },
    titleContainer: {
        paddingLeft: 20,
        paddingRight: 20
    },
    subTitleContainer: {
        marginTop: 40,
        paddingLeft: 34,
        paddingRight: 34
    },
    inputContainer: {
        marginTop: 45
    },
    inputBox: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#4D5B73',
        paddingLeft: 17,
        fontSize: 13,
        color: '#FFFFFF',
    },
    buttonContainer: {
        marginTop: 40,
    },
    loginButton: {
        backgroundColor: '#17d98b',
        padding: 15,
        borderRadius: 4
    },
    forgetContainer: {
        padding: 20
    },
    forgotPwdBox: {
        marginTop: 50
    }
})