import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import {
  Clickable,
  MainContainer, MyFlatList,
} from '../../common';
import { connect } from 'react-redux';
import styles from '../../HomeDetails/styles/HelpDesk.style';
import { strings } from '../../../language/Language';
import { Images, Colors } from '../../../utils';
import { Card, Title, FAB } from 'react-native-paper';
import { push } from '../../../navigation/Navigator';
import opportunityApi from '../apis/OpportunityApis';
import _ from "lodash"
import { CheckIn } from '../../CheckInOut/CheckIn';


class Opportunity extends Component {

  state = {
    selectedIndex: 0,
    page: 0,
    totalCount: 0,
    refreshing: false,
    loading: true,
    loadMore: false,
    isLast: false,
    showSearch: false,
    searchQuery: false,
    listData: []
  };

  renderCell = ({ index }) => {
    const {isCheckInPermission,userID} = this.state
    
    const item = this.state.listData[index];
    console.log("item  =======>",item);

    return (
      <Card  style={{ margin: 5 }} key={index}>
        <Clickable onPress={() => {
        push("AddOpportunity", { opportunityId: item.ID })
      }}>
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
        </Clickable>
        {isCheckInPermission &&   
   <CheckIn  lableText={item.OpportunityStage} TransactionTypeID={2} HeaderID={item.ID} 
   IsCheckIn={item.IsCheckIn} 
   CheckInID={item.CheckInID} CheckInTime={item.CheckInTime}
   userID={userID}
   updateListAfterCheckInCheckOut={(type,ID,HeaderID)=>{this.updateListAfterCheckInCheckOut(type,ID,HeaderID)}}/>
   }
      </Card>
    );
  };

  componentDidMount = () => {

    const checkinout =this.props.session.checkinout
    const user =this.props.session.user
    this.setState({
      isCheckInPermission:checkinout,
      userID :user.ID
    },()=>{
      this.getAllOpportunities();
    })

  }

  updateListAfterCheckInCheckOut=(type,CheckInID,HeaderID)=>{

    console.log("type =====>",type)
    console.log("CheckInID =====>",CheckInID)
    console.log("HeaderID =====>",HeaderID)
    let listData = this.state.listData;
  
    if(type==0){
      let index = listData.findIndex(el => el.ID == HeaderID);
      console.log("index ===>",index)
      if (index != -1) {
        let item = listData[index];
        item.CheckInID = CheckInID;
        item.IsCheckIn = 'Yes';
        listData[index] = item;
      }
    }else{
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
  }
  

  searchOpp = async () => {
    this.getAllOpportunities()

  }

  searchOppDelayed = _.debounce(this.searchOpp, 1000)

  getAllOpportunities = () => {

    const { searchQuery } = this.state
    const params = {
      PageIndex: this.state.page,
      PageSize: 10,
      Filter: searchQuery || ""
    }
    this.setState({
      loading: !this.state.refreshing && !this.state.loadMore
    })
    opportunityApi.getAllOpportunities(params, (res) => {
      const { Table } = res
      console.log("Table", Table)
      let isLast = true
      if (Table) {
        this.setState({ totalCount: Table[0].TotalCount })
        let totalPage = Table[0].TotalCount / 10
        isLast = this.state.page == totalPage
        this.setState({
          listData: this.state.page > 0 ? [...this.state.listData, ...Table] : Table,
          loading: false, refreshing: false, loadMore: false, isLast
        })
      } else {
        this.setState({
          loading: false, refreshing: false, loadMore: false, isLast: true
        })
      }

    }, () => {
      // let totalPage = this.state.totalCount / 10
      // let isLast = this.state.page == totalPage
      this.setState({
        loading: !this.state.refreshing && !this.state.loadMore, loadMore: false,
      })
    })
  }



  render() {
    const { listData, refreshing, loading, loadMore, isLast, showSearch } = this.state
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
          onClickSearch: () => {
            this.searchOpp()
          },
          onChangeSearch: (text) => {
            this.setState({ searchQuery: text })
          },
          onCloseSearch: () => {
            this.setState({ showSearch: false, searchQuery: "", page: 0, refreshing: true, }, () => {
              this.getAllOpportunities()
            })
          },
          showSearch,
          right: [{ image: Images.ic_Search, onPress: () => this.setState({ showSearch: true }), }],
        }}>
        <View style={styles.MainHeaderView}>
          <View style={styles.MainList}>
            <MyFlatList
              data={listData}
              renderItem={item => this.renderCell(item)}
              style={{ flex: 1, margin: 10 }}
              loading={loading}
              refreshing={refreshing}
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

const mapStateToProps = (state) => ({
  session: state.session
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Opportunity);