import React from 'react';
import {Text, View, Image, Button, StyleSheet, AsyncStorage,ScrollView,
    TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconL from 'react-native-vector-icons/FontAwesome';

export default class Logs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            logs:[]
        }
    }

    static navigationOptions = {
        tabBarLabel:'Logs',
    tabBarIcon: () => {
        return <Icon name="ios-call" size={25} color="#fff"/>;
    }
    }

    getLogs = () =>  {
        let {logs} = this.state;
                  // AsyncStorage.removeItem('logs');
        return AsyncStorage.getItem('logs').then((data) => {
            if(data) {
                this.setState({
                    logs: JSON.parse(data),
                });
            } else {
                this.setState({
                    logs
                });
            }
        });
    }

    componentWillUpdate(){
        this.getLogs();
    }

    componentWillMount() {
        this.getLogs();
    }

    drawContent(log, index) {
        return (
            <TouchableNativeFeedback key={index} onPress={()=> {}}>
                <View style={styles.contact}>
                    <IconL style={styles.image} name="user-circle" size={35} color="#b2edff"/>
                    <View style={styles.contactUser}>
                        <Text style={styles.contactName}>
                            <Text>{log.firstName} </Text>
                            <Text>{log.lastName}</Text>
                        </Text>
                        <Text style={styles.contactCell}>{log.cellPhone}</Text>
                    </View>
                    <Text style={styles.logDuration}>{log.callDuration}</Text>
                    <IconL style={styles.log} name="long-arrow-right" size={45} color="#00cc03"/>
                </View>
            </TouchableNativeFeedback>
        );
    }

    render() {
        // var seeLog;
        //  if (this.state.logs) {
        //      seeLog =<ScrollView style={styles.wrapper}>
        //          {this.state.logs.map((log, index) => {
        //              return this.drawContent(log, index)})}
        //      </ScrollView>;
        //
        //  } else {
        //      seeLog = <Text style={styles.text}>{this.state.noLogs}</Text>;
        //  }
            return (
                <View>
                    <ScrollView style={styles.wrapper}>
                        {this.state.logs && this.state.logs.map((log, index) => {
                            return this.drawContent(log, index)})}
                    </ScrollView>
                </View>
            );
    }
}

const styles=StyleSheet.create({
    text: {
        fontSize:20,
        marginTop:10,
        textAlign:'center',
    },
    contact: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#849999',
        padding:10
    },
    contactUser: {
        paddingLeft:20
    },
    contactName: {
        fontWeight:'700',
        fontSize:18
    },
    contactCell: {
        fontSize:15
    },
    image: {
        marginLeft: 10,
        marginTop:10
    },
    log: {
        marginLeft: 'auto',
        paddingTop:5,
        paddingBottom:5
    },
    logDuration: {
        marginLeft: 'auto',
        paddingTop:10,
        paddingBottom:5,
        fontSize:10
    },
});