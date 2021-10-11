import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Clickable, MainContainer, MyFlatList} from '../../common';
import {connect} from 'react-redux';
import styles from '../../HomeDetails/styles/HelpDesk.style';
import {strings} from '../../../language/Language';
import {Images, Colors, FontName} from '../../../utils';
import {Chip, Card, Title, Button, FAB} from 'react-native-paper';
import AppointmentApi from '../Api/CarAttendanceApi';
import _ from 'lodash';
import {goBack, push} from '../../../navigation/Navigator';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import CheckIn from '../../CheckInOut/CheckIn';
import {Image} from 'react-native';

class Reimbursement extends Component {
  state = {
    selectedIndex: 0,
    page: 0,
    totalPage: 0,
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
  };

  componentDidMount = () => {
    const checkinout = this.props.session.checkinout;
    const user = this.props.session.user;

    this.setState(
      {
        isCheckInPermission: checkinout,
        userID: user.ID,
      },
      () => {
        // this.getAllAppointment();
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
      <View>
        {index == 0 || index == 4 ? (
          <Text
            style={{
              fontSize: ResponsivePixels.size15,
              textAlign: 'left',
              alignSelf: 'stretch',
              marginLeft: ResponsivePixels.size20,
              marginTop: ResponsivePixels.size5,
            }}>
            23rd July 2021 - Friday
          </Text>
        ) : null}

        <Card style={{margin: ResponsivePixels.size10}} key={index}>
          <Clickable
            onPress={() => {
              this.props.navigation.push('AddAppointments', {item});
            }}>
            <View style={{margin: ResponsivePixels.size15}}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: ResponsivePixels.size18}}>
                  ERP - Ahmedabad
                </Text>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size18,
                    color: Colors.yellow,
                    fontWeight: 'bold',
                  }}>
                  REM-HAR-00003536
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  marginTop: ResponsivePixels.size20,
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
                    01-July-2021 To 07-July-2021
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
                    source={Images.ic_total}
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
                    Pending To
                  </Text>
                  <Text
                    style={{
                      fontSize: ResponsivePixels.size15,
                      color: Colors.black,
                      fontWeight: 'bold',
                    }}>
                  SHIVAM-JAISWAL-MT-W-1758
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
              top: 20,
              right: 0,
              borderTopLeftRadius: 100 / 2,
              borderBottomLeftRadius: 100 / 2,
              widht: ResponsivePixels.size400,
              backgroundColor: Colors.Red900,
              paddingLeft: ResponsivePixels.size20,
              paddingRight: ResponsivePixels.size20,
            }}>
            Awiating Approval
          </Text>

          <Image
                    source={Images.ic_right_arrow}
                    style={{
                      width: ResponsivePixels.size20,
                      height: ResponsivePixels.size20,
                      position: 'absolute',
                      bottom: 20,
                      right: 10,
                    }}
                    resizeMode={'cover'}
                  />
      
        </Card>
      </View>
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
    const {dummyListData, refreshing, loading, loadMore, isLast, showSearch} =
      this.state;

    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_Menu,
            onPress: () => {
              this.props.navigation.openDrawer()
            },
          },
          title: 'Reimbursement',
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
        }}>
        <View style={styles.MainHeaderView}>
          <View style={styles.MainList}>
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
        </View>
        <FAB
          style={styles.fab}
          icon="plus"
          color={Colors.white}
          onPress={() => {
            push('AddReimbursement');
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

export default connect(mapStateToProps, mapDispatchToProps)(Reimbursement);
