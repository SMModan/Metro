import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import {
  MainContainer, MyFlatList,
} from '../../common';
import { connect } from 'react-redux';
import styles from '../../HomeDetails/styles/HelpDesk.style';
import { strings } from '../../../language/Language';
import { Images, Colors } from '../../../utils';
import { Card, Title, FAB } from 'react-native-paper';
import { push } from '../../../navigation/Navigator';
import opportunityApi from '../apis/OpportunityApis';


class Opportunity extends Component {

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

  renderCell = ({ item, index }) => {
    return (
      <Card style={{ margin: 5 }} key={index}>
        <View style={{ margin: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 13, width: '70%', }}>{item.CloseDate}</Text>
            <View style={{ width: 80, backgroundColor: Colors.BlueColor50, borderRadius: 5 }}>
              <Text style={{ textAlign: 'center', fontSize: 12, color: Colors.BlueColor500, margin: 3 }}>{item.OpportunityStage}</Text>
            </View>
          </View>
          <Title style={{ fontSize: 16, marginTop: 8 }}>{item.CustomerName}</Title>
          <Text style={{ fontSize: 12, color: Colors.darkGray, }}>{item.Owner}</Text>
          {/* <Text style={{ fontSize: 12, color: Colors.primary, fontWeight: 'bold', marginTop: 16 }}>{"item.header"}</Text> */}
          <Text style={{ fontSize: 15, color: Colors.darkGray, marginTop: 4 }}>{item.OpportunityName}</Text>
        </View>
      </Card>
    );
  };

  componentDidMount = () => {

    this.getAllOpportunities()
  }

  getAllOpportunities = () => {

    const params = {
      PageIndex: this.state.page,
      PageSize: 10,
      Filter: ""
    }
    this.setState({
      loading: !this.state.refreshing && !this.state.loadMore
    })
    opportunityApi.getAllOpportunities(params, (res) => {
      const { Table } = res
      console.log("Table", Table)
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



  render() {
    const { listData, refreshing, loading, loadMore, isLast } = this.state
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => this.props.navigation.goBack(),
          },
          title: 'Opportunity',
          hideUnderLine: true,
          light: true,
          right: [{ image: Images.ic_Search, onPress: () => this.props.navigation.push('Settings'), }],
        }}>
        <View style={styles.MainHeaderView}>
          <View style={styles.MainList}>
            <MyFlatList
              data={listData}
              renderItem={item => this.renderCell(item)}
              style={{ flex: 1, margin: 10 }}
              refreshing={refreshing}
              loading={loading}
              onRefresh={() => {
                this.setState({
                  page: 0,
                  refreshing: true
                }, () => {
                  this.getAllOpportunities()
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
                    this.getAllOpportunities()
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
            push("AddOpportunity")
          }}
        />
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Opportunity);
