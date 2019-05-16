import { combineReducers } from 'redux';

import splashReducer from '../../Screens/Splash/reducer';

const RootReducer = combineReducers({
    splash: splashReducer
});
export default RootReducer;