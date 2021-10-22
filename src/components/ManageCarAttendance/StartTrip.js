import React, {Component} from 'react';
import {View, ImageBackground, Image} from 'react-native';

import {connect} from 'react-redux';
import {strings} from '../../language/Language';
import {goBack, push} from '../../navigation/Navigator';
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
  Clickable,
  ProgressDialog,
} from '../common';
import {RadioButton, Text} from 'react-native-paper';
import styles from './styles/Attendance.style';

import PhotoPicker from '../common/PhotoPicker';
import CarAttendanceApi from './Api/CarAttendanceApi';
class StartTrip extends Component {
  state = {
    circleList:[],
    AssignUserRemarks: [],
    selectedAttachment: '',
    circleId:0
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


  
  GetWorkLocation = () => {
    const EmpId= store.getState().session.user.EmployeeID
    const params = {
      EmpId
    }
 
    ProgressDialog.show()

    CarAttendanceApi.GetWorkLocation(params, (res) => {
        
        if(res){
          const Table = res.Table
          if (Table) {
            ProgressDialog.hide()

            let circleList = []
            if (Array.isArray(Table)) {
              console.log("circleList =================>>>>>>>>>>>>>>>>>",Table)
              for (let index = 0; index < Table.length; index++) {
                const circle = Table[index];

                const objCircle = {
                  id:circle.ID,
                  name:circle.OrganizationName
                }
                circleList.push(objCircle)
              }
             
            }else{
           
              const objCircle = {
                id:Table.ID,
                name:Table.OrganizationName
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
    const EmpId= store.getState().session.user.EmployeeID
    const {circleId} = this.state
    const params = {
      EmpId,
      LocationID:circleId
    }
 
    ProgressDialog.show()

    CarAttendanceApi.GetProjectByLocationId(params, (res) => {
        
        if(res){
          const Table = res.Table
          if (Table) {
            ProgressDialog.hide()

            let projectList = []
            if (Array.isArray(Table)) {
              console.log("circleList =================>>>>>>>>>>>>>>>>>",Table)
              for (let index = 0; index < Table.length; index++) {
                const project = Table[index];

                const objProject = {
                  id:project.ID,
                  name:project.ProjectName
                }
                projectList.push(objProject)
              }
             
            }else{
              const objProject = {
                id:Table.ID,
                name:Table.ProjectName
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
    const EmpId= store.getState().session.user.EmployeeID
    const {circleId} = this.state

    const date = new Date()
    const _date = Utils.formatDate(date, 'yyyy-MM-DD');



    const params = {
      EmpId,
      LocationID:circleId,
      Date:_date
    }
 
    ProgressDialog.show()
    CarAttendanceApi.GetMarkinForSelectedDate(params, (res) => {
        
        if(res){
          console.log("res >>>>>>>>>>>>>>>>>>>>>>>=======================>",res)
        }
     
    }, () => {
      ProgressDialog.hide()
    })
  }

  InsertDailyAttendanceForLocation = () => {
    const EmployeeID= store.getState().session.user.EmployeeID
    const {LocationID,Remarks} = this.state

    const date = new Date()
    const _date = Utils.formatDate(date, 'dd-MMM-yyyy HH:mm:ss');



    const params = {
      EmployeeID,
      Location:"Remaining to set",
      Remarks,
      Time:_date,
      Address:"Remaining to set",
    }
 
    ProgressDialog.show()
    CarAttendanceApi.InsertDailyAttendanceForLocation(params, (res) => {
        
        if(res){
          console.log("res >>>>>>>>>>>>>>>>>>>>>>>=======================>",res)
        }
     
    }, () => {
      ProgressDialog.hide()
    })
  }

  InsertDailyAttendanceForVehicle = () => {
    const EmployeeID= store.getState().session.user.EmployeeID
    const {LocationID,Remarks} = this.state

    const date = new Date()
    const _date = Utils.formatDate(date, 'dd-MMM-yyyy HH:mm:ss');



    const params = {
      EmployeeID,
      Location:"Remaining to set",
      Remarks,
      Time:_date,
      Address:"Remaining to set",
    }
 
    ProgressDialog.show()
    CarAttendanceApi.InsertDailyAttendanceForVehicle(params, (res) => {
        
        if(res){
          console.log("res >>>>>>>>>>>>>>>>>>>>>>>=======================>",res)
        }
     
    }, () => {
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
      projectList
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
                containerStyle={{flex: 1}}
              />

              <CustomPicker
                list={circleList||[]}
                selectedItem={{id: circleId}}
                label={'Circle'}
                onSelect={item => onTextChanged('circleId', item.id)}
              />
              <CustomPicker
                list={projectList||[]}
                selectedItem={{id: projectId}}
                label={'Project Name'}
                onSelect={item => onTextChanged('projectId', item.id)}
              />
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
                value={receivedKM}
                onChangeText={text => onTextChanged('receivedKM', text)}
                label="Car Received KM"
              />

              <ChipViewContainer
                selectedChip={{id: attendanceTypeId}}
                onSelect={item => {
                  // onTextChanged("attendanceTypeId", item.id)
                }}
                title="AttendanceType"
                chips={[
                  {id: 0, name: 'OnCallCab'},
                  {id: 1, name: 'MonthlyCab'},
                ]}
              />

              <ChipViewContainer
                selectedChip={{id: attendanceTypeId}}
                onSelect={item => {
                  onTextChanged('attendanceTypeId', item.id);
                }}
                title="VehicleType"
                chips={[
                  {id: 0, name: 'Big'},
                  {id: 1, name: 'Small'},
                ]}
              />

              <ChipViewContainer
                selectedChip={{id: attendanceTypeId}}
                onSelect={item => {
                  onTextChanged('attendanceTypeId', item.id);
                }}
                title="AC/NonAc"
                chips={[
                  {id: 0, name: 'AC'},
                  {id: 1, name: 'NonAC'},
                ]}
              />

              <FloatingEditText
                value={remarks}
                onChangeText={text => this.onTextChanged('Remarks', text)}
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
              title="Start Trip"
              style={{margin: ResponsivePixels.size16}}
              onPress={() => {
                goBack();
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
