import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Router from './app/config/routes'
import store from './app/modules/redux/store';

// console.disableYellowBox= true;

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isReady: true,
        }
    }

    render() {
        
        return (
            <Provider store={store}>
                    <Router/>
            </Provider>
        );
    }
}