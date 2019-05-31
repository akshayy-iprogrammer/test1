import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, CheckBox } from 'react-native';

export default class ActivityList extends Component {
    constructor(props) {
        super(props);
        this.state = { "checkValue": [] }

    }

    changeValue(id) {
        tempCheckValue = this.state.checkValue
        tempCheckValue[id] = !tempCheckValue[id]
        this.setState({ checkValue: tempCheckValue })


    }
    render() {
        return (
            <View style={{ backgroundColor: "white", paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                {
                    this.props.data.map((value, index1) => {
                        return (
                            <View key={index1} style={{ marginTop: 15 }} >
                                <View>
                                    <Text style={{ fontWeight: 'bold' }}>{value.date}</Text>
                                </View>

                                <View style={{}}>
                                    {
                                        value.content.map((cont, index2) => {

                                            switch (cont.type) {
                                                case "remainder":
                                                    return (<View key={index1 + index2} style={{ ...styles.eventCards, backgroundColor: "rgba(251,244,217,1)", borderColor: "rgba(255,218,68,1)" }}>
                                                        <View style={styles.timeText}>
                                                            <Text>{cont.time}</Text>
                                                        </View>
                                                        <View style={styles.textAlign}>
                                                            <Text style={{ fontWeight: 'bold' }}>{cont.title}</Text>
                                                            <View style={{ flexDirection: "row", paddingTop: 5 }}>
                                                                <View style={styles.subTextSpacing}>
                                                                    <Image source={require('../Assets/icons/contact-profile.png')} style={styles.iconDimension} />
                                                                </View><Text style={{ marginRight: 5, fontFamily: "OpenSans" }}>{cont.Name}</Text><View style={styles.subTextSpacing}>
                                                                    <Image source={require('../Assets/icons/contact-profile.png')} style={styles.iconDimension} />
                                                                </View><Text style={{ marginRight: 5, fontFamily: "OpenSans" }}>{cont.companyName}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    )
                                                case "meeting":
                                                    return (<View key={index1 + index2} style={{ ...styles.eventCards, backgroundColor: "rgba(225,102,127,0.1)", borderColor: "rgba(225,102,127,1)" }}>
                                                        <View style={styles.timeText}>
                                                            <Text>{cont.time}</Text>
                                                        </View>
                                                        <View style={styles.textAlign}>
                                                            <Text style={{ fontWeight: 'bold', fontFamily: "OpenSans" }}>{cont.title}</Text>
                                                            <View style={{ flexDirection: "row", paddingTop: 5 }}>
                                                                <View style={styles.subTextSpacing}>
                                                                    <Image source={require('../Assets/icons/contact-profile.png')} style={styles.iconDimension} />
                                                                </View><Text style={{ marginRight: 5, fontFamily: "OpenSans" }}>{cont.Name}</Text><View style={styles.subTextSpacing}>
                                                                    <Image source={require('../Assets/icons/contact-profile.png')} style={styles.iconDimension} />
                                                                </View><Text style={{ marginRight: 5, fontFamily: "OpenSans" }}>{cont.companyName}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    )
                                                case "checklist":

                                                    return (<View key={index1 + index2} style={{ ...styles.eventCards, backgroundColor: "rgba(35,47,68,0.08)", borderColor: "rgba(35,47,68,1)" }}>
                                                        <View style={styles.timeText}>
                                                            <CheckBox value={this.state.checkValue[index1 + index2]} onChange={() => this.changeValue(index1 + index2)} />
                                                        </View>
                                                        <View style={styles.textAlign}>
                                                            <Text style={{ fontFamily: "OpenSans" }}>{cont.title}</Text>
                                                        </View>
                                                    </View>
                                                    )
                                                default: return null;
                                            }

                                        })
                                    }
                                </View>
                            </View>
                        )
                    })


                }
            </View>
        )

    }

}

const styles = StyleSheet.create({

    eventCards: {
        flexDirection: "row",
        borderLeftWidth: 5,
        borderRadius: 5,
        marginTop: 10,
        height: 70,

    },
    timeText: {
        flex: 1,
        justifyContent: "center",
        padding: 10
    },
    textAlign: {
        flex: 6,
        justifyContent: "center"

    },
    iconDimension: {
        width: 20,
        height: 19
    },
    subTextSpacing: {

        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,

    }

})