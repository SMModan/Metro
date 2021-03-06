import moment from 'moment';
import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  Text, View
} from 'react-native';
import { Card } from 'react-native-paper';
import { connect } from 'react-redux';
import { store } from '../../../App';
import { goBack } from '../../../navigation/Navigator';
import { Colors, Images, Utils } from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import {
  Clickable,
  CustomDatePicker,
  CustomPicker,
  MainContainer,
  MyFlatList,
  ProgressDialog,
  ScrollContainer
} from '../../common';
import CustomTimePicker from '../../common/CustomTimePicker';
import styles from '../../HomeDetails/styles/HelpDesk.style';
import ReportsApi from '../Api/ReportsApi';
import ReportTypeIN from './ReportTypeIN';
import ReportTypeSA from './ReportTypeSA';

const {width} = Dimensions.get('window');

class ReportList extends Component {
  state = {
    selectedIndex: 0,
    page: 0,
    totalPage: 0,
    refreshing: false,
    loading: false,
    loadMore: false,
    isLast: false,
    listData: [],
    startDate:new Date(),
    endDate:new Date(),
    carAttendanceList:[],
    attendanceList:[],
    showSearch: false,
    searchQuery: false,
    active:1,
    refreshing: false,
    loading: false,
    listData: [],
    showFilter:true,
    countryId:undefined
  };


  componentDidMount = () => {
    this.getEmplyeesUserHierarchy();
  const countryId = store.getState().session.country_id
    this.setState({
      countryId
    })

  };
handleActiveIndex = (index)=>{
  this.setState({
    active:index,
    announcementType: index,
    listData: [],
  })
}
 

  createdDateTime = strDate => {
    let date = '';
    if (strDate) {
      const TStartSplit = strDate.split('T');
      const sTime = TStartSplit[1];
      const sDate = TStartSplit[0];
      const StartHr = sTime.substring(0, 2);
      const StartMin = sTime.substring(3, 5);
      date = `${sDate} ${StartHr}:${StartMin}`;
    }
    return date;
  };

  createdDate = strDate => {
    let date = '';
    if (strDate) {
      const TStartSplit = strDate.split('T');
      const sDate = TStartSplit[0];
      date = `${sDate}`;
    }
    return date;
  };
 

