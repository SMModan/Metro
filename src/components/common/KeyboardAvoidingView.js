import React, { Component } from 'react'
import { Text, View, Platform, KeyboardAvoidingView } from 'react-native'

export default class RNKeyboardAvoidingView extends Component {
    render() {
        return (

            <KeyboardAvoidingView keyboardVerticalOffset={0} 
            style={{ flex: 1 }} 
            behavior={Platform.select({ android: null, ios: this.props.scrollDisabled?undefined:'padding' })}>

                {this.props.children}
            </KeyboardAvoidingView>

        )
    }
}
