import React, { Component } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Checkbox as CheckBox } from 'react-native-paper';
import { Colors, FontSize } from '../../utils';

export default class Checkbox extends Component {
    render() {
        return (
            <TouchableOpacity disabled={this.props.disabled} style={{ flexDirection: 'row', alignItems: "center", margin: 5, ...this.props.style }} onPress={this.props.onPress}>
                <CheckBox
                    disabled={this.props.disabled}
                    color={this.props.color}
                    status={this.props.checked ? 'checked' : 'unchecked'}
                    onPress={this.props.onPress}
                />
                <Text style={{ fontSize: FontSize.fontSize15, fontFamily: FontName.regular, color: this.props.labelColor || Colors.blueGray900, }}>{this.props.label}</Text>
            </TouchableOpacity>
        )
    }
}
