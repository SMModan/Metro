import React, {Component} from 'react';
import {View, ImageBackground, Image} from 'react-native';

import {connect} from 'react-redux';
import {strings} from '../../language/Language';
import {goBack, push} from '../../navigation/Navigator';
import {Images, Utils} from '../../utils';
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
  ProgressDialog,
} from '../common';
import {RadioButton, Text} from 'react-native-paper';
import styles from './styles/Attendance.style';

import PhotoPicker from '../common/PhotoPicker';
import CarAttendanceApi from './Api/CarAttendanceApi';
import { store } from '../../App';
class EndTrip extends Component {
  state = {
    circleList:[],
    AssignUserRemarks: [],
    selectedAttachment: '',
    circleId:0
  };
componentDidMount() {
  this.GetPendingCarOutNumber()
  // this.GetProjectByLocationId()
}

  onTextChanged = (key, value) => {
    this.setState({
      [key]: value,
    });
  };


  


  
  
  GetMarkinForSelectedDate = () => {
    const EmployeeID = store.getState().session.user.EmployeeID
    const { circleId } = this.state

    const date = new Date()
    const _date = Utils.formatDate(date, 'DD-MMM-YYYY');



    const params = {
      EmployeeID,
      Date: _date
    }

    ProgressDialog.show()
    CarAttendanceApi.GetMarkinForSelectedDate(params, (res) => {
      ProgressDialog.hide()

      if (res) {
        console.log("res >>>>>>>>>>>>>>>>>>>>>>>=======================>", res)
      }

    }, (res) => {
      console.log("res <<<<<<<<<<<<<<<<<=====>>>>>>>>>>>>>",res)
      alert(res)
      ProgressDialog.hide()
    })
  }
  
  GetPendingCarOutNumber = () => {
    const EmployeeID = store.getState().session.user.EmployeeID
    
    const params = {
      EmployeeID,
    }

    ProgressDialog.show()
    CarAttendanceApi.GetPendingCarOutNumber(params, (res) => {
      ProgressDialog.hide()

      if (res) {
        const table= res.Table
        if(table){
          this.setState({
            carNumber:""+table?.CarNumber
          })
        }
        console.log("res >>>>>>>>>>>>>>>>>>>>>>>=======================>", this.state.carNumber)
      }

    }, (res) => {
      console.log("res <<<<<<<<<<<<<<<<<=====>>>>>>>>>>>>>",res)
      ProgressDialog.hide()
    })
  }



  InsertDailyAttendanceForLocation = () => {
    const EmployeeID = store.getState().session.user.EmployeeID
    const { circleId } = this.state
    
    const date = new Date()
    const _date = Utils.formatDate(date, 'DD-MMM-yyyy HH:mm:ss');

    const params = {
      Location:"22.9909636,72.5298871",
       Remarks:"=",
       Time:_date,
        Address:"Ahmedabad",
        EmployeeID
       }

       console.log("params === InsertDailyAttendanceForLocation",params)

    ProgressDialog.show()

    CarAttendanceApi.InsertDailyAttendanceForLocation(params, (res) => {
      ProgressDialog.hide()

      if (res) {
      
        const isSucceed = res.IsSucceed

        if(isSucceed){
          this.InsertDailyAttendanceForVehicle()
        }


      }

    }, () => {
      ProgressDialog.hide()
    })
  }


  InsertDailyAttendanceForVehicle = async (latitude, longitude) => {
    const EmployeeID = store.getState().session.user.EmployeeID
    const {
      carNumber,
      remarks,
      attachment,
      carReleaseKM
    } = this.state

    ProgressDialog.show()
    let res = {}
    if (attachment && attachment.fileName) {
      res = await CarAttendanceApi.uploadCarDocument({
        EmployeeID,
        fileName: attachment.fileName,
        DocumentContent: attachment.base64
      })
    }


    const params = {
      EmployeeId:EmployeeID,
      DocumentName: res?.FileName || "",
      DocumentPath: res?.FilePath || "",
      CarNum: carNumber,
      DocumentType: attachment?.type || "",
      RiggerName: "",
      ReceiveKM: "0",
      ReleasedKM: carReleaseKM,
      Remarks: remarks,
      WorkLocationID: "0",
      ProjectID: "",//testing
      CarVenderName: "",
      TotalKM: "123",
      VechicleType: "0",
      ISAC: "0",
      StartLatitude: "",
      StartLongitude: "",
      EndLongitude: "",
      EndLatitude: "",
      MarkType: 2,
      AttendanceType: "0"
    }



    // "22.9909636,72.5298871"
    CarAttendanceApi.InsertDailyAttendanceForVehicle(params, (res) => {

      if (res) {
        console.log("res >>>>>>>>>>>>>>>>>>>>>>>=======================>", res)
        ProgressDialog.hide()
       
      }

    }, (error) => {
      alert(error)
      ProgressDialog.hide()
    })
  }


  render() {
    const {
      employeeName,
      carNumber,
      remarks,
      selectedAttachment,
      applicationDate,
      carReleaseKM,
      
    } = this.state;
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => goBack(),
          },
          title: 'End Trip',
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
                selectedDate={applicationDate || new Date()}
                minimumDate={applicationDate || new Date()}
                onDateChanged={date => {
                  this.onTextChanged('applicationDate', date);
                }}
                label={'Application Date'}
                containerStyle={{flex: 1}}
                disabled={false}
              />

           
            </ViewWithTitle>

            <ViewWithTitle title="Car Details">
              

              <FloatingEditText
                value={carNumber||""}
                onChangeText={text => this.onTextChanged('carNumber', text)}
                label="Car Number"
                editable={false}
              />
<FloatingEditText
                value={carReleaseKM}
                onChangeText={text => this.onTextChanged('carReleaseKM', text)}
                inputType="numeric"
                label={'Car Release KM'}
              />

              <FloatingEditText
                value={remarks}
                onChangeText={text => this.onTextChanged('remarks', text)}
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
              title="End Trip"
              style={{margin: ResponsivePixels.size16}}
              onPress={() => {

                const {carReleaseKM,attachment} = this.state
                if(!carReleaseKM){
                  Utils.showToast("Please enter Release KM.")
                }else if(!remarks){
                  Utils.showToast("Please enter Remarks.")
                }else if(!attachment){
                  Utils.showToast("Please upload document.")
                }else{
                  this.GetMarkinForSelectedDate()
                  this.InsertDailyAttendanceForLocation()
  
                }
                
              }}
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

export default connect(mapStateToProps, mapDispatchToProps)(EndTrip);
