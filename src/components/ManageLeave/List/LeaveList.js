import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import {
  ActivityIndicator, Image, Text, View
} from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { connect } from 'react-redux';
import { push } from '../../../navigation/Navigator';
import { Colors, Images } from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import { Clickable, MainContainer, MyFlatList, ProgressDialog } from '../../common';
import styles from '../../HomeDetails/styles/HelpDesk.style';
import LeaveApi from '../Api/LeaveApi';

class LeaveList extends Component {
  state = {
    selectedIndex: 0,
    refreshing: false,
    loading: false,
    loadMore: false,
    isLast: false,
    listData: [],
    dummyListData: [],
    showSearch: false,
    searchQuery: false,
  };

  getAllList = () => {
    const params = {
    }
 
    ProgressDialog.show()

    LeaveApi.getAllLeaves(params, (res) => {
      ProgressDialog.hide()
      if(res){
        
        if(res){
          const Table = res.Table
          if (Table) {
            if (Array.isArray(Table)) {
              this.setState(
                { listData:[...Table]}
                ,()=>console.log("this.state",this.state.listData)
               );
            }else{
              //console.log("table name name",Table.CustomerName)
            let results = [
                {...Table}
              ];
              this.setState({
                listData:results
              },()=>console.log("this.state",this.state.listData))
            }
          
          }
        }
      }
     
    }, () => {
      ProgressDialog.hide()
    })
  }


  componentDidMount = () => {
    this.getAllList();
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
  renderCell = ({index}) => {
    const {isCheckInPermission, userID} = this.state;

    const item = this.state.listData[index];
    const oneDate = moment(item?.LeaveApplicationDate);
    const dayName = oneDate?.format('dddd');
    console.log("dayName====",dayName);
    return (
      <View>
          <Text
                style={{
                  fontSize: ResponsivePixels.size15,
                  textAlign: 'left',
                  alignSelf: 'stretch',
                  marginLeft:ResponsivePixels.size20,
                  marginTop:ResponsivePixels.size5,
                  fontWeight:"bold"
                }}>
              {`${item.LeaveApplicationDate} - ${dayName}`}
              </Text>
      
      <Card style={{margin: ResponsivePixels.size10}} key={index}>
        <Clickable
          onPress={() => {
            // this.props.navigation.push('AddAppointments', {item});
          }}>
          <View style={{margin: ResponsivePixels.size15}}>
         
     

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
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

                    {`${this.splitDate(item?.LeaveFromDate)} to ${this.splitDate(item?.LeaveToDate)} `}
                  
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
                  source={Images.ic_typeofleave}
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
                  Types of Leave
                </Text>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size15,
                    color: Colors.black,
                    fontWeight: 'bold',
                  }}>
                 {item?.LeaveName}
                </Text>
              </View>
            </View>

           </View>
        </Clickable>
        <Text
                  style={{
                    fontSize: ResponsivePixels.size15,
                    color: Colors.white,
                    position:"absolute",
                    top:10,
                    right:0,
                    borderTopLeftRadius:100/2,
                    borderBottomLeftRadius:100/2,
                    widht:ResponsivePixels.size400,
                    backgroundColor:Colors.Red900,
                    paddingLeft:ResponsivePixels.size20,
                    paddingRight:ResponsivePixels.size20,
                  }}>
                  {item?.StatusName}
                </Text>
      </Card>

  
      </View>
    );
  };

  render() {
    const {dummyListData,listData, refreshing, loading, loadMore, isLast, showSearch} =
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
          title: 'Leave List',
          hideUnderLine: true,
          isHome: true,
          light: true,
        
        }}>
        <View style={styles.MainHeaderView}>
          <View style={styles.MainList}>
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
            push('AddLeave');
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

export default connect(mapStateToProps, mapDispatchToProps)(LeaveList);
