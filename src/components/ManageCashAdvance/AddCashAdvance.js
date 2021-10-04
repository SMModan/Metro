import React, {Component} from 'react';
import {View, ImageBackground, Image} from 'react-native';

import {connect} from 'react-redux';
import {strings} from '../../language/Language';
import {goBack} from '../../navigation/Navigator';
import {Images, Colors} from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import {
  Button,
  ChipViewContainer,
  CustomDatePicker,
  CustomPicker,
  FloatingEditText,
  MainContainer,
  ScrollContainer,
  ViewWithTitle,
  Clickable,
  Checkbox,
} from '../common';
import {RadioButton, Text} from 'react-native-paper';

import PhotoPicker from '../common/PhotoPicker';
class AddCashAdvance extends Component {
  state = {
    Location: '',
    IsFullDayEvent: 0,
    StartTime: '',
    EndTime: '',
    Subject: '',
    OwnerRemarks: '',
    AssigneeRemarks: '',
    AssignUserName: '',
    EntityID: 0,
    EntityName: '',
    EntityFieldID: 0,
    EntityFieldName: '',
    ReminderAlertID: 0,
    ActivityID: 0,
    AssignUserName: [],
    RelatedList: [],
    loading: false,
    AssignUserID: [],
    ActivityOwnerID: 0,
    user: this.props.session.user,
    AssignUserRemarks: [],
    selectedAttachment: '',
  };

  onTextChanged = (key, value) => {
    console.log('key', key, value);

    this.setState({
      [key]: value,
    });

    if (key == 'EntityID' && value) {
      this.getRelatedToByEntityID(value);
    }
  };

  onTextChanged = (key, value) => {
    this.setState({
      [key]: value,
    });
  };
  render() {
    const {
      employeeName,
      ApplicationDate,
      circleId,
      projectId,
      carDetails,
      carNumber,
      riggerName,
      receivedKM,
      attendanceTypeId,
      remarks,
      selectedAttachment,
    } = this.state;
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => goBack(),
          },
          title: 'Add Cash Advance',
          hideUnderLine: true,
          light: true,
        }}>
        <ScrollContainer>
          <View>
            <ViewWithTitle title="General Details">
              <FloatingEditText
                value={'Admin Admin EMP001'}
                onChangeText={text => onTextChanged('employeeName', text)}
                label={'Employee Name'}
                editable="false"
              />

              <FloatingEditText
                value={''}
                onChangeText={text => onTextChanged('employeeName', text)}
                label={'Approver'}
                editable="false"
              />

              <CustomDatePicker
                selectedDate={ApplicationDate || new Date()}
                minimumDate={ApplicationDate || new Date()}
                onDateChanged={date => {
                  onTextChanged('ApplicationDate', date);
                }}
                label={'Cash Advance Date'}
                containerStyle={{flex: 1}}
                editable={false}
              />
          <CustomPicker list={[{id:"1231",name:"asdasd"},{id:"1231",name:"asdasd"},{id:"1231",name:"asdasd"},]}  selectedItem={{ id: projectId }} label={'Project Name'} onSelect={(item) => onTextChanged("projectId", item.id)} />
          <CustomPicker list={[{id:"1231",name:"asdasd"},{id:"1231",name:"asdasd"},{id:"1231",name:"asdasd"},]}  selectedItem={{ id: projectId }} label={'Expense Head'} onSelect={(item) => onTextChanged("projectId", item.id)} />




              {/* <CustomPicker
                list={[
                  {id: '1231', name: 'asdasd'},
                  {id: '1231', name: 'asdasd'},
                  {id: '1231', name: 'asdasd'},
                ]}
                selectedItem={{id: circleId}}
                label={'Leave Type'}
                onSelect={item => onTextChanged('circleId', item.id)}
              /> */}
            </ViewWithTitle>

            <ViewWithTitle title="Amount">
              <View style={{flexDirection: 'row', width: '100%'}}>
              <FloatingEditText
                value={''}
                onChangeText={text => onTextChanged('employeeName', text)}
                label={'Amount'}
                style={{width:"50%",marginRight:ResponsivePixels.size10}}
              />
                <FloatingEditText
                value={''}
                onChangeText={text => onTextChanged('employeeName', text)}
                label={'Remaining Amount'}
                editable={false}
                style={{width:"50%"}}
              />
             
              </View>
              <FloatingEditText
                value={remarks}
                onChangeText={text => onTextChanged('riggerName', text)}
                label="Remarks"
                multiline={true}
              />
            </ViewWithTitle>

            <Button
              title={strings.submit}
              style={{margin: ResponsivePixels.size16}}
            />
          </View>
        </ScrollContainer>
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddCashAdvance);
