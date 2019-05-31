import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Picker, TouchableOpacity, DatePickerAndroid, Image, ScrollView, ToastAndroid, Platform } from 'react-native';
import { CustomValidation as regexArray } from '../../../Constants/customValidator';
import { addPerson, updatePerson } from '../../../Networking/API/Contact/Person/personAPi';
import { listCompany } from '../../../Networking/API/Contact/Company/companyApi';
import { getCountries, getStates, getCities } from '../../../Networking/API/commonAPI';
import AsyncStorage from '@react-native-community/async-storage';

export default class AddPersonScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.data ? this.props.data.name : '',
            nameError: '',
            companiesList: [],
            company_id: '',
            companyError: '',
            phone_number: this.props.data ? this.props.data.phone_number : '',
            phoneNumberError: '',
            email: this.props.data ? this.props.data.email : '',
            emailError: '',
            address_line_1: this.props.data ? this.props.data.address_line_1 : '',
            address_line_2: this.props.data ? this.props.data.address_line_2 : '',
            country_id: '',
            state_id: '',
            city_id: '',
            addressError: '',
            notes: this.props.data ? this.props.data.notes : '',
            countriesList: [],
            statesList: [],
            citiesList: [],
            fieldsArray: {
                'Name': 'nameError', 'Company': 'companyError', 'Phone Number': 'phoneNumberError',
                'E-mail': 'emailError', 'Address Line 1': 'addressLine1Error', 'Address Line 2': 'addressLine2Error',
                'Country': 'countryRegisteredError', 'State': 'stateError', 'City': 'cityError'
            }
        }
        // this._currentContactType = this._currentContactType.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }


    componentDidMount() {
        //api comes
        console.log('comdidmount', this.props);

        this.getCompanies();
        this.getCountriesFn();
    }

    async getCompanies() {
        const params = {
            "arrayFilters": [
                {
                    "is_deleted": 0
                }
            ],
            "selectFilters": [],
            "sort": {
                "field": "id",
                "sortOrder": "ASC"
            },
            "paginate": {
                "page": 0,
                "limit": 100
            }
        }
        let response = await listCompany(params);

        if (response.hasOwnProperty('rows') && response['rows'].length > 0) {
            this.setState({ companiesList: response['rows'] }, () => {
                if (this.props.data.company_id) {
                    this.setState({ company_id: this.props.data.contact_company.id, companyError: false })
                }
            })
        }
    }

    validate(type, value, validationType = '') {

        var pattern = new RegExp(regexArray[validationType]);

        if (value === "" || value === undefined) {
            this.setState({ [this.state.fieldsArray[type]]: `${type}` + ' is required' })
        } else if (!pattern.test(value)) {
            this.setState({ [this.state.fieldsArray[type]]: `${type}` + ' is invalid' })
        } else {
            this.setState({ [this.state.fieldsArray[type]]: false })
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
            })
        } else {
            this.setState({
                cityError: false
            })
        }
    }

    validateEmail = (value) => {
        var pattern = new RegExp(regexArray['email']);
        console.log(pattern, 'sdfs===========');

        this.setState({ email: value });
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
        this.setState({ phone_number: value });
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

    async handleOnSubmit() {
        const { name, company_id, phone_number, email, address_line_1, address_line_2, notes, state_id, country_id } = this.state;
        this.validate('Name', name, 'alphaOnlyWithSpace');
        this.validate('Company', company_id, 'numberOnly');
        this.validatePhone(phone_number);
        this.validate('Address Line 1', address_line_1, '');
        this.validate('Address Line 2', address_line_2, '');
        this.validate('E-mail', email, '');
        this.countryRegisteredValidation();
        this.stateValidation();
        this.cityValidation();

        setTimeout(() => { this.checkFormValidation() }, 2000);
    }

    async checkFormValidation() {

        var userId = await AsyncStorage.getItem('userId').then((value) => {
            return parseInt(value);
        });

        var isFormValid = Object.values(this.state.fieldsArray).filter((errorName) => {
            return this.state[errorName] !== false;
        }).length == 0;

        if (isFormValid) {
            this.props.loading(true);

            console.log('valid');
            let params = {
                "name": this.state.name,
                "company_id": this.state.company_id,
                "phone_number": this.state.phone_number,
                "email": this.state.email,
                "address_line_1": this.state.address_line_1,
                "address_line_2": this.state.address_line_2,
                "country_id": this.state.country_id,
                "state_id": this.state.state_id,
                "city_id": this.state.city_id,
                "notes": this.state.notes,
                "user_id": userId
            }
            console.log(this.props.isUpdate);

            if (this.props.isUpdate) {
                params.id = this.props.data.id;
                var status = await updatePerson(params);
                console.log(status)
                if (status) {
                    this.props.loading(false);
                    ToastAndroid.show('Person Updated Successfully', ToastAndroid.SHORT);
                    this.props.navigation.navigate('PipeHome');
                } else {
                    this.props.loading(false);
                    ToastAndroid.show('Person could not be updated', ToastAndroid.SHORT);
                }
            } else {
                var status = await addPerson(params);
                console.log(status)
                if (status) {
                    ToastAndroid.show('Person Added Successfully', ToastAndroid.SHORT);
                    this.props.loading(false);
                    this.props.navigation.goBack();
                } else {
                    this.props.loading(false);
                    ToastAndroid.show('Person could not be added', ToastAndroid.SHORT);
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
        console.log(response);

        if (response.hasOwnProperty('rows') && response['rows'].length > 0) {
            this.setState({
                countriesList: response['rows']
            }, () => {
                if (this.props.data.country_id) {
                    this.setState({ country_id: this.props.data.country_id, countryRegisteredError: false })
                }
                this.getStatesFn(this.props.data.country_id)
            })
        }

    }

    async getStatesFn(countryId) {
        console.log(countryId, 'countid-------------------------');

        this.setState({
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
                console.log(this.props.data.state_id);

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
                    <Text style={{ ...styles.customText, marginTop: 10 }}>Name</Text>
                    <View style={styles.inputBoxContainer}>
                        <TextInput
                            value={this.state.name}
                            maxLength={20}
                            style={[{ ...styles.inputBox, fontSize: 12 }, this.state.nameError ? styles.error : null]}
                            onChangeText={(name) => { this.validate('Name', name, 'alphaOnlyWithSpace', 20); this.setState({ name }) }}></TextInput>
                        {
                            this.state.nameError ?
                                <View><Text style={styles.errorText} >{this.state.nameError}</Text></View>
                                : null
                        }

                    </View>

                    <Text style={{ ...styles.customText, marginTop: 10 }}>Company</Text>
                    <View style={[{ ...styles.inputBox, marginTop: 5, padding: 3 }, this.state.companyError ? styles.error : null]}>
                        <Picker
                            selectedValue={this.state.company_id}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({ company_id: itemValue, companyError: false })
                            }}
                            itemStyle={Platform.OS === 'ios' ? null : { fontSize: 8, height: 50 }}>
                            <Picker.Item label="Select company" value="" color="#E6E6EB" />
                            {
                                this.state.companiesList.map((data, index) => {
                                    return (
                                        <Picker.Item key={index} label={data.company_name} value={data.id} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    {
                        this.state.companyError ?
                            <View><Text style={styles.errorText} >{this.state.companyError}</Text></View>
                            : null
                    }


                    <Text style={{ ...styles.customText, marginTop: 10 }}>Phone number</Text>
                    <View style={styles.inputBoxContainer}>
                        <TextInput
                            value={this.state.phone_number}
                            maxLength={10}
                            style={[{ ...styles.inputBox, fontSize: 12 }, this.state.phoneNumberError ? styles.error : null]}
                            onChangeText={(phone_number) => { this.validatePhone(phone_number) }}
                        ></TextInput>
                        {
                            this.state.phoneNumberError ?
                                <View><Text style={styles.errorText} >{this.state.phoneNumberError}</Text></View>
                                : null
                        }

                    </View>

                    <Text style={{ ...styles.customText, marginTop: 10 }}>E-mail address</Text>
                    <View style={styles.inputBoxContainer}>
                        <TextInput
                            value={this.state.email}
                            style={[{ ...styles.inputBox, fontSize: 12 }, this.state.emailError ? styles.error : null]}
                            onChangeText={(email) => { this.validateEmail(email) }}
                            maxLength={100}
                        ></TextInput>
                        {
                            this.state.emailError ?
                                <View><Text style={styles.errorText} >{this.state.emailError}</Text></View>
                                : null
                        }

                    </View>

                    <Text style={{ ...styles.customText, marginTop: 10 }}>Address Line 1</Text>
                    <View style={styles.inputBoxContainer}>
                        <TextInput
                            value={this.state.address_line_1}
                            maxLength={100}
                            style={[{ ...styles.inputBox, fontSize: 12 }, this.state.addressLine1Error ? styles.error : null]}
                            onChangeText={(address_line_1) => { this.validate('Address Line 1', address_line_1, ''); this.setState({ address_line_1 }) }}
                        ></TextInput>
                        {
                            this.state.addressLine1Error ?
                                <View><Text style={styles.errorText} >{this.state.addressLine1Error}</Text></View>
                                : null
                        }
                    </View>

                    <Text style={{ ...styles.customText, marginTop: 10 }}>Address Line 2</Text>
                    <View style={styles.inputBoxContainer}>
                        <TextInput
                            value={this.state.address_line_2}
                            maxLength={100}
                            style={[{ ...styles.inputBox, fontSize: 12 }, this.state.addressLine2Error ? styles.error : null]}
                            onChangeText={(address_line_2) => { this.validate('Address Line 2', address_line_2, ''); this.setState({ address_line_2 }) }}
                        ></TextInput>
                        {
                            this.state.addressLine2Error ?
                                <View><Text style={styles.errorText} >{this.state.addressLine2Error}</Text></View>
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
                            itemStyle={{ fontSize: 8 }}>
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
                            itemStyle={{ fontSize: 3 }}
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



                    <Text style={{ ...styles.customText, marginTop: 10 }}>Notes</Text>
                    <View style={styles.inputBoxContainer}>
                        <TextInput
                            onChangeText={(notes) => this.setState({ notes })}
                            value={this.state.notes}
                            numberOfLines={6}
                            multiline={true} style={{ ...styles.inputBox, fontSize: 12 }}></TextInput>
                    </View>

                    <View>
                        <TouchableOpacity
                            onPress={() => this.handleOnSubmit()}
                            style={[styles.searchButton]}>
                            <Text style={{ ...styles.customText, color: '#FFFFFF', fontFamily: 'OpenSans-Regular', fontWeight: 'normal' }}>Save</Text>
                        </TouchableOpacity>
                    </View>

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
        color: '#273344'
    },
    inputBoxContainer: {
        marginTop: 5
    },
    inputBox: {
        borderWidth: 1,
        borderColor: '#E6E6EB',
        borderRadius: 5,
        padding: 13
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