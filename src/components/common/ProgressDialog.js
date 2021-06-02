import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    ActivityIndicator
} from 'react-native';

import Dialog, { DialogContent } from 'react-native-popup-dialog'

const ProgressDialog = props => {
    const {
        loading,
        ...attributes
    } = props;

    return (
        <Dialog
            dialogStyle={styles.styleDialogContent}
            footer={null}
            visible={loading}>

            <View style={styles.activityIndicatorWrapper}>
                <ActivityIndicator
                    style={{ alignSelf: 'center' }}
                    size='large' color='#111111' />
            </View>
        </Dialog>
    )
}

const styles = StyleSheet.create({
    styleDialogContent: {
        padding: 10,

        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    activityIndicatorWrapper: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ProgressDialog;