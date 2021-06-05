import React from 'react';
import { Text } from 'react-native';
import { FontName, Colors } from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import Clickable from './Clickable';



export default TextButton = ({ style, onPress, disableAllCaps = true, title }) => {
    const button = {
        backgroundColor: "transparent",
        alignItems: "center",
        padding: 16,
    }
    const textStyle = {
        textAlign: "center",
        color: Colors.red,
        fontFamily: FontName.semibold,
        fontSize: ResponsivePixels.size15,
        marginEnd: 8,

    }

    const imageStyle = {
        marginHorizontal: 8,
    }


    return (

        <Clickable onPress={onPress} style={[button, style]}>

            <Text style={textStyle}>{title}</Text>

            {/* <Image style={imageStyle} source={Images.rightArrow} /> */}

        </Clickable>
        // <NativeButton bordered={bordered} disabled={disabled} onPress={onPress} style={{ ...button, ...style, ...{ elevation: 0 } }}>
        //     <Left>
        //         <Image source={Images.rightArrow} />
        //     </Left>
        //     <Body >
        //         <Text style={textStyle}>{disableAllCaps ? title : title.toUpperCase()}</Text>
        //     </Body>
        //     <Right>
        //         <Image source={Images.rightArrow} />
        //     </Right>
        // </NativeButton>
    );



}