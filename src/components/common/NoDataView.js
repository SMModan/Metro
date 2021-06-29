import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, FontName, FontSize, } from '../../utils'
import ScrollContainer from './ScrollContainer'

const NoDataView = ({ message, image }) => {
    return (
        <View style={styles.container}>
            {image ? <Image style={styles.imageStyle} source={image} /> : null}
            <Text style={styles.textStyle}>{message}</Text>
        </View>

    )
}

export default NoDataView

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: "transparent"
    },

    textStyle: {
        color: Colors.grayColor,
        fontFamily: FontName.bold,
        fontSize: FontSize.fontSize19,
        textAlign: 'center'
    },
    imageStyle: {
        width: 80,
        height: 80,
    }
})