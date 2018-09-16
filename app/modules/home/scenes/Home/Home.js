import React from 'react';
var { View, StyleSheet, Alert, TextInput } = require('react-native');

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import * as api from '../../api';
import UserFeed from '../../components/UserFeed';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"



const { signOut } = auth;

const { color } = theme;

class Home extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            description: "",
            users: {}
        }
        
        this.onSignOut = this.onSignOut.bind(this);

        this.testFunction=this.testFunction.bind(this);

        this.componentDidMount=this.componentDidMount.bind(this);
    }

    componentDidMount(){

        api.getAllUsers((success, data, error) => {
            if (success){
                // data.forEach(function(childSnapshot) {
                //     var user = childSnapshot.val();
                //     if (user.uid ==)
                //     console.warn(childData.username + ", " + childData.uid);
                
                // });
                users = data
            }else{
               console.warn(error) 
            }
        });

    }

    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }

    onSuccess() {
        Actions.reset("Auth")
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }

    testFunction(){
        if(this.state.description){
            api.commentOnUser(this.state.description, 'iynB23AhNQVKDjkTekIvtY7hCIv2', (error) => {
                if (error){
                    console.warn(error)
                }else{
                    console.warn("success")
                }
            });
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <UserFeed
                    userData = {this.state.users}
                />
                <Button
                    raised
                    borderRadius={4}
                    title={'LOG OUT'}
                    containerViewStyle={[styles.containerView]}
                    textStyle={styles.buttonText}
                    onPress={this.onSignOut}
                />
            </View>
        );
    }
}

export default connect(null, { signOut })(Home);