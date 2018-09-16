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
                title={this.props.name}
                titleStyle={{textAlign:"left"}}
            >
                <Image
                    style={{
                            width: 80,
                            height: 80
                    }}
                    source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}/>
            </Card>
        );
    }


}

ServiceProvider.propTypes = {};

export default ServiceProvider;
