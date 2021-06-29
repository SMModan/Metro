import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Chip } from 'react-native-paper'
import { Colors, FontName } from '../../utils'
import ResponsivePixels from '../../utils/ResponsivePixels'

const ChipViewContainer = ({ chips, onSelect, title }) => {

    let finalChips = chips || []
    const [selectedIndex, setSelectedIndex] = useState(-1)
    return (
        <View>
            <Text style={styles.titleStyle}>{title}</Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {finalChips.map((item, index) => <Chip key={index} style={{ margin: 5, borderRadius: 4, backgroundColor: selectedIndex === index ? Colors.primaryColor500 : Colors.blueGray200 }} textStyle={{ fontSize: 13, color: selectedIndex === index ? Colors.white : Colors.black }} onPress={() => {
                    setSelectedIndex(index)
                    if (onSelect)
                        onSelect(finalChips[index])
                }}>{item.name}</Chip>)}
            </View>
        </View>
    )
}

export default ChipViewContainer

const styles = StyleSheet.create({
    titleStyle: {
        color: Colors.black,
        fontSize: ResponsivePixels.size15,
        lineHeight: ResponsivePixels.size22,
        fontFamily: FontName.regular,
        paddingVertical: 8
    }
})