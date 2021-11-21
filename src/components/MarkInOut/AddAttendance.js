import React, {Component} from 'react';
import {View, ImageBackground, Image, BackHandler} from 'react-native';

import {connect} from 'react-redux';
import {strings} from '../../language/Language';
import {goBack, push, replace, reset} from '../../navigation/Navigator';
import {Images, Colors, Utils} from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import CustomTimePicker from '../common/CustomTimePicker';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

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
  ProgressDialog,
  AlertDialog,
} from '../common';
import {Card, RadioButton, Text} from 'react-native-paper';

import PhotoPicker from '../common/PhotoPicker';
import AttendanceApi from './Api/AttendanceApi';
import {store} from '../../App';
import Geolocation from 'react-native-geolocation-service';

import moment from 'moment';
import { utils } from '@react-native-firebase/app';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];


class AddAttendance extends Component {
  state = {
    empList:[],
    projectList:[],
    projectId:0,
    projectName:"",
    EmployeeID:0,
    employeeName:"",
    MarkInTime:"",
    isVisibleMarkInMarkOut:true,
    isOldDateMarkout:false,
    startTime:"",
    differenceTime:0,
    percenTageCircularBar:0,
    currentTime:""
  };

  componentDidMount() {

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
    const date = new Date()
    const _date = `${date.getDate().toString().padStart(2, "0")}-${monthNames[date.getMonth()]}-${date.getFullYear()}`
    
    const currentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

let _self = this



    this.setState({
      date:_date,
      // startTime:_sTime,
      day:date.getDate().toString().padStart(2, "0"),
      month:monthNames[date.getMonth()],
      year:date.getFullYear(),
      
    },()=>{
      
      this.getEmplyeesUserHierarchy();
    })
  
  }

