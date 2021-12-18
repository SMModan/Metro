import moment from 'moment';
import React, {Component} from 'react';
import {ActivityIndicator, BackHandler, Image, Text, View} from 'react-native';
import {Card, FAB} from 'react-native-paper';
import {connect} from 'react-redux';
import {store} from '../../../App';
import {goBack, push, replace, reset} from '../../../navigation/Navigator';
import {Colors, Images, Utils} from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import {
  Clickable,
  CustomDatePicker,
  MainContainer,
  MyFlatList,
  ProgressDialog,
  ScrollContainer,
} from '../../common';
import styles from '../../HomeDetails/styles/HelpDesk.style';
import {askForLocationPermission} from '../../ManageCarAttendance/LocationAndRequestService';
import AttendanceApi from '../Api/AttendanceApi';

class AttendanceList extends Component {
  state = {
    refreshing: false,
    loading: false,
    loadMore: false,
    isLast: false,
    listData: [],
    showFilter: false,
    startDate: new Date(),
    endDate: new Date(),
  };

  getAllList = () => {
    const EmployeeId = store.getState().session.user.EmployeeID;
    const {startDate, endDate} = this.state;

    const _startDate = Utils.formatDate(startDate, 'MM-DD-yyyy');
    const _endDate = Utils.formatDate(endDate, 'MM-DD-yyyy');

    const params = {
      EmployeeId,
      fromdate: _startDate,
      todate: _endDate,
    };

    ProgressDialog.show();

    AttendanceApi.GetDailyAttendanceDetails(
      params,
      res => {
        ProgressDialog.hide();

        if (res) {
          const Table = res.Table;
          if (Table) {
            if (Array.isArray(Table)) {
              this.setState({listData: [...Table]}, () =>
                console.log('this.state', this.state.listData),
              );
            } else {
              //console.log("table name name",Table.CustomerName)
              let results = [{...Table}];
              this.setState(
                {
                  listData: results,
                },
                () => console.log('this.state', this.state.listData),
              );
            }
          }
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };

  componentDidMount = () => {
    this.getAllList();
    askForLocationPermission(status => {
      console.log('status ========<<<<<', '>>>>>>>>>>>>>> ' + status);
    });
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


  splitMarkInOutTimeForDisplay = (strDate,attDate)=>{
    // const attDate = "01 Dec 2020"
    // const strDate = "Mar  2 2020  7:03PM"
    let time =""
    if(attDate && strDate){

      const oneDate =  moment(attDate);
      const year = oneDate?.format('yyyy');
      if (strDate) {
        const TStartSplit = strDate.split(year);
        const stime = TStartSplit[1];
        time = `${stime}`;
      }
    }
    
    return time;
  }

  splitTime = strDate => {
    let date = '';
    if (strDate) {
      const TStartSplit = strDate.split('  ');
      const stime = TStartSplit[1];
      date = `${stime}`;

    }
    return date;
  };

  renderCell = ({index}) => {
    const item = this.state.listData[index];
    const date = this.splitDate(item?.thedate);

    const oneDate = moment(item?.thedate);
    const dayName = oneDate?.format('dddd');
    const day = oneDate?.format('DD');
    const Month = oneDate?.format('MMM');
    const markIn = item.MarkinTime||undefined
    const markOut = item.MarkoutTime||undefined
    const attDate = item?.attDate ||""
    let _splitMarkInTime
    let _splitMarkOutTime


    if(markIn){
       _splitMarkInTime = this.splitMarkInOutTimeForDisplay(markIn,attDate);
    }else{
      _splitMarkInTime="-"
    }



    if(markOut){
      _splitMarkOutTime = this.splitMarkInOutTimeForDisplay(markOut,attDate);
   }else{
    _splitMarkOutTime="-"
   }
   

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
                      {_splitMarkInTime||"-"}
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
                      {_splitMarkOutTime||"-"}
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
                    {item?.TotalWorkingHrs}
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
              top: 5,
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



  
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  handleBackButtonClick() {
    reset("Home")
    return true;
  }
  render() {
    const {
      dummyListData,
      listData,
      refreshing,
      loading,
      loadMore,
      isLast,
      showFilter,
      endDate,
      startDate,
    } = this.state;

    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => {
             reset("Home")
            },
          },
          title: 'Markin - Markout',
          hideUnderLine: true,
          isHome: true,
          light: true,

          right: [
            {
              image: Images.ic_filter,
              onPress: () => {
                this.setState({showFilter: !this.state.showFilter});
              },
            },
          ],
        }}>
        <View style={styles.MainHeaderView}>
          <ScrollContainer>
            <View style={styles.MainList}>
              {showFilter ? (
                <Card
                  style={{
                    marginLeft: ResponsivePixels.size10,
                    marginRight: ResponsivePixels.size10,
                    marginTop: ResponsivePixels.size15,
                    padding: ResponsivePixels.size5,
                    paddingBottom: ResponsivePixels.size25,
                  }}>
                  <View
                    style={{
                      paddingLeft: ResponsivePixels.size10,
                      paddingRight: ResponsivePixels.size10,
                      flexDirection: 'row',
                      marginTop: ResponsivePixels.size10,
                    }}>
                    <CustomDatePicker
                      selectedDate={startDate}
                      label={'Start Date'}
                      containerStyle={{
                        flex: 1,
                        marginRight: ResponsivePixels.size10,
                      }}
                      rightIcon={Images.ic_Calendar}
                      onDateChanged={date => {
                        this.setState({
                          startDate: date,
                        });
                      }}
                    />
                    <CustomDatePicker
                      selectedDate={endDate || new Date()}
                      minimumDate={startDate || new Date()}
                      label={'End Date'}
                      containerStyle={{flex: 1}}
                      rightIcon={Images.ic_Calendar}
                      onDateChanged={date => {
                        this.setState({
                          endDate: date,
                        });
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
                    <Button
                      title="Clear"
                      onPress={() => {
                        this.setState(
                          {
                            startDate: new Date(),
                            endDate: new Date(),
                            showFilter: false,
                            listData: [],
                          },
                          () => {
                            this.getAllList();
                          },
                        );
                      }}
                      style={{
                        width: '50%',
                        marginRight: ResponsivePixels.size10,
                      }}
                    />
                    <Button
                      title="Apply"
                      onPress={() => {
                        this.setState(
                          {
                            showFilter: false,
                            listData: [],
                          },
                          () => {
                            this.getAllList();
                          },
                        );
                      }}
                      style={{
                        width: '50%',
                      }}
                    />
                  </View>
                </Card>
              ) : null}
              <MyFlatList
                horizontal={false}
                scrollEnabled={true}
                data={
                  listData || [
                    
                  ]
                }
                showsHorizontalScrollIndicator={false}
                renderItem={item => this.renderCell(item)}
                style={{flex: 1, margin: ResponsivePixels.size5}}
                loading={loading}
                refreshing={refreshing}
                onRefresh={() => {
                  this.getAllList();
                }}
                footerComponent={() => {
                  return loadMore ? (
                    <ActivityIndicator
                      size={'large'}
                      color={Colors.blueGray900}
                      style={{margin: 8}}
                    />
                  ) : null;
                }}
              />
            </View>
          </ScrollContainer>
        </View>
        <FAB
          style={styles.fab}
          icon="plus"
          color={Colors.white}
          onPress={() => {
            replace('AddAttendance');
          }}
        />
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceList);
