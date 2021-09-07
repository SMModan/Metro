import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Clickable, MainContainer, MyFlatList } from '../../common';
import { connect } from 'react-redux';
import styles from '../../HomeDetails/styles/HelpDesk.style';
import { strings } from '../../../language/Language';
import { Images, Colors, FontName } from '../../../utils';
import { Chip, Card, Title, Button, FAB } from 'react-native-paper';
import AppointmentApi from '../Api/AppointmentApi';
import _ from 'lodash';
import { goBack, push } from '../../../navigation/Navigator';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import CheckIn from '../../CheckInOut/CheckIn';

class Appointments extends Component {
  state = {
    selectedIndex: 0,
    page: 0,
    totalPage: 0,
    refreshing: false,
    loading: true,
    loadMore: false,
    isLast: false,
    listData: [],
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
        this.getAllAppointment();
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

  getAllAppointment = () => {
    const { searchQuery } = this.state;

    const params = {
      PageIndex: this.state.page,
      PageSize: 10,
      Filter: searchQuery || '',
    };
    this.setState({
      loading: !this.state.refreshing && !this.state.loadMore,
    });
    AppointmentApi.getAllAppointment(
      params,
      res => {
        if (res) {
          const { Table } = res && res;
          let isLast = true;
          if (Table) {
            if (Array.isArray(Table)) {
              let totalPage = Table[0]?.TotalCount / 10;
              isLast = this.state.page == totalPage;
              this.setState({
                listData:
                  this.state.page > 0
                    ? [...this.state.listData, ...Table]
                    : Table,
                loading: false,
                refreshing: false,
                loadMore: false,
                isLast,
              });
            } else {
              let results = [{ ...Table }];
              console.log('<===results  ===>', results);
              this.setState({
                listData: results,
                loading: false,
                refreshing: false,
                loadMore: false,
                isLast,
              });
            }
          }
        } else {
          this.setState({
            loading: false,
            refreshing: false,
            loadMore: false,
            isLast: true,
          });
        }
      },
      () => {
        this.setState({
          loading: !this.state.refreshing && !this.state.loadMore,
        });
      },
    );
  };

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
  renderCell = ({ index }) => {
    const { isCheckInPermission, userID } = this.state;

    const item = this.state.listData[index];
    console.log('item.CreatedDate ======>', item);
    var date = item.CreatedDate;

    return (
      <Card style={{ margin: ResponsivePixels.size10 }} key={item.index}>
        <Clickable
          onPress={() => {
            this.props.navigation.push('AddAppointments', { item });
          }}>
          <View style={{ margin: ResponsivePixels.size15 }}>
            <Text style={{ fontSize: 12 }}>{this.createdDate(date)}</Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: FontName.medium,
                marginTop: ResponsivePixels.size5,
              }}>
              {item.Subject}
            </Text>
            <Title style={{ fontSize: 13, fontFamily: FontName.regular }}>
              {' '}
              Created By {item.OwnerName}
            </Title>

            <Text
              style={{
                fontSize: 13,
                fontFamily: FontName.medium,
                marginTop: ResponsivePixels.size5,
              }}>
              {item.Regarding}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: FontName.medium,
                color: Colors.darkGray,
                marginTop: ResponsivePixels.size5,
              }}>
              {this.createdDateTime(date)}
            </Text>
          </View>
        </Clickable>

        {isCheckInPermission && (
          <CheckIn
            lableText={this.createdDate(date)}
            TransactionTypeID={3}
            HeaderID={item.ID}
            IsCheckIn={item.IsCheckIn}
            CheckInID={item.CheckInID}
            CheckInTime={item.CheckInTime}
            userID={userID}
            updateListAfterCheckInCheckOut={(type, ID, HeaderID) => {
              this.updateListAfterCheckInCheckOut(type, ID, HeaderID);
            }}
          />
        )}
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
        this.getAllAppointment();
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
            image: Images.ic_BackWhite,
            onPress: () => goBack(),
          },
          title: 'Appointments',
          hideUnderLine: true,
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
              image: Images.ic_Search,
              onPress: () => this.setState({ showSearch: true }),
            },
          ],
        }}>
        <View style={styles.MainHeaderView}>
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
                    this.getAllAppointment();
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
                      this.getAllAppointment();
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
            push('AddAppointments');
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

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
