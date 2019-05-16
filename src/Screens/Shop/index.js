import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class ShopScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: ''
        }
    }

    // languageChanged = (value) => {
    //     // AsyncStorage.setItem('lang_key', 'value');
    //     console.log('oasfonocnoinscvonovnoivnsei', this.props);
    //     this.props.navigation.navigate('/Splash');
    // }

    render() {
        return (
            <View style={styles.container}>
                {/* <Picker
                    selectedValue={this.state.language}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) => this.languageChanged(itemValue)}>
                    <Picker.Item label="English" value="En" />
                    <Picker.Item label="French" value="Fr" />
                </Picker> */}
                <Text>Shop Screen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})