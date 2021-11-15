import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  Clickable,
  MainContainer,
  MyFlatList,
  ProgressDialog, Button
} from '../../common';
import { connect } from 'react-redux';
import styles from '../../HomeDetails/styles/HelpDesk.style';
import { strings } from '../../../language/Language';
import { Images, Colors, FontName } from '../../../utils';
import { Chip, Card, Title, FAB } from 'react-native-paper';
import AppointmentApi from '../Api/CarAttendanceApi';
import _ from 'lodash';
import { goBack, push } from '../../../navigation/Navigator';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import CheckIn from '../../CheckInOut/CheckIn';
import { Image } from 'react-native';

import { DrawerActions } from '@react-navigation/native';
import { store } from '../../../App';
import CarAttendanceApi from '../Api/CarAttendanceApi';
import { setSessionField } from '../../../reducers/SessionReducer';
import backgroundServer from "react-native-background-actions"

class CarAttendance extends Component {
  state = {
    selectedIndex: 0,
    refreshing: false,
    loading: false,
    loadMore: false,
    isLast: false,
    listData: [],
    isVisibleFab:true,
    showSearch: false,
    searchQuery: false,
    startDate: '',
    endDate: '',
    isFabVisible:true
  };

  componentDidMount = () => {
    const date = new Date().getDate() ;
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    this.setState(
      {
        // startDate: month + '/' + date + '/' + year,
        startDate:  '05/' + date + '/' + year,
        endDate: month + '/' + date + '/' + year,
      },
      () => {
        this.getAllList();
      },
    );
  };


  handleFabVisiblity = ()=>{
    const {listData} = this.state
    for (let index = 0; index < listData.length; index++) {
      const list = listData[index];
    const CarReleasedTime= list.CarReleasedTime
      if(!CarReleasedTime){
        this.setState({
          isFabVisible:false
        })
        break; 
      }
      
    }
  }
  getAllList = () => {
    const { startDate, endDate } = this.state;
    const EmpId = store.getState().session.user.EmployeeID;
    const params = {
      EmpId,
      fromdate: startDate,
      todate: endDate,
    };

    ProgressDialog.show();

    CarAttendanceApi.getAllList(
      params,
      res => {
        ProgressDialog.hide();
        if (res) {
          if (res) {
            const Table = res.Table;
            if (Table) {
              if (Array.isArray(Table)) {
                this.setState({ listData: [...Table] }, () =>
                this.handleFabVisiblity()
                );
              } else {
                //console.log("table name name",Table.CustomerName)
                let results = [{ ...Table }];
                this.setState(
                  {
                    listData: results,
                  },
                  ()=>{
                    this.handleFabVisiblity()
                  }
                );
              }
            }
          }
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
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
  renderCell = ({ index }) => {

    const item = this.state.listData[index];

    const CarReleasedTime= item.CarReleasedTime
console.log("itemmmm",item)
    return (
      <Card style={{ margin: ResponsivePixels.size5 }} key={index}>
        <Clickable
          onPress={() => {
            // this.props.navigation.push('AddAppointments', {item});
          }}>
          <View style={{ margin: ResponsivePixels.size15 }}>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ flexDirection: 'column', width: '50%' }}>
                <Text style={{ fontSize: ResponsivePixels.size18 }}>
                  {item?.AttendanceType}
                </Text>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size18,
                    color: Colors.Red900,
                    fontWeight: 'bold',
                  }}>
                  {item?.CarNumber}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: ResponsivePixels.size15,
                  width: '50%',
                  textAlign: 'right',
                  alignSelf: 'center',
                }}>
                {item?.CarRecievedTime}
              </Text>
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
                  {item?.CarRecievedTime} To {item?.CarReleasedTime}
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
                  source={Images.ic_kilometers}
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
                  AutoComplete TotalKM
                </Text>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size15,
                    color: Colors.black,
                    fontWeight: 'bold',
                  }}>
                  {item?.totalKM}
                </Text>
              </View>
            </View>

<View style={{width:"100%",flexDirection:"row"}}>

<View
              style={{
                flexDirection: 'row',
                width: '60%',
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
                  source={Images.ic_kilometers}
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
                  TotalKM
                </Text>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size15,
                    color: Colors.black,
                    fontWeight: 'bold',
                  }}>
                  {item?.CarTotalKM}
                </Text>
              </View>
            </View>

<View
style={{width:"40%",justifyContent:"flex-end",alignContent:"flex-end"}}
>
{!CarReleasedTime ? <Button 
             style={{
              width:"100%",
              justifyContent:"flex-end",   
            }} 
            title="End Trip" 
            onPress={() => {

const distanceIndex = this.props.session.distances.findIndex((item) => item.id == this.props.session.currentTrip)

const tripDistance = this.props.session.distances[distanceIndex]?.distance || 0

const distances = [...this.props.session.distances]
distances.splice(distanceIndex, 1)
store.dispatch(setSessionField("currentTrip", ""))
store.dispatch(setSessionField("distances", [...distances]))
backgroundServer.stop()
push('EndTrip',{item});


// Alert.alert("Distance", `Total distance ${(tripDistance / 1000).toFixed(2)} kms`, [{
//   text: "End trip", onPress: () => {

//     const distances = [...this.props.session.distances]
//     distances.splice(distanceIndex, 1)
//     store.dispatch(setSessionField("currentTrip", ""))
//     store.dispatch(setSessionField("distances", [...distances]))
//     backgroundServer.stop()
//     push('EndTrip');
//   }
// }, { text: "Cancel", style: "cancel" }])

}}   /> : null}

</View>
</View>
     
          </View>
          
    
        </Clickable>
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
        // this.getAllAppointment();
      },
    );
  };

  searchOppDelayed = _.debounce(this.searchOpp, 1000);

  render() {
    const { listData, refreshing, loading, loadMore, isLast, isFabVisible } =
      this.state;

    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_Menu,
            onPress: () => {
              console.log('this.props.navigation', this.props.navigation);
              this.props.navigation.openDrawer();
            },
          },
          title: 'Car Attendance',
          hideUnderLine: true,
          isHome: true,
          light: true,
        
          right: [
            {
              image: Images.ic_filter,
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
              refreshing={refreshing}
              onRefresh={() => {
                this.getAllList()
              }}
            />
          </View>
        </View>

{isFabVisible?<FAB
          style={styles.fab}
          icon="plus"
          color={Colors.white}
          onPress={() => {
            push('StartTrip');
          }}
        />:null}
        
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CarAttendance);
