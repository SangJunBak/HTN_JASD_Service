import React, {PureComponent} from 'react';
import { ListItem , Card} from 'react-native-elements'
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList
} from 'react-native';
import PropTypes from 'prop-types';

class ServiceProvider extends PureComponent {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <Card
                class="serviceProvider"
                title={this.props.userData.username}
                titleStyle={{textAlign:"left"}}
            >
                <Image
                    style={{
                            width: 80,
                            height: 80
                    }}
                    source={{uri: `${this.props.userData.profilepic}` }}/>
            </Card>
        );
    }


}

ServiceProvider.propTypes = {};

export default ServiceProvider;
