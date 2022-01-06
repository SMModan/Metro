import moment from 'moment';
import React, { Component } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import {
  Button as DialogButton, Card, Dialog,
  Portal,
  TextInput
} from 'react-native-paper';
import { connect } from 'react-redux';
import { store } from '../../../App';
import { Colors, Images } from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import {
  Button, Clickable,
  MainContainer,
  MyFlatList,
  ProgressDialog
} from '../../common';
import styles from '../../HomeDetails/styles/HelpDesk.style';
import LeaveApi from '../Api/LeaveApi';

class LeaveApprovalList extends Component {
  state = {
    selectedIndex: 0,
    refreshing: false,
    loading: false,
    isLast: false,
    listData: [],
    dummyListData: [],
    showSearch: false,
    searchQuery: false,
    remarksDialogue:false,
    SupervisorRemarks:""
  };

  GetLeaveApproval = () => {
    const params = {};

    ProgressDialog.show();

    LeaveApi.GetLeaveApproval(
      params,
      res => {
        ProgressDialog.hide();

        if (res) {
          const Table = res.Table;
          if (Table) {
            if (Array.isArray(Table)) {
              this.setState({listData: [...Table]}, () =>
                console.log('this.state', this.state.listData),
              );
            } else {
              //console.log("table name name",Table.CustomerName)
              let results = [{...Table}];
              this.setState(
                {
                  listData: results,
                },
                () => console.log('this.state', this.state.listData),
              );
            }
          }
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };

  GetLeaveApproval = () => {
    const params = {};

    ProgressDialog.show();

    LeaveApi.GetLeaveApproval(
      params,
      res => {
        ProgressDialog.hide();

        if (res) {
          const Table = res.Table;
          if (Table) {
            if (Array.isArray(Table)) {
              this.setState({listData: [...Table]}, () =>
                console.log('this.state', this.state.listData),
              );
            } else {
              //console.log("table name name",Table.CustomerName)
              let results = [{...Table}];
              this.setState(
                {
                  listData: results,
                },
                () => console.log('this.state', this.state.listData),
              );
            }
          }
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };

  UpdateApprovalStatus = () => {
    const {StatusID,SupervisorRemarks,Remarks, ProgramRowID,UniqueID} = this.state
    const EmployeeID= store.getState().session.user.EmployeeID


    const params = {
      ApprovalUniqueID:UniqueID,
      SupervisorRemarks,
      StatusID,
      ProgramRowID,
      Remarks
    };
    console.log("params          ============================================>",params)



    ProgressDialog.show();

    LeaveApi.UpdateApprovalStatus(
      params,
      res => {
        ProgressDialog.hide();
        
        if (res) {
          const message = res.Massage
          if(message){
            alert(message)
            this.GetLeaveApproval();
          }
          console.log("ress =======================>",res)

        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };

  componentDidMount = () => {
     this.GetLeaveApproval();
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
    console.log('item =====================>', item);
    const oneDate = moment(item?.LeaveApplicationDate);
    const _date = this.splitDate(item?.LeaveApplicationDate);
    const dayName = oneDate?.format('dddd');
    console.log('dayName====', dayName);
    const {UniqueID, ProgramRowID,Remarks} = item;
    const {remarksDialogue} = this.state
    return (
      <View>
        <Text
          style={{
            fontSize: ResponsivePixels.size15,
            textAlign: 'left',
            alignSelf: 'stretch',
            marginLeft: ResponsivePixels.size20,
            marginTop: ResponsivePixels.size5,
            fontWeight: 'bold',
          }}>
          {`${_date} - ${dayName}`}
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
                    source={Images.ic_Person}
                    style={{
                      width: ResponsivePixels.size15,
                      height: ResponsivePixels.size15,
                    }}
                    resizeMode={'contain'}
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
                    Employee Code
                  </Text>
                  <Text
                    style={{
                      fontSize: ResponsivePixels.size15,
                      color: Colors.black,
                      fontWeight: 'bold',
                    }}>
                    {item?.EmployeeID}
                  </Text>
                </View>
              </View>
             


          <View style={{width:"100%",flexDirection:"row"}}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '50%',
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
                    {`${this.splitDate(item?.FromDate)} to ${this.splitDate(
                      item?.ToDate,
                    )} `}
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
                    source={Images.ic_Person}
                    style={{
                      width: ResponsivePixels.size15,
                      height: ResponsivePixels.size15,
                    }}
                    resizeMode={'contain'}
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
                    Employee Name
                  </Text>
                  <Text
                    style={{
                      fontSize: ResponsivePixels.size15,
                      color: Colors.black,
                      fontWeight: 'bold',
                    }}>
                    {item?.EmployeeName}
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
              position: 'absolute',
              top: 10,
              right: 0,
              borderTopLeftRadius: 100 / 2,
              borderBottomLeftRadius: 100 / 2,
              widht: ResponsivePixels.size400,
              backgroundColor: Colors.Red900,
              paddingLeft: ResponsivePixels.size20,
              paddingRight: ResponsivePixels.size20,
            }}>
            {item?.TotalDays} {item?.TotalDays < 2 ? 'Day' : 'Days'}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              padding: ResponsivePixels.size5,
              paddingRight: ResponsivePixels.size10,
              paddingLeft: ResponsivePixels.size10,
            }}>
            <Button
              labelStyle={{
                fontSize: ResponsivePixels.size18,
                color: Colors.Black,
                textAlign: 'center',
              }}
              textStyle={{
                color: Colors.Black,
              }}
              style={{
                alignItems: 'flex-start',
                width: '45%',
                height:"100%",
                backgroundColor: Colors.BlackColor100,
                marginRight: ResponsivePixels.size10,
              }}
              textColor={Colors.black}
              title="DisApprove"
              uppercase={false}
              onPress={() => {

                this.setState({
                  remarksDialogue:true,
                  StatusID:4,
                   ProgramRowID,
                  UniqueID,Remarks
                })
              
              }}></Button>

            <Button
              labelStyle={{
                fontSize: ResponsivePixels.size12,
                color: '#FFFFFF',
                textAlign: 'center',
              }}
              style={{
                alignItems: 'flex-start',
                width: '54%',
                height:"100%",
                borderEndColor: '#2262F7',
                backgroundColor: Colors.Red900,
              }}
              textColor={Colors.White}
              title="Approve"
              onPress={() => {

                this.setState({
                  remarksDialogue:true,
                  StatusID:3,
                   ProgramRowID,UniqueID,Remarks
                })
              
              }}>
              DisApprove"
            </Button>

            <Portal>
              <Dialog
                visible={remarksDialogue}
                onDismiss={() => {
                  this.setState({remarksDialogue: false});
                }}>
                <Dialog.Title>Add Remarks</Dialog.Title>
                <Dialog.Content>
                  <View style={{paddingVertical: 8}}>
                    <TextInput
                      label={'Enter Remarks'}
                      onChangeText={SupervisorRemarks => {
                        this.setState({SupervisorRemarks});
                      }}
                    />
                  </View>
                </Dialog.Content>
                <Dialog.Actions>
                  <DialogButton
                    color={Colors.blueGray600}
                    style={{}}
                    onPress={() => {this.setState({remarksDialogue: false})}}>
                    Cancel
                  </DialogButton>
                  <DialogButton
                    color={Colors.primaryColor500}
                    onPress={() => {
                      const {SupervisorRemarks} = this.state;
                      if (SupervisorRemarks) {
                        this.setState({remarksDialogue: false},()=>{
                           this.UpdateApprovalStatus()
                        })
                      }
                    }}>
                    Save
                  </DialogButton>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
        </Card>
      </View>
    );
  };

  render() {
    const {
      dummyListData,
      listData,
      refreshing,
      loading,
      loadMore,
      isLast,
      showSearch,
    } = this.state;

    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_Menu,
            onPress: () => {
              this.props.navigation.openDrawer();
            },
          },
          title: 'Leave Approval List',
          hideUnderLine: true,
          isHome: true,
          light: true,
        }}>
        <View style={styles.MainHeaderView}>
          <View style={styles.MainList}>
            <MyFlatList
              horizontal={false}
              scrollEnabled={true}
              data={
                listData || []
              }
              showsHorizontalScrollIndicator={false}
              renderItem={item => this.renderCell(item)}
              style={{flex: 1, margin: ResponsivePixels.size5}}
              loading={loading}
              refreshing={refreshing}
              onRefresh={() => {
                this.setState(
                  {
                    listData: [],
                    refreshing: false,
                  },
                  () => {
                    this.GetLeaveApproval();
                  },
                );
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
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LeaveApprovalList);
