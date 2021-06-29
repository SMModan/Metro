import React from 'react';

import { Button as NativeButton, Body, Text } from 'native-base';
import { Colors, FontName, FontSize } from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';



export default Button = (props) => {
    const { style, onPress, disabled, bordered, disableAllCaps } = props
    const button = {
        backgroundColor: bordered ? Colors.primaryColo100 : disabled ? Colors.BlackColor400 : Colors.primaryColor500,
        height: ResponsivePixels.size56,
        borderColor: bordered ? Colors.primaryColor500 : undefined,
        borderRadius: ResponsivePixels.size8,
    }
    const textStyle = {
        color: bordered ? Colors.primaryColor500 : Colors.White,
        fontFamily: FontName.semibold,
        fontSize: FontSize.fontSize17,
    }

    return (
        <NativeButton bordered={bordered} disabled={disabled} onPress={onPress} style={{ ...button, ...style, ...{ elevation: 0 } }}>
            <Body>
                <Text style={textStyle}>{disableAllCaps ? props.title : props.title}</Text>
            </Body>
        </NativeButton>
    );
}