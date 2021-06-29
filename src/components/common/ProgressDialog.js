import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import Dialog from 'react-native-popup-dialog';
import { Colors } from '../../utils';

export default class ProgressDialog extends Component {

    state = {

        visible: false
    }

    static dialogInstance
    static show(config) {

        // console.log("dialogInstance", this.dialogInstance)

        this.dialogInstance.showDialog(config)

    }

    static hide() {


        this.dialogInstance.hideDialog()

    }
    showDialog(config) {


        this.setState({
            visible: true,
            //   title: config.title,
            //   message: config.message,
            //   positiveButton: config.positiveButton,
            //   negativeButton: config.negativeButton,
            //   cancelable: config.cancelable,
            //   children: config.extraView
        })
    }
    hideDialog = () => {

        this.setState({
            visible: false
        })

    }
    componentDidMount() {
        if (this.props.onRef != null) {
            this.props.onRef(this)
        }
    }

    render() {
        return (
            <Dialog
                dialogStyle={styles.styleDialogContent}
                footer={null}
                width={80}
                height={80}
                visible={this.state.visible}>

                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        style={{ alignSelf: 'center' }}
                        size='large' color={Colors.white} />
                </View>
            </Dialog>
        )
    }
}




const styles = StyleSheet.create({
    styleDialogContent: {
        padding: 10,
        backgroundColor: "black",
        width: 80,
        height: 80,
        borderRadius: 40,
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

