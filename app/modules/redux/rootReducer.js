import { combineReducers } from 'redux';

import { reducer as authReducer } from "../auth"
import { reducer as homeReducer } from "../home"

// Combine all the reducers
const rootReducer = combineReducers({ authReducer, homeReducer });

export default rootReducer;