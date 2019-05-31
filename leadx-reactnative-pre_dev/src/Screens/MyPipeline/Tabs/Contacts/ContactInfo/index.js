import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AddModal from '../../../../../Components/addModal';


export default class ContactInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.navigation.getParam('item') ? this.props.navigation.getParam('item') : {},
            addClicked: false
        }
    }
    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <View style={{ flexDirection: 'row', marginBottom: 12, marginTop: 12 }}>

                <TouchableOpacity style={{ padding: 7, backgroundColor: '#3E4561', borderRadius: 5, marginRight: 12 }}
                    onPress={() =>
                        navigation.state.params.handleAddClick()
                    }>
                    <Image source={require('../../../../../Assets/icons/plus-1.png')} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>

            </View>
        ),
    })

    updateContact = (value) => {
      console.log(value,'updateCOntact==========================');
        let selectedType = this.state.data.name ? 'person' : 'company';
        console.log(selectedType,'=======')
       this.props.navigation.navigate('AddContact',{type : selectedType,contactData : value,isUpdate:true});
    }

    addClickHandler = () => {
        this.setState({
            addClicked: !this.state.addClicked,
        })
    }

    componentDidMount() {
        this.props.navigation.setParams({
            handleAddClick: this.addClickHandler

        });
        this.setState({
            data: this.props.navigation.getParam('item')
        })
    }

    render() {
        console.log('-===-=-=-=-=-=-=-=-', this.state.data);
        return (
            <ScrollView style={styles.container}>
                <View style={styles.contactContainer}>
                    {
                        this.state.data.name
                            ? <View>
                                <View style={styles.infoTab}>
                                    <View style={styles.labelContainer}>
                                        <Text style={styles.label}>Name</Text>
                                    </View>
                                    <View style={{ ...styles.detailContainer, flexDirection: 'row' }}>
                                        <Image source={require('../../../../../Assets/icons/contact-profile.png')} style={{ width: 20.5, height: 20 }} />
                                        <Text style={{ ...styles.details, marginLeft: 10 }}>{this.state.data.name}</Text>
                                    </View>
                                </View>
                                <View style={styles.infoTab}>
                                    <View style={styles.labelContainer}>
                                        <Text style={styles.label}>Company</Text>
                                    </View>
                                    <View style={styles.detailContainer}>
                                        <Text style={styles.details}>{this.state.data.contact_company.company_name}</Text>
                                    </View>
                                </View>
                                <View style={styles.infoTab}>
                                    <View style={styles.labelContainer}>
                                        <Text style={styles.label}>Phone number</Text>
                                    </View>
                                    <View style={styles.detailContainer}>
                                        <Text style={styles.details}>{this.state.data.phone_number}</Text>
                                    </View>
                                </View>
                                <View style={styles.infoTab}>
                                    <View style={styles.labelContainer}>
                                        <Text style={styles.label}>E-mail address</Text>
                                    </View>
                                    <View style={styles.detailContainer}>
                                        <Text style={styles.details}>{this.state.data.email}</Text>
                                    </View>
                                </View>
                                <View style={styles.infoTab}>
                                    <View style={styles.labelContainer}>
                                        <Text style={styles.label}>Address</Text>
                                    </View>
                                    <View style={styles.detailContainer}>
                                        <Text><Text>{this.state.data.address_line_1}</Text>, <Text>{this.state.data.address_line_2}</Text>, <Text>{this.state.data.city.name}</Text>, <Text>{this.state.data.state.name}</Text>, <Text>{this.state.data.country.name}</Text></Text>
                                    </View>
                                </View>
                                <View style={styles.infoTab}>
                                    <View style={styles.labelContainer}>
                                        <Text style={styles.label}>Notes</Text>
                                    </View>
                                    <View style={styles.detailContainer}>
                                        <Text style={styles.details}>{this.state.data.notes !== '' ? this.state.data.notes : '-'}</Text>
                                    </View>
                                </View>
                            </View>

                            : <View>
                                <View style={styles.infoTab}>
                                    <View style={styles.labelContainer}>
                                        <Text style={styles.label}>Company Name</Text>
                                    </View>
                                    <View style={{ ...styles.detailContainer, flexDirection: 'row' }}>
                                        <Image source={require('../../../../../Assets/icons/contact-company.png')} style={{ width: 20.5, height: 20 }} />
                                        <Text style={{ ...styles.details, marginLeft: 10 }}>{this.state.data.company_name}</Text>
                                    </View>
                                </View>
                                <View style={styles.infoTab}>
                                    <View style={styles.labelContainer}>
                                        <Text style={styles.label}>Company</Text>
                                    </View>
                                    <View style={styles.detailContainer}>
                                        <Text style={styles.details}>{this.state.data.company_name}</Text>
                                    </View>
                                </View>
                                <View style={styles.infoTab}>
                                    <View style={styles.labelContainer}>
                                        <Text style={styles.label}>Company Code</Text>
                                    </View>
                                    <View style={styles.detailContainer}>
                                        <Text style={styles.details}>{this.state.data.company_code}</Text>
                                    </View>
                                </View>
                                <View style={styles.infoTab}>
                                    <View style={styles.labelContainer}>
                                        <Text style={styles.label}>Office Address</Text>
                                    </View>
                                    <View style={styles.detailContainer}>
                                        <Text><Text>{this.state.data.address_line_1}</Text>, <Text>{this.state.data.address_line_2}</Text>, <Text>{this.state.data.city.name}</Text>, <Text>{this.state.data.state.name}</Text>, <Text>{this.state.data.country.name}</Text></Text>
                                    </View>
                                </View>
                                <View style={styles.infoTab}>
                                    <View style={styles.labelContainer}>
                                        <Text style={styles.label}>Country Registered</Text>
                                    </View>
                                    <View style={styles.detailContainer}>
                                        <Text style={styles.details}>{this.state.data.country.iso_code}</Text>
                                    </View>
                                </View>
                                <View style={styles.infoTab}>
                                    <View style={styles.labelContainer}>
                                        <Text style={styles.label}>Website</Text>
                                    </View>
                                    <View style={styles.detailContainer}>
                                        <Text style={styles.details}>{this.state.data.website}</Text>
                                    </View>
                                </View>
                                <View style={styles.infoTab}>
                                    <View style={styles.labelContainer}>
                                        <Text style={styles.label}>Contact Person</Text>
                                    </View>
                                    <View style={styles.detailContainer}>
                                        <Text style={styles.details}>{this.state.data.contact_person_name}</Text>
                                    </View>
                                </View>
                                <View style={styles.infoTab}>
                                    <View style={styles.labelContainer}>
                                        <Text style={styles.label}>Phone Number</Text>
                                    </View>
                                    <View style={styles.detailContainer}>
                                        <Text style={styles.details}>{this.state.data.contact_person_phone}</Text>
                                    </View>
                                </View>
                                <View style={styles.infoTab}>
                                    <View style={styles.labelContainer}>
                                        <Text style={styles.label}>Email Address</Text>
                                    </View>
                                    <View style={styles.detailContainer}>
                                        <Text style={styles.details}>{this.state.data.contact_person_email}</Text>
                                    </View>
                                </View>
                                <View style={styles.infoTab}>
                                    <View style={styles.labelContainer}>
                                        <Text style={styles.label}>Notes</Text>
                                    </View>
                                    <View style={styles.detailContainer}>
                                        <Text style={styles.details}>{this.state.data.notes !== '' ? this.state.data.notes : '-'}</Text>
                                    </View>
                                </View>
                            </View>
                    }
                    <View style={styles.updateButtonContainer}>
                        <TouchableOpacity 
                        onPress={()=>{this.updateContact(this.state.data)}}
                        style={styles.updateButton}>
                            <Text style={{ color: '#FFFFFF' }}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <AddModal visible={this.state.addClicked} addClickHandler={this.addClickHandler} myProps={this.props.navigation} />
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F1F8'
    },
    contactContainer: {
        backgroundColor: '#FFFFFF'
    },
    infoTab: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EBECEF',
        flexDirection: 'row'
    },
    labelContainer: {
        flex: 0.4
    },
    detailContainer: {
        flex: 1
    },
    label: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 11,
        color: '#232F44',
        fontWeight: '600'
    },
    details: {
        color: '#232F44',
        fontFamily: "OpenSans-Regular",
        fontSize: 12,
        lineHeight: 17
    },
    updateButtonContainer: {
        padding: 16,
        backgroundColor: '#FFFFFF'
    },
    updateButton: {
        borderRadius: 3,
        backgroundColor: '#232F44',
        elevation: 2,
        alignItems: 'center',
        padding: 14
    }
})