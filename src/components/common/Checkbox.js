import React, { Component } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { CheckBox } from 'native-base';
import Colors from '../../Colors';

export default class Checkbox extends Component {
    render() {
        return (

            <TouchableOpacity style={{ flexDirection: 'row', ...this.props.style }} onPress={this.props.onPress}>
                <CheckBox color={this.props.color} onPress={this.props.onPress} checked={this.props.checked} />

                <Text style={{ flex: 1, fontSize: 12, color: this.props.labelColor || Colors.black, marginLeft: 20 }}>{this.props.label}</Text>
            </TouchableOpacity>

        )
    }
}
