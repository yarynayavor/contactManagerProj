import React from 'react';
import {Text, View, Image, Button, StyleSheet, AsyncStorage,ScrollView,
    TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconL from 'react-native-vector-icons/FontAwesome';

export default class Favorites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            favorites:[]
        }
    }

    static navigationOptions = {
        tabBarLabel:'Favorites',
        tabBarIcon: () => {
            return <Icon name="favorite" size={25} color="#fff"/>;
        }
    }

    getFavorites = () =>  {
        let {favorites} = this.state;
        // AsyncStorage.removeItem('favorites');
        return AsyncStorage.getItem('favorites').then((data) => {
            if(data) {
                this.setState({
                    favorites: JSON.parse(data),
                });
            } else {
                this.setState({
                    favorites
                });
            }
        });
    }

    componentWillUpdate(){
        this.getFavorites();
    }

    componentWillMount() {
        this.getFavorites();
    }

    drawContent(favorite, index) {
            return (
                <TouchableNativeFeedback key={index} onPress={() => {
                }}>
                    <View style={styles.contact}>
                        <IconL style={styles.image} name="user-circle" size={35} color="#b2edff"/>
                        <View style={styles.contactUser}>

                            <Text style={styles.contactName}>
                                <Text>{favorite.firstName} </Text>
                                <Text>{favorite.lastName}</Text>
                            </Text>
                            <Text style={styles.contactCell}>{favorite.cellPhone}</Text>
                        </View>
                        <Icon style={styles.favorites} name="favorite" size={45} color="red"/>
                    </View>
                </TouchableNativeFeedback>
            );
    }
    render() {
        return (
            <View>
                <ScrollView style={styles.wrapper}>
                    {this.state.favorites && this.state.favorites.map((f, index) => {
                            return this.drawContent(f, index)
                    })}
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
    favorites: {
        marginLeft: 'auto',
        paddingTop:5,
        paddingBottom:5
    },
});
