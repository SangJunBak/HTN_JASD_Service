import React, {PureComponent} from 'react';
import { ListItem } from 'react-native-elements'
import {
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';

import ServiceProvider from './ServiceProvider';

class UserFeed extends PureComponent {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <FlatList
                data={this.props.userData}
                renderItem={(user) => <ServiceProvider userData = {user.item}/>}
            />
        );
    }


}


export default UserFeed;
