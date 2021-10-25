import moment from 'moment';
import React, { Component } from 'react';
import {
  ActivityIndicator, Image, Text, View
} from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { connect } from 'react-redux';
import { store } from '../../../App';
import { push } from '../../../navigation/Navigator';
import { Colors, Images, Utils } from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import { Clickable, CustomDatePicker, MainContainer, MyFlatList, ProgressDialog } from '../../common';
import styles from '../../HomeDetails/styles/HelpDesk.style';
import AttendanceApi from '../Api/AttendanceApi';

class AttendanceList extends Component {
  state = {

    refreshing: false,
    loading: false,
    loadMore: false,
    isLast: false,
    listData: [],
    fromDate: new Date(),
    toDate: new Date()
  };


  getAllList = () => {
     const EmployeeId = store.getState().session.user.EmployeeID;
    const {fromDate,toDate} = this.state


    
    const _fromDate = Utils.formatDate(fromDate, 'MM/DD/YYYY');
    const _toDate = Utils.formatDate(toDate, 'MM/DD/YYYY');


    const params = {
      EmployeeId,
      fromdate:_fromDate,
      todate:_toDate.toString()
    }
 
    ProgressDialog.show()

    AttendanceApi.GetDailyAttendanceDetails(params, (res) => {
      ProgressDialog.hide()
        
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

    const item = this.state.listData[index];
    const oneDate = moment(item?.attDate);
    const dayName = oneDate?.format('dddd');
    const day= oneDate?.format('DD');
    const Month= oneDate?.format('MMM');
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
          <View style={{margin: ResponsivePixels.size15, padding:ResponsivePixels.size5}}>
         
     

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                height:ResponsivePixels.size80
              }}>

              <View style={{width:"20%",height:"100%",backgroundColor:Colors.blueGray500, borderRadius:10,flexDirection:"column"}}>
              <Text
                  style={{
                    fontSize: ResponsivePixels.size20,
                    color: Colors.black,
                    fontWeight: 'bold',
                    textAlign:"center",
                    marginTop:ResponsivePixels.size8

                  }}>

                   23
                  
                </Text>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size18,
                    color: Colors.black,
                    fontWeight: 'bold',
                    textAlign:"center",
                    marginTop:ResponsivePixels.size8

                  }}>

                 Oct
                  
                </Text>
              </View>


<View style={{flexDirection:"row",width:"80%"}}>

              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: ResponsivePixels.size20,
                  width:"39%",
                  justifyContent:"center",
                  alignItems:"center"
                }}>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size15,
                    color: Colors.grayColor,
                    textAlign:"center"
                  }}>
                  Mark-In
                </Text>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size20,
                    color: Colors.black,
                  }}>

                      02:44 PM                  
                </Text>
              </View>
                <View style={{height:"100%", backgroundColor:Colors.Red900,width:ResponsivePixels.size10, widht:"1%"}} />

              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: ResponsivePixels.size20,
                  width:"39%",
                  justifyContent:"center",
                  alignItems:"center"
                }}>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size15,
                    color: Colors.grayColor,
                    textAlign:"center"
                  }}>
                  Mark-Out
                </Text>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size20,
                    color: Colors.black,
                    textAlign:"center"

                  }}>

02:44 PM
                  
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
    const {dummyListData,listData, refreshing, loading, loadMore, isLast,applicationDate, showSearch} =
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

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceList);
