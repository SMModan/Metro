import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  Clickable,
  MainContainer,
  MyFlatList,
  ProgressDialog, Button
} from '../../common';
import { connect } from 'react-redux';
import styles from '../../HomeDetails/styles/HelpDesk.style';
import { strings } from '../../../language/Language';
import { Images, Colors, FontName } from '../../../utils';
import { Chip, Card, Title, FAB } from 'react-native-paper';
import AppointmentApi from '../Api/CarAttendanceApi';
import _ from 'lodash';
import { goBack, push } from '../../../navigation/Navigator';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import CheckIn from '../../CheckInOut/CheckIn';
import { Image } from 'react-native';

import { DrawerActions } from '@react-navigation/native';
import { store } from '../../../App';
import CarAttendanceApi from '../Api/CarAttendanceApi';
import { setSessionField } from '../../../reducers/SessionReducer';
class CarAttendance extends Component {
  state = {
    selectedIndex: 0,
    refreshing: false,
    loading: false,
    loadMore: false,
    isLast: false,
    listData: [],
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
    startDate: '',
    endDate: '',
  };

  componentDidMount = () => {
    const date = new Date().getDate() - 1;
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    this.setState(
      {
        startDate: month + '/' + date + '/' + year,
        endDate: month + '/' + date + '/' + year,
      },
      () => {
        this.getAllList();
      },
    );
  };

  getAllList = () => {
    const { startDate, endDate } = this.state;
    const EmpId = store.getState().session.user.EmployeeID;
    const params = {
      EmpId,
      fromdate: startDate,
      todate: endDate,
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
                this.setState({ listData: [...Table] }, () =>
                  console.log('this.state', this.state.listData),
                );
              } else {
                //console.log("table name name",Table.CustomerName)
                let results = [{ ...Table }];
                this.setState(
                  {
                    listData: results,
                  },
                  () => console.log('this.state', this.state.listData),
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

  splitDate = strDate => {
    let date = '';
    if (strDate) {
      const TStartSplit = strDate.split('T');
      const sDate = TStartSplit[0];
      date = `${sDate}`;
    }
    return date;
  };
  renderCell = ({ index }) => {
    const { isCheckInPermission, userID } = this.state;

    const item = this.state.listData[index];

    return (
      <Card style={{ margin: ResponsivePixels.size5 }} key={index}>
        <Clickable
          onPress={() => {
            // this.props.navigation.push('AddAppointments', {item});
          }}>
          <View style={{ margin: ResponsivePixels.size15 }}>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ flexDirection: 'column', width: '30%' }}>
                <Text style={{ fontSize: ResponsivePixels.size18 }}>
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
                  {item?.CarTotalKM}
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

  searchOppDelayed = _.debounce(this.searchOpp, 1000);

  render() {
    const { listData, refreshing, loading, loadMore, isLast, showSearch } =
      this.state;

    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_Menu,
            onPress: () => {
              console.log('this.props.navigation', this.props.navigation);
              this.props.navigation.openDrawer();
            },
          },
          title: 'Car Attendance',
          hideUnderLine: true,
          isHome: true,
          light: true,
          onClickSearch: () => {
            this.searchOpp();
          },
          onChangeSearch: text => {
            this.setState({ searchQuery: text });
          },
          onCloseSearch: () => {
            this.setState(
              { showSearch: false, searchQuery: '', page: 0, refreshing: true },
              () => {
                this.getAllAppointment();
              },
            );
          },
          showSearch,
          right: [
            {
              image: Images.ic_filter,
              onPress: () => this.setState({ showSearch: true }),
            },
          ],
        }}>
        <View style={styles.MainHeaderView}>
          {this.props.session.currentTrip ? <Button title="Trip End" onPress={() => {

            const distanceIndex = this.props.session.distances.findIndex((item) => item.id == this.props.session.currentTrip)

            const tripDistance = this.props.session.distances[distanceIndex]?.distance || 0

            Alert.alert("Distance", `Total distance ${(tripDistance / 1000).toFixed(2)} kms`, [{
              text: "End trip", onPress: () => {

                const distances = [...this.props.session.distances]
                distances.splice(distanceIndex, 1)
                store.dispatch(setSessionField("currentTrip", ""))
                store.dispatch(setSessionField("distances", [...distances]))
              }
            }, { text: "Cancel", style: "cancel" }])

          }} style={{ margin: 16 }} /> : null}
          <View style={styles.MainList}>
            <MyFlatList
              horizontal={false}
              scrollEnabled={true}
              data={listData || []}
              showsHorizontalScrollIndicator={false}
              renderItem={item => this.renderCell(item)}
              style={{ flex: 1, margin: ResponsivePixels.size5 }}
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
                    style={{ margin: 8 }}
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
        </View>
        <FAB
          style={styles.fab}
          icon="plus"
          color={Colors.white}
          onPress={() => {
            push('StartTrip');
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

export default connect(mapStateToProps, mapDispatchToProps)(CarAttendance);
