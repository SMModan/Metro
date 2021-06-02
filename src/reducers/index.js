import CommonReducer from './CommonReducer';
import LoginReducer from './LoginReducer';
import {HOME_LOGOUT} from './types';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  common: CommonReducer,
  login: LoginReducer,
});

export default (state, action) => {
  if (action.type === HOME_LOGOUT) {
    state = undefined;
  }

  return rootReducer(state, action);
};
