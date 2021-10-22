

import React, {Component} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {
  MainContainer,
  ScrollContainer,
  Clickable,
  Button,
  EditText,
  CustomDatePicker,
} from '../../common';
import {connect} from 'react-redux';
import moment from 'moment';

class MyAttendanceList extends Component {
  state = {
    fromDate: moment(new Date()).toDate(),
  };

  componentDidMount(){
    alert("test")
  }
  render() {
    const {fromDate} = this.state;
    return (
      <ScrollContainer>
      <CustomDatePicker
      selectedDate={
        fromDate ? moment(fromDate).toDate() : undefined
      }
      minimumDate={fromDate}
      onDateChanged={date => {
        this.setState(
          {
            fromDate: date,
          },
          () => {
            console.log('fromDate===>', this.state.fromDate);
          },
        );
      }}
      label={'From Date'}
      containerStyle={{flex: 1, width: '50%'}}
    />
    </ScrollContainer>
    );
  }
}


export default (MyAttendanceList);
