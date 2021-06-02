import React from 'react';
import { Text } from 'react-native'
import { Colors, FontName, FontSize } from '../../utils';
import LinearGradient from 'react-native-linear-gradient';


export default GradientButton = (props) => {
    const { style, onPress, bordered, disableAllCaps } = props
    const button = {
        height: 55,
        borderColor: bordered ? Colors.NormalGreyColor : undefined,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.Transparent10,
        shadowOffset: { width: 0, height: 14, },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 20,
    }
    const textStyle = {
        color: bordered ? Colors.NormalGreyColor : Colors.Defaultwhite,
        fontFamily: FontName.RobotoMedium,
        fontSize: FontSize.fontSize16,
        letterSpacing: 1,
    }

    return (

        <LinearGradient
            style={{ ...button, ...style }}
            bordered={bordered}
            onTouchEndCapture={onPress}
            colors={[Colors.buttonStartGradientColor, Colors.buttonEndGradientColor]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 0.5]}>
            <Text style={textStyle}>{disableAllCaps ? props.title : props.title}</Text>
        </LinearGradient>
    );
}