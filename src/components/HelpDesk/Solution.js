import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Chip } from 'react-native-paper';
import { Colors } from '../../utils';
import {strings} from '../../language/Language';
import { Checkbox, Button, FloatingEditText, ViewWithTitle, DatePicker } from '../common';
import ResponsivePixels from '../../utils/ResponsivePixels';

class Solution extends Component {

  state = {
    selectedIndex: 0
  }

  render() {
    return (
      <View style={{ margin: 5, backgroundColor: Colors.white, }}>
        <ViewWithTitle title={'DatePicker'}>
          <ScrollView horizontal={true} style={{ borderColor: Colors.white, borderBottomColor: Colors.secondary50, borderWidth: 1 }}>
            {["Solution1", "Solution2", "Solution3"].map((item, index) =>
              <View>
                <Chip key={index} style={{ backgroundColor: Colors.white }} textStyle={{ fontSize: 13, color: Colors.black }} onPress={() => { this.setState({ selectedIndex: index }) }}>{item}</Chip>
                {
                  this.state.selectedIndex === index ? <View style={{ height: 3, backgroundColor: Colors.blue }} /> : null
                }
              </View>
            )}
          </ScrollView>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <DatePicker textColor={Colors.black} defaultDate={new Date()} startDate={new Date()} placeHolderText={"DatePicker Date"} style={{ height: 40, marginTop: 20, marginRight: 10 }}  textStyle={{ fontSize: 20 }}/>
            <FloatingEditText label={'HH'} inputType="numeric" style={{ width: 80, marginRight: 10}}/>
            <FloatingEditText label={'MM'} inputType="numeric" style={{ width: 80}}/>
          </View>
          <FloatingEditText label={'Enter action taken'} />
          <View style={{ margin: 5 }}>
          <View style={{ flexDirection: 'row', width: '100%', alignItems:'center', marginBottom: 10 }}>
            <View style={{  marginRight: 20, justifyContent:'center'}}>
              <Text style={{ fontSize: 17, marginTop: 10}}>{"Time Spent"}</Text>
            </View>
            <FloatingEditText label={'HH'} inputType="numeric" style={{ width: 80, marginRight: 10 }}/>
            <FloatingEditText label={'MM'} inputType="numeric" style={{ width: 80 }}/>
          </View>
          </View>
          <Checkbox label={'Want to send email to customer?'} labelColor={Colors.darkGray} checked={true} color={Colors.BlueColor400} />
        </ViewWithTitle>

        <Button title={strings.save} style={{ margin: ResponsivePixels.size16 }} />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Solution);
