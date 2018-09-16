import { AsyncStorage } from 'react-native';

import * as t from './actionTypes';

let initialState = { focusedUser: null, users: [] };

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOAD_USERS:
            const users = action.data;

            return {...state, focusedUser: null, users: users };

        case t.FOCUS_USER:

            return {...state, focusedUser: action.data};

        case t.UNFOCUS_USER:

            return {...state, focusedUser: null};

        default:
            return state;
    }
};

export default homeReducer;