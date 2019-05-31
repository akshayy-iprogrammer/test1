import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Picker, TouchableOpacity, DatePickerAndroid, ToastAndroid, DatePickerIOS, Image, ScrollView, Platform } from 'react-native';
import AddModal from '../../Components/addModal';
import { CustomValidation as regexArray } from '../../Constants/customValidator';
import { addLead } from '../../Networking/API/Lead/leadApi';
import LeadStepper from '../../Components/stepper';
import { listCompany } from '../../Networking/API/Contact/Company/companyApi';
import { getCurrencies, getLeadSources, getUsersList } from '../../Networking/API/commonAPI';
import { getContactPersons } from '../../Networking/API/Contact/Person/personAPi';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../Components/loader';

export default class AddLeadScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            companiesList: [],
            currenciesList: [],
            leadSourcesList: [],
            contactPersonsList: [],
            assignedToList: [],
            isUpdate: false,
            lead_source_id: '1',
            leadSourceError: false,
            lead_title: "",
            leadTitleError: '',
            company_id: '',
            companyError: false,
            expected_closing_date: "",
            expectedCloseDateError: '',
            lead_value: '',
            leadValueError: '',
            currency_id: '',
            currencyError: false,
            is_confidential: '0',
            contact_id: '',
            contactPersonNameError: '',
            contact_person_phone: '',
            contactPersonNumberError: '',
            notes: "",
            is_won: null,
            is_bell_ringed: '0',
            is_hand_over: '0',
            assigned_to: null,
            expectedCloseDate: '',
            addClicked: false,
            fieldsArray: {
                'Lead Title': 'leadTitleError', 'Lead Value': 'leadValueError', 'Expected Close Date': 'expectedCloseDateError',
                'Company Name': 'companyError', 'Currency': 'currencyError', 'Lead Source': 'leadSourceError',
                'Contact Person Number': 'contactPersonNumberError', 'Contact Person Name': 'contactPersonNameError'
            }
        }
        this.selectDate = this.selectDate.bind(this);
        this.validate = this.validate.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({
            handleAddClick: this.addClickHandler
        });
        //api comes
        console.log('component============did=====mount');
        this.getCompanies();
        this.getCurrencies();
        this.getLeadSources();
        this.getContactPersons();
        // this.getAssignedToUsers();
    }

    componentWillMount() {
        var data = this.props.navigation.getParam('data');
        var isUpdate = this.props.navigation.getParam('isUpdate');
        var stepperData = this.props.navigation.getParam('stepperData');
        this.setState({ isUpdate: isUpdate, stepperData: stepperData });
    }

    // async getAssignedToUsers() {
    //     const params ={ };
    //     let response = await getUsersList(params);
    //     console.log(response);

    //     if (response.hasOwnProperty('rows') && response['rows'].length > 0) {
    //         this.setState({ assignedToList : response['rows'] })
    //     }
    // }

    async getContactPersons() {
        const params = {
            "arrayFilters": [
                {
                    "is_deleted": 0
                }
            ],
            "selectFilters": [],
            "sort": {
                "field": "name",
                "sortOrder": "DESC"
            },
            "paginate": {
                "page": 0,
                "limit": 3
            }
        }
        let response = await getContactPersons(params);
        console.log(response);

        if (response.hasOwnProperty('rows') && response['rows'].length > 0) {
            this.setState({ contactPersonsList: response['rows'] })
        }
    }

    async getLeadSources() {
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
        let response = await getLeadSources(params);
        console.log(response);

        if (response.hasOwnProperty('rows') && response['rows'].length > 0) {
            this.setState({ leadSourcesList: response['rows'] })
        }
    }

    async getCurrencies() {
        const params = {
            "arrayFilters": [
                {

                }
            ],
            "selectFilters": [],
            "sort": {
                "field": "short_name",
                "sortOrder": "ASC"
            },
            "paginate": {
                "page": 0,
                "limit": 15
            }
        }
        let response = await getCurrencies(params);
        console.log(response);

        if (response.hasOwnProperty('rows') && response['rows'].length > 0) {
            this.setState({ currenciesList: response['rows'] })
        }
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
            this.setState({ companiesList: response['rows'] })
        }
    }


    validate(type, value, validationType = '') {
        var pattern = new RegExp(regexArray[validationType]);

        if (value === "") {
            this.setState({ [this.state.fieldsArray[type]]: `${type}` + ' is required' })
        } else if (validationType !== '' && !pattern.test(value)) {
            this.setState({ [this.state.fieldsArray[type]]: `${type}` + ' is invalid' })
        } else {
            this.setState({ [this.state.fieldsArray[type]]: false })
        }
    }



    validatePhone = (value) => {
        var pattern = new RegExp(regexArray['numberOnly']);
        console.log('phone', pattern);
        this.setState({ contact_person_phone: value });
        if (value === '') {
            this.setState({ contactPersonNumberError: 'Phone Number is required' });
        } else if (!pattern.test(value)) {
            this.setState({ contactPersonNumberError: 'Phone Number should be only be digits' });
        } else if (value.length < 10) {
            this.setState({ contactPersonNumberError: 'Phone Number should be minimum 10 characters' });
        } else {
            this.setState({ contactPersonNumberError: false })
        }
    }



    companyValidation = () => {
        if (this.state.company_id === '') {
            this.setState({
                companyError: true
            })
        } else {
            this.setState({
                companyError: false
            })
        }
    }

    currencyValidation = () => {
        if (this.state.currency_id === '') {
            this.setState({
                currencyError: true
            })
        } else {
            this.setState({
                currencyError: false
            })
        }
    }

    leadSourceValidation = () => {
        if (this.state.lead_source_id === '') {
            this.setState({
                leadSourceError: true
            })
        } else {
            this.setState({
                leadSourceError: false
            })
        }
    }

    contactPersonValidation = () => {
        if (this.state.contact_id === '') {
            this.setState({
                contactPersonNameError: true
            })
        } else {
            this.setState({
                contactPersonNameError: false
            })
        }
    }

    // assignedToValidation = () => {
    //     if (this.state.assigned_to === '') {
    //         this.setState({
    //             assignedToError: true
    //         })
    //     } else {
    //         this.setState({
    //             assignedToError: false
    //         })
    //     }
    // }

    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <View style={{ flexDirection: 'row', marginBottom: 12, marginTop: 12 }}>

                <TouchableOpacity style={{ padding: 7, backgroundColor: '#3E4561', borderRadius: 5, marginRight: 12 }}
                    onPress={() =>
                        navigation.state.params.handleAddClick()
                    }>
                    <Image source={require('../../Assets/icons/plus-1.png')} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>

            </View>
        ),
    })

    addClickHandler = () => {
        this.setState({
            addClicked: !this.state.addClicked,
        })
    }

    handleOnSubmit() {

        const { lead_title, expected_closing_date, lead_value, contact_person_phone } = this.state;
        this.validate('Lead Title', lead_title, 'alphaOnlyWithSpace');
        this.validate('Lead Value', lead_value, 'numberOnly');
        this.validatePhone(contact_person_phone);
        this.companyValidation();
        this.currencyValidation();
        this.contactPersonValidation();
        // this.assignedToValidation();
        this.leadSourceValidation();
        this.validate('Expected Close Date', expected_closing_date);

        setTimeout(() => { this.checkFormValidation() }, 3000);

    }

    handOverToSales = () => {

        if (this.state.is_hand_over == '0') {
            this.setState({ is_hand_over: '1' })
        } else {
            this.setState({ is_hand_over: '0' })
        }
    }

    async checkFormValidation() {



        var isFormValid = Object.values(this.state.fieldsArray).filter((errorName) => {
            return this.state[errorName] !== false;
        });



        if (isFormValid.length == 0) {
            this.setState({
                loading: true
            })
            const params = {
                "lead_source_id": this.state.lead_source_id,
                "lead_title": this.state.lead_title,
                "company_id": this.state.company_id,
                "expected_closing_date": this.state.expected_closing_date,
                "lead_value": this.state.lead_value,
                "currency_id": this.state.currency_id,
                "is_confidential": this.state.is_confidential,
                "contact_id": this.state.contact_id,
                "contact_person_phone": this.state.contact_person_phone,
                "notes": this.state.notes,
                "is_won": this.state.is_won,
                "is_bell_ringed": this.state.is_bell_ringed,
                "is_hand_over": this.state.is_hand_over,
                "assigned_to": this.state.assigned_to,
                "user_id": 4
            }
            console.log(params);

            var status = await addLead(params);
            console.log(status)
            if (status) {
                ToastAndroid.show('Lead Added Successfully', ToastAndroid.SHORT);
                this.setState({
                    loading: false
                })
                this.props.navigation.navigate('PipeHome');
            } else {
                this.setState({
                    loading: false
                })
                ToastAndroid.show('Lead could not be added', ToastAndroid.SHORT);
            }
        } else {
            console.log('invalid');
            ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
        }
    }



    async selectDate() {
        var d = new Date();
        var currentDate = parseInt(d.getDate());
        var currentMonth = parseInt(d.getMonth());
        var currentYear = parseInt(d.getFullYear());
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(currentYear, currentMonth, currentDate),
                minDate: new Date(currentYear, currentMonth, currentDate)
            }).then((response) => {
                if (response.action === 'dismissedAction') {
                    console.log('Date not selected.');
                    this.validate('Expected Close Date', '');
                }
                return response;
            }).then((res) => {
                if (res.action === 'dateSetAction') {

                    if (res.month < 10) {
                        res.month = '0' + (res.month + 1);
                    } else {
                        res.month = res.month + 1;
                    }
                    var selectedDate = res.year + "-" + res.month + "-" + res.day;
                    console.log('-==-=-=-=-=--=-=-=', selectedDate);

                    this.setState({
                        expected_closing_date: selectedDate
                    });
                    this.validate('Expected Close Date', selectedDate);
                }
            });
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }


    render() {

        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                    {
                        this.state.isUpdate ?
                            <View>
                                <View style={{ flexDirection: 'row', paddingRight: 5 }}>
                                    <Text style={{ fontSize: 14, color: '#2A2F47', fontWeight: 'bold', width: '35%' }}>Pipeline Stage</Text>
                                </View>
                                <LeadStepper stepperData={this.state.stepperData} />

                                <View style={{ marginTop: 5, flexDirection: 'row' }}>
                                    <View style={{ flex: 0.5, ...styles.inputBoxContainer, padding: 0, height: 20 }}>
                                        <TouchableOpacity
                                            style={[{ ...styles.navigationButton }]}
                                            onPress={() => console.log('previous')}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                                <View style={{ flex: 1, ...styles.inputBoxContainer, padding: 5, height: 20 }}>
                                                    <Image source={require('../../Assets/icons/forma-1.png')} style={{ width: 20, height: 10 }} />
                                                </View>

                                                <View style={{ flex: 1, ...styles.inputBoxContainer, padding: 0, height: 20 }}>
                                                    <Text style={styles.customText}>Prev</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flex: 1, ...styles.inputBoxContainer, padding: 0, height: 20, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ ...styles.customText, marginTop: 10 }}>Negotiation</Text>
                                    </View>
                                    <View style={{ flex: 0.5, ...styles.inputBoxContainer, padding: 0, height: 20 }}>
                                        <TouchableOpacity
                                            style={[{ ...styles.navigationButton, padding: 5 }]}
                                            onPress={() => console.log('previous')}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ flex: 1, ...styles.inputBoxContainer, padding: 0, height: 20 }}>
                                                    <Text style={styles.customText}>Next</Text>
                                                </View>
                                                <View style={{ flex: 1, ...styles.inputBoxContainer, padding: 5, height: 20 }}>
                                                    <Image source={require('../../Assets/icons/forma-1-copy-2.png')} style={{ width: 20, height: 10 }} />
                                                </View>

                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ marginTop: 20, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, ...styles.inputBoxContainer, borderRadius: 5 }}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ is_won: '0' })}
                                            style={[{ ...styles.inputBox, padding: 12, justifyContent: 'center', alignItems: 'center' }
                                                , this.state.is_won == '0' ? { borderColor: '#000000' } : { borderColor: '#E6E6EB' }]}>
                                            <Text style={styles.customText}>Win</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flex: 1, ...styles.inputBoxContainer, borderRadius: 5, marginLeft: 3 }}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ is_won: '1' })}
                                            style={[{ ...styles.inputBox, padding: 12, justifyContent: 'center', alignItems: 'center' }
                                                , this.state.is_won == '1' ? { borderColor: '#000000' } : { borderColor: '#E6E6EB' }]}>
                                            <Text style={styles.customText}>Loss</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flex: 1, ...styles.inputBoxContainer, borderRadius: 5, marginLeft: 3 }}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ is_won: '2' })}
                                            style={[{ ...styles.inputBox, padding: 12, justifyContent: 'center', alignItems: 'center' }
                                                , this.state.is_won == '2' ? { borderColor: '#000000' } : { borderColor: '#E6E6EB' }]}>
                                            <Text style={styles.customText}>Park</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                            :
                            null
                    }

                    <View style={[this.state.isUpdate ? { marginTop: 20 } : null]}>
                        <Text style={{ ...styles.customText }}>Lead title</Text>
                        <View style={{ ...styles.inputBoxContainer, borderColor: '#e5e6ea' }}>
                            <TextInput
                                maxLength={20}
                                style={[{ ...styles.inputBox, fontSize: 13 }, this.state.leadTitleError ? styles.error : null]}
                                value={this.state.lead_title}
                                onChangeText={(lead_title) => { this.validate('Lead Title', lead_title, 'alphaOnlyWithSpace'); this.setState({ lead_title }) }}></TextInput>
                            {
                                this.state.leadTitleError
                                    ? <Text style={styles.errorText} >{this.state.leadTitleError}</Text>
                                    : null
                            }
                        </View>


                        <Text style={{ ...styles.customText, marginTop: 15 }}>Company</Text>
                        <View style={[{ ...styles.inputBox, marginTop: 5, padding: 3, borderColor: '#e5e6ea' }, this.state.companyError ? styles.error : null]}>
                            <Picker
                                selectedValue={this.state.company_id}
                                onValueChange={(itemValue, itemIndex) => this.setState({ company_id: itemValue, companyError: false })}
                                textStyle={{ fontSize: 12 }}>
                                <Picker.Item label="Select company" value="" color="#a1abbb" />
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
                            this.state.companyError
                                ? <Text style={styles.errorText} >Company Name is required</Text>
                                : null
                        }

                        <Text style={{ ...styles.customText, marginTop: 15 }}>Expected close date</Text>
                        {
                            Platform.OS === 'ios'
                                ? <DatePickerIOS date={this.state.expected_closing_date} onDateChange={(date) => this.setState({ expected_closing_date: date })} />
                                : <View style={[{ ...styles.inputBox, padding: 14, flexDirection: 'row', marginTop: 5 }, this.state.expectedCloseDateError ? styles.error : null]}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.customText}>{this.state.expected_closing_date}</Text>
                                    </View>
                                    <TouchableOpacity style={{ flex: 0 }} onPress={() => this.selectDate()}>
                                        <Image source={require('../../Assets/icons/activities.png')} style={{ width: 18, height: 17 }} />
                                    </TouchableOpacity>
                                </View>

                        }

                        {
                            this.state.expectedCloseDateError
                                ? <Text style={styles.errorText} >{this.state.expectedCloseDateError}</Text>
                                : null
                        }




                        <Text style={{ ...styles.customText, marginTop: 15 }}>Lead value</Text>
                        <View style={{ marginTop: 5, flexDirection: 'row' }}>

                            <View style={{ flex: 1, padding: 0, width: '55%' }}>
                                <TextInput
                                    value={this.state.lead_value}
                                    maxLength={10}
                                    style={[{ ...styles.inputBox }, this.state.leadValueError ? styles.error : null]}
                                    onChangeText={(lead_value) => { this.validate('Lead Value', lead_value, 'numberOnly'); this.setState({ lead_value }) }}></TextInput>
                                <Text style={styles.errorText}>{this.state.leadValueError}</Text>
                            </View>

                            <View style={{ flex: 0, width: '38%', marginLeft: 5 }}>
                                <View style={[{ ...styles.inputBox, padding: 3 }, this.state.currencyError ? styles.error : null]}>
                                    <Picker
                                        selectedValue={this.state.currency_id}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ currency_id: itemValue, currencyError: false })}
                                        textStyle={{ fontSize: 8 }} >
                                        <Picker.Item label="Select" value="" color="#a1abbb" />
                                        {
                                            this.state.currenciesList.map((data, index) => {
                                                return (
                                                    <Picker.Item key={index} label={data.short_name} value={data.id} />
                                                )
                                            })
                                        }
                                    </Picker>
                                </View>
                                {
                                    this.state.currencyError ?
                                        <View><Text style={styles.errorText} >Currency is required</Text></View>
                                        : null
                                }

                            </View>
                        </View>

                        <Text style={{ ...styles.customText }}>Is the lead value confidential?</Text>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <TouchableOpacity
                                style={[{ flex: 1, ...styles.inputBox, padding: 15, justifyContent: 'center', alignItems: 'center' },
                                this.state.is_confidential ? { borderColor: '#232f44' } : { borderColor: '#E6E6EB' }]}
                                onPress={() => this.setState({ is_confidential: true })}>
                                <Text
                                    style={[{ ...styles.customText }, this.state.is_confidential ? { color: '#232f44' } : { color: '#c1c6d1' }]}
                                >Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[{ flex: 1, ...styles.inputBox, padding: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 5 },
                                this.state.is_confidential ? { borderColor: '#E6E6EB' } : { borderColor: '#232f44' }]}
                                onPress={() => this.setState({ is_confidential: false })}
                            >
                                <Text
                                    style={[{ ...styles.customText }, this.state.is_confidential ? { color: '#c1c6d1' } : { color: '#232f44' }]}
                                >No</Text>
                            </TouchableOpacity>
                        </View>


                        <Text style={{ ...styles.customText, marginTop: 15 }}>Contact person name</Text>
                        <View style={[{ flex: 1, marginTop: 5, ...styles.inputBox, padding: 3 }, this.state.contactPersonNameError ? styles.error : null]}>
                            <Picker
                                selectedValue={this.state.contact_id}
                                onValueChange={(itemValue, itemIndex) => { console.log(itemValue, '23444445----------------'); this.setState({ contact_id: itemValue, contactPersonNameError: false }) }}
                                itemStyle={{ fontSize: 8 }} >
                                <Picker.Item label="Select Contact" value="" color="#a1abbb" />
                                {
                                    this.state.contactPersonsList.map((data, index) => {
                                        return (
                                            <Picker.Item key={index} label={data.name} value={data.id} />
                                        )
                                    })
                                }
                            </Picker>
                        </View>
                        {
                            this.state.contactPersonNameError ?
                                <View><Text style={styles.errorText} >Contact Person Name is required</Text></View>
                                : null
                        }


                        <Text style={{ ...styles.customText, marginTop: 15 }}>Contact person phone number</Text>
                        <View style={styles.inputBoxContainer}>
                            <TextInput
                                value={this.state.contact_person_phone}
                                maxLength={10}
                                style={[{ ...styles.inputBox, fontSize: 12 }, this.state.contactPersonNumberError ? styles.error : null]}
                                onChangeText={(contact_person_phone) => { this.validatePhone(contact_person_phone); }}></TextInput>

                            {
                                this.state.contactPersonNumberError ?
                                    <View><Text style={styles.errorText} >{this.state.contactPersonNumberError}</Text></View>
                                    : null
                            }
                        </View>

                        <Text style={{ ...styles.customText, marginTop: 15 }}>Lead Source</Text>
                        <View style={[{ ...styles.inputBox, marginTop: 5, padding: 3 }, this.state.leadSourceError ? styles.error : null]}>
                            <Picker
                                selectedValue={this.state.lead_source_id}
                                onValueChange={(itemValue, itemIndex) => this.setState({ lead_source_id: itemValue, leadSourceError: false })}
                                itemStyle={{ fontSize: 8 }} >
                                <Picker.Item label="Contact" value="" color="#a1abbb" />
                                {
                                    this.state.leadSourcesList.map((data, index) => {
                                        return (
                                            <Picker.Item key={index} label={data.name} value={data.id} />
                                        )
                                    })
                                }
                            </Picker>
                        </View>
                        {
                            this.state.leadSourceError ? <View><Text style={styles.errorText} >Lead Source is required</Text></View> : null
                        }


                        <Text style={{ ...styles.customText, marginTop: 15 }}>Notes</Text>
                        <View style={styles.inputBoxContainer}>
                            <TextInput
                                onChangeText={(notes) => this.setState({ notes })}
                                value={this.state.notes}
                                numberOfLines={6} multiline={true} style={{ ...styles.inputBox, fontSize: 12 }}></TextInput>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>

                            <Text style={{ ...styles.customText, marginTop: 10, flex: 1 }}>Handover to sales</Text>

                            <View style={{ flex: 0, marginTop: 10 }}>
                                <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.handOverToSales()}>
                                    {
                                        this.state.is_hand_over === '0' ?
                                            <Image source={require('../../Assets/icons/forma-1-copy-3.png')} style={{ width: 162, height: 59 }} />
                                            :
                                            <Image source={require('../../Assets/icons/group-3.png')} style={{ width: 162, height: 59 }} />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* <Text style={{ ...styles.customText, marginTop: 15 }}>Assigned To</Text>
                    <View style={[{ ...styles.inputBox, marginTop: 5, padding: 3 }, this.state.assignedToError ? styles.error : null]}>
                        <Picker
                            selectedValue={this.state.assigned_to}
                            onValueChange={(itemValue, itemIndex) => this.setState({ assigned_to: itemValue, assignedToError: false })}
                            itemStyle={{ fontSize: 8 }} >
                            <Picker.Item label="Assigned To" value="" color="#a1abbb" />
                            {
                                this.state.assignedToList.map((data, index) => {
                                    return (
                                        <Picker.Item key={index} label={data.name} value={data.id} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    {
                        this.state.assignedToError ? <View><Text style={styles.errorText} >Assigned To is required</Text></View> : null
                    } */}

                        <TouchableOpacity onPress={() => this.handleOnSubmit()}
                            style={[styles.searchButton]}>
                            <Text style={{ ...styles.customText, color: '#FFFFFF', fontFamily: 'OpenSans-Regular', fontWeight: 'normal' }}>Save</Text>
                        </TouchableOpacity>


                    </View>
                    <AddModal visible={this.state.addClicked} addClickHandler={this.addClickHandler} myProps={this.props.navigation} />
                </ScrollView >
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
        padding: 16,
    },
    customText: {
        fontSize: 12,
        fontFamily: 'OpenSans-Regular',
        color: '#273344'
    },
    inputBoxContainer: {
        marginTop: 8
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
    },
    navigationButton: {
        backgroundColor: '#DCE0E7',
        justifyContent: 'center',
        height: 39,
        borderRadius: 4
    }
});