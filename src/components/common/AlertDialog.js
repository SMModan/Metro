import { View } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, Text } from 'react-native';
import Dialog, { DialogButton, DialogContent, DialogFooter, DialogTitle } from 'react-native-popup-dialog';
import { Colors } from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';


export default class AlertDialog extends Component {


  state = {

  }

  static dialogInstance
  static show(config) {


    this.dialogInstance.showDialog(config)

  }

  static hide() {


    this.dialogInstance.hideDialog()

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

  showDialog(config) {


    this.setState({
      visible: true,
      title: config.title,
      message: config.message,
      positiveButton: config.positiveButton,
      negativeButton: config.negativeButton,
      cancelable: config.cancelable,
      children: config.extraView
    })
  }

  render() {

    let { visible, onDismiss, children, cancelable, title, message, positiveButton, negativeButton, onTouchOutside } = { ...this.props, ...this.state }
    return (

      <Dialog
        visible={visible || false}
        dialogStyle={{ margin: 24 }}
        onTouchOutside={() => {
          if (cancelable) {
            this.hideDialog()
          }
          if (onTouchOutside)
            onTouchOutside()
        }}
        onDismiss={onDismiss}
        footer={
          <DialogFooter>
            {negativeButton ? <DialogButton
              text={negativeButton.title}
              textStyle={{ color: Colors.primaryColor500, fontWeight: 'Bold', fontSize: 16 }}
              onPress={negativeButton.onPress}
            /> : <View />}
            {positiveButton ? <DialogButton
              textStyle={{ color: Colors.BlackColor600, fontWeight: 'Bold', fontSize: 16 }}
              text={positiveButton.title}
              onPress={() => {

                positiveButton.onPress()
              }}
            /> : <View />}

          </DialogFooter>
        }
        dialogTitle={
          title ? <DialogTitle style={{ color: Colors.Black, fontWeight: 'bold', fontSize: ResponsivePixels.size20, backgroundColor: 'white' }} title={title}></DialogTitle> : undefined
        }
      >
        <DialogContent style={{ backgroundColor: 'white', width: Dimensions.get('window').width - 80, justifyContent: 'center', alignItems: 'center' }}>
          {message ? <Text style={{ fontSize: 16, marginTop: 10, textAlign: 'center' }}>{message}</Text> : null}
          {children}
        </DialogContent>
      </Dialog>
    )
  }
}
