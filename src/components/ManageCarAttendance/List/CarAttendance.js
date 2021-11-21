import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  BackHandler,
} from 'react-native';
import {
  Clickable,
  MainContainer,
  MyFlatList,
  CustomPicker,
  ProgressDialog,
  Button,
  CustomDatePicker,
  ScrollContainer,
} from '../../common';
import {connect} from 'react-redux';
import styles from '../../HomeDetails/styles/HelpDesk.style';
import {strings} from '../../../language/Language';
import {Images, Colors, FontName, Utils} from '../../../utils';
import {Chip, Card, Title, FAB} from 'react-native-paper';
import AppointmentApi from '../Api/CarAttendanceApi';
import _ from 'lodash';
import {goBack, push, replace, reset} from '../../../navigation/Navigator';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import CheckIn from '../../CheckInOut/CheckIn';
import {Image} from 'react-native';

import {DrawerActions} from '@react-navigation/native';
import {store} from '../../../App';
import CarAttendanceApi from '../Api/CarAttendanceApi';
import {setSessionField} from '../../../reducers/SessionReducer';
import backgroundServer from 'react-native-background-actions';
import {askForLocationPermission} from '../LocationAndRequestService';
const {width} = Dimensions.get('window');

class CarAttendance extends Component {
  state = {
    selectedIndex: 0,
    refreshing: false,
    loading: false,
    loadMore: false,
    isLast: false,
    listData: [],
    isVisibleFab: true,
    showSearch: false,
    searchQuery: false,
    isFabVisible: true,
    showFilter: false,
    startDate: new Date(),
    endDate: new Date(),
  };

  componentDidMount = () => {
    // const date = new Date().getDate() ;
    // const month = new Date().getMonth() + 1;
    // const year = new Date().getFullYear();

    askForLocationPermission(status => {
      console.log('status ========<<<<<', '>>>>>>>>>>>>>> ' + status);
      // ProgressDialog.show()

      // Geolocation.getCurrentPosition(async (position) => {
      //   const { latitude, longitude } = position.coords
      //   Geocoder.init("AIzaSyAvE_MSDLTAi8UGeTfU4UOC-aV8awuKHLs");
      //   let address = { results: [{ formatted_address: "Ahmedabad" }] }//Need to change
      //   try {
      //     address = await Geocoder.from(latitude, longitude)
      //   } catch (error) {
      //     console.log(error)
      //   }
      //   store.dispatch(setSessionField("current_location", position.coords))
      //  store.dispatch(setSessionField("currentTrip", "123"))

      // })
      // ProgressDialog.hide()
    });

    this.getAllList();
  };

  handleFabVisiblity = () => {
    const {listData} = this.state;
    for (let index = 0; index < listData.length; index++) {
      const list = listData[index];
      const CarReleasedTime = list.CarReleasedTime;
      if (!CarReleasedTime) {
        this.setState({
          isFabVisible: false,
        });
        break;
      }
    }
  };
  getAllList = () => {
    const {startDate, endDate} = this.state;
    const EmpId = store.getState().session.user.EmployeeID;

    const _startDate = Utils.formatDate(startDate, 'MM-DD-yyyy');
    const _endDate = Utils.formatDate(endDate, 'MM-DD-yyyy');

    const params = {
      EmpId,
      fromdate: _startDate,
      todate: _endDate,
    };

    ProgressDialog.show();

    CarAttendanceApi.getAllList(
      params,
      res => {
        ProgressDialog.hide();
        if (res) {
          if (res) {
            const Table = res.Table;
            if (Table) {
              if (Array.isArray(Table)) {
                this.setState({listData: [...Table]}, () =>
                  this.handleFabVisiblity(),
                );
              } else {
                //console.log("table name name",Table.CustomerName)
                let results = [{...Table}];
                this.setState(
                  {
                    listData: results,
                  },
                  () => {
                    this.handleFabVisiblity();
                  },
                );
              }
            }
          }
        }
      },
      () => {
        ProgressDialog.hide();
      },
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



  splitDate = strDate => {
    let date = '';
    if (strDate) {
      const TStartSplit = strDate.split('T');
      const sDate = TStartSplit[0];
      date = `${sDate}`;
    }
    return date;
  };
  renderCell = ({index}) => {
    const item = this.state.listData[index];
    const CarReleasedTime = item.CarReleasedTime;
    return (
      <Card style={{margin: ResponsivePixels.size5}} key={index}>
        <Clickable
          onPress={() => {
            // this.props.navigation.push('AddAppointments', {item});
          }}>
          <View style={{margin: ResponsivePixels.size15}}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <View style={{flexDirection: 'column', width: '50%'}}>
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
                  width: '50%',
                  textAlign: 'right',
                  alignSelf: 'center',
                }}>
                {item?.CarRecievedTime}
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
                  {item?.totalKM}
                </Text>
              </View>
            </View>

            <View style={{width: '100%', flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '60%',
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
                    {item?.CarRecievedKM}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  width: '40%',
                  justifyContent: 'flex-end',
                  alignContent: 'flex-end',
                }}>
                {!CarReleasedTime ? (
                  <Button
                    style={{
                      width: '100%',
                      justifyContent: 'flex-end',
                    }}
                    title="End Trip"
                    onPress={() => {
                      replace('EndTrip', {item});
                    }}
                  />
                ) : null}
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

  searchOppDelayed = _.debounce(this.searchOpp, 1000);

  render() {
    const {
      listData,
      refreshing,
      loading,
      loadMore,
      isLast,
      isFabVisible,
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
              console.log('this.props.navigation', this.props.navigation);
              reset("Home")
            },
          },
          title: 'Car Attendance',
          hideUnderLine: true,
          isHome: true,
          light: true,

          right: [
            {
              image: Images.ic_filter,
              onPress: () =>
                this.setState({showFilter: !this.state.showFilter}),
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
                    {/* <CustomDatePicker
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
                  />  */}
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
                data={listData || []}
                showsHorizontalScrollIndicator={false}
                renderItem={item => this.renderCell(item)}
                style={{flex: 1, margin: ResponsivePixels.size5}}
                loading={loading}
              refreshing={refreshing}
                onRefresh={() => {

                  this.setState(
                    {
                      refreshing: false,
                      loading:false,
                      listData:[]
                    },
                    () => {
                      this.getAllList();
                    },
                    );

                }}
              />
            </View>
          </ScrollContainer>
        </View>

        {isFabVisible ? (
          <FAB
            style={styles.fab}
            icon="plus"
            color={Colors.white}
            onPress={() => {
              replace('StartTrip');
            }}
          />
        ) : null}
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CarAttendance);
