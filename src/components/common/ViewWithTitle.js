import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, FontName } from '../../utils'
import ResponsivePixels from '../../utils/ResponsivePixels'

const ViewWithTitle = ({ title, children, mainStyle, titleStyle, innerStyle }) => {
    return (
        <View style={[styles.main, mainStyle]}>
            <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
            <View style={[{
                backgroundColor: Colors.white, paddingHorizontal: ResponsivePixels.size16,
                paddingVertical: ResponsivePixels.size16,

            }, innerStyle]}>
                {children}
            </View>
        </View>
    )
}

export default ViewWithTitle

const styles = StyleSheet.create({

    main: {
        backgroundColor: Colors.BlackColor300,
        marginTop:ResponsivePixels.size10
    },
    titleStyle: {
        color: Colors.gray,
        fontSize: ResponsivePixels.size18,
        lineHeight: ResponsivePixels.size8,
        fontWeight: "600",
        fontFamily: FontName.medium,
        paddingTop: ResponsivePixels.size24,
        paddingHorizontal: ResponsivePixels.size16,
        paddingBottom: ResponsivePixels.size8
    }
}

)
