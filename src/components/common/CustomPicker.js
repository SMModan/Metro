import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Image, View } from 'react-native';
import { Colors, FontName, Images } from '../../utils';
import FloatingEditText from './FloatingEditText';
import SelectionView from './SelectionView';

export default class CustomPicker extends Component {


    state = {

        selectedItem: { name: "" }
    }

    componentDidMount = () => {

        if (this.props.selectedItem?.id && this.props.list) {
            this.updateSelectedItem()
        }
    }
    updateSelectedItem = () => {
        if (this.props.selectedItem) {
            const item = this.props.list.find((item) => {
                return item.id == this.props.selectedItem?.id || ""
            })
            if (item)
                this.setState({ selectedItem: item })
            else
                this.setState({ selectedItem: { name: "", id: "" } })
        }

    }
    componentDidUpdate = (prevProps, prevState, snapShot) => {

        if (this.props.list.length) {
            // console.log("this.state.selectedItem.id", this.props.label, this.state.selectedItem.id)
            // console.log("this.props.selectedItem", this.props.label, this.props.selectedItem)

            if (this.state.selectedItem?.id) {
                // console.log("this.props.selectedItem", this.props.label, this.props.selectedItem)

                if (!this.props.selectedItem?.id) {
                    this.setState({ selectedItem: { name: "", id: "" } })

                } else if (this.props.selectedItem?.id != this.state.selectedItem.id) {
                    this.updateSelectedItem()

                }
            } else {

                // this.updateSelectedItem()
                if (this.props.selectedItem?.id) {
                    // console.log("this.props.selectedItem?.id", this.props.label, this.props.selectedItem?.id)

                    this.updateSelectedItem()

                }
            }
        }
    }
    render() {
        const iconStyle = this.props.iconStyle ? this.props.iconStyle : {}
        return (

            <View style={{ ...this.props.containerStyle }}>
                <FloatingEditText
                    style={{ ...this.props.floaingStyle }}
                    multiline={false} onPress={() => {
                        // Utils.showToast("Test")
                        // console.log("Print")
                        // console.log("this.props.list", this.props.list)
                        if (this.props.disabled == true)
                            return
                        SelectionView.show({
                            title: this.props.label,
                            onSelect: (item) => {

                                console.log("this.props.onSelect", this.props.onSelect, item)

                                if (this.props.onSelect)
                                    this.props.onSelect(item)

                                this.setState({ selectedItem: item })
                            },
                            data: this.props.list || []
                        })
                    }}
                    value={this.state.selectedItem?.name}
                    label={this.props.label}
                    editable={false}
                    rightIcon={Images.ic_down}
                    leftIcon={this.props.leftIcon}
                    onPressLeftIcon={this.props.onPressLeftIcon}
                    onPressRightIcon={this.props.onPressRightIcon}
                />
            </View>

        );
    }
}
