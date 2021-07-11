import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, FontName } from '../../utils'
import ResponsivePixels from '../../utils/ResponsivePixels'

const ViewWithTitle = ({ title, children, mainStyle, innerStyle }) => {
    return (
        <View style={[styles.main, mainStyle]}>
            <Text style={styles.titleStyle}>{title}</Text>
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
        backgroundColor: Colors.secondary50,
    },
    titleStyle: {
        color: Colors.blueGray900,
        fontSize: ResponsivePixels.size15,
        lineHeight: ResponsivePixels.size22,
        fontWeight: "600",
        fontFamily: FontName.medium,
        paddingTop: ResponsivePixels.size24,
        paddingHorizontal: ResponsivePixels.size16,
        paddingBottom: ResponsivePixels.size8
    }
}

)
