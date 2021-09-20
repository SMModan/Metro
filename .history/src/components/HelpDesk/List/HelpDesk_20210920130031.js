import _ from "lodash";
import React, { Component } from 'react';
import {
  ActivityIndicator, Alert, Image, PermissionsAndroid,
  Platform, ScrollView, Text, View
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import { Button, Button as DialogButton, Card, Chip, Dialog, FAB, Portal, TextInput, Title } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';
import { connect } from 'react-redux';
import { Colors, Images, Utils } from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import CheckIn from "../../CheckInOut/CheckIn";
import {
  Clickable,
  FloatingEditText,
  MainContainer, MyFlatList, ProgressDialog
} from '../../common';
import HelpDeskApi from '../Api/HelpDeskApi';
import styles from '../styles/HelpDesk.style';
// import Geolocation from '@react-native-community/geolocation';

class HelpDesk extends Component {
  state = {
    selectedIndex: 1,
    ratings:0,
    remarks:"",
    signatureURL:"",
    page: 0,
    totalPage: 0,
    refreshing: false,
    loading: true,
    loadMore: false,
    isLast: false,
    listData: [],
    contactDialogVisible: false,
    showSearch: false,
    searchQuery: false,
    statusId: 0,
    isCheckInPermission:false,
    checkoutDialogue:false,
    isRatingRemarks:false
    };

  componentDidMount = () => {
   
    const checkinout =this.props.session.checkinout
    const user =this.props.session.user

    this.setState({
      isCheckInPermission:checkinout,
      userID :user.ID
    },()=>{
      this.getAllList()
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

  // AIzaSyAvE_MSDLTAi8UGeTfU4UOC-aV8awuKHLs
  getAllList = () => {
    const { searchQuery } = this.state

    const params = {
      PageIndex: this.state.page,
      PageSize: 10,
      Filter: searchQuery || "",
      HelpDeskStatusID: this.state.statusId
    }
    this.setState({
      loading: !this.state.refreshing && !this.state.loadMore
    })
    HelpDeskApi.getAllList(params, (res) => {
      const { Table } = res
      console.log("Table", Table)
      let isLast = true
      if (Table) {
        let totalPage = Table[0].Count / 10
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

  generateUniqueId=(date)=>{
    let myDate = `HEL${date.getMonth() + 1
    }${date.getFullYear()}-${date.getDay()}`;
    return myDate
  }

  renderCell = ({ index }) => {
    const item = this.state.listData[index];
    console.log(item.IsDigiSign)
    var date = new Date(item.CreatedDate);
    date.toISOString().substring(0, 10);
    let myDate = `${date.getDay()}-${date.getMonth() + 1
      }-${date.getFullYear()}`;

      const {isCheckInPermission,userID} = this.state
    return (
      <Card style={{ margin: 5 }} key={item.index}>
        <Clickable  onPress={() => {
        this.props.navigation.push('AddHelpDesk', { item })
      }}>
        <View style={{ margin: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 13, width: '70%', }}>{myDate}</Text>
            <View style={{ width: 80, backgroundColor: item.Status.toLowerCase() == 'open' ? Colors.secondary100 : item.Status.toLowerCase() == 'completed' ? Colors.Green100 : Colors.Orange100, borderRadius: 5 }}>
              <Text style={{ textAlign: 'center', fontSize: 12, color: item.Status.toLowerCase() == 'open' ? Colors.secondary900 : item.Status.toLowerCase() == 'completed' ? Colors.Green800 : Colors.Orange900, margin: 3 }}>{item.StatusName}</Text>
            </View>
          </View>
          <Text style={{ fontSize: 12, color: Colors.primary, fontWeight: 'bold', marginTop: 8 }}>{item.CustomerName}</Text>
          <Title style={{ fontSize: 16, marginTop: 8 }}>{item.ContactPersonName}</Title>
          <Text style={{ fontSize: 12, color: Colors.darkGray, marginTop: 8 }}>{item.AssignedToName}</Text>
          {
            item.StatusID === 2 && item.IsDigiSign !=0 ?
              <Button labelStyle={{ fontSize: 12, color: Colors.primary, marginTop: 15, textAlign: 'left', width: '100%' }}
                onPress={() => { 
                  this.setState({ contactDialogVisible: true, ratings:{item.DigiSignRating}}

                    selectedItem: item })

                 }}
                uppercase={false}> View ratings & digital signature </Button> : null
          }
        </View>
      </Clickable>

{isCheckInPermission &&   
   <CheckIn  lableText={date} TransactionTypeID={4} HeaderID={item.ID} 
   IsCheckIn={item.IsCheckIn} 
   CheckInID={item.CheckInID} CheckInTime={item.CheckInTime}
   userID={userID}
   updateListAfterCheckInCheckOut={(type,ID,HeaderID)=>{this.updateListAfterCheckInCheckOut(type,ID,HeaderID)}}/>
   }
      </Card>
    );
  };



  searchOpp = async () => {

    this.setState({
      listData: [],
      page: 0
    }, () => {
      this.getAllList()
    })
  }

  searchOppDelayed = _.debounce(this.searchOpp, 1000)



  render() {
    const { listData, refreshing, loading, loadMore, isLast, contactDialogVisible, showSearch,checkoutDialogue,isRatingRemarks,ratings,remarks,signatureURL } = this.state

    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => this.props.navigation.goBack(),
          },
          title: 'Help Desk',
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
              this.getAllList()
            })
          },
          showSearch,
          right: [{ image: Images.ic_Search, onPress: () => this.setState({ showSearch: true }), }],
        }}>
        <View style={styles.MainHeaderView}>
          <View style={styles.headerView}>
            <Text style={{ fontWeight: 'bold', fontSize: 13 }}>Status</Text>
            <View style={{ height: 25, width: 1, backgroundColor: Colors.secondary200, margin: 5 }} />
            <ScrollView horizontal={true}>
              {[{ name: "All", id: 0, }, { name: "Open", id: 1 }, { name: "On hold", id: 3 }, { name: "Completed", id: 2 }].map((item, index) => <Chip key={index} style={{ margin: 5, backgroundColor: this.state.selectedIndex === index ? Colors.Orange500 : Colors.secondary200 }} textStyle={{ fontSize: 13, color: this.state.selectedIndex === index ? Colors.white : Colors.black }} onPress={() => {
                this.setState({ selectedIndex: index, statusId: item.id, refreshing: true }, () => {
                  this.getAllList()
                })
              }}>{item.name}</Chip>)}
            </ScrollView>
          </View>
          <View style={styles.MainList}>

            <MyFlatList
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
                  this.getAllList()
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
                    this.getAllList()
                  })

                }
              }}
            />
           
            <Portal>
              <Dialog visible={contactDialogVisible} onDismiss={() => { this.setState({ contactDialogVisible: false }) }}>
                <Dialog.Title> Ratting & Digital signature </Dialog.Title>
                <Dialog.ScrollArea>
                  <Image source={Images.ic_signature} style={{ width: '100%', height: '30%', resizeMode: 'stretch', alignItems: 'flex-start', marginTop: 25 }} />
                  <AirbnbRating
                    count={ratings}
                    defaultRating={11}
                    size={30}
                    style={{ height: '30%' }}
                  />

                  <View style={{ width: '100%', backgroundColor: Colors.BlueColor50, borderRadius: 5, marginTop: 20 }}>
                    <Text style={{ textAlign: 'center', fontSize: ResponsivePixels.size16, color: Colors.BlueColor500, margin: 3 }}>
                     {remarks}</Text>
                  </View>

                </Dialog.ScrollArea>
                <Dialog.Actions>
                  <DialogButton color={Colors.blueGray600} style={{}} onPress={() => { this.setState({ contactDialogVisible: false }) }}>Close</DialogButton>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
        </View>
        
        <FAB
          style={styles.fab}
          icon="plus"
          color={Colors.white}
          onPress={() => {
            this.props.navigation.push('AddHelpDesk')
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

export default connect(mapStateToProps, mapDispatchToProps)(HelpDesk);
