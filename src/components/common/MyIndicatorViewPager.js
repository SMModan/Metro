import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { Images, FontName, FontSize, Colors } from '../../utils';
import { MainContainer, ScrollContainer, FloatingEditText, GradientButton, Clickable } from '../common';
import { strings } from '../../language/Language';


export default class MyIndicatorViewPager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0
        };
    }

    render() {
        return (

            <View style={this.props.containerStyle} >
                <ViewPager style={this.props.containerStyle} onPageSelected={(e) => {

                    this.setState({
                        page: e.nativeEvent.position
                    });

                    if (this.props.onPageSelected)
                        this.props.onPageSelected(e.nativeEvent)

                }}   >
                    {this.props.children}
                </ViewPager>
                {this.props.showDots && this.props.children.length > 0 ?
                    <View style={{
                        flexDirection: 'row', alignSelf: "center", position: "absolute", bottom: 20,

                        alignItems: 'center',
                    }}>
                        <View style={{
                            flex: 1, flexDirection: 'row', alignSelf: "center",
                            justifyContent: 'center', alignItems: 'center',
                        }}>
                            {
                                this.props.children.map((v, index) => (
                                    <View style={this.state.page == index ? this.props.selectedCircleStyle : this.props.CircleStyle}></View>
                                ))
                            }
                        </View>
                    </View> : null}
            </ View>

        );
    }
}

const styles = StyleSheet.create({

    SkipTitle: {
        color: Colors.primaryColor,
        fontFamily: FontName.RobotoMedium,
        fontSize: FontSize.fontSize16,
    },
    nextbtn: {
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20
    },

});