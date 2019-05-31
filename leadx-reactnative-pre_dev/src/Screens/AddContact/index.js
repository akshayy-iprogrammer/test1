import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Picker, TouchableOpacity, DatePickerAndroid, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AddPersonScreen from './AddPerson/index';
import AddCompanyScreen from './AddCompany/index';
import AddModal from '../../Components/addModal';
import Loader from '../../Components/loader';



export default class AddContactScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editData: {},
            isEdit: false,
            currentContactType: true,
            addClicked: false,
            loading: false
        }
        this._currentContactType = this._currentContactType.bind(this);
    }

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
        headerTitle: navigation.getParam('isUpdate') ? 'Edit contact' : 'Add contact'
    })

    addClickHandler = () => {
        this.setState({
            addClicked: !this.state.addClicked,
        })
    }

    componentDidMount() {

        this.props.navigation.setParams({
            handleAddClick: this.addClickHandler

        });
    }

    componentWillMount() {
        console.log('arrrivveddddd');

        if (this.props.navigation.getParam('isUpdate')) {
            this.setState({ isEdit: this.props.navigation.getParam('isUpdate') })
            let type = this.props.navigation.getParam('type') === 'person';
            this._currentContactType(type);
            var contactData = this.props.navigation.getParam('contactData');
            console.log(contactData);
            this.setState({
                editData: contactData
            })
        }
    }

    _currentContactType(type) {
        // this.setState({currentContactType : 'person'});
        console.log(type)
        this.setState({ currentContactType: type })

    }

    isLoading = (status) => {
        this.setState({
            loading: status
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                    <View >
                        <Text style={{ ...styles.customText, marginTop: 10 }}>Type</Text>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <TouchableOpacity style={[this.state.currentContactType ? { borderColor: '#232f44' } : { borderColor: '#e5e6ea' }, styles.inputBox]} onPress={this.props.navigation.getParam('isUpdate') ? null : () => this._currentContactType(true)}>
                                <Text style={[this.state.currentContactType ? { color: '#232f44' } : { color: '#e5e6ea' }, styles.customText]}>Person</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[this.state.currentContactType ? { borderColor: '#e5e6ea' } : { borderColor: '#232f44' }, styles.inputBox, { marginLeft: 5 }]} onPress={this.props.navigation.getParam('isUpdate') ? null : () => this._currentContactType(false)}>
                                <Text style={[this.state.currentContactType ? { color: '#e5e6ea' } : { color: '#232f44' }, styles.customText]}>Company</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        {
                            this.state.currentContactType ? <AddPersonScreen data={this.state.editData} isUpdate={this.state.isEdit} navigation={this.props.navigation} loading={this.isLoading} /> : <AddCompanyScreen data={this.state.editData} isUpdate={this.state.isEdit} navigation={this.props.navigation} loading={this.isLoading} />
                        }
                    </View>
                    <AddModal visible={this.state.addClicked} addClickHandler={this.addClickHandler} myProps={this.props.navigation} />
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
        padding: 16,
    },
    customText: {
        fontSize: 12,
        fontFamily: 'OpenSans-Regular',

        fontWeight: "600"
    },
    inputBoxContainer: {
        marginTop: 5
    },
    inputBox: {
        flex: 1,
        borderWidth: 1,
        // borderColor: '#E6E6EB',
        borderRadius: 5,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchButton: {
        paddingTop: 14,
        paddingBottom: 14,
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#2A2F47',
        marginTop: 20
    }
});