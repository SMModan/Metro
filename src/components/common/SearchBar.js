import React from 'react'
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Colors, FontName, Images } from '../../utils'
import ResponsivePixels from '../../utils/ResponsivePixels'
import { CommonStyle, ImageButton } from '../common'

const SearchBar = ({ placeholder, onChangeText, autoFocus, onPressSearch, editable, filter, onPress, onFilterPress, style }) => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16, }}>
            <TouchableOpacity style={[styles.searchBarStyle, style]} disabled={onPress ? false : true} onPress={() => {

                if (onPress)
                    onPress()
            }}>
                <Image style={styles.searchIconStyle} source={Images.ic_Search} />
                <TextInput autoFocus={autoFocus} onSubmitEditing={onPressSearch} returnKeyType={"search"} placeholderTextColor={Colors.black}
                    editable={editable} onChangeText={onChangeText} placeholder={placeholder || "Search"}
                    placehldeTextInputStyle={styles.placehldeTextInputStyle} style={styles.textInputStyle} />
            </TouchableOpacity>

            {filter ? <ImageButton onPress={onFilterPress} source={Images.filterIcon} style={{ marginStart: 8, height: 40, resizeMode: "contain" }} /> : null}
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({

    searchBarStyle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.blueGray100,
        flex: 1,
        height: 40,
        borderRadius: 2,

        paddingHorizontal: 14,
        paddingVertical: 12
    },
    searchIconStyle: {
        resizeMode: "contain",
        width: 15,
        height: 15,
        marginEnd: 4

    },
    textInputStyle: {
        flex: 1,
        height: 40,
        color: Colors.black,
        fontFamily: FontName.regular,
        fontSize: ResponsivePixels.size16
    },
    placehldeTextInputStyle: {

        color: Colors.black,
        fontFamily: FontName.regular,
        fontSize: ResponsivePixels.size16
    }
})