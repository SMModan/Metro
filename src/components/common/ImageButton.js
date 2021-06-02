import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native'

const ImageButton = ({ source, style, onPress }) => {

    return (<TouchableOpacity onPress={onPress} style={{ ...style }}>

        <Image style={{ ...styles.actionStyle, ...style }} source={source} />

    </TouchableOpacity>);
}

const styles = {


    actionStyle: {
        marginLeft: 16,
        width: 25,
        height: 25,
    },


}

export default ImageButton;