import {MOBILE_NUMBER_CHANGED} from './types';

const INITIAL_STATE = {
  mobile_number: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MOBILE_NUMBER_CHANGED:
      return {...state, mobile_number: action.payload};

    default:
      return state;
  }
};
