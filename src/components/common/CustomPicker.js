import React, { Component } from 'react'
import Picker from "react-native-picker-select";
import { Image, View } from 'react-native'
import { Colors,FontName } from '../../utils';

export default class CustomPicker extends Component {

    render() {
        const iconStyle = this.props.iconStyle ? this.props.iconStyle : {}
        return (

            <View style={{ ...this.props.containerStyle }}>
                <Picker useNativeAndroidPickerStyle={false}
                    style={{
                        inputIOS: {
                            fontSize: 15,
                            paddingVertical: 12,
                            borderRadius: this.props.containerStyle.borderRadius || 0,
                            height: 56,
                            //backgroundColor: 'white',
                            marginHorizontal:16,
                            fontFamily:FontName.medium,
                            borderColor: this.props.containerStyle.borderColor || "transparent",
                            color: this.props.containerStyle.color || Colors.Info500,
                            paddingRight: 10, // to ensure the text is never behind the icon
                        },
                        inputAndroid: {
                            fontSize: 15,
                            paddingVertical: 12,

                           // backgroundColor: 'white',
                            borderRadius: this.props.containerStyle.borderRadius || 0,
                            height: 56,
                            borderColor: this.props.containerStyle.borderColor || "transparent",
                            marginHorizontal:16,
                            fontFamily:FontName.medium,
                            // borderWidth: this.props.containerStyle.borderWidth || 0,
                            color: this.props.containerStyle.color || Colors.Info500,
                            paddingRight: 10, // to ensure the text is never behind the icon
                        },
                        iconContainer: iconStyle

                    }}
                    Icon={() => {
                        return <Image source={this.props.icon}
                            style={{ width: iconStyle.width || 24, height: iconStyle.height || 24,top:15,tintColor:Colors.Info500 }} />;
                    }} {...this.props} />

            </View>
        );
    }
}