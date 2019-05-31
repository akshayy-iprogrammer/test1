import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import AddModal from '../../Components/addModal';

export default class FeedDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addClicked: false,
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#2A2F47',
        },
        headerRight: (
            <View style={{ flexDirection: 'row', marginBottom: 12, marginTop: 12 }}>
                <TouchableOpacity style={{ padding: 7, backgroundColor: '#3E4561', borderRadius: 5, marginRight: 12 }}
                    onPress={() =>
                        navigation.state.params.handleAddClick()
                    }
                >
                    <Image source={require('../../Assets/icons/plus-1.png')} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>

            </View>
        ),

        headerLeftContainerStyle: {
            paddingLeft: 23
        },
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

    render() {
        const { navigation } = this.props;
        const awtar = navigation.getParam('awtar');
        const userName = navigation.getParam('userName');
        const content = navigation.getParam('content');
        const clientName = navigation.getParam('clientName');
        const lastSeen = navigation.getParam('lastSeen');
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../Assets/icons/rounded-rectangle-2.png')} style={{ width: '102%', height: 'auto', flexDirection: 'row', paddingLeft: 5, paddingTop: 30, paddingRight: 5, paddingBottom: 15, }}>
                    <View>
                        {/* <View style={{ backgroundColor: '#39784f', paddingLeft: 5, paddingTop: 30, paddingRight: 5, paddingBottom: 15, }}> */}
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.ImageContainer}>
                                <Image style={styles.AvtarImage} source={require('../../Assets/icons/my-pipeline.png')} />
                            </View>
                            <View style={styles.WordContainer}>
                                <Text style={styles.headLine}>
                                    <Text style={{ fontWeight: "bold" }}>{JSON.parse(JSON.stringify(userName))}</Text>
                                    <Text> {JSON.parse(JSON.stringify(content))}</Text>
                                    <Text style={{ fontWeight: "bold" }}> {JSON.parse(JSON.stringify(clientName))}</Text>
                                </Text>
                                <Text style={styles.lastSeen}>{JSON.parse(JSON.stringify(lastSeen))}</Text>

                            </View>
                        </View>
                        <View style={{ backgroundColor: '#FFF', opacity: 0.2, height: 2, marginLeft: 12, marginRight: 12 }} />

                        <View style={{ marginTop: 14, marginLeft: 12, marginRight: 12 }}>
                            <Text style={styles.description}  >Congratulate Bill Townsend for signing a contract with Swedbank! The service to be delivered is Mobile app development. A team of 7 persons will work for Swedbank for minimum 9 months. Value of the contract is 250.000 EURO</Text>
                        </View>
                        {/* </View> */}
                    </View>
                </ImageBackground>
                <AddModal visible={this.state.addClicked} addClickHandler={this.addClickHandler} myProps={this.props.navigation} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ImageContainer: {
        flex: 0,
    },
    WordContainer: {
        flex: 0,
        //  marginRight: 20,        
        //paddingRight: 20,
    },
    headLine: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 12,
        color: '#FFFFFF',
        marginRight: 15,
        paddingRight: 15,
        marginTop: 13,
    },
    lastSeen: {
        fontSize: 11,
        color: '#FFFFFF',
        marginBottom: 33,
        marginTop: 4,
        opacity: 0.6
    },
    description: {
        fontSize: 11,
        lineHeight: 15,
        color: '#FFFFFF',
        marginBottom: 12,
        opacity: 0.9

    },
    AvtarImage: { margin: 12, width: 30, height: 30, borderRadius: 6, backgroundColor: 'powderblue' },
})