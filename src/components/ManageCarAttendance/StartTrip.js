import React, { Component } from 'react';
import { View, ImageBackground, Image, Alert } from 'react-native';

import { connect } from 'react-redux';
import { strings } from '../../language/Language';
import { goBack, push, replace, reset } from '../../navigation/Navigator';
import { Images, Utils } from '../../utils';
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
import { RadioButton, Text } from 'react-native-paper';
import styles from './styles/Attendance.style';

import PhotoPicker from '../common/PhotoPicker';
import CarAttendanceApi from './Api/CarAttendanceApi';
import Geolocation from 'react-native-geolocation-service';

import { store } from '../../App';
import { askForLocationPermission, subscribeForLocationAndRequestService } from './LocationAndRequestService';
import Geocoder from 'react-native-geocoding';
import { setSessionField } from '../../reducers/SessionReducer';
class StartTrip extends Component {
  state = {
    circleList: [],
    AssignUserRemarks: [],
    selectedAttachment: '',
    circleId: "",
    projectId: "",
    attendanceTypeId:0,
    vehicleType:1,
    ac_nonac:0,
    latitude:0,
    longitude:0
  };
  componentDidMount() {


    

     this.GetWorkLocation()
    // this.GetProjectByLocationId()
  }

  onTextChanged = (key, value) => {
    this.setState({
      [key]: value,
    });
  };


  onCircleSlected = (circleId) => {
    this.setState({
      circleId
    }, () => {
      this.GetProjectByLocationId()
    })
  }


  GetWorkLocation = () => {
    const EmpId = store.getState().session.user.EmployeeID
    const params = {
      EmpId
    }

    ProgressDialog.show()

    CarAttendanceApi.GetWorkLocation(params, (res) => {

      if (res) {
        const Table = res.Table
        if (Table) {
          ProgressDialog.hide()

          let circleList = []
          if (Array.isArray(Table)) {
            console.log("circleList =================>>>>>>>>>>>>>>>>>", Table)
            for (let index = 0; index < Table.length; index++) {
              const circle = Table[index];

              const objCircle = {
                id: circle.ID,
                name: circle.OrganizationName
              }
              circleList.push(objCircle)
            }

          } else {

            const objCircle = {
              id: Table.ID,
              name: Table.OrganizationName
            }
            circleList.push(objCircle)

          }
          this.setState({
            circleList
          })
        }
      }

    }, () => {
      ProgressDialog.hide()
    })
  }



  GetProjectByLocationId = () => {
    const EmployeeID = store.getState().session.user.EmployeeID
    const { circleId } = this.state
    const params = {
      EmployeeID,
      LocationID: circleId
    }

    ProgressDialog.show()

    CarAttendanceApi.GetProjectByLocationId(params, (res) => {
      ProgressDialog.hide()

      if (res) {
        const Table = res.Table
        if (Table) {

          let projectList = []
          if (Array.isArray(Table)) {
            console.log("circleList =================>>>>>>>>>>>>>>>>>", Table)
            for (let index = 0; index < Table.length; index++) {
              const project = Table[index];

              const objProject = {
                id: project.ID,
                name: project.ProjectName
              }
              projectList.push(objProject)
            }

          } else {
            const objProject = {
              id: Table.ID,
              name: Table.ProjectName
            }
            projectList.push(objProject)

          }
          this.setState({
            projectList
          })
        }
      }

    }, () => {
      ProgressDialog.hide()
    })
  }


  
 


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

