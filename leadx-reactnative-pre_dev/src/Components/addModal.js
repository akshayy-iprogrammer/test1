import React, { Component } from 'react';
import { Modal, View, TouchableWithoutFeedback, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';


export default class AddModal extends Component {
    constructor(props) {
        super(props);
        this.leadClicked = this.leadClicked.bind(this);
        this.contactClicked = this.contactClicked.bind(this);
    }

    contactClicked() {
        this.props.addClickHandler();
        this.props.myProps.navigate('AddContact')
    }

    leadClicked() {
        this.props.addClickHandler();
        this.props.myProps.navigate('AddLead')
    }
    render() {
        return (
            <Modal animationType="fade"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => this.props.addClickHandler()}
            >
                <TouchableWithoutFeedback onPress={() => this.props.addClickHandler()}>
                    <View style={styles.outsideContainer} />
                </TouchableWithoutFeedback>
                <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', padding: 20 }}>
                    <View style={{ backgroundColor: '#FFFFFF', borderRadius: 4 }}>
                        <View style={{ padding: 12 }}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => this.props.addClickHandler()}>
                                <Image source={require('../Assets/icons/close.png')} style={{ width: 24, height: 24 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ ...styles.customText, fontSize: 16, fontWeight: 'bold', color: '#2A2F47' }}>Create New:</Text>
                        </View>
                        <View style={{ marginTop: 15, padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    style={{ padding: 20, alignItems: 'center', borderRadius: 3, backgroundColor: '#2A2F47' }}
                                    onPress={() => this.contactClicked()
                                    }
                                >
                                    <Text style={{ ...styles.customText, fontSize: 12, color: '#FFFFFF' }}>Contact</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, marginLeft: 20 }}>
                                <TouchableOpacity
                                    style={{ padding: 20, alignItems: 'center', borderRadius: 3, backgroundColor: '#2A2F47' }}
                                    onPress={() => this.leadClicked()
                                    }
                                >
                                    <Text style={{ ...styles.customText, fontSize: 12, color: '#FFFFFF' }}>Lead</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal >
        )
    }
}

const styles = StyleSheet.create({
    customText: {
        fontFamily: 'OpenSans-Regular'
    },
    outsideContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'space-evenly'
    },

});