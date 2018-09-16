import React, {PureComponent} from 'react';
import { ListItem } from 'react-native-elements'
import {
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';
import PropTypes from 'prop-types';

import ServiceProvider from './ServiceProvider';

class UserFeed extends PureComponent {

    constructor(props){
        super(props);
        this.state={
            list: []
        };

    }

    componentDidMount(){
        let set1 = [];
        for(let i = 0; i< 200; i++){
            set1.push({name: `Person${i}`, key:'item'+i});
        }
        this.setState({list:set1});
    }

    render() {
        return (
            <FlatList
                data={this.state.list}
                renderItem={({item}) => <ServiceProvider name={item.name}/>}
            />
        );
    }


}

UserFeed.propTypes = {};

export default UserFeed;
