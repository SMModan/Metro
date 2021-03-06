import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native'
import {  Colors } from '../../utils';

const ImageButton = ({ source, style, imageStyle, onPress, disabled }) => {

    return (<TouchableOpacity disabled={disabled || onPress == undefined} onPress={onPress} style={[style]}>

        <Image resizeMode="contain" style={{ ...styles.actionStyle, ...imageStyle}} source={source} />

    </TouchableOpacity>);
}

const styles = {


    actionStyle: {
        width: 25,
        height: 25,

    },


}

export default ImageButton;