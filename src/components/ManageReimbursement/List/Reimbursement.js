import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import {
  BackHandler, Image, Text, View
} from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { connect } from 'react-redux';
import { store } from '../../../App';
import { push, replace } from '../../../navigation/Navigator';
import { Colors, Images } from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import { Clickable, MainContainer, MyFlatList, ProgressDialog } from '../../common';
import styles from '../../HomeDetails/styles/HelpDesk.style';
import ReimbursementApi from '../Api/ReimbursementApi';

class Reimbursement extends Component {
  state = {
    selectedIndex: 0,
    page: 0,
    totalPage: 0,
    refreshing: false,
    loading: false,
    loadMore: false,
    isLast: false,
    listData: [],
    showSearch: false,
    searchQuery: false,
  };

  componentDidMount = () => {
    this.getAllList()
  };



  getAllList = () => {
    const EmployeeID= store.getState().session.user.EmployeeID
    const params = {
      EmployeeID
    }
 
    ProgressDialog.show()

    ReimbursementApi.getAllList(params, (res) => {
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

    const oneDate = moment(item?.FromDate);
    const dayName = oneDate?.format('dddd');
    console.log("dayName====",dayName);

    return (
      <View>
        {index == 0 || index == 4 ? (
          <Text
            style={{
              fontSize: ResponsivePixels.size15,
              textAlign: 'left',
              alignSelf: 'stretch',
              marginLeft: ResponsivePixels.size20,
              marginTop: ResponsivePixels.size5,
              fontWeight:"bold"
            }}>
               {`${this.splitDate(item?.FromDate)} - ${dayName}`}
          </Text>
        ) : null}

        <Card style={{margin: ResponsivePixels.size10}} key={index}>
          <Clickable
            onPress={() => {
               replace('EditReimbursement', {item});
            }}>
            <View style={{margin: ResponsivePixels.size15}}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: ResponsivePixels.size18}}>
                 {item?.ProjectName}
                </Text>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size18,
                    color: Colors.yellow,
                    fontWeight: 'bold',
                  }}>
                  {item?.ReimbursementCode}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  marginTop: ResponsivePixels.size20,
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
                  {`${this.splitDate(item?.FromDate)} to ${this.splitDate(item?.ToDate)} `}

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
                    source={Images.ic_total}
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
                    Pending To
                  </Text>
                  <Text
                    style={{
                      fontSize: ResponsivePixels.size15,
                      color: Colors.black,
                      fontWeight: 'bold',
                    }}>
                  {item?.Pending}
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
              top: 40,
              right: 0,
              borderTopLeftRadius: 100 / 2,
              borderBottomLeftRadius: 100 / 2,
              widht: ResponsivePixels.size400,
              backgroundColor: Colors.Red900,
              paddingLeft: ResponsivePixels.size20,
              paddingRight: ResponsivePixels.size20,
            }}>
            {item?.ApprovalStatus}
          </Text>

          <Image
                    source={Images.ic_right_arrow}
                    style={{
                      width: ResponsivePixels.size20,
                      height: ResponsivePixels.size20,
                      position: 'absolute',
                      bottom: 20,
                      right: 10,
                    }}
                    resizeMode={'cover'}
                  />
      
        </Card>
      </View>
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


  
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  handleBackButtonClick() {
    replace("Home")
    return true;
  }

  searchOppDelayed = _.debounce(this.searchOpp, 1000);

  render() {
    const {listData, refreshing, loading, loadMore, isLast, showSearch} =
      this.state;

    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => {
              replace("Home")
            },
          },
          title: 'Reimbursement',
          hideUnderLine: true,
          isHome: true,
          light: true,
          onClickSearch: () => {
            this.searchOpp();
          },
          onChangeSearch: text => {
            this.setState({searchQuery: text});
          },
          onCloseSearch: () => {
            this.setState(
              {showSearch: false, searchQuery: '', page: 0, refreshing: true},
              () => {
                this.getAllAppointment();
              },
            );
          },
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
                this.setState({
                  listData:[],
                  refreshing:false
                },()=>{
                  this.getAllList()
                })
              }}
            />
          </View>
        </View>
        <FAB
          style={styles.fab}
          icon="plus"
          color={Colors.white}
          onPress={() => {
            push('AddReimbursement');
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

export default connect(mapStateToProps, mapDispatchToProps)(Reimbursement);
