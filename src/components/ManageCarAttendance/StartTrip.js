import React, {Component} from 'react';
import {View,ImageBackground,Image} from 'react-native';

import {connect} from 'react-redux';
import {strings} from '../../language/Language';
import {goBack} from '../../navigation/Navigator';
import {Images} from '../../utils';
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
  Clickable
} from '../common';
import { RadioButton, Text } from 'react-native-paper';
import styles from './styles/Attendance.style';

import PhotoPicker from '../common/PhotoPicker';
class StartTrip extends Component {
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

  onTextChanged=(key,value)=>{
    this.setState({
      [key]:value
    })
  }
  render() {
    const {employeeName, ApplicationDate,circleId,projectId,carDetails,carNumber,riggerName,receivedKM,attendanceTypeId,remarks,selectedAttachment} = this.state;
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => goBack(),
          },
          title: 'Start Trip',
          hideUnderLine: true,
          light: true,
        }}>
        <ScrollContainer>
          <View>
            <ViewWithTitle title="General Details">
              <FloatingEditText
                value={employeeName}
                onChangeText={text => onTextChanged('employeeName', text)}
                label={'Admin Admin EMP001'}
                editable="false"
              />
              <CustomDatePicker
                selectedDate={ApplicationDate || new Date()}
                minimumDate={ApplicationDate || new Date()}
                onDateChanged={date => {
                  onTextChanged('ApplicationDate', date);
                }}
                label={'Application Date'}
                containerStyle={{flex: 1}}
              />

<CustomPicker list={[{id:"1231",name:"asdasd"},{id:"1231",name:"asdasd"},{id:"1231",name:"asdasd"},]}  selectedItem={{ id: circleId }} label={'Circle'} onSelect={(item) => onTextChanged("circleId", item.id)} /> 
<CustomPicker list={[{id:"1231",name:"asdasd"},{id:"1231",name:"asdasd"},{id:"1231",name:"asdasd"},]}  selectedItem={{ id: projectId }} label={'Project Name'} onSelect={(item) => onTextChanged("projectId", item.id)} />

            </ViewWithTitle>



            <ViewWithTitle title="Car Details">
              <FloatingEditText
                value={carDetails}
                onChangeText={text => onTextChanged('carDetails', text)}
                label={'Car Details  (OLA/UBER)'}
              />

<FloatingEditText
                value={carNumber}
                onChangeText={text => onTextChanged('carNumber', text)}
                label="Car Number"
              />

<FloatingEditText
                value={riggerName}
                onChangeText={text => onTextChanged('riggerName', text)}
                label="Rigger Name"
              />

<FloatingEditText
                value={riggerName}
                onChangeText={text => onTextChanged('riggerName', text)}
                label="Rigger Name"
              />

<FloatingEditText
                value={receivedKM}
                onChangeText={text => onTextChanged('receivedKM', text)}
                label="Car Received KM"
              />

<ChipViewContainer 
            selectedChip={{ id: attendanceTypeId }} onSelect={(item) => {
                // onTextChanged("attendanceTypeId", item.id)
            }} title="AttendanceType" chips={[{id:0,name:"OnCallCab"},{id:1,name:"MonthlyCab"}]} />


<ChipViewContainer 
            selectedChip={{ id: attendanceTypeId }} onSelect={(item) => {
                onTextChanged("attendanceTypeId", item.id)
            }} title="VehicleType" chips={[{id:0,name:"Big"},{id:1,name:"Small"}]} />


<ChipViewContainer 
            selectedChip={{ id: attendanceTypeId }} onSelect={(item) => {
                onTextChanged("attendanceTypeId", item.id)
            }} title="AC/NonAc" chips={[{id:0,name:"AC"},{id:1,name:"NonAC"}]} />


<FloatingEditText
                value={remarks}
                onChangeText={text => onTextChanged('riggerName', text)}
                label="Remarks"
                multiline={true}
              />


<View>
              <Clickable
                onPress={() => {
                  PhotoPicker({
                    onFileSelect: res => {
                      this.setState(
                        {
                          attachment: res,
                          selectedAttachment: res.source,
                          visibleDialog: false,
                        },
                        () => {
                          console.log(
                            'selectedAttachment0',
                            this.state.selectedAttachment,
                          );
                        },
                      );
                    },
                    noImage: true,
                  });
                }}
                style={{
                  height: ResponsivePixels.size200,
                  marginTop: ResponsivePixels.size20,
                }}>
                <ImageBackground
                  imageStyle={{borderRadius: ResponsivePixels.size16}}
                  source={selectedAttachment}
                  style={styles.uploadView}>
                  {!selectedAttachment ? (
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Image source={Images.ic_upload} />
                      <Text style={styles.uploadText}>Upload here</Text>
                    </View>
                  ) : null}
                </ImageBackground>
              </Clickable>
            </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(StartTrip);
