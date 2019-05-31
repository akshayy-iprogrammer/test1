import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Text, StyleSheet, StatusBar, TextInput, Image, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import { checkLogin } from '../../Networking/API/loginAPI';
import Loader from '../../Components/loader';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            userNameError: null,
            passwordError: null,
            isFormValid: false,
            loading: false
        }
    }

    // componentDidMount(){
    //     this.props.navigation.navigate('Home');
    // }

    emailCheck = (email) => {
        const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (email.trim().match(emailRegex)) {
            this.setState({
                username: email,
                userNameError: false,
                isFormValid: true
            })
        } else {
            this.setState({
                username: email,
                userNameError: true,
                isFormValid: false
            })
        }
    }

    async handleOnSubmit() {
        if (!this.state.username) {
            this.setState({
                userNameError: true,
                isFormValid: false
            })
        } else if (!this.state.password) {
            this.setState({
                passwordError: true
            })
        } else {
            this.setState({
                loading: true
            })
            const loginParams = {
                "username": this.state.username,
                "password": this.state.password
            }
            var status = await checkLogin(loginParams);
            if (status) {
                this.setState({
                    loading: false
                })
                this.props.navigation.navigate('Home');
            } else {
                this.setState({
                    loading: false,
                    userNameError: true,
                    passwordError: true
                })
            }
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
                    <KeyboardAvoidingView behavior="padding" enabled>
                        <StatusBar translucent={true} backgroundColor={'transparent'} />
                        <View style={{ alignItems: 'center', marginTop: '20%' }}>
                            <Image source={require('../../Assets/icons/loginleadXLogo.png')} style={{ height: 71.25, width: 177 }} />
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.titleContainer}>
                                <Text style={{ ...styles.textStyles, fontFamily: 'OpenSans-Light', fontSize: 25 }}>Welcome to <Text style={{ fontFamily: 'OpenSans-Bold', fontWeight: 'bold', fontSize: 25 }}>LEADX</Text></Text>
                            </View>
                            <View style={styles.subTitleContainer}>
                                <Text style={{ ...styles.textStyles, fontFamily: 'OpenSans', fontSize: 14 }}>Before we begin, please login into your account</Text>
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <View>
                                <TextInput
                                    value={this.state.username}
                                    onChangeText={(text) => this.emailCheck(text)}
                                    style={[styles.inputBox, this.state.userNameError ? styles.error : null]}
                                    placeholder="Enter email" placeholderTextColor="#A7B1C3" />
                                {
                                    this.state.userNameError
                                        ? <Text style={styles.errorText}>Enter valid email</Text>
                                        : null
                                }

                            </View>
                            <View style={{ marginTop: 15 }}>
                                <TextInput
                                    value={this.state.password}
                                    onChangeText={(text) => this.setState({ password: text, passwordError: false })}
                                    style={[styles.inputBox, this.state.passwordError ? styles.error : null]}
                                    placeholder="Enter password"
                                    placeholderTextColor="#A7B1C3"
                                    secureTextEntry={true}
                                />
                                {
                                    this.state.passwordError
                                        ? <Text style={styles.errorText}>Enter valid password</Text>
                                        : null
                                }
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.loginButton} onPress={() => this.handleOnSubmit()}>
                                <Text style={{ ...styles.textStyles, fontFamily: 'OpenSans', fontSize: 14 }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.forgetContainer}>
                            <Text style={{ ...styles.textStyles, fontFamily: 'OpenSans', fontSize: 14 }}>Forgot your <Text style={{ textDecorationLine: 'underline', fontFamily: 'OpenSans', fontSize: 14 }}>Password</Text>?</Text>
                        </View>
                    </KeyboardAvoidingView>

                </ScrollView>
                {
                    this.state.loading
                        ? <Loader />
                        : null
                }
            </View>
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
    },
    logoContainer: {
        flex: 1,
        marginTop: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    infoContainer: {
        marginTop: 40,
    },
    titleContainer: {
        paddingLeft: 20,
        paddingRight: 20
    },
    subTitleContainer: {
        marginTop: 25,
        paddingLeft: 34,
        paddingRight: 34
    },
    inputContainer: {
        marginTop: 40
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
        marginTop: 15,
    },
    loginButton: {
        backgroundColor: '#17d98b',
        padding: 15,
        borderRadius: 4
    },
    forgetContainer: {
        marginTop: 45
    },
    error: {
        borderWidth: 1,
        borderColor: 'red'
    },
    errorText: {
        color: 'red',
    }
})