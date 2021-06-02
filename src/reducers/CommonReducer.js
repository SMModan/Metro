import {
  COMMON_SET_USER_TYPE,
  COMMON_SET_IS_VIP,
  COMMON_SET_IS_GUEST,
  INSTITUTION_CHANGED,
} from './types';

const INIT_STATE = {
  isCustomer: true,
  userType: '2',
  isVip: false,
  isGuest: false,
  institution: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case COMMON_SET_USER_TYPE:
      return {
        ...state,
        isCustomer: action.payload === '2',
        userType: action.payload,
      };

    case COMMON_SET_IS_VIP:
      return {...state, isVip: action.payload.toString() === '1'};
    case COMMON_SET_IS_GUEST:
      return {...state, isGuest: action.payload};
    case INSTITUTION_CHANGED:
      return {...state, institution: action.payload};
  }
  return state;
};
