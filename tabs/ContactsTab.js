import React from 'react';
import {Text, View, Image, Button, StyleSheet, ListView, Alert, TouchableOpacity, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackNavigator} from 'react-navigation';
import ContactList from '../screens/ContactList';
import ContactDetails from '../screens/ContactDetails';
import AddNewContact from '../screens/AddNewContact';


const ContactsScreenNavigator=StackNavigator({
    ContactList: {screen:ContactList},
    ContactDetails: {screen:ContactDetails},
    AddNewContact:{screen:AddNewContact},
},{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
        }
    }
);


export default class ContactsTab extends React.Component {
    static navigationOptions = {
        tabBarLabel:'Contacts',
        tabBarIcon: () => {
            return <Icon name="ios-contacts" size={25} color="#fff"/>;
        }
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <ContactsScreenNavigator/>
            </View>
        );
    }
}
