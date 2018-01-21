import React from 'react';
import {TabNavigator} from 'react-navigation';
import Keypad from './Keypad';
import Logs from './Logs';
import ContactsTab from './ContactsTab';
import Favorites from './Favorites';

var MainScreenNavigator=TabNavigator ({
        Keypad: {
            screen:Keypad
        },
        Logs: {
            screen:Logs
        },
        ContactsTab: {
            screen:ContactsTab,
        },
        Favorites: {
            screen:Favorites
        }
    },
    {
        tabBarPosition:'top',
        swipeEnabled:true,
        tabBarOptions: {
            showIcon: true,
            style: {
                backgroundColor: '#004e66',
            },
            indicatorStyle: {
                backgroundColor: '#fff',
            },
            activeTintColor:'#fff',
            inactiveTintColor:'#cce6ff',
            labelStyle: {
                fontSize:11
            },
        },
    }
);

MainScreenNavigator.navigationOptions= {
    title: "Tab example"
};

export default MainScreenNavigator;
