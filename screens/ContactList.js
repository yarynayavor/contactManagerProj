import React from 'react';
import { Text, View,
    StyleSheet,
    ScrollView,
    TouchableNativeFeedback,AsyncStorage,TextInput,
    TouchableHighlight,
    Alert} from 'react-native';
import uuid from 'uuid';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ContactList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            text: '',
            logs:[],
            searchInput:'',
            filteredArray:[]
        }

        this.onPressDetails = this.onPressDetails.bind(this);
        this.onPressCall = this.onPressCall.bind(this);
        this.onPressAddContact=this.onPressAddContact.bind(this);
    }

    capitalize(val) {
        return val[0].toUpperCase()+val.substring(1);
    }

    componentDidMount() {
        let {contacts} = this.state;
        //AsyncStorage.removeItem('contacts');
        AsyncStorage.getItem('contacts').then((data) => {
            if(data) {
                this.setState({
                    contacts: JSON.parse(data),
                });
            } else {
                fetch("https://randomuser.me/api/?nat=gb&inc=name,email,cell,picture&results=20").then(x => {
                    const results = JSON.parse(x._bodyInit).results;
                    results.map((contact) => {
                        contacts.push({
                            firstName: this.capitalize(contact.name.first),
                            lastName: this.capitalize(contact.name.last),
                            cellPhone: contact.cell,
                            id: uuid()
                        });
                        this.setState({ text:contact.cell});
                        return contacts;
                    })
                    this.setState({ contacts});
                    AsyncStorage.setItem('contacts', JSON.stringify(contacts));
                });
            }

        });

        AsyncStorage.getItem('logs').then((data) => {
            if(data) {
                this.setState({
                    logs: JSON.parse(data),
                });
            }
        });
    }
    onPressDetails(contact) {
        this.props.navigation.navigate("ContactDetails", {contact: contact});
    }

    onPressAddContact(contact) {
        this.props.navigation.navigate("AddNewContact", {contact: contact});
    }

    onPressCall(contact) {
        let {logs} = this.state;
        Alert.alert(
            'Contact manager',
            'You make a call, see in Logs',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
        );

        logs.unshift({
            firstName: contact.firstName,
            lastName: contact.lastName,
            cellPhone: contact.cellPhone,
            callDuration:'00:00:01'
        });
        this.setState({logs });
        AsyncStorage.setItem('logs', JSON.stringify(logs));
    }

    drawContent(contact, index) {
        return (
            <TouchableNativeFeedback key={index} onPress={()=> {this.onPressDetails(contact)}}>
                <View style={styles.contact}>
                    <Icon style={styles.image} name="user-circle" size={35} color="#b2edff"/>
                    <View style={styles.contactUser}>
                        <Text style={styles.contactName}>
                            <Text>{contact.firstName} </Text>
                            <Text>{contact.lastName}</Text>
                        </Text>
                        <Text style={styles.contactCell}>{contact.cellPhone}</Text>
                    </View>
                    <TouchableHighlight underlayColor='#99ff9a' style={styles.dial} onPress={()=>{this.onPressCall(contact)}}>
                        <Icon  name="phone" size={35} color="#00cc03"/>
                    </TouchableHighlight>
                </View>
            </TouchableNativeFeedback>
        );
    }
    render() {
        const {contacts,searchInput}=this.state;
        let filteredArr = contacts.filter(contact =>{
            let phoneString=contact.cellPhone.toString();
            let outString = phoneString.replace(/[-]/gi, '');
            return outString.includes(searchInput);
        })

        let res;
        if(filteredArr.length===0 && this.state.searchInput){
            res=<Text style={styles.text}>Nothing found</Text>;
        } else if (filteredArr.length===0) {
            res=<ScrollView style={styles.wrapper}>
                {contacts && contacts.map((contact, index) => {
                    return this.drawContent(contact, index)
                })}
            </ScrollView>;
        } else {
            res=<ScrollView style={styles.wrapper}>
                {filteredArr && filteredArr.map((filt, index) => {
                    return this.drawContent(filt, index)
                })}
            </ScrollView>;
        }

        return(
            <View style={styles.container}>
                <View style={styles.searchSection}>
                    <Icon style={styles.searchIcon} name="search" size={20} color="#ccc"/>
                    <TextInput
                        style={styles.input}
                        keyboardType={'phone-pad'}
                        placeholder="Search"
                        onChangeText={(searchInput) => this.setState({searchInput})}
                        underlineColorAndroid="transparent"
                        value={this.state.searchInput}
                    />
                </View>
                {res}
                <TouchableHighlight onPress={()=>{this.onPressAddContact()}}>
                    <View>
                        <Text style={styles.addButton}><Icon name="user-plus" size={35} color="#fff"/>
                            Add new contact</Text>
                    </View>
                </TouchableHighlight>
            </View>);
       }
}

const styles = StyleSheet.create({
    text: {
        fontSize:20,
        marginTop:10,
        textAlign:'center',
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eaeaea',
        padding:5,
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingLeft: 5,
        backgroundColor: '#fff',
        color: '#424242',
        fontSize:20
    },
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    wrapper: {
        flex: 1,
        marginBottom: 10,
        marginTop:10,
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
    dial: {
        marginLeft: 'auto',
        backgroundColor:'#e5f9ff',
        paddingLeft:15,
        paddingRight:15,
        paddingTop:5,
        paddingBottom:5,
        borderRadius:100
    },
    addButton: {
        textAlign:'center',
        backgroundColor:'#004e66',
        padding:5,
        color:'#fff'
    },
    fireSearch : {
        color:'red'
    },
});