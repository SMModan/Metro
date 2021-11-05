import moment from 'moment';
import React, {Component} from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import {Card, FAB} from 'react-native-paper';
import {connect} from 'react-redux';
import {store} from '../../../App';
import {push} from '../../../navigation/Navigator';
import {Colors, Images, Utils} from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import {
  Clickable,
  CustomDatePicker,
  MainContainer,
  MyFlatList,
  ProgressDialog,
} from '../../common';
import styles from '../../HomeDetails/styles/HelpDesk.style';
import AttendanceApi from '../Api/AttendanceApi';

class AttendanceList extends Component {
  state = {
    refreshing: false,
    loading: false,
    loadMore: false,
    isLast: false,
    listData: [
      {
        ID: '1',
        attDate: '23 Oct 2021',
        thedate: '2021-10-23T00:00:00+05:30',
        TotalWorkingHrs: '02:46',
        MarkinTime: 'Oct 23 2021  2:44PM',
        MarkoutTime: 'Oct 23 2021  5:30PM',
        Status: 'Present',
      },
    ],
    fromDate: new Date(),
    toDate: new Date(),
  };

  getAllList = () => {
    const EmployeeId = store.getState().session.user.EmployeeID;
    const {fromDate, toDate} = this.state;

    const _fromDate = Utils.formatDate(fromDate, 'DD-MMM-YYYY');
    const _toDate = Utils.formatDate(toDate, 'DD-MMM-YYYY');

    const params = {
      EmployeeId,
      fromdate: _fromDate,
      todate: _toDate,
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
    // this.getAllList();
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

  renderCell = ({index}) => {
    const item = this.state.listData[index];
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

  render() {
    const {
      dummyListData,
      listData,
      refreshing,
      loading,
      loadMore,
      isLast,
      applicationDate,
      showSearch,
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
          title: 'Markin - Markout',
          hideUnderLine: true,
          isHome: true,
          light: true,
        }}>
        <View style={styles.MainHeaderView}>
          <View style={styles.MainList}>
            <MyFlatList
              horizontal={false}
              scrollEnabled={true}
              data={
                listData || [
                  {
                    ID: '1',
                    attDate: '23 Oct 2021',
                    thedate: '2021-10-23T00:00:00+05:30',
                    TotalWorkingHrs: '02:46',
                    MarkinTime: 'Oct 23 2021  2:44PM',
                    MarkoutTime: 'Oct 23 2021  5:30PM',
                    Status: 'Present',
                  },
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
        </View>
        <FAB
          style={styles.fab}
          icon="plus"
          color={Colors.white}
          onPress={() => {
            push('AddAttendance');
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
