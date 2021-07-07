import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Colors, FontName } from '../../utils';
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
        const item = this.props.list.find((item) => {
            return item.id == this.props.selectedItem?.id
        })
        if (item)
            this.setState({ selectedItem: item })
        else
            this.setState({ selectedItem: { name: "", id: "" } })


    }
    componentDidUpdate = (prevProps, prevState, snapShot) => {



        if (this.props.selectedItem?.id != this.state.selectedItem.id) {
            this.updateSelectedItem()

        }
    }
    render() {
        const iconStyle = this.props.iconStyle ? this.props.iconStyle : {}
        return (

            <View style={{ ...this.props.containerStyle }}>
                <FloatingEditText multiline={false} onPress={() => {
                    // Utils.showToast("Test")
                    // console.log("Print")
                    // console.log("this.props.list", this.props.list)
                    SelectionView.show({
                        title: this.props.label,
                        onSelect: (item) => {

                            if (this.props.onSelect)
                                this.props.onSelect(item)

                            this.setState({ selectedItem: item })
                        },
                        data: this.props.list || []
                    })
                }} value={this.state.selectedItem.name} label={this.props.label} editable={false}
                    rightIcon={this.props.rightIcon}
                    leftIcon={this.props.leftIcon}
                    onPressLeftIcon={this.props.onPressLeftIcon}
                    onPressRightIcon={this.props.onPressRightIcon}
                />
            </View>
        );
    }
}