  renderLocationCell = ({index}) => {
    const {isCheckInPermission, userID} = this.state;

    const item = this.state.locationList[index];

    return (
      <Card style={{margin: ResponsivePixels.size10}} key={index}>
        <Clickable
          onPress={() => {


            const latitude = item.Latitude;
const longitude = item.Longitude;
const label = "";

const url = Platform.select({
  ios: "maps:" + latitude + "," + longitude + "?q=" + label,
  android: "geo:" + latitude + "," + longitude + "?q=" + label
});

Linking.canOpenURL(url).then(supported => {
  if (supported) {
    return Linking.openURL(url);
  } else {
    const browser_url =
      "https://www.google.de/maps/@" +
      latitude +
      "," +
      longitude +
      "?q=" +
      label;
    return Linking.openURL(browser_url);
  }
});


          }}>
          <View style={{margin: ResponsivePixels.size15}}>
            
   
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
                  Latitude
                </Text>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size15,
                    color: Colors.black,
                    fontWeight: 'bold',
                  }}>
                  {item?.Latitude} 
                </Text>
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
                  Longitude
                </Text>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size15,
                    color: Colors.black,
                    fontWeight: 'bold',
                  }}>
                  {item?.Longitude} 
                </Text>
              </View>
          </View>
        </Clickable>
      </Card>
    );
  };




  renderCarAttendanceCell = ({index}) => {
    const {isCheckInPermission, userID,countryId} = this.state;

    const item = this.state.carAttendanceList[index];

    return (
      <Card style={{margin: ResponsivePixels.size10}} key={index}>
        <Clickable
          onPress={() => {
            // this.props.navigation.push('AddAppointments', {item});
          }}>
          <View style={{margin: ResponsivePixels.size15}}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <View style={{flexDirection: 'column', width: '30%'}}>
                <Text style={{fontSize: ResponsivePixels.size18}}>
                  {item?.AttendanceType}
                </Text>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size18,
                    color: Colors.Red900,
                    fontWeight: 'bold',
                  }}>
                  {item?.CarNumber}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: ResponsivePixels.size15,
                  width: '70%',
                  textAlign: 'right',
                  alignSelf: 'stretch',
                }}>
                {this.splitDate(item?.AttDate)}
              </Text>
            </View>

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
                  source={Images.ic_Calendar}
                  style={{
                    width: ResponsivePixels.size20,
                    height: ResponsivePixels.size20,
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
                  Applied Duration
                </Text>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size15,
                    color: Colors.black,
                    fontWeight: 'bold',
                  }}>
                  {item?.CarRecievedTime} To {item?.CarReleasedTime}
                </Text>
              </View>
            </View>

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
                  source={Images.ic_kilometers}
                  style={{
                    width: ResponsivePixels.size20,
                    height: ResponsivePixels.size20,
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
                  AutoComplete TotalKM
                </Text>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size15,
                    color: Colors.black,
                    fontWeight: 'bold',
                  }}>
                 {item.CarTotalKM}

                </Text>
              </View>
            </View>

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
                  source={Images.ic_kilometers}
                  style={{
                    width: ResponsivePixels.size20,
                    height: ResponsivePixels.size20,
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
                  TotalKM
                </Text>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size15,
                    color: Colors.black,
                    fontWeight: 'bold',
                  }}>
                  {item.totalKM}
                </Text>
              </View>
            </View>
          </View>
        </Clickable>
      </Card>
    );
  };



  renderAttendanceCell = ({index}) => {
    const item = this.state.attendanceList[index];
    const date = this.splitDate(item?.thedate);
    const oneDate = moment(item?.thedate);
    const dayName = oneDate?.format('dddd');
    const day = oneDate?.format('DD');
    const Month = oneDate?.format('MMM');

    const _splitMarkInTime = this.splitTime(item?.MarkinTime);
    const _splitMarkOutTime = this.splitTime(item?.MarkoutTime);

    // console.log("_split",_splitMarkInTime)

    return (
      <View>
        <Text
          style={{
            fontSize: ResponsivePixels.size15,
            textAlign: 'left',
            alignSelf: 'stretch',
            marginLeft: ResponsivePixels.size20,
            marginTop: ResponsivePixels.size5,
            fontWeight: 'bold',
          }}>
          {`${date} - ${dayName}`}
        </Text>

        <Card style={{margin: ResponsivePixels.size10}} key={index}>
          <Clickable
            onPress={() => {
              // this.props.navigation.push('AddAppointments', {item});
            }}>
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
                    backgroundColor: Colors.yellow,
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
                    {day || 0}
                  </Text>
                  <Text
                    style={{
                      fontSize: ResponsivePixels.size18,
                      color: Colors.white,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginTop: ResponsivePixels.size8,
                    }}>
                    {Month}
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
                      {_splitMarkInTime}
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
                      {_splitMarkOutTime}
                    </Text>
                  </View>
                </View>
              </View>

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
                    {item?.TotalWorkinghrs}
                  </Text>
                </View>
              </View>
            </View>
          </Clickable>
          <Text
            style={{
              fontSize: ResponsivePixels.size15,
              color: Colors.white,
              position: 'absolute',
              bottom: 10,
              right: 0,
              borderTopLeftRadius: 100 / 2,
              borderBottomLeftRadius: 100 / 2,
              widht: ResponsivePixels.size400,
              backgroundColor: Colors.Red900,
              paddingLeft: ResponsivePixels.size20,
              paddingRight: ResponsivePixels.size20,
            }}>
            {item?.Status}
          </Text>
        </Card>
      </View>
    );
  };

  
  getCarAttendanceReport = () => {
    const {EmployeeID,startDate,endDate} = this.state

    const _startDate = Utils.formatDate(startDate, 'DD-MMM-YYYY');
    const _endDate = Utils.formatDate(endDate, 'DD-MMM-YYYY');

    console.log("_endDate ===============>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",_endDate)
    console.log("_startDate  ===============>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",_startDate)

    const params = {
      EmpId:EmployeeID,
      fromdate:_startDate,
      todate:_endDate

    };

    console.log("EmployeeID  ===============>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",EmployeeID)


    ProgressDialog.show();
    ReportsApi.GetDailyAttendanceDetailsForVehicle(
      params,
      res => {
        ProgressDialog.hide();
        if (res) {
          const Table = res.Table;
          if (Table) {
            let list = [];
            if (Array.isArray(Table)) {
              list=Table
            } else {
              list.push(Table);
            }
            this.setState({carAttendanceList: list});
          }
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };


  splitDate = strDate => {
    let date = '';
    if (strDate) {
      const TStartSplit = strDate.split('T');
      const sDate = TStartSplit[0];
      date = `${sDate}`;
    }
    return date;
  };

  splitTime = strDate => {
    let date = '';
    if (strDate) {
      const TStartSplit = strDate.split('  ');
      const stime = TStartSplit[1];
      date = `${stime}`;
    }
    return date;
  };
 
  getAttendanceReport = () => {
    const {EmployeeID,startDate,endDate} = this.state

    const _startDate = Utils.formatDate(startDate, 'DD-MMM-YYYY');
    const _endDate = Utils.formatDate(endDate, 'DD-MMM-YYYY');


    const params = {
      EmployeeId:EmployeeID,
      fromdate:_startDate,
      todate:_endDate
    };
  

    ProgressDialog.show();
    ReportsApi.GetDailyAttendanceDetails(
      params,
      res => {
        ProgressDialog.hide();
        if (res) {
          const Table = res.Table;
          if (Table) {
            let list = [];
            if (Array.isArray(Table)) {
              list=Table
            } else {
              list.push(Table);
            }
            this.setState({attendanceList: list});
          }
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };

  getLocationReport = () => {
    const {EmployeeID,startDate,startTime,endTime} = this.state
    // GetDailyEmployeeLocationForMAP{Token=58837e26-afeb-483b-8e81-546c749f1da3; EmployeeID=1; StartTime=04-Nov-2021 00:05; EndTime=04-Nov-2021 23:55; }
    const _Date = Utils.formatDate(startDate, 'DD-MMM-YYYY');
    const _sTime = Utils.formatDate(startTime, 'HH:mm');
    const _eTime = Utils.formatDate(endTime, 'HH:mm');

    const __StartTime = `${_Date} ${_sTime}`
    const __EndTime = `${_Date} ${_eTime}`
    const params = {
      EmployeeID:EmployeeID,
      StartTime:__StartTime,
      EndTime:__EndTime
    };

    console.log("params",params);


    ProgressDialog.show();
    ReportsApi.GetDailyEmployeeLocationForMAP(
      params,
      res => {
        ProgressDialog.hide();
        if (res) {
          const Table = res.Table;
          if (Table) {
            let list = [];
            if (Array.isArray(Table)) {
              list=Table
            } else {
              list.push(Table);
            }
            this.setState({locationList: list});
          }
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };

  getEmplyeesUserHierarchy = () => {
    const params = {};

    ProgressDialog.show();
    ReportsApi.getEmplyeesUserHierarchy(
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
  // searchOppDelayed = _.debounce(this.searchOpp, 1000);

  render() {
    const {dummyListData, refreshing, loading, loadMore, isLast, showSearch} =
      this.state;
    let {
      xTabOne,
      xTabTwo,
      xTabThree,
      translateX,
      active,
      translateXTabOne,
      translateXTabTwo,
      translateXTabThree,
      translateY,
      animatedWidth,
      empList,
      EmployeeID,
      showFilter,
      startDate,
      endDate,
      carAttendanceList,
      attendanceList,
      startTime,
      endTime,
      locationList,
      countryId
    } = this.state;
    console.log("activeactiveactive",active)
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => {
            goBack()
            },
          },
          title: 'Reports List',
          hideUnderLine: true,
          isHome: true,
          light: true,
          right: [
            {
              image: Images.ic_filter,
              onPress: () => {
                this.setState((prev)=>{
                  return({
                    showFilter:!prev.showFilter
                  })
                })
              },
            },
          ],
        }}>
        <View style={styles.MainHeaderView}>
          <ScrollContainer>
            <View style={styles.MainList}>

              {showFilter ? <Card
                style={{
                  marginLeft: ResponsivePixels.size10,
                  marginRight: ResponsivePixels.size10,
                  marginTop: ResponsivePixels.size15,
                  padding: ResponsivePixels.size5,
                }}>

                {countryId==1?<ReportTypeIN handleActiveIndex={(index)=>{this.handleActiveIndex(index)}}/>:<ReportTypeSA handleActiveIndex={(index)=>{this.handleActiveIndex(index)}}/>}
                    
            

                <View
                  style={{
                    paddingLeft: ResponsivePixels.size10,
                    paddingRight: ResponsivePixels.size10,
                  }}>
                  <CustomPicker
                    list={empList || []}
                    selectedItem={{id: EmployeeID}}
                    label={'Employee Name'}
                    onSelect={item => {
                      this.setState(
                        {
                          EmployeeID: item.id,
                          employeeName: item.name,
                        }
                      );
                    }}
                  />
                </View>

                    {active==2 ?   
                    <>
                     <View
                  style={{
                    paddingLeft: ResponsivePixels.size10,
                    paddingRight: ResponsivePixels.size10,
                    flexDirection: 'row',
                    marginTop: ResponsivePixels.size10,
                  }}>
                     <CustomDatePicker
                    selectedDate={startDate ||new Date()}
                    label={'Date'}
                    containerStyle={{flex: 1}}
                    rightIcon={Images.ic_Calendar}

                    onDateChanged={date => {
                      this.setState(
                        {
                          startDate: date,
                        }
                      );
                    }}
                  />
                  </View>
                    <View
                  style={{
                    paddingLeft: ResponsivePixels.size10,
                    paddingRight: ResponsivePixels.size10,
                    flexDirection: 'row',
                    marginTop: ResponsivePixels.size10,
                  }}>

                  <CustomTimePicker
                     selectedDate={startTime}
                    label={'Start Time'}
                    containerStyle={{
                      flex: 1,
                      marginRight: ResponsivePixels.size10,
                    }}
                    mode="time"
                    rightIcon={Images.ic_Calendar}
                    isModeTime={true}
                    onDateChanged={time => {
                      console.log("startTime ================>>>>>>>>>>>>>>>>>>",time)
                      this.setState(
                        {
                          startTime: time,
                        }
                      );
                    }}

                  />

                  <CustomTimePicker

                    selectedDate={endTime}
                    label={'End Time'}
                    containerStyle={{flex: 1}}
                    rightIcon={Images.ic_Calendar}
                    mode="time"
                    isModeTime={true}
                    onDateChanged={time => {
                      this.setState(
                        {
                          endTime: time,
                        }
                      );
                    }}
                  />
                </View>
                
                </>:null}

{active==0 || active==1?   <View
                  style={{
                    paddingLeft: ResponsivePixels.size10,
                    paddingRight: ResponsivePixels.size10,
                    flexDirection: 'row',
                    marginTop: ResponsivePixels.size10,
                  }}>
                  <CustomDatePicker
                    selectedDate={startDate|| new Date()}
                    label={'Start Date'}
                    containerStyle={{
                      flex: 1,
                      marginRight: ResponsivePixels.size10,
                    }}
                    rightIcon={Images.ic_Calendar}

                    onDateChanged={date => {
                      this.setState(
                        {
                          startDate: date,
                        }
                      );
                    }}

                  />

                  <CustomDatePicker
                    selectedDate={endDate ||new Date()}
                    minimumDate={startDate|| new Date()}
                    label={'End Date'}
                    containerStyle={{flex: 1}}
                    rightIcon={Images.ic_Calendar}

                    onDateChanged={date => {
                      this.setState(
                        {
                          endDate: date,
                        }
                      );
                    }}
                  />
                </View>:null}
             
                <Button
                  title="Apply"
                  onPress={()=>{
                    const {active,EmployeeID} = this.state

                    if(!EmployeeID){
                      Utils.showToast("Please select employee name.")
                    }else{
                      if(active==0){
                        this.getAttendanceReport()
                      }else if(active==1){
                        this.getCarAttendanceReport()
                      }else if(active==2){
                        this.getLocationReport()
                      }
                    }
                   
                  }}
                  style={{
                    margin: ResponsivePixels.size30,
                  }}
                />
              </Card>:null}
             

              {active==1 ?( <MyFlatList
                horizontal={false}
                scrollEnabled={true}
                data={carAttendanceList || []}
                showsHorizontalScrollIndicator={false}
                renderItem={item => this.renderCarAttendanceCell(item)}
                style={{flex: 1, margin: ResponsivePixels.size5}}
              />):null}



                  {active==0?( <MyFlatList
                horizontal={false}
                scrollEnabled={true}
                data={attendanceList || []}
                showsHorizontalScrollIndicator={false}
                renderItem={item => this.renderAttendanceCell(item)}
                style={{flex: 1, margin: ResponsivePixels.size5}}
              />):null}

                  {active==2?( <MyFlatList
                horizontal={false}
                scrollEnabled={true}
                data={locationList || []}
                showsHorizontalScrollIndicator={false}
                renderItem={item => this.renderLocationCell(item)}
                style={{flex: 1, margin: ResponsivePixels.size5}}
              />):null}

             
            </View>
          </ScrollContainer>
        </View>
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReportList);
