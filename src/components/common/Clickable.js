import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import { Button as ElementButton } from 'react-native-elements'
import { Images, FontName, FontSize, Colors } from '../../utils';


class Clickable extends Component {
    render() {
        const { children, onPress, borderLess, rippleColor, style, activeOpacity } = this.props
        return (

            // <ElementButton
            //     iconComponent={}
            //     title={title} textStyle={textStyles} raised={raised} onPress={onPress} outline={outline} containerViewStyle={{ marginLeft: 0, marginRight: 0, flex: flex }} backgroundColor={bgColor} buttonStyle={{ ...bgStyles, ...style, flex: 0 }} />

            Platform.select({
                ios: <TouchableOpacity activeOpacity={activeOpacity||0.5} style={style}  onPress={onPress}>
                    {children}
                </TouchableOpacity>,
                android: <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(rippleColor || 'white', borderLess)} onPress={onPress}>


                    <View style={style}>
                        {children}
                    </View>
                </TouchableNativeFeedback>
            })

        );
    }
}

export default Clickable

