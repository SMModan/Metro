import React, { Component } from 'react'
import { TextInput, View, Image, Platform, Text } from 'react-native'
import { Icon } from 'native-base';
import { Images, Colors, FontName, FontSize } from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import Clickable from './Clickable';


export default class EditText extends Component {

    componentDidMount() {
        if (this.props.onRef != null) {
            this.props.onRef(this)
        }
    }

    state = {
        isFocused: false,
        borderColor: Colors.BlackColor300,
        text: ''
    };

    onSubmitEditing() {
        if (this.props.onSubmitEditing)
            this.props.onSubmitEditing();
    }

    focus() {
        this.textInput.focus()
    }

    handleFocus = () => this.setState({ isFocused: true, borderColor: Colors.secondaryColor });
    handleBlur = () => this.setState({ isFocused: false, borderColor: Colors.BlackColor300 });

    render() {
        let { isFocused, text } = this.state;
        const ios = Platform.OS === 'ios'

        const { style, hint, hintColor, password, maxLength, onChangeText, left,
            right, inputType, onClickCountry, hasCountry, textStyle, returnKeyType, blurOnSubmit, onFocus, value, multiline, editable, textAlign, minHeight } = this.props

        return (
            <View style={{ ...styles.coontainerStyle, ...style }} >
                {
                    this.renderIcon(left, { borderBottomLeftRadius: 5, borderTopLeftRadius: 5 })
                }
                {hasCountry ?
                    <Clickable onPress={onClickCountry} style={styles.countryView}>
                        <Text style={styles.Countrytext}>+234</Text>
                        <Image source={Images.ic_CountryIcon} style={styles.CountryImg}></Image>
                    </Clickable> : null}
                <View style={{backgroundColor: isFocused ? Colors.Defaultwhite : Colors.BlackColor50, height: ResponsivePixels.size56,flex:1, borderColor:this.state.borderColor,borderWidth:ResponsivePixels.size1,borderRadius:ResponsivePixels.size8}}>
                    <TextInput style={{
                        ...styles.textInputStyle, paddingTop: ios ? 0 : 0, paddingBottom: ios ? 0 : 0,
                        minHeight: minHeight,
                        textAlign: 'left',
                        borderRadius: ResponsivePixels.size3,
                        fontFamily: FontName.regular,
                        color: Colors.BlackColor900,
                        fontSize: FontSize.fontSize17,
                        textAlignVertical: multiline ? textAlign || 'top' : textAlign || 'center',
                        ...textStyle
                    }}
                        placeholder={hint}
                        ref={input => this.textInput = input}
                        selectionColor={Colors.BlackColor900}
                        returnKeyType={returnKeyType}
                        placeholderTextColor={Colors.BlackColor500}
                        maxLength={maxLength}
                        value={value}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        editable={editable}

                        onSubmitEditing={this.onSubmitEditing.bind(this)}
                        keyboardType={inputType || 'default'}
                        secureTextEntry={password}
                        blurOnSubmit={blurOnSubmit}
                        // onChangeText={(value) => {

                        //     if (inputType === 'numeric' || inputType === 'phone-pad') {

                        //         value = value.replace(/[^(((\d)+(\.)\d)|((\d)+))]/g, '_').split("_")[0]
                        //     }
                        //     onChangeText(value)
                        // }}
                        multiline={multiline} />
                    {
                        this.renderIcon(right, { borderBottomRightRadius: 5, borderTopRightRadius: 5 })
                    }
                </View>
            </View>
        );
    }

    renderIcon = (icon, radius) => {

        if (icon && icon.name) {

            return (
                <View style={{
                    width: 40, backgroundColor: icon.bgColor || '#00000000', justifyContent: 'center',
                    alignItems: 'center', ...radius
                }}>
                    <Icon name={icon.name} style={{ color: icon.color || 'white', fontSize: 20 }} />
                </View>
            );
        } else if (icon && icon.source) {
            return (
                <View style={{
                    width: 40, backgroundColor: icon.bgColor || '#00000000', justifyContent: 'center',
                    alignItems: 'center', ...radius
                }}>
                    <Image source={icon.source} style={{ width: 25, height: 25 }} />
                </View>
            );
        }
    }
}
// const EditText = ({ style, hint, ref, hintColor, password, maxLength, onChangeText, left, right, inputType, value, multiline, minHeight }) => {
//     const ios = Platform.OS === 'ios'
//     return (
//         <View style={{ ...styles.coontainerStyle, ...style }} >
//             {
//                 renderIcon(left, { borderBottomLeftRadius: 5, borderTopLeftRadius: 5 })
//             }
//             <TextInput style={{ ...styles.textInputStyle, paddingTop: ios ? 12 : 8, paddingBottom: ios ? 12 : 8, minHeight: minHeight, textAlignVertical: multiline ? 'top' : 'center' }}
//                 placeholder={hint}
//                 ref={ref}
//                 selectionColor={'orange'}
//                 placeholderTextColor={hintColor}
//                 maxLength={maxLength}
//                 value={value}
//                 keyboardType={inputType || 'default'}
//                 secureTextEntry={password}
//                 onChangeText={onChangeText}
//                 multiline={multiline} />
//             {
//                 renderIcon(right, { borderBottomRightRadius: 5, borderTopRightRadius: 5 })
//             }
//         </View>
//     );
// }





const styles = {

    coontainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInputStyle: {
        flex: 1,
        paddingLeft:ResponsivePixels.size16
    },
    countryView: {
        alignItems: 'center',
        flexDirection: 'row',
        height: ResponsivePixels.size40,
        borderRadius: ResponsivePixels.size3,
        marginRight: ResponsivePixels.size8,
        backgroundColor: Colors.Backgroundgrey
    },
    CountryImg: {
        alignItems: 'center',
        marginRight: ResponsivePixels.size8,
    },
    Countrytext: {
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize18,
        marginLeft: ResponsivePixels.size12,
        marginRight: ResponsivePixels.size4,
        color: Colors.DarkGreyColor,
    },
    SperatorLine: {
        width: 2,
        height: 24,
        backgroundColor: Colors.lightGreyColor,
    },
}