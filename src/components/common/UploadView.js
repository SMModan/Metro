import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Colors, FontName, Images } from '../../utils'
import ResponsivePixels from '../../utils/ResponsivePixels'

const UploadView = ({ children, innerStyle }) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.uploadView}>
                <Image source={Images.ic_upload} />
                <Text style={styles.uploadText}>Upload here</Text>
            </View>
        </View>
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
