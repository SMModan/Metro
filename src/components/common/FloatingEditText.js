import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput } from 'react-native'
import { Item, Label, Input, Left, Right, Icon } from 'native-base';
import { Images, FontName, FontSize, Colors } from '../../utils';
import Clickable from './Clickable';
import ResponsivePixels from '../../utils/ResponsivePixels';
import ImageButton from './ImageButton';



export default class FloatingEditText extends Component {

    state = {
        isFocused: false,
        underlineColor: Colors.blueGray200,
        text: ''
    };

    handleFocus = () => this.setState({ isFocused: true, underlineColor: Colors.blueGray900 });
    handleBlur = () => {
        if (this.props.onBlur)
            this.props.onBlur()
        this.setState({ isFocused: false, underlineColor: Colors.blueGray200 });
    }

    render() {
        const {
            label, value, onChangeText, style, password, fontSize, inputType, textColor, editable,
            rightIcon, leftIcon, onClickCountry, onPress, country, hasCountry, onPressLeftIcon, onPressRightIcon, multiline, minHeight
        } = this.props
        let { isFocused, text } = this.state;
        // console.log(label,value)
        // console.log("lable--->< ----->",lable)
        isFocused = isFocused || text.length > 0 || value && value.length > 0
        const labelStyle = {
            position: 'absolute',
            marginStart: leftIcon ? 34 : 0,
            marginTop: hasCountry && !isFocused ? 4 : 0,
            //  left: hasCountry ? country && country.code && country.code.length > 3 ? 80 : 80 : 0,
            fontFamily: FontName.regular,
            top: !isFocused ? 20 : 0,
            fontSize: !isFocused ? 17 : 15,
            color: isFocused ? Colors.secondary500 : Colors.blueGray500,
        };
        return (
            <View style={{
                paddingTop: ResponsivePixels.size10, borderBottomWidth: this.state.isFocused ? 1 : 1,
                //  alignItems: 'center',
                marginTop: ResponsivePixels.size10,
                borderBottomColor: this.state.underlineColor, ...style,
            }}>
                <Text style={labelStyle}>
                    {label}
                </Text>

                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                }}>
                    {leftIcon ? <ImageButton onPress={onPressLeftIcon} source={leftIcon} imageStyle={{ width: 24, height: 24, marginEnd: 10 }} resizeMode={'contain'} /> : null}

                    <TouchableOpacity disabled={editable && editable != false} onPress={onPress}
                        style={{
                            flex: 1,
                        }}
                    >

                        {hasCountry ?
                            <Clickable onPress={onClickCountry} style={styles.countryView}>
                                <Image source={Images.ic_CountryImg} style={styles.CountryImg}></Image>
                                <Text style={styles.Countrytext}>+91</Text>
                                <View style={styles.SperatorLine}></View>
                            </Clickable> : null}
                        {editable == undefined || editable == true ?
                            <TextInput
                                value={value}
                                multiline={multiline}
                                placeholderTextColor={Colors.blueGray500}
                                editable={editable}
                                keyboardType={inputType}

                                onChangeText={(text) => {
                                    this.setState({ text: text })
                                    if (onChangeText)
                                        onChangeText(text)
                                }}
                                secureTextEntry={password}
                                style={{
                                    //    marginStart:leftIcon ? 40 : 0,
                                    paddingVertical: 12, flex: 1,
                                    fontFamily: FontName.regular, fontSize: fontSize || 17, color: textColor ||
                                        Colors.blueGray900, borderBottomWidth: 0,
                                    height: minHeight,
                                }}
                                textAlignVertical={minHeight ? "top" : undefined}
                                onFocus={this.handleFocus}
                                selectionColor={Colors.blueGray900}
                                onBlur={this.handleBlur}
                            />
                            :
                            <Text style={{
                                flex: 1,
                                paddingVertical: 12,
                                textAlignVertical: "center",
                                fontFamily: FontName.regular,

                                fontSize: fontSize || 17,
                                color: textColor || Colors.blueGray900, borderBottomWidth: 0,
                                height: minHeight
                            }}>
                                {value ? value.toString() : value}
                            </Text>}
                    </TouchableOpacity>
                    {rightIcon ? <ImageButton onPress={onPressRightIcon} source={rightIcon} imageStyle={{ width: 16, height: 16 }} resizeMode={'contain'} /> : null}

                </View>
            </View>
        );
    }
}

const styles = {

    coontainerStyle: {
        flexDirection: 'row',
        // margin: 8,
        backgroundColor: 'white',
        //     height: 50
    },
    textInputStyle: {
        flex: 1,
        backgroundColor: 'red',
    },
    countryView: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 40,
        marginRight: 10
    },
    CountryImg: {
        alignItems: 'center',
        // alignSelf: 'center',
        //marginTop:10
    },
    Countrytext: {
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize19,
        marginLeft: 8,
        marginRight: 6,
        color: Colors.Defaultblack,
        //  alignSelf: 'center',
    },
    SperatorLine: {
        width: 2,
        height: 24,
        backgroundColor: Colors.lightGreyColor,
    },
}