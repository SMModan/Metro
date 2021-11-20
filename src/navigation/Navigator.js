import * as React from 'react';
import { CommonActions, StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

export const navigate = (name, params) => {
    navigationRef.current?.navigate(name, params);
}

export const push = (name, params) => {
    navigationRef.current?.dispatch(StackActions.push(name, params))
}
export const replace = (name, params) => {
    navigationRef.current?.dispatch(StackActions.replace(name, params))
}

export const goBack = (name) => {
    navigationRef.current?.goBack(name);
}

export const reset = (name) => {

    navigationRef.current?.dispatch(
        CommonActions.reset({
            index: 1,
            routes: [
                { name: name },
            ],
        })
    );

}