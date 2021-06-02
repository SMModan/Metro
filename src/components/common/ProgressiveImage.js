import React, { Component } from 'react'
import ImageLoad from 'react-native-image-placeholder';
import { Text, View, StyleSheet, Image } from 'react-native'
import Images from '../../Images';

const styles = StyleSheet.create({
    imageOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
    container: {

    },
});

export default class ProgressiveImage extends React.Component {
    render() {
        const {
            placeholder,
            source,
            style,
            ...props
        } = this.props;
        return (
            <View style={styles.container}>
                <Image
                    {...props}
                    source={placeholder || Images.placeholder}
                    style={style}
                />
                <Image
                    {...props}
                    source={source}
                    style={[styles.imageOverlay, style]}
                />
            </View>
        );
    }


}