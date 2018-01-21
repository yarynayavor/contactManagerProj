import React from 'react';
import {Text, View, Image, StyleSheet, Button, TouchableHighlight, AsyncStorage,
    Alert,TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import uuid from 'uuid';

export default class AddNewContact extends React.Component {

    constructor() {
        super();
        this.state = {
            contact: [],
            contacts: [],
            favorites:[],
            addName: '',
            addSurname: '',
            addPhone:''
        }
        this.onAddInputHandlerChange = this.onAddInputHandlerChange.bind(this);
        this.onPressSaveNewContact=this.onPressSaveNewContact.bind(this);
    }

    onAddInputHandlerChange(e) {
        this.setState({
            addName: e.target.value,
            addSurname: e.target.value,
            addPhone: e.target.value
        })
    }

    componentDidMount() {
        let {contacts} = this.state;
        AsyncStorage.getItem('contacts').then((data) => {
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

    onPress() {
        this.props.navigation.navigate("ContactList");
    }
    onPressSaveNewContact() {
        let {contacts, addName,addSurname,addPhone} = this.state;
        if(!addName && !addSurname && !addPhone) {
            Alert.alert(
                'Contact manager',
                'Your inputs are empty',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            );
        }
        else if (addPhone.length<3) {
            Alert.alert(
                'Contact manager',
                'Phone must be from 3 to 10 digits',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            );
        } else if (addName && addSurname && addPhone) {
            contacts.push({
                firstName: addName,
                lastName: addSurname,
                cellPhone: addPhone,
                id: uuid()
            });
            Alert.alert(
                'Contact manager',
                'New contact added!',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            );
            AsyncStorage.setItem('contacts', JSON.stringify(contacts));
            this.setState({
                contacts : AsyncStorage.getItem('contacts').then((data) => {
                    if(data) {
                        this.setState({
                            contacts: JSON.parse(data)
                        });
                    }
                }),
                addName: '',
                addSurname: '',
                addPhone:''
            });
        }

    }

    render() {
        const {addName,addSurname,addPhone} = this.state;
        let stylingInputs,addLabel;
        if(addPhone.length<3 && addPhone.length>0) {
            stylingInputs=styles.inputStyles;
            addLabel={height: 40, fontSize:15,color:'red',textAlign:'center',marginTop:10};
        } else {
            stylingInputs=styles.input;
            addLabel={height: 0};
        }
        return (
            <View style={styles.container}>
                    <View>
                        <View>
                            <View style={styles.skyBlue}>
                                <TouchableHighlight underlayColor='#7fe2ff' onPress={()=>{this.onPress()}} style={{width:50}}>
                                    <View>
                                        <Icon style={styles.addButton} name="arrow-left" size={20} color="#fff"/>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.imageWrapper}>
                                <Icon style={styles.image} name="user-circle" size={100} color="#b2edff"/>

                            </View>
                            <Text style={styles.name}>Add new contact</Text>
                        </View>
                        <View>
                            <TextInput
                                value={addName}
                                style={styles.input}
                                placeholder="Name"
                                maxLength={15}
                                onChangeText={(addName)=>{this.setState({addName})}}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View>
                            <TextInput
                                value={addSurname}
                                style={styles.input}
                                placeholder="Surname"
                                maxLength={15}
                                onChangeText={(addSurname)=>{this.setState({addSurname})}}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View>
                            <Text style={addLabel}>Phone must be from 3 to 10 digits</Text>
                            <TextInput
                                value={addPhone}
                                keyboardType={'phone-pad'}
                                style={stylingInputs}
                                maxLength={10}
                                placeholder="Phone"
                                onChangeText={(addPhone)=>{this.setState({addPhone})}}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <TouchableHighlight style={styles.saveButton} onPress={ ()=>{this.onPressSaveNewContact()}} >
                            <View>
                                <Text style={styles.saveButtonText}>Save</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#e5f9ff'
    },
    skyBlue: {
        backgroundColor: 'skyblue',
        height: 40
    },
    imageWrapper: {
        alignItems: 'center',
        marginBottom: 5
    },
    image: {
        width: 100,
        height: 100,
        borderWidth: 2,
        borderColor: '#004e66',
        borderRadius: 100,
        marginTop:5
    },
    name: {
        fontSize: 35,
        fontWeight: '800',
        color: '#004e66',
        textAlign:'center'
    },
    phoneWrapper: {
        flexDirection: 'row',
        backgroundColor: '#f2fcff',
        padding:10,
        paddingTop:15,
        paddingBottom:15,
        marginBottom:30
    },
    metadata: {
        fontWeight: '600',
        fontSize: 15,
        width: 120,
        marginRight: 5,
        fontStyle:'italic'
    },
    detailData: {
        fontSize: 25,
        textAlign:'center',
    },
    input: {
        padding: 10,
        backgroundColor: '#fff',
        color: '#424242',
        marginTop:20,
        fontSize:20,
        borderWidth: 1,
        borderColor: '#004e66',
        width:'80%',
        alignSelf: 'center'
    },
    inputStyles: {
        padding: 10,
        backgroundColor: '#ffcccc',
        color: '#424242',
        fontSize:20,
        borderWidth: 2,
        borderColor: 'red',
        width:'80%',
        alignSelf: 'center'
    },
    addButton: {
        textAlign:'center',
        backgroundColor:'#ccf3ff',
        padding:10,
        color:'#00c5ff',
    },
    saveButtonText: {
        color:'#fff',
        fontSize:22,
        textAlign:'center',
    },
    saveButton: {
        alignSelf: 'center',
        backgroundColor:'#004e66',
        width:'40%',
        padding:15,
        marginTop:20
    },

});