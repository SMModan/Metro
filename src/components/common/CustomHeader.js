import React, { Component } from 'react'
import { View, Image, TouchableOpacity, StatusBar, StatusBarIOS } from 'react-native'
import { Header, Left, Right, Body, Icon, Text, Button, Title } from 'native-base'
import Clickable from './Clickable';
import { Images, FontName, FontSize, Colors } from '../../utils';
import * as Animatable from 'react-native-animatable';


class CustomHeader extends Component {

    componentDidMount() {

        // StatusBar.setBarStyle('light-content')
    }

    render() {

        return (
            // <Header androidStatusBarColor={this.props.androidStatusBarColor || 'transparent'} {...this.props} style={{ backgroundColor: this.props.backgroundColor || Colors.darkBlue, justifyContent: 'center' }} >
            <Header onLayout={this.props.onLayout} transparent androidStatusBarColor={this.props.androidStatusBarColor || this.props.backgroundColor || 'transparent'} style={{ backgroundColor: this.props.backgroundColor || Colors.secondary500, justifyContent: 'center', borderBottomWidth: this.props.hideUnderLine ? 0 : 1, borderBottomColor: Colors.BlackColor200, ...this.props.style }}>
                <Left style={{ flex: 1 }}>{this._renderOption(this.props.left)}</Left>
                <Body style={{ flex: 2 }}>
                    {this._renderTitle()}
                </Body>
                <Right style={{ flex: 1 }}>
                    {this._renderRight()}
                </Right>
                <StatusBar
                    translucent={true} barStyle={!this.props.light ? 'dark-content' : 'light-content'} />
            </Header>
        )
    }

    // <Left>{this._renderOption(this.props.left)}</Left>

    //     <Body >
    //     {this._renderTitle()}
    // </Body>
    // <Right>
    //                 {this._renderRight()}
    //             </Right>


    _renderTitle() {

        let { title, image, titleColor } = this.props;

        if (title) {
            return (<Title style={{ color: titleColor || Colors.white, alignSelf: 'center', ...styles.titleStyle }}>{title}</Title>)
        } else if (image) {
            return (<Image source={image} style={{ alignSelf: 'center', resizeMode: 'contain', tintColor: this.props.titleColor }}
            />)
        }
    }

    _renderOption(options) {

        if (options) {
            let { icon, image, text, onPress, color, imageStyle } = options;

            if (icon) {
                return (<Clickable borderLess onPress={onPress} style={styles.iconStyle}><Icon name={icon} style={{ color: color || Colors.Defaultblack }} /></Clickable>)
            } else if (image) {
                return (<Clickable borderLess onPress={onPress}><Image source={image}
                    style={{ marginHorizontal: 6, resizeMode: 'contain', ...imageStyle }} /></Clickable>)
            } else if (text) {
                return (<Clickable borderLess style={styles.textContainerStyle} onPress={onPress}>
                    <Text style={{ ...styles.textStyle, color: color || Colors.white }}>{text}</Text>
                </Clickable>)
            }
        }
    }

    _renderRight() {

        if (this.props.right)
            return this.props.right.map(right => { return (this._renderOption(right)) })
    }
}

const styles = {

    textStyle: {
        marginHorizontal: 4,
        fontSize: FontSize.fontSize17,
        color: Colors.BlackWithOpacityColor,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FontName.bold
    },
    titleStyle: {
        fontSize: FontSize.fontSize17,
        fontWeight: "600",
        fontFamily: FontName.regular,
    },
    textContainerStyle: {

    },
    iconStyle: {
        marginHorizontal: 4,
        padding: 4,
    }
}

export default CustomHeader