import React from 'react'
import { Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { Colors, FontName } from '../../utils'
import ResponsivePixels from '../../utils/ResponsivePixels'

const ProgressView = ({ message, image }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={"large"} color={Colors.buttonColor} />
            <Text style={styles.textStyle}>{message}</Text>
        </View>
    )
}

export default ProgressView

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: "transparent"
    },

    textStyle: {
        marginTop: 10,
        color: Colors.grayColor,
        fontFamily: FontName.bold,
        fontSize: ResponsivePixels.size19,
        textAlign: 'center'
    },
    imageStyle: {
        width: 80,
        height: 80,
    }
})