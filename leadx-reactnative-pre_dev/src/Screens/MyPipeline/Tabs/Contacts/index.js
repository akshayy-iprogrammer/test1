import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SectionList, Alert, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getContactsList } from '../../../../Networking/API/myPipeline/piplineAPI';
import { contactTabControl, setContacts, refresh } from '../../dispatcher';


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ contactTabControl, setContacts, refresh }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        contactsList: state.pipeline.contactsList,
        refreshAll: state.pipeline.refreshAll
    }
}

class ContactsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfContacts: 0,
            contacts: this.props.contactsList ? this.props.contactsList : [],
            refresh: this.props.refreshAll ? this.props.refreshAll : false
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.contactsList !== prevState.contactsList || nextProps.refreshAll !== prevState.refreshAll) {
            return {
                contacts: nextProps.contactsList,
                refresh: nextProps.refreshAll
            }
        }
    }


    async componentDidMount() {
        await this.getContactsData();
    }

    getContactsData = async () => {
        const contactsParams = {
            "arrayFilters": [
                {
                    "is_deleted": 0
                }
            ],
            "selectFilters": [],
            "sort": {
                "field": "name",
                "sortOrder": "ASC"
            },
            "paginate": {
                "page": 0,
                "limit": 100
            }
        }

        var contacts = await getContactsList(contactsParams);
        if (contacts) {
            this.setState({
                numberOfContacts: contacts.count
            })
            await this.props.setContacts(contacts.rows);
        } else {
            console.log('contacts failure');
            Alert.alert('Oops! something went wrong');
        }
        this.props.refresh(false);
    }

    addContactClicked = () => {
        this.props.screenProps.navigate('AddContact');
    }

    _onRefresh = async () => {
        this.setState({ refreshing: true });
        await this.getContactsData().then(() => {
            this.setState({ refreshing: false });
        });
    }

    render() {
        const didBlurSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                var activeTabIndex = 1;
                this.props.contactTabControl({ 'index': activeTabIndex, 'length': this.state.numberOfContacts });
                this.getContactsData();
            }
        );
        // if (this.state.contacts.length !== 0) {
        //     var activeTabIndex = 1;
        //     this.props.contactTabControl({ 'index': activeTabIndex, 'length': this.state.numberOfContacts });
        // }

        if (this.state.refresh) {
            this.getContactsData();
        }
        const contactTabs = this.state.contacts.map((item, index) => {
            return (
                <View style={styles.contactGroupContainer} key={index}>
                    <View style={styles.contactGroupIndexContainer}>
                        <Text style={styles.contactGroupIndex}>{Object.keys(item)[0].toUpperCase()}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        {
                            item[Object.keys(item)[0]].map((contact, number) => {
                                return (
                                    <TouchableOpacity
                                        key={number}
                                        style={styles.contactTab}
                                        onPress={() => this.props.screenProps.navigate('ContactInfo', { "item": contact })}
                                    >
                                        <View style={styles.contactIconContainer}>
                                            {
                                                contact.hasOwnProperty('name')
                                                    ? <Image source={require('../../../../Assets/icons/contact-profile.png')} style={{ width: 20.5, height: 20 }} />
                                                    : <Image source={require('../../../../Assets/icons/contact-company.png')} style={{ width: 20.5, height: 20 }} />
                                            }
                                        </View>
                                        {
                                            contact.hasOwnProperty('name')
                                                ? <View style={{ flex: 1 }}>
                                                    <Text style={{ ...styles.contactInfo, fontSize: 15, fontWeight: '600' }}>{contact.name}</Text>
                                                    <Text style={{ ...styles.contactInfo, fontSize: 11, marginTop: 13 }}>{contact.contact_company.company_name}</Text>
                                                </View>
                                                : <View style={{ flex: 1, padding: 14, paddingLeft: 0 }}>
                                                    <Text style={{ ...styles.contactInfo, fontSize: 15, fontWeight: '600' }}>{contact.company_name}</Text>
                                                </View>
                                        }
                                        <View style={{ flex: 0, justifyContent: 'center' }}>
                                            <Image source={require('../../../../Assets/icons/chevron-right.png')} style={{ width: 20, height: 20 }} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            )
        })
        return (
            <ScrollView style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
            >
                <View style={styles.newContactButtonContainer}>
                    <TouchableOpacity style={styles.newContactButton} onPress={() => this.addContactClicked()}>
                        <Image source={require('../../../../Assets/icons/plus.png')} style={styles.buttonIcons} />
                        <Text style={{ ...styles.customText, color: '#FFFFFF', marginLeft: 5 }}>Add new contact</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {
                        contactTabs
                    }
                </View>
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F1F7'
    },
    newContactButtonContainer: {
        padding: 16
    },
    newContactButton: {
        backgroundColor: '#2A2F47',
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonIcons: {
        width: 13,
        height: 13
    },
    customText: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 12
    },
    contactTab: {
        flexDirection: 'row',
        padding: 13,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F1F7'
    },
    contactGroupContainer: {
        flexDirection: 'row',
        marginTop: 11
    },
    contactGroupIndexContainer: {
        flex: 0.2,
        alignItems: 'center',
        paddingTop: 18
    },
    contactGroupIndex: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 22,
        fontWeight: '800',
        color: '#C5C5D8'
    },
    contactIconContainer: {
        flex: 0,
        paddingRight: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contactInfo: {
        fontFamily: 'OpenSans-Regular',
        color: '#232F44'
    }
})