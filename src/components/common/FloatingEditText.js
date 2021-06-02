import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput } from 'react-native'
import { Item, Label, Input, Left, Right, Icon } from 'native-base';
import { Images, FontName, FontSize, Colors } from '../../utils';
import Clickable from './Clickable';
import ResponsivePixels from '../../utils/ResponsivePixels';



export default class FloatingEditText extends Component {

    state = {
        isFocused: false,
        underlineColor: Colors.blueGray200,
        text: ''
    };

    handleFocus = () => this.setState({ isFocused: true, underlineColor: Colors.blueGray900 });
    handleBlur = () => this.setState({ isFocused: false, underlineColor: Colors.blueGray200 });

    render() {
        const {
            label, value, onChangeText, style, password, fontSize, inputType, textColor, editable,
            rightIcon,leftIcon, onClickCountry, onPress, country, hasCountry, multiline, minHeight
        } = this.props
        let { isFocused, text } = this.state;

        isFocused = isFocused || text.length > 0 || value && value.length > 0
        const labelStyle = {
            position: 'absolute',
            marginStart:leftIcon ? 40 : 0,
            marginTop: hasCountry && !isFocused ? 4 : 0,
          //  left: hasCountry ? country && country.code && country.code.length > 3 ? 80 : 80 : 0,
            fontFamily: FontName.regular,
            top: !isFocused ? 20 : 0,
            fontSize: !isFocused ? 17 : 15,
            color:  isFocused ? Colors.secondary500 : Colors.blueGray500,
        };
        return (
            <View style={{
                paddingTop: ResponsivePixels.size10, borderBottomWidth: this.state.isFocused ? 1 : 1,
              //  alignItems: 'center',
                borderBottomColor: this.state.underlineColor, ...style,
            }}>
                <Text style={labelStyle}>
                    {label}
                </Text>

                <TouchableOpacity disabled={!editable} activeOpacity={0} onPress={onPress} style={{
                    flexDirection: 'row', alignItems: 'center'
                }}>
                   
                    {hasCountry ?
                        <Clickable onPress={onClickCountry} style={styles.countryView}>
                            <Image source={Images.ic_CountryImg} style={styles.CountryImg}></Image>
                            <Text style={styles.Countrytext}>+91</Text>
                            <View style={styles.SperatorLine}></View>
                        </Clickable> : null}
                        {leftIcon ? <Image source={leftIcon} style={{ width: 24, height: 24,marginEnd:10 }} resizeMode={'contain'} /> : null}
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
                                fontFamily: FontName.regular, fontSize: fontSize || 14, color: textColor ||
                                    Colors.blueGray900, borderBottomWidth: 0,
                                height: minHeight
                            }}
                            onFocus={this.handleFocus}
                            selectionColor={Colors.blueGray900}
                            onBlur={this.handleBlur}
                        />
                        :
                        <Text onPress={onPress} style={{
                            alignSelf: "center",
                            flex: 1,
                           
                            textAlignVertical: "center",
                            fontFamily: FontName.regular, alignSelf: "center",
                            fontSize: fontSize || 17,
                            color: textColor || Colors.Black, borderBottomWidth: 0
                        }}>
                            {value ? value.toString() : value}
                        </Text>}
                    {rightIcon ? <Image source={rightIcon} style={{ width: 30, height: 30 }} resizeMode={'contain'} /> : null}
                </TouchableOpacity>
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