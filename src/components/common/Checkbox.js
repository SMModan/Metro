import React, { Component } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { CheckBox } from 'native-base';
import { Colors } from '../../utils';

export default class Checkbox extends Component {
    render() {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', margin:5 , ...this.props.style }} onPress={this.props.onPress}>
                <CheckBox color={this.props.color || Colors.grey}  onPress={this.props.onPress} checked={this.props.checked} style={{ borderRadius:5 }}/>
                <Text style={{ flex: 1, fontSize: 12, fontFamily: FontName.regular, color: this.props.labelColor || Colors.black, marginLeft: 20 }}>{this.props.label}</Text>
            </TouchableOpacity>
        )
    }
}
