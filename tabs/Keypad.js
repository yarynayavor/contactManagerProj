import React from 'react';
import {Text, View, Image, Button, StyleSheet, TextInput, AsyncStorage,TouchableNativeFeedback ,TouchableHighlight
,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/FontAwesome';
import Highlighter from 'react-native-highlight-words';

export default class Keypad extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            contacts:[],
            searchInput:''
        };
    }
    static navigationOptions = {
        tabBarLabel:'Keypad',
        tabBarIcon: () => {
            return <Icon name="md-keypad" size={25} color="#fff"/>;
        }
    }

    getContacts = () =>  {
        let {contacts} = this.state;
        return AsyncStorage.getItem('contacts').then((data) => {
            if(data) {
                this.setState({
                    contacts: JSON.parse(data),
                });
            } else {
                this.setState({
                    contacts
                });
            }
        });
    }

    componentWillUpdate(){
        this.getContacts();
    }

    componentWillMount() {
        this.getContacts();
    }

    drawContent(contact, index) {
        return (
            <TouchableNativeFeedback key={index} onPress={()=> {}}>
                <View style={styles.contact}>
                    <IconF style={styles.image} name="user-circle" size={35} color="#b2edff"/>
                    <View style={styles.contactUser}>
                        <Text style={styles.contactName}>
                            <Text>{contact.firstName} </Text>
                            <Text>{contact.lastName}</Text>
                        </Text>
                        <Highlighter
                            style={styles.contactCell}
                            highlightStyle={{color: '#00cc03',fontWeight:'bold'}}
                            searchWords={[this.state.searchInput,'-']}
                            textToHighlight={contact.cellPhone.replace(/[-]/gi, '')}
                        />
                        {/*<Text style={styles.contactCell}>{contact.cellPhone}</Text>*/}
                    </View>
                    <TouchableHighlight underlayColor='#99ff9a' style={styles.dial} onPress={()=>{}}>
                        <IconF  name="phone" size={35} color="#00cc03"/>
                    </TouchableHighlight>
                </View>
            </TouchableNativeFeedback>
        );
    }
    render() {
        const {contacts,searchInput}=this.state;
        // let filteredArr=[];
        // for(var i=0;i<contacts.length;i++) {
        //     let phoneString=contacts[i].cellPhone.toString();
        //     let outString = phoneString.replace(/[-]/gi, '');
        //     if(outString.includes(searchInput)) {
        //         filteredArr.push({
        //             firstName: contacts[i].firstName,
        //             lastName: contacts[i].firstName,
        //             cellPhone: contacts[i].cellPhone,
        //         });
        //     }
        // }
        let filteredArr = contacts.filter(contact =>{
            let phoneString=contact.cellPhone.toString();
            let outString = phoneString.replace(/[-]/gi, '');
            return outString.includes(searchInput);
        })
        let res;
        if(filteredArr.length===0 && this.state.searchInput) {
            res=<Text style={styles.textNotFound}>Nothing found</Text>;
        } else if (this.state.searchInput.length>0) {
            res= <ScrollView style={styles.wrapper}>
                {filteredArr ? filteredArr.map((filt, index) => {
                    return this.drawContent(filt, index)
                }) : null }
            </ScrollView>;
        } else {
            res=null;
        }

        return(
            <View style={{flex: 1}}>
                <Text style={styles.text}>Enter phone number</Text>
                <View style={styles.searchSection}>
                    <IconF style={styles.searchIcon} name="search" size={20} color="#ccc"/>
                    <TextInput
                        autoFocus
                        style={styles.input}
                        keyboardType={'phone-pad'}
                        placeholder="Search"
                        onChangeText={(searchInput) => this.setState({searchInput})}
                        underlineColorAndroid="transparent"
                        value={this.state.searchInput}
                    />
                </View>
                {res}
            </View>
        );
    }
}

const styles=StyleSheet.create({
    text: {
        fontSize:18,
        backgroundColor:'#cce6ff',
        textAlign:'center',
        color:'#fff'
    },
    textNotFound: {
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
        backgroundColor: '#fff',
        color: '#424242',
        fontSize:20,
        padding:10
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
    }
});