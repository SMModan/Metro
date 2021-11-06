import _ from 'lodash';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card} from 'react-native-paper';
import {connect} from 'react-redux';
import {Colors, Images} from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import {
  Clickable,
  CustomDatePicker,
  CustomPicker,
  MainContainer,
  MyFlatList,
  ProgressDialog,
  ScrollContainer,
} from '../../common';
import styles from '../../HomeDetails/styles/HelpDesk.style';
import ReportsApi from '../Api/ReportsApi';

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

    dummyListData: [
      {
        date: '23rd July 2021 - Friday',
        on_call_cab: '1001',
        auto_complete_total_km: '0.00',
        totalKm: '00',
        applied_duration: '23rd July 2021 11:55 to Oct 1 2021 5:09 PM',
      },
      {
        date: '23rd July 2021 - Friday',
        on_call_cab: '1001',
        auto_complete_total_km: '0.00',
        totalKm: '00',
        applied_duration: '23rd July 2021 11:55 to Oct 1 2021 5:09 PM',
      },
      {
        date: '23rd July 2021 - Friday',
        on_call_cab: '1001',
        auto_complete_total_km: '0.00',
        totalKm: '00',
        applied_duration: '23rd July 2021 11:55 to Oct 1 2021 5:09 PM',
      },
      {
        date: '23rd July 2021 - Friday',
        on_call_cab: '1001',
        auto_complete_total_km: '0.00',
        totalKm: '00',
        applied_duration: '23rd July 2021 11:55 to Oct 1 2021 5:09 PM',
      },
      {
        date: '23rd July 2021 - Friday',
        on_call_cab: '1001',
        auto_complete_total_km: '0.00',
        totalKm: '00',
        applied_duration: '23rd July 2021 11:55 to Oct 1 2021 5:09 PM',
      },
      {
        date: '23rd July 2021 - Friday',
        on_call_cab: '1001',
        auto_complete_total_km: '0.00',
        totalKm: '00',
        applied_duration: '23rd July 2021 11:55 to Oct 1 2021 5:09 PM',
      },
      ,
      {
        date: '23rd July 2021 - Friday',
        on_call_cab: '1001',
        auto_complete_total_km: '0.00',
        totalKm: '00',
        applied_duration: '23rd July 2021 11:55 to Oct 1 2021 5:09 PM',
      },
      {
        date: '23rd July 2021 - Friday',
        on_call_cab: '1001',
        auto_complete_total_km: '0.00',
        totalKm: '00',
        applied_duration: '23rd July 2021 11:55 to Oct 1 2021 5:09 PM',
      },
      {
        date: '23rd July 2021 - Friday',
        on_call_cab: '1001',
        auto_complete_total_km: '0.00',
        totalKm: '00',
        applied_duration: '23rd July 2021 11:55 to Oct 1 2021 5:09 PM',
      },
      {
        date: '23rd July 2021 - Friday',
        on_call_cab: '1001',
        auto_complete_total_km: '0.00',
        totalKm: '00',
        applied_duration: '23rd July 2021 11:55 to Oct 1 2021 5:09 PM',
      },
      {
        date: '23rd July 2021 - Friday',
        on_call_cab: '1001',
        auto_complete_total_km: '0.00',
        totalKm: '00',
        applied_duration: '23rd July 2021 11:55 to Oct 1 2021 5:09 PM',
      },
    ],
    showSearch: false,
    searchQuery: false,
    active: 1,
    xTabOne: 0,
    xTabTwo: 0,
    xTabThree: 0,
    animatedWidth: '50%',
    announcementType: 1,
    translateX: new Animated.Value(80),
    translateXTabOne: new Animated.Value(width),
    translateXTabTwo: new Animated.Value(0),
    translateXTabThree: new Animated.Value(width),
    translateY: -1000,
    data: [],
    refreshing: false,
    loading: false,
    listData: [],
    holidayList: [],
    showFilter:true
  };

  handleSlide = type => {
    let {
      active,
      xTabOne,
      xTabTwo,
      xTabThree,
      translateX,
      translateXTabOne,
      translateXTabTwo,
      translateXTabThree,
    } = this.state;
    Animated.spring(translateX, {
      toValue: type,
      duration: 20,
    }).start();
    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 20,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 20,
        }).start(),
        Animated.spring(translateXTabThree, {
          toValue: width,
          duration: 20,
        }).start(),
      ]);
    } else if (active === 1) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: width,
          duration: 20,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          duration: 20,
        }).start(),
        Animated.spring(translateXTabThree, {
          toValue: width,
          duration: 20,
        }).start(),
      ]);
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: width,
          duration: 20,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 20,
        }).start(),
        Animated.spring(translateXTabThree, {
          toValue: 0,
          duration: 20,
        }).start(),
      ]);
    }
  };

  componentDidMount = () => {
    const checkinout = this.props.session.checkinout;
    const user = this.props.session.user;

    this.setState(
      {
        userID: user.ID,
      },
      () => {
         this.getEmplyeesUserHierarchy();
      },
    );
  };

  updateListAfterCheckInCheckOut = (type, CheckInID, HeaderID) => {
    console.log('type =====>', type);
    console.log('CheckInID =====>', CheckInID);
    console.log('HeaderID =====>', HeaderID);
    let listData = this.state.listData;

    if (type == 0) {
      let index = listData.findIndex(el => el.ID == HeaderID);
      console.log('index ===>', index);
      if (index != -1) {
        let item = listData[index];
        item.CheckInID = CheckInID;
        item.IsCheckIn = 'Yes';
        listData[index] = item;
      }
    } else {
      let index = listData.findIndex(el => el.CheckInID == CheckInID);
      if (index != -1) {
        let item = listData[index];
        item.CheckInID = 0;
        item.IsCheckIn = 'No';
        listData[index] = item;
      }
    }

    this.setState({
      listData,
    });
  };

  // getAllAppointment = () => {
  //   const { searchQuery } = this.state;

  //   const params = {
  //     PageIndex: this.state.page,
  //     PageSize: 10,
  //     Filter: searchQuery || '',
  //   };
  //   this.setState({
  //     loading: !this.state.refreshing && !this.state.loadMore,
  //   });
  //   AppointmentApi.getAllAppointment(
  //     params,
  //     res => {
  //       if (res) {
  //         const { Table } = res && res;
  //         let isLast = true;
  //         if (Table) {
  //           if (Array.isArray(Table)) {
  //             let totalPage = Table[0]?.TotalCount / 10;
  //             isLast = this.state.page == totalPage;
  //             this.setState({
  //               listData:
  //                 this.state.page > 0
  //                   ? [...this.state.listData, ...Table]
  //                   : Table,
  //               loading: false,
  //               refreshing: false,
  //               loadMore: false,
  //               isLast,
  //             });
  //           } else {
  //             let results = [{ ...Table }];
  //             console.log('<===results  ===>', results);
  //             this.setState({
  //               listData: results,
  //               loading: false,
  //               refreshing: false,
  //               loadMore: false,
  //               isLast,
  //             });
  //           }
  //         }
  //       } else {
  //         this.setState({
  //           loading: false,
  //           refreshing: false,
  //           loadMore: false,
  //           isLast: true,
  //         });
  //       }
  //     },
  //     () => {
  //       this.setState({
  //         loading: !this.state.refreshing && !this.state.loadMore,
  //       });
  //     },
  //   );
  // };

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
  renderCell = ({index}) => {
    const {isCheckInPermission, userID} = this.state;

    const item = this.state.listData[index];

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
                  OnCallCab
                </Text>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size18,
                    color: Colors.Red900,
                    fontWeight: 'bold',
                  }}>
                  1001
                </Text>
              </View>
              <Text
                style={{
                  fontSize: ResponsivePixels.size15,
                  width: '70%',
                  textAlign: 'right',
                  alignSelf: 'stretch',
                }}>
                23rd July 2021 - Friday
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
                  23rd July 2021 11:55 to Oct 1 2021 5:09 PM
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
                  0.00
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
                  0
                </Text>
              </View>
            </View>
          </View>
        </Clickable>
      </Card>
    );
  };

  searchOpp = async () => {
    this.setState(
      {
        listData: [],
        page: 0,
      },
      () => {
        // this.getAllAppointment();
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

  searchOppDelayed = _.debounce(this.searchOpp, 1000);

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
      endDate
    } = this.state;
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_Menu,
            onPress: () => {
              this.props.navigation.openDrawer();
            },
          },
          title: 'Reports List',
          hideUnderLine: true,
          isHome: true,
          light: true,
          onClickSearch: () => {
            this.searchOpp();
          },
          onChangeSearch: text => {
            this.setState({searchQuery: text});
          },
          onCloseSearch: () => {
            this.setState(
              {showSearch: false, searchQuery: '', page: 0, refreshing: true},
              () => {
                this.getAllAppointment();
              },
            );
          },
          showSearch,
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
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: ResponsivePixels.size15,
                    height: ResponsivePixels.size40,
                    position: 'relative',
                  }}>
                  <Animated.View
                    style={{
                      position: 'absolute',
                      width: animatedWidth || '50%',
                      height: '100%',
                      top: 0,
                      left: 0,
                      backgroundColor: Colors.Red900,
                      borderRadius: 50,
                      transform: [
                        {
                          translateX,
                        },
                      ],
                    }}
                  />

                  <TouchableOpacity
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: Colors.Red900,
                      borderRadius: 50,
                      borderRightWidth: 0,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    onLayout={event =>
                      this.setState({
                        xTabOne: event.nativeEvent.layout.x,
                      })
                    }
                    onPress={() =>
                      this.setState(
                        {
                          active: 0,
                          animatedWidth: '25%',
                          announcementType: 2,
                          listData: [],
                        },
                        () => {
                          //  this.getAllAnnouncementNews();
                          this.handleSlide(xTabOne);
                        },
                      )
                    }>
                    <Text
                      style={{
                        color: active === 0 ? '#fff' : Colors.secondary500,
                      }}>
                      Attendance
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: Colors.Red900,
                      borderRadius: 1,
                      borderLeftWidth: 0,
                      borderRightWidth: 0,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    onLayout={event =>
                      this.setState({
                        xTabTwo: event.nativeEvent.layout.x,
                      })
                    }
                    onPress={() =>
                      this.setState(
                        {
                          active: 1,
                          animatedWidth: '50%',
                          announcementType: 1,
                          listData: [],
                        },
                        () => {
                          //   this.getAllAnnouncementNews();
                          this.handleSlide(xTabTwo);
                        },
                      )
                    }>
                    <Text
                      style={{
                        color: active === 1 ? '#fff' : Colors.secondary500,
                      }}>
                      Car Attendance
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: Colors.Red900,
                      borderRadius: 50,
                      borderLeftWidth: 0,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    onLayout={event =>
                      this.setState({
                        xTabThree: event.nativeEvent.layout.x,
                      })
                    }
                    onPress={() =>
                      this.setState({active: 2, animatedWidth: '25%'}, () =>
                        this.handleSlide(xTabThree),
                      )
                    }>
                    <Text
                      style={{
                        color: active === 2 ? '#fff' : Colors.secondary500,
                      }}>
                      Location
                    </Text>
                  </TouchableOpacity>
                </View>

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

                <View
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
                  />

                  <CustomDatePicker
                    selectedDate={endDate ||new Date()}
                    minimumDate={startDate|| new Date()}
                    label={'End Date'}
                    containerStyle={{flex: 1}}
                    rightIcon={Images.ic_Calendar}
                  />
                </View>
                <Button
                  title="Apply"
                  style={{
                    margin: ResponsivePixels.size30,
                  }}
                />
              </Card>:null}
             
              <MyFlatList
                horizontal={false}
                scrollEnabled={true}
                data={dummyListData || []}
                showsHorizontalScrollIndicator={false}
                renderItem={item => this.renderCell(item)}
                style={{flex: 1, margin: ResponsivePixels.size5}}
                loading={loading}
                refreshing={refreshing}
                onRefresh={() => {
                  this.setState(
                    {
                      page: 0,
                      refreshing: true,
                    },
                    () => {
                      // this.getAllAppointment();
                    },
                  );
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
                onEndReached={() => {
                  console.log('End');

                  if (!loadMore && !isLast) {
                    this.setState(
                      {
                        page: this.state.page + 1,
                        loadMore: true,
                      },
                      () => {
                        // this.getAllAppointment();
                      },
                    );
                  }
                }}
              />
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
