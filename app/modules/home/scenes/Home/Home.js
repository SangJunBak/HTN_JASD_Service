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

        }
        
        this.onSignOut = this.onSignOut.bind(this);
    }

    componentDidMount(){

        api.getOtherUsers((success, data, error) => {

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
        // if(this.state.description){
            // console.warn(description)
            // ImagePicker.showImagePicker((response) => {
            //     if (!response.didCancel){
            //         //TODO:
            //     }
            // });
            // api.setUserDescription("wasdsadsa", (error) => {
            //     if (error){
            //         console.warn(error)
            //     }
            // });
        // }

    }

    render() {
        return (
            <View style={styles.container}>
                <UserFeed/>
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