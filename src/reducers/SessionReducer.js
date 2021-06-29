export const SET_SESSION_FIELD = "SET_SESSION_FIELD"

export const setSessionField = (key, value) => {

    return {
        type: SET_SESSION_FIELD,
        payload: {
            key, value
        }
    }
}
const INIT_STATE = {

    user: {},
    token: "",
    connectionString: "",
    machineCode: ""
}


export default (state = INIT_STATE, action) => {

    switch (action.type) {

        case SET_SESSION_FIELD:
            return { ...state, [action.payload.key]: action.payload.value }
    }

    return state

}