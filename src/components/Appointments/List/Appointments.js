import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import {
  MainContainer,
} from '../../common';
import { connect } from 'react-redux';
import styles from '../../HomeDetails/styles/HelpDesk.style';
import { strings } from '../../../language/Language';
import { Images, Colors, FontName } from '../../../utils';
import { Chip, Card, Title, Button, FAB } from 'react-native-paper';
import AppointmentApi from '../Api/AppointmentApi';


class Appointments extends Component {


  state = {
    selectedIndex: 0,
    page: 0,
    totalPage: 0,
    refreshing: false,
    loading: true,
    loadMore: false,
    isLast: false,
    listData: []
  };

  componentDidMount = () => {
    this.getAllAppointment()
  }

  getAllAppointment = () => {
    const params = {
      PageIndex: this.state.page,
      PageSize: 10,
      Filter: ""
    }
    this.setState({
      loading: !this.state.refreshing && !this.state.loadMore
    })
    AppointmentApi.getAllAppointment(params, (res) => {
      const { Table } = res
      let isLast = true
      if (Table) {
        let totalPage = Table[0].TotalCount / 10
        isLast = this.state.page == totalPage
        this.setState({
          listData: this.state.page > 0 ? [...this.state.listData, ...Table] : Table,
          loading: false, refreshing: false, loadMore: false, isLast
        })
      }
      }, () => {
      this.setState({
        loading: !this.state.refreshing && !this.state.loadMore
      })
    })
  }

  renderCell = ({ index }) => {
    console.log(index);
    const item = this.state.listData[index];
    console.log('item', item);
    var date = new Date(item.CreatedDate);
    date.toISOString().substring(0, 10);
    let myDate = `${date.getDay()}-${
      date.getMonth() + 1
    }-${date.getFullYear()} ${date.getHours()} : ${date.getMinutes()}`;
    return (
      <Card style={{ margin: 5 }} key={item.index} onPress={() => {
        this.props.navigation.push('AddAppointments')
      }}>
        <View style={{ margin: 15 }}>
          <Text style={{ fontSize: 12 }}>{item.date}</Text>
          <Text style={{ fontSize: 18, fontFamily: FontName.medium, marginTop: 8 }}>{item.Subject}</Text>
          <Title style={{ fontSize: 13, fontFamily: FontName.regular }}> Created By {item.OwnerName}</Title>

          <Text style={{ fontSize: 13, fontFamily: FontName.medium, marginTop: 8 }}>{item.Regarding}</Text>
          <Text style={{ fontSize: 12, fontFamily: FontName.regular, color: Colors.darkGray, marginTop: 5 }}>{myDate}</Text>
        </View>
      </Card>
    );
  };

  render() {
    const { listData, refreshing, loading, loadMore, isLast } = this.state

    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => this.props.navigation.goBack(),
          },
          title: 'Appointments',
          hideUnderLine: true,
          light: true,
          right: [{ image: Images.ic_Search, onPress: () => this.props.navigation.push('Settings'), }],
        }}>
        <View style={styles.MainHeaderView}>
          <View style={styles.MainList}>
            <FlatList
              horizontal={false}
              scrollEnabled={true}
              data={listData || []}
              showsHorizontalScrollIndicator={false}
              renderItem={item => this.renderCell(item)}
              keyExtractor={(item, index) => 'key' + index}
              style={{ flex: 1, margin: 10 }}

              loading={loading}
              refreshing={refreshing}
              onRefresh={() => {
                this.setState({
                  page: 0,
                  refreshing: true
                }, () => {
                  this.getAllAppointment()
                })
              }}
              footerComponent={() => {
                return (loadMore ? <ActivityIndicator size={"large"} color={Colors.blueGray900} style={{ margin: 8 }} /> : null)
              }}
              onEndReached={() => {
                console.log("End")

                if (!loadMore && !isLast) {
                  this.setState({
                    page: this.state.page + 1,
                    loadMore: true
                  }, () => {
                    this.getAllAppointment()
                  })

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
            this.props.navigation.push('AddAppointments')
          }}
        />
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
