import React from 'react'
import { ImageBackground } from 'react-native'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Colors, FontName, Images } from '../../utils'
import ResponsivePixels from '../../utils/ResponsivePixels'
import Clickable from './Clickable'

const UploadView = ({ image, onPress, children, innerStyle }) => {
    return (
        <Clickable onPress={onPress}>
            <ImageBackground imageStyle={{
                borderRadius: ResponsivePixels.size16,
            }} source={image} style={styles.uploadView}>
                {!image ? <>
                    <Image source={Images.ic_upload} />
                    <Text style={styles.uploadText}>Upload here</Text>
                </> : null}
            </ImageBackground>
        </Clickable>
    )
}

export default UploadView

const styles = StyleSheet.create({

    mainView: {
        flex: 1,
    },
    uploadView: {
        height: ResponsivePixels.size150,
        borderRadius: ResponsivePixels.size16,
        borderColor: Colors.blueGray400,
        borderStyle: "dashed",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.blueGray200,
        borderWidth: 1,
        margin: ResponsivePixels.size16
    },
    uploadText: {
        color: Colors.blueGray900,
        fontSize: ResponsivePixels.size15,
        lineHeight: ResponsivePixels.size22,
        fontWeight: "600"
    }
})
