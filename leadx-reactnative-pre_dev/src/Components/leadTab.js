import React, { Component } from 'react';
import { View, Text, Image, ProgressBarAndroid, ProgressViewIOS, TouchableOpacity, StyleSheet, Platform } from 'react-native';

export default class LeadTabComponent extends Component {
    constructor(props) {
        super(props);
    }

    onClick = () => {
        this.props.tabClicked(this.props.item);
    }

    componentDidMount() {
        console.log(this.props.item);
    }

    measureView = (event) => {
        console.log('-===-=-=-=-=-=-=-height', event.nativeEvent.layout.height);
    }

    getProgress() {
        switch (this.props.item.lead_status.id) {
            case 1:
                return 0;
            case 2:
                return 0.20;
            case 3:
                return 0.40;
            case 4:
                return 0.60;
            case 5:
                return 0.80
            case 6:
                return 1;
            default:
                return 0;
        }
    }

    render() {

        console.log('=----------lead tabbbbbbbb', this.getProgress());
        return (
            <View>
                {

                    this.props.navigationOn
                        ? <TouchableOpacity
                            style={styles.container}
                            onPress={() => this.onClick()}
                        >
                            <View onLayout={(event) => this.measureView(event)} style={{ flex: 1, justifyContent: 'center', paddingRight: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 0.2 }}>
                                        <Image source={{ uri: this.props.item.createdBy.user_avatar }} style={{ width: 30, height: 30 }} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <View>
                                            <Text style={styles.leadTitle}>{this.props.item.lead_title}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                            <View style={{ flex: 1.5 }}>
                                                <Text style={{ alignSelf: 'flex-start' }}>{this.props.item.contact_company.company_name}</Text>
                                            </View>
                                            <View style={{ flex: 0 }}>
                                                <Text style={{ alignSelf: 'flex-start' }}>{this.props.item.lead_status.name}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginTop: 10, borderRadius: 4 }}>
                                    {
                                        Platform.OS === 'android'
                                            ? <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={this.getProgress()} color="#00AE48" />
                                            : <ProgressViewIOS progress={this.getProgress()} progressTintColor="#00AE48" />
                                    }
                                </View>
                            </View>
                            <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../Assets/icons/chevron-right.png')} style={{ width: 24, height: 34 }} />
                            </View>
                        </TouchableOpacity >
                        : <View
                            style={styles.container}
                        >
                            <View style={{ flex: 1, justifyContent: 'center', paddingRight: 10 }}>
                                <View>
                                    <Text style={styles.leadTitle}>{this.props.item.lead_title}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ alignSelf: 'flex-start' }}>{this.props.item.contact_company.company_name}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ alignSelf: 'flex-end' }}>{this.props.item.lead_status.name}</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 10, borderRadius: 4 }}>
                                    {
                                        Platform.OS === 'android'
                                            ? <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={this.getProgress()} color="#00AE48" />
                                            : <ProgressViewIOS progress={this.getProgress()} progressTintColor="#00AE48" />
                                    }
                                </View>
                            </View>
                        </View >
                }
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EBEBEF'
    },
    leadTitle: {
        fontSize: 15,
        color: '#2A2F47',
        fontWeight: 'bold'
    },
})