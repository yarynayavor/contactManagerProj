import React from 'react';
import {Text, View, Image, StyleSheet, Button, TouchableHighlight, AsyncStorage, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconF from 'react-native-vector-icons/MaterialIcons';
import uuid from 'uuid';


export default class ContactDetails extends React.Component {

    constructor() {
        super();
        this.state = {
            contact: [],
            contacts: [],
            favorites:[]
        }

        this.onPressFavorites = this.onPressFavorites.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
    }

    componentDidMount() {
        let {contacts} = this.state;
        this.setState({ contact: this.props.navigation.state.params.contact });
        AsyncStorage.getItem('favorites').then((data) => {
            if(data) {
                this.setState({
                    favorites: JSON.parse(data),
                });
            }
        });

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

    deleteContact(_id) {
        let {contacts,favorites} = this.state;
        let _contacts = contacts.filter(c => c.id != _id);
        let _favorites = favorites.filter(c => c.id != _id);
        Alert.alert(
            'Contact manager',
            'Contact deleted',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
        );
        AsyncStorage.setItem('contacts', JSON.stringify(_contacts));
        AsyncStorage.setItem('favorites', JSON.stringify(_favorites));
        this.setState({
            contacts: _contacts,
            favorites: _favorites

        })
        this.props.navigation.navigate("ContactList", {contacts: contacts});
    }

    onPress() {
        this.props.navigation.navigate("ContactList");
    }

    checkDublicates(contact) {
        let {favorites} = this.state;
        for (var i = 0; i < favorites.length; i++) {
            if(favorites[i].cellPhone===contact.cellPhone) {
                return true;
            }
        }
        return false;
    }

    onPressFavorites(contact) {
        let {favorites} = this.state;

        let checkdubl=this.checkDublicates(contact);
        if(checkdubl) {
            Alert.alert(
                'Contact manager',
                'Contact already exist in favorites!',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert(
                'Contact manager',
                'Contact added to favorites!',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            );
            favorites.unshift({
                firstName: contact.firstName,
                lastName: contact.lastName,
                cellPhone: contact.cellPhone,
                id:contact.id
            });
        }

        this.setState({favorites });
        AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.contact !== 0 ?
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
                            <Text style={styles.name}>{this.state.contact.firstName} {this.state.contact.lastName}</Text>
                        </View>
                        <View>
                            <View style={styles.phoneWrapper}>
                                <Text style={styles.metadata}>Phone: </Text>
                                <Text style={styles.detailData}>{this.state.contact.cellPhone}</Text>
                            </View>
                        </View>
                        <TouchableHighlight onPress={()=>{this.onPressFavorites(this.state.contact)}}>
                            <View>
                                <Text style={styles.addToFavorites}>
                                    <IconF name="favorite" size={22} color="red"/>
                                    Add to favorites</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={{marginTop:5}} onPress={()=>{this.deleteContact(this.state.contact.id)}}>
                            <View>
                                <Text style={styles.deleteContact}>
                                    <Icon name="trash" size={22} color="#fff"/>
                                     Remove contact</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    : null}
            </View>)
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
        borderWidth: 1,
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
    addButton: {
        textAlign:'center',
        backgroundColor:'#ccf3ff',
        padding:10,
        color:'#00c5ff',
    },
    addToFavorites: {
        textAlign:'center',
        backgroundColor:'skyblue',
        padding:5,
        color:'#fff',
        fontSize:22,
        borderWidth: 1,
        borderColor: '#004e66',
        fontStyle:'italic'
    },
    deleteContact: {
        textAlign:'center',
        backgroundColor:'#ff4c4c',
        color:'#fff',
        padding:5,
        fontSize:22,
        borderWidth: 1,
        borderColor: '#004e66'
    },
});