  getEmplyeesUserHierarchy = () => {
    const params = {};

    ProgressDialog.show();
    AttendanceApi.getEmplyeesUserHierarchy(
      params,
      res => {
        ProgressDialog.hide();
        if (res) {
          const Table = res.Table;
          if (Table) {
            let list = [];
            if (Array.isArray(Table)) {
              for (let index = 0; index < Table.length; index++) {
                const emp = Table[index];
                let objData = {
                  id: emp.ID,
                  name: emp.EmployeeName,
                };
                list.push(objData);
              }
            } else {
              let objData = {
                id: Table.ID,
                name: Table.EmployeeName,
              };
              list.push(objData);
            }
            this.setState({empList: list});
          }
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };

  splitTime = strDate => {
    let date = '';
    if (strDate) {
      const TStartSplit = strDate.split(' ');
      const stime = TStartSplit[1];
      date = `${stime}`;
    }
    return date;
  };
  splitDateWithSpace = strDate => {
    let date = '';
    if (strDate) {
      const TStartSplit = strDate.split(' ');
      const sDate = TStartSplit[0];
      date = `${sDate}`;
    }
    return date;
  };
  splitDateWithDash = strDate => {
    let TStartSplit = '';
    if (strDate) {
       TStartSplit = strDate.split('-');
    }
    return TStartSplit;
  };

  getHoursDifference = (markInDate,markInTime,markOutTime)=>{



    let date_1 = `${markInDate} ${markInTime}`
    let date_2 = `${markInDate} ${markOutTime}`


    console.log("date_1  =======>",date_1)
    console.log("date_2  =======>",date_2)
    var date1 = new Date(date_1);
var date2 = new Date(date_2);

var diff = date2.getTime() - date1.getTime();

var msec = diff;
var hh = Math.floor(msec / 1000 / 60 / 60);
msec -= hh * 1000 * 60 * 60;
var mm = Math.floor(msec / 1000 / 60);
msec -= mm * 1000 * 60;
var ss = Math.floor(msec / 1000);
msec -= ss * 1000;

let percenTageCircularBar = hh*100/24

this.setState({
  differenceHours:hh,
  differenceMinutes:mm,
  differenceTime:hh + ":" + mm + ":" + ss,
  percenTageCircularBar
})
console.log(hh + ":" + mm + ":" + ss);
  }

  getLastMarkInTime = () => {
    // const EmployeeID = store.getState().session.user.EmployeeID;
    const {EmployeeID,MarkInTime} = this.state;

    const params = {
      EmployeeID: EmployeeID,
    };
    ProgressDialog.show();

    AttendanceApi.GetLastMarkInTime(
      params,
      jsonResponse => {
        console.log('res=================?????????????????????????', jsonResponse);
        ProgressDialog.hide();

        if (jsonResponse) {
          console.log('res        =========             ========    ', jsonResponse);
          // {"Table": {"MarkInTime": "06-Nov-2021 00:08:59"}}

          const attendanceType = jsonResponse?.AttendanceType

          if(!attendanceType || attendanceType==0){
            const table = jsonResponse?.Table

            if(table){
              let MarkInTime = table.MarkInTime
              let MarkInDate = table.MarkInTime
              let isOldDateMarkout =false
              
            MarkInTime = this.splitTime(MarkInTime)
            MarkInDate = this.splitDateWithSpace(MarkInDate)

            const date = new Date()
            const _date = `${date.getDate().toString().padStart(2, "0")}-${monthNames[date.getMonth()]}-${date.getFullYear()}`


            console.log("datedatedatedatedate",date)
            console.log("_date_date_date_date_date_date",_date)


            let dayMonthSplit=[]
            if(MarkInDate !=_date){
              isOldDateMarkout=true
               dayMonthSplit=this.splitDateWithDash(MarkInDate)

              

               this.setState({
                MarkInTime,
                isOldDateMarkout,
                MarkInDate,
                day:dayMonthSplit[0],
                month:dayMonthSplit[1]
               },()=>{
                 alert(`Your mark-out for previous date (${MarkInDate}) is pending.`)
               })

               this.getHoursDifference(MarkInDate,MarkInTime,MarkInTime)

            }else{
              this.setState({
                MarkInTime,
                isOldDateMarkout,
                MarkInDate:_date
              })

              const currentDate = new Date()
              const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`

              this.getHoursDifference(_date,MarkInTime,currentTime)

            }             
            }
          }else{

            this.setState({
              isVisibleMarkInMarkOut:false
            })
            Utils.showToast('Your presence for today has already been marked!');
          }
           
       
          
        }
      },
      (jsonResponse) => {
        ProgressDialog.hide();

        this.setState({
          isVisibleMarkInMarkOut:true
        })
      
        console.log('err        =========             ========    ', jsonResponse);

        ProgressDialog.hide();
      },
    );
  };

  GetProjectsByEmployeeIDForDailyAttendance = () => {
    // const EmployeeID = store.getState().session.user.EmployeeID;

    const date = new Date()
    const _date = `${date.getDate().toString().padStart(2, "0")}-${date.getMonth()+1}-${date.getFullYear()}`


    const {EmployeeID} = this.state;
    const params = {
      empID: EmployeeID,
      AttDate:_date
    };
    console.log("datedatedatedatedatedatedate",params)

    AttendanceApi.GetProjectsByEmployeeIDForDailyAttendance(
      params,
      res => {
        if (res) {
          const Table = res.Table;
          if (Table) {
            let list = [];
            if (Array.isArray(Table)) {
              for (let index = 0; index < Table.length; index++) {
                const project = Table[index];
                let objData = {
                  id: project.ID,
                  name: project.ProjectName,
                };
                list.push(objData);
              }
            } else {
              let objData = {
                id: Table.ID,
                name: Table.ProjectName,
              };
              list.push(objData);
            }
            this.setState({projectList: list});
          }
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };

  
  AddForLocation = () => {
    const { latitude,
      longitude,address, remarks ,EmployeeID,MarkInTime,isOldDateMarkout,MarkInDate} = this.state

   
    const date = new Date()
    const _date = `${date.getDate().toString().padStart(2, "0")}-${monthNames[date.getMonth()]}-${date.getFullYear()}`
    let fullDate = `${_date} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    const latLang = `${latitude},${longitude}`


    const params = {
      EmployeeID: EmployeeID,
      Location:latLang,
      Remarks:"",
      Time:isOldDateMarkout?MarkInDate:fullDate,
      Address:"Ahmedabad"
    };

    
    ProgressDialog.show();
    
    console.log("params",params)

    AttendanceApi.InsertDailyAttendanceForLocation(
      params,
      res => {
        ProgressDialog.hide();

        if (res) {
          console.log('res        =========             ========    ', res.AttendanceType);


          if(MarkInTime){
            this.insertMarkOut()
          }else{
            this.insertMarkIn()
          }
        }

      },
      (err) => {

        console.log('res        =========             ========    ', err);

      },
    );

   
  }



  insertMarkIn = () => {
    const { EmployeeID,projectId} = this.state
    const date = new Date()
    const _date = `${date.getDate().toString().padStart(2, "0")}-${monthNames[date.getMonth()]}-${date.getFullYear()}`
    let fullDate = `${_date} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    const params = {
      MarkType:1,
      EmployeeId:EmployeeID,
      MarkInTime:"",
      MarkOutTime:"",
      projectID:0
    };

    
    

    ProgressDialog.show();
      AttendanceApi.InsertDailyAttendance(
        params,
        jsonResponse => {
          // console.log("res Insert leave for  ===============================>",jsonResponse.InsertLeaveApplicationResponse);
          console.log('\n JSONResponse', jsonResponse);
          const isSucceed = jsonResponse.IsSucceed;
          
          if (isSucceed) {
            AlertDialog.show({
              title: "MarkIn",
              message: "You Have Marked-In Successfully!",
              positiveButton: {
                  onPress: () => {
                      AlertDialog.hide()
                      replace('MarkInOutList');
                  },
                  title: "Ok"
              }
          })
          } else {
            const message = jsonResponse.Massage;
            alert(message);
          }
          ProgressDialog.hide();
        },
        (ErrorMessage) => {

          Utils.showToast(ErrorMessage);
          ProgressDialog.hide();
        },
      );
   
  }



  insertMarkOut = () => {
    const { EmployeeID,projectId,isOldDateMarkout,startTime,MarkInDate} = this.state
    const date = new Date()
    const _date = `${date.getDate().toString().padStart(2, "0")}-${monthNames[date.getMonth()]}-${date.getFullYear()}`
    let fullDate = `${_date} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    const _sTime = Utils.formatDate(startTime, 'HH:mm:ss');
    let oldMarkoutDateAndTime = `${MarkInDate} ${_sTime}`
    console.log("oldMarkoutDateAndTimeoldMarkoutDateAndTime",oldMarkoutDateAndTime)
    const params = {
      MarkType:2,
      EmployeeId:EmployeeID,
      MarkInTime:"",
      MarkOutTime:isOldDateMarkout?oldMarkoutDateAndTime:"",
      projectID:projectId
    };

    ProgressDialog.show();
      AttendanceApi.InsertDailyAttendance(
        params,
        jsonResponse => {
          // console.log("res Insert leave for  ===============================>",jsonResponse.InsertLeaveApplicationResponse);
          console.log('\n JSONResponse', jsonResponse);
          const isSucceed = jsonResponse.IsSucceed;
          ProgressDialog.hide();

          if (isSucceed) {

            AlertDialog.show({
              title: "MarkOut",
              message: "You Have Marked-Out Successfully!",
              positiveButton: {
                  onPress: () => {
                      AlertDialog.hide()
                  // goBack()
                  replace('MarkInOutList');
                  },
                  title: "Ok"
              }
          })
          } else {
            const message = jsonResponse.Massage;
            alert(message);
          }
          ProgressDialog.hide();
        },
        () => {
          ProgressDialog.hide();
        },
      );
   
  }



  onTextChanged = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleSubmit = () => {
    const UserType = store.getState().session.user.UserType;

    const {
      EmployeeID,
      projectId,
      MarkInTime,
      differenceHours,
    } = this.state;

    if (EmployeeID == 0) {
      Utils.showToast('Please select Employee');
    } else if(MarkInTime && projectId==0){
      Utils.showToast('Please select project');

    }else {
      if(MarkInTime && differenceHours<4){
        alert("Your presents hours are less then 4. it will mark as absent.")
      }
     this.AddForLocation()      
    
    }
  };

  base64ToBlob = async encoded => {
    let url = `data:image/jpg;base64,${encoded}`;
    let res = await fetch(url);
    let blob = await res?.blob();
    return blob;
  };


  
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  handleBackButtonClick() {
    reset("MarkInOutList")
    return true;
  }

  render() {
    const {
      employeeName,
      empList,
      EmployeeID,
      projectList,
      projectId,
      projectName,
      date,
      day,month,
      year,
      AttendanceType,
      MarkInTime,
      isVisibleMarkInMarkOut,
      isOldDateMarkout,
      startTime,
      differenceTime,
      MarkInDate,
      differenceHours,
      percenTageCircularBar
    } = this.state;

    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => replace('MarkInOutList'),
          },
          title: 'MarkIn-MarkOut',
          hideUnderLine: true,
          light: true,
          isHome:true
        }}>
        <ScrollContainer>
          <View>
            <ViewWithTitle title="General Details">
              <CustomPicker
                list={empList || []}
                selectedItem={{id: EmployeeID}}
                label={'Employee Name'}
                onSelect={item => {
                  this.setState(
                    {
                      EmployeeID: item.id,
                      employeeName: item.name,
                    },
                    () => {
                     this.getLastMarkInTime()
                      this.GetProjectsByEmployeeIDForDailyAttendance()
                    },
                  );
                }}
              />
              <CustomPicker
                list={projectList || []}
                selectedItem={{id: projectId}}
                label={'Project Name'}
                onSelect={item => {
                  this.setState(
                    {
                      projectId: item.id,
                      projectName: item.name,
                    }
                  );
                }}
              />
{isOldDateMarkout ?<CustomTimePicker
                     selectedDate={startTime||undefined}
                    label={'Start Time'}
                    containerStyle={{
                      flex: 1,
                      marginRight: ResponsivePixels.size10,
                    }}
                    mode="time"
                    rightIcon={Images.ic_Calendar}
                    isModeTime={true}
                    onDateChanged={time => {

                      this.setState(
                        {
                          startTime: time,
                        }
                      ,()=>{

                      const _sTime = Utils.formatDate(time, 'HH:mm:ss');
                      this.getHoursDifference(MarkInDate,MarkInTime,_sTime)

                      });
                    }}

                  />:null}


            </ViewWithTitle>
       
            {isVisibleMarkInMarkOut ?<>
            <ViewWithTitle title={date}>
            <Card style={{margin: ResponsivePixels.size10}} >
    
            <View
              style={{
                margin: ResponsivePixels.size15,
                padding: ResponsivePixels.size5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  height: ResponsivePixels.size80,
                }}>
                <View
                  style={{
                    width: '20%',
                    height: '100%',
                    backgroundColor: Colors.Red900,
                    borderRadius: 10,
                    flexDirection: 'column',
                  }}>
                  <Text
                    style={{
                      fontSize: ResponsivePixels.size20,
                      color: Colors.white,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginTop: ResponsivePixels.size8,
                    }}>
                    { day}
                  </Text>
                  <Text
                    style={{
                      fontSize: ResponsivePixels.size18,
                      color: Colors.white,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginTop: ResponsivePixels.size8,
                    }}>
                    {month}
                  </Text>
                </View>

                <View style={{flexDirection: 'row', width: '80%'}}>
                  <View
                    style={{
                      flexDirection: 'column',
                      marginLeft: ResponsivePixels.size20,
                      width: '39%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: ResponsivePixels.size15,
                        color: Colors.grayColor,
                        textAlign: 'center',
                      }}>
                      Mark-In
                    </Text>
                    <Text
                      style={{
                        fontSize: ResponsivePixels.size20,
                        color: Colors.black,
                      }}>

                        {MarkInTime}
                      {/* {_splitMarkInTime} */}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: '100%',
                      backgroundColor: Colors.Red900,
                      width: ResponsivePixels.size10,
                      widht: '1%',
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'column',
                      marginLeft: ResponsivePixels.size20,
                      width: '39%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: ResponsivePixels.size15,
                        color: Colors.grayColor,
                        textAlign: 'center',
                      }}>
                      Mark-Out
                    </Text>
                    <Text
                      style={{
                        fontSize: ResponsivePixels.size20,
                        color: Colors.black,
                        textAlign: 'center',
                      }}>
                      {/* {_splitMarkOutTime} */}
                    </Text>
                  </View>


                  
                </View>
              </View>


        {MarkInTime?     <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  marginTop:ResponsivePixels.size20,
                  justifyContent:"center",
                  alignSelf:"center"
                }}>
                          <AnimatedCircularProgress
                      size={ResponsivePixels.size120}
                      width={ResponsivePixels.size20}
                      fill={percenTageCircularBar||0}
                      tintColor={Colors.Red900}
                      rotation={0}
                      backgroundColor="#3d5875">
                      {
                        (fill) => (
                          <Text>
                            { differenceTime }
                          </Text>
                        )
                      }
                    </AnimatedCircularProgress>
              </View>:null} 

{AttendanceType &&
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  marginTop: ResponsivePixels.size10,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: ResponsivePixels.size35,
                    height: ResponsivePixels.size35,
                    borderRadius: 100 / 2,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Colors.BlackColor100,
                  }}>
                  <Image
                    source={Images.ic_time_glass}
                    style={{
                      width: ResponsivePixels.size20,
                      height: ResponsivePixels.size20,
                      tintColor: Colors.Red900,
                    }}
                    resizeMode={'cover'}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: ResponsivePixels.size20,
                  }}>
                  <Text
                    style={{
                      fontSize: ResponsivePixels.size13,
                      color: Colors.grayColor,
                    }}>
                    Total Workiong Hours
                  </Text>
                  <Text
                    style={{
                      fontSize: ResponsivePixels.size15,
                      color: Colors.black,
                      fontWeight: 'bold',
                    }}>
                    {/* {item?.TotalWorkingHrs} */}
                  </Text>
                </View>

                

              </View>
  }
            </View>
        
        </Card>

            </ViewWithTitle>

   <Button
              title={MarkInTime?("Mark Out"):"Mark In"}
              style={{margin: ResponsivePixels.size16}}
              disabled={EmployeeID==0?true:false}
              // title="Mark In (in Progress)"

              // disabled={true}
              onPress={() => {

                Geolocation.getCurrentPosition((position) => {
                  const { latitude, longitude } = position.coords
                  
                  this.setState({
                    latitude,
                    longitude
                  },()=>{
                    console.log("latitude =======>>>>>>>",latitude);
                    console.log("longitude =======>>>>>>>",longitude);
                  })
                })

                this.handleSubmit();
              }}
            /></>:null }
          
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

export default connect(mapStateToProps, mapDispatchToProps)(AddAttendance);