      Alert.alert("Warn", res, [{
        text: "Ok", onPress: () => {
          ProgressDialog.hide()
          this.InsertDailyAttendanceForLocation()

        }
      }])
      
    })
  }



  InsertDailyAttendanceForLocation = () => {
    const EmployeeID = store.getState().session.user.EmployeeID
    const {latitude,longitude } = this.state
    
    const date = new Date()
    const _date = Utils.formatDate(date, 'DD-MMM-yyyy HH:mm:ss');
     const latLang = `${latitude},${longitude}`

    const params = {
      Location:latLang,
       Remarks:"=",
       Time:_date,
        Address:"Key Need to setto get address",
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
      projectId,
      carDetails,
      carNumber,
      riggerName,
      receivedKM,
      attendanceTypeId,
      remarks,
      attachment,
      circleId,
      ac_nonac,
      vehicleType 
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
      RiggerName: riggerName,
      ReceiveKM: receivedKM,
      ReleasedKM: 0,
      Remarks: remarks,
      WorkLocationID: circleId || 0,
      ProjectID: projectId || 0,//testing
      CarVenderName: carDetails,
      TotalKM: 0,
      VechicleType: vehicleType,
      ISAC: ac_nonac,
      StartLatitude: latitude||"",
      StartLongitude: longitude||"",
      EndLongitude: "",
      EndLatitude: "",
      MarkType: 1,
      AttendanceType: attendanceTypeId || 0
    }
    console.log("params", params)
    CarAttendanceApi.InsertDailyAttendanceForVehicle(params, (res) => {
      if (res) {
       subscribeForLocationAndRequestService()

        setTimeout(() => {
          ProgressDialog.hide()
          Utils.showToast("Trip Started Successfully")
          replace("CarAttendanceList")
        }, 2000);
       
      }

    }, (error) => {
      Alert.alert("Warn", error, [{
        text: "Ok", onPress: () => {
          goBack()
        }
      }])
      ProgressDialog.hide()
    })
  }

  render() {
    const {
      employeeName,
      projectId,
      carDetails,
      carNumber,
      riggerName,
      receivedKM,
      attendanceTypeId,
      remarks,
      selectedAttachment,

      applicationDate,
      circleId,
      circleList,
      projectList,
      ac_nonac,
      vehicleType
    } = this.state;
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
                selectedDate={applicationDate || new Date()}
                minimumDate={applicationDate || new Date()}
                onDateChanged={date => {
                  this.onTextChanged('applicationDate', date);
                }}
                label={'Application Date'}
                containerStyle={{ flex: 1 }}
              />

              <CustomPicker
                list={circleList || []}
                selectedItem={{ id: circleId }}
                label={'Circle'}
                onSelect={item => this.onCircleSlected(item.id)}
              />
              <CustomPicker
                list={projectList || []}
                selectedItem={{ id: projectId }}
                label={'Project Name'}
                onSelect={item => this.onTextChanged('projectId', item.id)}
              />
            </ViewWithTitle>

            <ViewWithTitle title="Car Details">
              <FloatingEditText
                value={carDetails}
                onChangeText={text => this.onTextChanged('carDetails', text)}
                label={'Car Details  (OLA/UBER)'}
              />

              <FloatingEditText
                value={carNumber}
                onChangeText={text => this.onTextChanged('carNumber', text)}
                label="Car Number"
              />

              <FloatingEditText
                value={riggerName}
                onChangeText={text => this.onTextChanged('riggerName', text)}
                label="Rigger Name"
              />


              <FloatingEditText
                value={receivedKM}
                inputType="numeric"
                onChangeText={text => this.onTextChanged('receivedKM', text)}
                label="Car Received KM"
              />

              <ChipViewContainer
                selectedChip={{ id: attendanceTypeId }}
                onSelect={item => {
                  this.onTextChanged("attendanceTypeId", item.id)
                }}
                title="AttendanceType"
                chips={[
                  { id: 0, name: 'OnCallCab' },
                  { id: 1, name: 'MonthlyCab' },
                ]}
              />

              <ChipViewContainer
                selectedChip={{ id: vehicleType }}
                onSelect={item => {
                  this.onTextChanged('vehicleType', item.id);
                }}
                title="VehicleType"
                chips={[
                  { id: 0, name: 'Big' },
                  { id: 1, name: 'Small' },
                ]}
              />

              <ChipViewContainer
                selectedChip={{ id: ac_nonac }}
                onSelect={item => {
                  this.onTextChanged('ac_nonac', item.id);
                }}
                title="AC/NonAc"
                chips={[
                  { id: 0, name: 'AC' },
                  { id: 1, name: 'NonAC' },
                ]}
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
                    });
                  }}
                  style={{
                    height: ResponsivePixels.size200,
                    marginTop: ResponsivePixels.size20,
                  }}>
                  <ImageBackground
                    imageStyle={{ borderRadius: ResponsivePixels.size16 }}
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
              title="Start Trip"
              style={{ margin: ResponsivePixels.size16 }}
              // disabled={true}
              onPress={() => {
                // goBack();

                Geolocation.getCurrentPosition((position) => {
                  const { latitude, longitude } = position.coords
        store.dispatch(setSessionField("current_location", position.coords))
                  
                  this.setState({
                    latitude,
                    longitude
                  },()=>{
                    console.log("latitude =======>>>>>>>",latitude);
                    console.log("longitude =======>>>>>>>",longitude);
                  })
                })
            
                const {
                  projectId,
                  carDetails,
                  carNumber,
                  riggerName,
                  receivedKM,
                  attendanceTypeId,
                  remarks,
                  attachment,
                  circleId,
                  ac_nonac,
                  vehicleType 
                } = this.state



                if(!circleId){
                  Utils.showToast("Please select circle.")
                }else if(!projectId){
                  Utils.showToast("Please select project.")
                }else if(!carDetails){
                  Utils.showToast("Please enter car details.")
                }else if(!carNumber){
                  Utils.showToast("Please enter car number.")
                }else if(!riggerName){
                  Utils.showToast("Please enter rigger name.")
                }else if(!receivedKM){
                  Utils.showToast("Please enter received KM.")
                }else if(!remarks){
                  Utils.showToast("Please enter remarks")
                }else if(!attachment){
                  Utils.showToast("Please upload documents")
                }else{
                store.dispatch(setSessionField("distances", 0))

                   this.GetMarkinForSelectedDate()
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

export default connect(mapStateToProps, mapDispatchToProps)(StartTrip);
