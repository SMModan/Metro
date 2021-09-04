import _ from "lodash";
import React, { Component } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { Button, Button as DialogButton, Card, Chip, Dialog, FAB, Portal, Title } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';
import { connect } from 'react-redux';
import { Colors, Images } from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import {
  MainContainer, MyFlatList
} from '../../common';
import HelpDeskApi from '../Api/HelpDeskApi';
import styles from '../styles/HelpDesk.style';


class HelpDesk extends Component {
  state = {
    selectedIndex: 1,
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
    isCheckInPermission:false
  };

  componentDidMount = () => {
    this.getAllList()

    const checkinout =this.props.session.checkinout
    this.setState({
      isCheckInPermission:checkinout
    })
  }

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
    var date = new Date(item.CreatedDate);
    date.toISOString().substring(0, 10);
    console.log("itemm ==========>",item)
    let myDate = `${date.getDay()}-${date.getMonth() + 1
      }-${date.getFullYear()}`;

      const {isCheckInPermission} = this.state
    return (
      <Card style={{ margin: 5 }} key={item.index} onPress={() => {
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
            item.StatusID === 2 && item.HelpDeskOwnerID == this.props.session.user.ID ?
              <Button labelStyle={{ fontSize: 12, color: Colors.primary, marginTop: 15, textAlign: 'left', width: '100%' }}
                onPress={() => { this.setState({ contactDialogVisible: true, selectedItem: item }) }}
                uppercase={false}> View ratings & digital signature </Button> : null
          }
        </View>
      

{isCheckInPermission &&   
        <View
        style={{
          flexDirection: 'row',
          width: '100%',
          padding: ResponsivePixels.size5,
          paddingRight: ResponsivePixels.size10,
        }}>
        <Button
          labelStyle={{
            fontSize: ResponsivePixels.size12,
            color: '#2262F7',
            textAlign: 'left',
            textAlignVertical: 'center',
          }}
          style={{
            alignItems: 'flex-start',
            width: '35%',
            borderWidth: ResponsivePixels.size1,
            borderColor: Colors.Black,
          }}
          uppercase={false}
          onPress={() => {
            this.props.navigation.push('AddRemarks', {
              TaskActivityID: item.TaskActivityID,
            });
          }}>
          {this.generateUniqueId(date)}
        </Button><View
          style={{
            flexDirection: 'row',
            width: '65%',
            borderWidth: ResponsivePixels.size1,
            borderRadius: ResponsivePixels.size5,
            borderColor: Colors.Black,
            marginLeft: ResponsivePixels.size5,
            marginRight: ResponsivePixels.size5,
          }}>
          <Button
            labelStyle={{
              fontSize: ResponsivePixels.size12,
              color: Colors.Black,
              textAlign: 'left',
            }}
            style={{
              alignItems: 'flex-start',
              width: '55%',
              borderEndColor: '#2262F7',
              backgroundColor: Colors.BlackColor100,
            }}
            uppercase={false}
            onPress={() => {
              console.log('item ====> ', item);
              this.handleCompleteTaskApi(item);
            }}>
            My Check-In
          </Button>

          <Button
            labelStyle={{
              fontSize: ResponsivePixels.size12,
              color: '#2262F7',
              textAlign: 'left',
            }}
            style={{
              alignItems: 'flex-start',
              width: '45%',
              borderEndColor: '#2262F7',
            }}
            uppercase={false}
            onPress={() => {
              console.log('item ====> ', item);
              this.handleCompleteTaskApi(item);
            }}>
            {item.IsCheckIn=='No'?"CheckIn":"CheckOut"}
          </Button>
        </View>
        </View>
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
    const { listData, refreshing, loading, loadMore, isLast, contactDialogVisible, showSearch } = this.state

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
                    count={5}
                    defaultRating={11}
                    size={30}
                    style={{ height: '30%' }}
                  />

                  <View style={{ width: '100%', backgroundColor: Colors.BlueColor50, borderRadius: 5, marginTop: 20 }}>
                    <Text style={{ textAlign: 'center', fontSize: ResponsivePixels.size16, color: Colors.BlueColor500, margin: 3 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </Text>
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
