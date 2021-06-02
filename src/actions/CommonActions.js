import { COMMON_SET_USER_TYPE, COMMON_SET_IS_VIP, COMMON_SET_IS_GUEST } from "../reducers/types";

export const setUserType = (userType) => {

    return {
        type: COMMON_SET_USER_TYPE,
        payload: userType
    }
}

export const setIsVip = (isVip) => {

    return {
        type: COMMON_SET_IS_VIP,
        payload: isVip
    }
}

export const setGuestUser = (isGuest) => {

    return {
        type: COMMON_SET_IS_GUEST,
        payload: isGuest
    }
}