import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native'

const ImageButton = ({ source, style, imageStyle, onPress, }) => {

    return (<TouchableOpacity disabled={onPress == undefined} onPress={onPress} style={[style]}>

        <Image resizeMode="contain" style={{ ...styles.actionStyle, ...imageStyle }} source={source} />

    </TouchableOpacity>);
}

const styles = {


    actionStyle: {
        width: 25,
        height: 25,

    },


}

export default ImageButton;