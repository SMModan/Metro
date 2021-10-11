import React, {Component} from 'react';
import {View, ImageBackground, Image} from 'react-native';

import {connect} from 'react-redux';
import {strings} from '../../language/Language';
import {goBack, push} from '../../navigation/Navigator';
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
class AddLeaveRequest extends Component {
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
          title: 'New Leave',
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
                value={'Harshil Thaker-MT-W-1075'}
                onChangeText={text => onTextChanged('employeeName', text)}
                label={'Supervisor'}
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
                editable={false}
              />

              <CustomPicker
                list={[
                  {id: '1231', name: 'asdasd'},
                  {id: '1231', name: 'asdasd'},
                  {id: '1231', name: 'asdasd'},
                ]}
                selectedItem={{id: circleId}}
                label={'Leave Type'}
                onSelect={item => onTextChanged('circleId', item.id)}
              />
            </ViewWithTitle>

            <ViewWithTitle title="Time Period">
              <View style={{flexDirection: 'row', width: '100%'}}>
                <CustomDatePicker
                  selectedDate={ApplicationDate || new Date()}
                  minimumDate={ApplicationDate || new Date()}
                  onDateChanged={date => {
                    onTextChanged('ApplicationDate', date);
                  }}
                  label={'From Date'}
                  containerStyle={{flex: 1, width: '50%'}}
                  editable={false}
                />

                <Checkbox
                  label="isHalfDay"
                  color={Colors.Red900}
                  style={{width: '50%'}}
                  checked={'checked'}
                />
              </View>

              <View style={{flexDirection: 'row', width: '100%'}}>
                <CustomDatePicker
                  selectedDate={ApplicationDate || new Date()}
                  minimumDate={ApplicationDate || new Date()}
                  onDateChanged={date => {
                    onTextChanged('ApplicationDate', date);
                  }}
                  label={'To Date'}
                  containerStyle={{flex: 1, width: '50%'}}
                  editable={false}
                />

                <Checkbox
                  label="isHalfDay"
                  color={Colors.Red900}
                  style={{width: '50%'}}
                  checked={'checked'}
                />
              </View>

              <Checkbox
                label="isAllHalfDay"
                color={Colors.Red900}
                style={{width: '50%'}}
                checked={'checked'}
              />
              <FloatingEditText
                value={carDetails}
                onChangeText={text => onTextChanged('carDetails', text)}
                label={'Leave Balance'}
                editable={false}
              />

              <FloatingEditText
                value={carDetails}
                onChangeText={text => onTextChanged('carDetails', text)}
                label={'Total Days'}
                editable={false}
              />
            </ViewWithTitle>

            <ViewWithTitle title="Personal Details">
              <FloatingEditText
                value={carNumber}
                onChangeText={text => onTextChanged('carNumber', text)}
                label="Contact No"
              />

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
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image source={Images.ic_upload} />
                        <Text style={styles.uploadText}>Upload here</Text>
                      </View>
                    ) : null}
                  </ImageBackground>
                </Clickable>
              </View>
            </ViewWithTitle>

            <Button
              title={strings.applyForLeave}
              style={{margin: ResponsivePixels.size16}}
              onPress={()=>{goBack()}}


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

export default connect(mapStateToProps, mapDispatchToProps)(AddLeaveRequest);
