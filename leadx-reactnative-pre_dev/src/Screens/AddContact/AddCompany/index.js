import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Picker, TouchableOpacity, DatePickerAndroid, Image, ScrollView, ToastAndroid, Platform } from 'react-native';
import { CustomValidation as regexArray } from '../../../Constants/customValidator';
import { addCompany, updateCompany } from '../../../Networking/API/Contact/Company/companyApi';
import { getCountries, getStates, getCities } from '../../../Networking/API/commonAPI';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../../Components/loader';

export default class AddCompanyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            company_name: this.props.data ? this.props.data.company_name : '',
            companyNameError: false,
            company_code: this.props.data ? this.props.data.company_code : '',
            companyCodeError: false,
            office_address_line_1: this.props.data ? this.props.data.office_address_line_1 : '',
            office_address_line_2: this.props.data ? this.props.data.office_address_line_2 : '',
            officeAddressLine1Error: false,
            officeAddressLine2Error: false,
            postal_address: this.props.data ? this.props.data.postal_address : '',
            postalAddressError: false,
            country_id: "",
            countryError: false,
            state_id: "",
            stateError: false,
            city_id: "",
            cityError: false,
            countryRegisteredError: false,
            website: this.props.data ? this.props.data.website : '',
            websiteError: false,
            contact_person_name: this.props.data ? this.props.data.contact_person_name : '',
            contactPersonError: false,
            contact_person_phone: this.props.data ? this.props.data.contact_person_phone : '',
            phoneNumberError: false,
            contact_person_email: this.props.data ? this.props.data.contact_person_email : '',
            emailError: false,
            notes: this.props.data ? this.props.data.notes : '',
            countriesList: [],
            statesList: [],
            citiesList: [],
            isFormValid: false,
            fieldsArray: {
                'Company Name': 'companyNameError', 'Company Code': 'companyCodeError',
                'Office Address Line 1': 'officeAddressLine1Error', 'Office Address Line 2': 'officeAddressLine2Error', 'Postal Address': 'postalAddressError',
                'Phone number': 'phoneNumberError', 'E-mail': 'emailError', 'Website': 'websiteError', 'Contact Person': 'contactPersonError', 'Country': 'countryRegisteredError',
                'State': 'stateError', 'City': 'cityError'
            }
        }
        // this._currentContactType = this._currentContactType.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    componentDidMount() {
        //api comes here
        console.log('comdidmount', this.props);
        this.getCountriesFn();
    }

    validate(type, value, validationType = '') {
        // console.log(validationType)
        var pattern = new RegExp(regexArray[validationType]);
        console.log(pattern, 'pattttttttttttterrrrrrrrrren');


        if (value === "" || value === undefined) {
            this.setState({ [this.state.fieldsArray[type]]: `${type}` + ' is required' })
        } else if (!pattern.test(value)) {
            this.setState({ [this.state.fieldsArray[type]]: `${type}` + ' is invalid' })
        } else {
            console.log('called=======')
            this.setState({ [this.state.fieldsArray[type]]: false }, () => {
                console.log('state changeddd===', this.state.isFormValid)
            })

        }

    }


    countryRegisteredValidation = () => {
        if (this.state.country_id === '') {
            this.setState({
                countryRegisteredError: true
            })
        } else {
            this.setState({
                countryRegisteredError: false
            })
        }

    }

    stateValidation = () => {
        if (this.state.state_id === '') {
            this.setState({
                stateError: true
            })
        } else {
            this.setState({
                stateError: false
            })
        }

    }

    cityValidation = () => {
        if (this.state.city_id === '') {
            this.setState({
                cityError: true
            });
        } else {
            this.setState({
                cityError: false
            });
        }
    }

    validateWebsite = (value) => {
        var pattern = new RegExp(regexArray['website']);
        console.log(pattern, 'sdfs===========');

        this.setState({ website: value });
        if (value == '' || value === undefined) {
            this.setState({ websiteError: 'Website is required' });
        } else if (!pattern.test(value)) {
            this.setState({ websiteError: 'Website should be valid' });
        }
        else {
            this.setState({ websiteError: false })
        }
    }

    validateEmail = (value) => {
        var pattern = new RegExp(regexArray['email']);
        console.log(pattern, 'sdfs===========');

        this.setState({ contact_person_email: value });
        if (value == '' || value === undefined) {
            this.setState({ emailError: 'Email is required' });
        } else if (!pattern.test(value)) {
            this.setState({ emailError: 'Email should be valid' });
        }
        else {
            this.setState({ emailError: false })
        }
    }

    validatePhone = (value) => {
        var pattern = new RegExp(regexArray['numberOnly']);
        console.log('phone', pattern);
        this.setState({ contact_person_phone: value });
        if (value === '' || value === undefined) {
            this.setState({ phoneNumberError: 'Phone Number is required' });
        } else if (!pattern.test(value)) {
            this.setState({ phoneNumberError: 'Phone Number should be only be digits' });
        } else if (value.length < 10) {
            this.setState({ phoneNumberError: 'Phone Number should be minimum 10 characters' });
        } else {
            this.setState({ phoneNumberError: false })
        }
    }

    handleOnSubmit() {
        const { company_name, company_code, office_address_line_1, office_address_line_2, postal_address, isFormValid, country_id, state_id, contact_person_name, contact_person_phone, contact_person_email, website } = this.state;

        this.validate('Company Name', company_name, 'alphaOnlyWithSpace');
        this.validate('Company Code', company_code, 'alphaNumericandUnderscoreHypen');
        this.validate('Office Address Line 1', office_address_line_1, '');
        this.validate('Office Address Line 2', office_address_line_2, '');
        this.validate('Postal Address', postal_address, '');
        this.validatePhone(contact_person_phone);
        this.validateEmail(contact_person_email);
        this.validateWebsite(website);
        this.validate('Contact Person', contact_person_name, 'alphaOnlyWithSpaceanddot');
        this.countryRegisteredValidation();
        this.stateValidation();
        this.cityValidation();


        setTimeout(() => { this.checkFormValidation() }, 2000);

    };

    async checkFormValidation() {

        var userId = await AsyncStorage.getItem('userId').then((value) => {
            return parseInt(value);
        });

        var isFormValid = Object.values(this.state.fieldsArray).filter((errorName) => {
            console.log(this.state[errorName])
            return this.state[errorName] !== false;
        }).length == 0;
        console.log(isFormValid);

        if (isFormValid) {
            this.props.loading(true);
            console.log('valid');
            let params = {
                "company_name": this.state.company_name,
                "company_code": this.state.company_code,
                "office_address_line_1": this.state.office_address_line_1,
                "office_address_line_2": this.state.office_address_line_2,
                "postal_address": this.state.postal_address,
                "country_id": this.state.country_id,
                "state_id": this.state.state_id,
                "city_id": this.state.city_id,
                "website": this.state.website,
                "contact_person_name": this.state.contact_person_name,
                "contact_person_phone": this.state.contact_person_phone,
                "contact_person_email": this.state.contact_person_email,
                "notes": this.state.notes,
                "user_id": userId
            }
            if (this.props.isUpdate) {
                params['id'] = this.props.data.id;
                console.log(params);

                var status = await updateCompany(params);
                console.log(status)
                if (status) {
                    ToastAndroid.show('Company Updated Successfully', ToastAndroid.SHORT);
                    this.props.loading(false);
                    this.props.navigation.navigate('PipeHome');
                } else {
                    this.props.loading(false);

                    ToastAndroid.show('Company could not be updated', ToastAndroid.SHORT);
                }
            } else {
                var status = await addCompany(params);
                console.log(status)
                if (status) {
                    this.props.loading(false);
                    ToastAndroid.show('Company Added Successfully', ToastAndroid.SHORT);
                    this.props.navigation.goBack();
                } else {
                    this.props.loading(false);
                    ToastAndroid.show('Company could not be added', ToastAndroid.SHORT);
                }
            }

        } else {
            console.log('invalid');
            ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
        }
    }

    async getCountriesFn() {
        const params = {
            "arrayFilters": [
                {

                }
            ],
            "selectFilters": [],
            "sort": {
                "field": "name",
                "sortOrder": "ASC"
            },
            "paginate": {
                "page": 0,
                "limit": 10
            }
        }
        let response = await getCountries(params);
        if (response.hasOwnProperty('rows') && response['rows'].length > 0) {
            this.setState({
                countriesList: response['rows']
            }, () => {
                if (this.props.data.country_id) {
                    this.setState({ country_id: this.props.data.country_id, countryError: false })
                }
                this.getStatesFn(this.props.data.country_id);
            })
        }
    }

    async getStatesFn(countryId) {
        await this.setState({
            statesList: [],
            citiesList: [],
        })
        const params = {
            "arrayFilters": [
                {
                    "country_id": countryId
                }
            ],
            "selectFilters": [],
            "sort": {
                "field": "name",
                "sortOrder": "ASC"
            },
            "paginate": {
                "page": 0,
                "limit": 10
            }
        }

        let response = await getStates(params);
        console.log(response);
        if (response.hasOwnProperty('rows') && response['rows'].length > 0) {
            this.setState({
                statesList: response['rows']
            }, () => {
                if (this.props.data.state_id) {
                    this.setState({ state_id: this.props.data.state_id, stateError: false })
                }
                this.getCitiesFn(this.props.data.state_id);
            })
        }

    }

    async getCitiesFn(stateId) {
        this.setState({
            citiesList: []
        });
        const params = {
            "arrayFilters": [
                {
                    "country_id": this.state.country_id,
                    "state_id": stateId
                }
            ],
            "selectFilters": [],
            "sort": {
                "field": "name",
                "sortOrder": "ASC"
            },
            "paginate": {
                "page": 0,
                "limit": 10
            }
        }

        let response = await getCities(params);
        console.log(response);
        if (response.hasOwnProperty('rows') && response['rows'].length > 0) {
            this.setState({
                citiesList: response['rows']
            }, () => {
                if (this.props.data.city_id) {
                    this.setState({ city_id: this.props.data.city_id, cityError: false })
                }
            })
        }
    }

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
                <View>
                    <Text style={{ ...styles.customText, marginTop: 10 }}>Company name</Text>
                    <View style={styles.inputBoxContainer}>
                        <TextInput
                            value={this.state.company_name}
                            maxLength={20}
                            style={[{ ...styles.inputBox, fontSize: 12 }, this.state.companyNameError ? styles.error : null]}
                            onChangeText={(company_name) => { this.validate('Company Name', company_name, 'alphaOnlyWithSpace'); this.setState({ company_name }) }}
                        ></TextInput>
                        {
                            this.state.companyNameError ?
                                <Text style={styles.errorText} >{this.state.companyNameError}</Text>
                                : null
                        }

                    </View>

                    <Text style={{ ...styles.customText, marginTop: 10 }}>Company code</Text>
                    <View style={styles.inputBoxContainer}>
                        <TextInput
                            value={this.state.company_code}
                            maxLength={15}
                            style={[{ ...styles.inputBox, fontSize: 12 }, this.state.companyCodeError ? styles.error : null]}
                            onChangeText={(company_code) => { this.validate('Company Code', company_code, 'alphaNumericandUnderscoreHypen'); this.setState({ company_code }) }}
                        ></TextInput>
                        {
                            this.state.companyCodeError ?
                                <Text style={styles.errorText} >{this.state.companyCodeError}</Text>
                                : null
                        }
                    </View>

                    <Text style={{ ...styles.customText, marginTop: 10 }}>Office Address Line 1</Text>
                    <View style={styles.inputBoxContainer}>
                        <TextInput
                            value={this.state.office_address_line_1}
                            maxLength={100}
                            style={[{ ...styles.inputBox, fontSize: 12 }, this.state.officeAddressLine1Error ? styles.error : null]}
                            onChangeText={(office_address_line_1) => { this.validate('Office Address Line 1', office_address_line_1); this.setState({ office_address_line_1 }) }}
                        ></TextInput>
                        {
                            this.state.officeAddressLine1Error ?
                                <Text style={styles.errorText} >{this.state.officeAddressLine1Error}</Text>
                                : null
                        }
                    </View>

                    <Text style={{ ...styles.customText, marginTop: 10 }}>Office Address Line 2</Text>
                    <View style={styles.inputBoxContainer}>
                        <TextInput
                            value={this.state.office_address_line_2}
                            maxLength={100}
                            style={[{ ...styles.inputBox, fontSize: 12 }, this.state.officeAddressLine2Error ? styles.error : null]}
                            onChangeText={(office_address_line_2) => { this.validate('Office Address Line 2', office_address_line_2); this.setState({ office_address_line_2 }) }}
                        ></TextInput>
                        {
                            this.state.officeAddressLine2Error ?
                                <Text style={styles.errorText} >{this.state.officeAddressLine2Error}</Text>
                                : null
                        }

                    </View>

                    <Text style={{ ...styles.customText, marginTop: 10 }}>Postal address</Text>
                    <View style={styles.inputBoxContainer}>
                        <TextInput
                            value={this.state.postal_address}
                            maxLength={100}
                            style={[{ ...styles.inputBox, fontSize: 12 }, this.state.postalAddressError ? styles.error : null]}
                            onChangeText={(postal_address) => { this.validate('Postal Address', postal_address); this.setState({ postal_address }) }}
                        ></TextInput>
                        {
                            this.state.postalAddressError ?
                                <Text style={styles.errorText} >{this.state.postalAddressError}</Text>
                                : null
                        }
                    </View>

                    <Text style={{ ...styles.customText, marginTop: 10 }}>Country registered</Text>
                    <View style={[{ ...styles.inputBox, marginTop: 5, padding: 3 }, this.state.countryRegisteredError ? styles.error : null]}>
                        <Picker
                            selectedValue={this.state.country_id}
                            onValueChange={(itemValue, itemIndex) => {
                                this.getStatesFn(itemValue); this.setState({ country_id: itemValue, countryRegisteredError: false })
                            }}
                            itemStyle={Platform.OS === 'ios' ? null : { fontSize: 8, height: 50 }}
                        >
                            <Picker.Item label="Select country" value="" color="#E6E6EB" />
                            {
                                this.state.countriesList.map((data, index) => {
                                    return (
                                        <Picker.Item key={index} label={data.name} value={data.id} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    {
                        this.state.countryRegisteredError ?
                            <Text style={styles.errorText} >Registered Country is required</Text>
                            : null
                    }

                    <Text style={{ ...styles.customText, marginTop: 10 }}>State</Text>
                    <View style={[{ ...styles.inputBox, marginTop: 5, padding: 3 }, this.state.stateError ? styles.error : null]}>
                        <Picker
                            selectedValue={this.state.state_id}
                            onValueChange={(itemValue, itemIndex) => {
                                this.getCitiesFn(itemValue); this.setState({ state_id: itemValue, stateError: false })
                            }}
                            itemStyle={Platform.OS === 'ios' ? null : { fontSize: 8, height: 50 }}
                            enabled={this.state.statesList.length === 0 ? false : true}
                        >
                            <Picker.Item label="Select state" value="" color="#E6E6EB" />
                            {
                                this.state.statesList.map((data, index) => {
                                    return (
                                        <Picker.Item key={index} label={data.name} value={data.id} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    {
                        this.state.stateError ?
                            <Text style={styles.errorText} >State is required</Text>
                            : null
                    }

                    <Text style={{ ...styles.customText, marginTop: 10 }}>City</Text>
                    <View style={[{ ...styles.inputBox, marginTop: 5, padding: 3 }, this.state.cityError ? styles.error : null]}>
                        <Picker
                            selectedValue={this.state.city_id}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({ city_id: itemValue, cityError: false })
                            }}
                            itemStyle={Platform.OS === 'ios' ? null : { fontSize: 8, height: 50 }}
                            enabled={this.state.citiesList.length === 0 ? false : true}
                        >
                            <Picker.Item label="Select city" value="" color="#E6E6EB" />
                            {
                                this.state.citiesList.map((data, index) => {
                                    return (
                                        <Picker.Item key={index} label={data.name} value={data.id} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    {
                        this.state.cityError ?
                            <Text style={styles.errorText} >City is required</Text>
                            : null
                    }


                    <Text style={{ ...styles.customText, marginTop: 10 }}>Website</Text>
                    <View style={styles.inputBoxContainer}>
                        <TextInput
                            value={this.state.website}
                            maxLength={100}
                            style={[{ ...styles.inputBox, fontSize: 12 }, this.state.websiteError ? styles.error : null]}
                            onChangeText={(website) => { this.validateWebsite(website); }}></TextInput>
                        {
                            this.state.websiteError ?
                                <Text style={styles.errorText} >{this.state.websiteError}</Text>
                                : null
                        }

                    </View>

                    <Text style={{ ...styles.customText, marginTop: 10 }}>Contact person</Text>
                    <View style={styles.inputBoxContainer}>
                        <TextInput
                            value={this.state.contact_person_name}
                            maxLength={20}
                            style={[{ ...styles.inputBox, fontSize: 12 }, this.state.contactPersonError ? styles.error : null]}
                            onChangeText={(contact_person_name) => { this.validate('Contact Person', contact_person_name, 'alphaOnlyWithSpaceanddot'); this.setState({ contact_person_name }) }}
                        ></TextInput>
                        {
                            this.state.contactPersonError ?
                                <Text style={styles.errorText} >{this.state.contactPersonError}</Text>
                                : null
                        }
                    </View>

                    <Text style={{ ...styles.customText, marginTop: 10 }}>Phone number</Text>
                    <View style={styles.inputBoxContainer}>
                        <TextInput
                            value={this.state.contact_person_phone}
                            maxLength={10}
                            style={[{ ...styles.inputBox, fontSize: 12 }, this.state.phoneNumberError ? styles.error : null]}
                            onChangeText={(contact_person_phone) => { this.validatePhone(contact_person_phone); }}
                        ></TextInput>
                        {
                            this.state.phoneNumberError ?
                                <Text style={styles.errorText} >{this.state.phoneNumberError}</Text>
                                : null
                        }
                    </View>

                    <Text style={{ ...styles.customText, marginTop: 10 }}>E-mail address</Text>
                    <View style={styles.inputBoxContainer}>
                        <TextInput
                            value={this.state.contact_person_email}
                            style={[{ ...styles.inputBox, fontSize: 12 }, this.state.emailError ? styles.error : null]}
                            onChangeText={(contact_person_email) => { this.validateEmail(contact_person_email); }}
                        ></TextInput>
                        {
                            this.state.emailError ?
                                <Text style={styles.errorText} >{this.state.emailError}</Text>
                                : null
                        }
                    </View>

                    <Text style={{ ...styles.customText, marginTop: 10 }}>Notes</Text>
                    <View style={styles.inputBoxContainer}>
                        <TextInput
                            onChangeText={(notes) => this.setState({ notes })}
                            value={this.state.notes}
                            numberOfLines={6}
                            multiline={true} style={{ ...styles.inputBox, fontSize: 12 }}></TextInput>
                    </View>

                    <TouchableOpacity
                        onPress={() => this.handleOnSubmit()}
                        style={[styles.searchButton]}>
                        <Text style={{ ...styles.customText, color: '#FFFFFF', fontFamily: 'OpenSans-Regular', fontWeight: 'normal' }}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    customText: {
        fontSize: 12,
        fontFamily: 'OpenSans-Regular',
        color: '#2A2F47'
    },
    inputBoxContainer: {
        marginTop: 5
    },
    inputBox: {
        borderWidth: 1,
        borderColor: '#E6E6EB',
        borderRadius: 5,
        padding: 14
    },
    searchButton: {
        paddingTop: 14,
        paddingBottom: 14,
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#2A2F47',
        marginTop: 20
    },
    error: {
        borderWidth: 1,
        borderColor: 'red'
    },
    errorText: {
        color: 'red',
    }
});