import React, { Component } from 'react';
import { View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Utils from '../../utils/Utils';
import FloatingEditText from './FloatingEditText';

export default class CustomDatePicker extends Component {

    state = {
        isDatePickerVisible: false,
        selectedDate: this.props.selectedDate
    }
    render() {
        const iconStyle = this.props.iconStyle ? this.props.iconStyle : {}
        return (

            <View style={{ ...this.props.containerStyle }}>
                <FloatingEditText onPress={() => {
                    // Utils.showToast("Test")
                    // console.log("Print")
                    // console.log("this.props.list", this.props.list)
                    this.setState({
                        isDatePickerVisible: true
                    })
                }} onChangeText={() => this.props.onDateChanged(this.state.selectedDate)
                } label={this.props.label} value={Utils.formatDate(this.state.selectedDate, "DD-MM-YYYY")} editable={false} rightIcon={this.props.rightIcon} />
                <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode={this.props.mode || "date"}
                    date={this.state.selectedDate}
                    minimumDate={this.props.minimumDate}
                    onConfirm={(date) => {
                        console.log("date", date)

                        if (this.props.onDateChanged)
                            this.props.onDateChanged(date)
                        this.setState({
                            isDatePickerVisible: false,
                            selectedDate: date
                        })
                    }}

                    onCancel={() => {
                        this.setState({
                            isDatePickerVisible: false
                        })
                    }}
                />
            </View>
        );
    }
}