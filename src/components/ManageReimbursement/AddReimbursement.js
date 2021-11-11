import React, {Component} from 'react';
import {View, ImageBackground, Modal, Image} from 'react-native';

import {connect} from 'react-redux';
import {strings} from '../../language/Language';
import {goBack, push} from '../../navigation/Navigator';
import {Images, Colors, Utils} from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import {
  Button,
  ChipViewContainer,
  CustomDatePicker,
  CustomPicker,
  FloatingEditText,
  MainContainer,
  ScrollContainer,
  ViewWithTitle,
  ImageButton,
  Checkbox,
  ProgressDialog,
  Clickable,
} from '../common';
import {RadioButton, Text,Card} from 'react-native-paper';
import styles from './styles/Reimbursement.style';

import PhotoPicker from '../common/PhotoPicker';
import MoreReimbursement from './MoreReimbursement';
import ReimbursementApi from './Api/ReimbursementApi';
class AddReimbursement extends Component {
  state = {
    loading: false,
    user: this.props.session.user,
    AssignUserRemarks: [],
    selectedAttachment: '',

    isVisibleAddMoreInfo: false,
    otherInformation: [],
    empList: [],
    rType:[],
    ReimbursementDate:new Date(),
    rId:0,
    toDate:undefined,
    fromDate:undefined,
  };

 
  onTextChanged = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleMoreInformation = isMoreInformation => {
    this.setState({
      isVisibleAddMoreInfo: isMoreInformation,
    });
  };

componentDidMount() {
  this.setState(
    {
      fromDate: new Date(),
      toDate: new Date(),
    },
    () => {
      this.getEmplyeesUserHierarchy();
      this.getExpenseHeads();
      // this.GetReimbursementTypes();
      this.GetReimbursementTypes();
    },
  );
}



  getEmplyeesUserHierarchy = () => {
    const params = {};

    ProgressDialog.show();
    ReimbursementApi.getEmplyeesUserHierarchy(
      params,
      res => {
        ProgressDialog.hide();
        if (res) {
          const Table = res.Table;
          if (Table) {
            let list = [];
            if (Array.isArray(Table)) {
              for (let index = 0; index < Table.length; index++) {
                const emp = Table[index];
                let objData = {
                  id: emp.ID,
                  name: emp.EmployeeName,
                };
                list.push(objData);
              }
            } else {
              let objData = {
                id: Table.ID,
                name: Table.EmployeeName,
              };
              list.push(objData);
            }
            this.setState({empList: list}, () => this.getBasicUserProfile());
          }
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };



  GetReimbursementTypes = () => {
    const params = {};

    ProgressDialog.show();
    ReimbursementApi.GetReimbursementTypes(
      params,
      res => {
        ProgressDialog.hide();
        if (res) {
          const Table = res.Table;
          if (Table) {
            let list = [];
            if (Array.isArray(Table)) {
              for (let index = 0; index < Table.length; index++) {
                const rType = Table[index];
                let objData = {
                  id: rType.ID,
                  name: rType.Name,
                };
                list.push(objData);
              }
            } else {
              let objData = {
                id: Table.ID,
                name: Table.Name,
              };
              list.push(objData);
            }
             this.setState({rType: list});
          }
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };

  
  getBasicUserProfile = () => {
    const params = {};

    ProgressDialog.show();
    ReimbursementApi.getBasicUserProfile(
      params,
      res => {
        ProgressDialog.hide();
        if (res) {
          const {Table} = res;

          if (Table) {
            this.setState(
              {
                EmployeeID: Table.Id,
                employeeName: Table.Name,
                contactNo: Table.MobileNo1,
              },
              () => {
                this.getSupervisor();
                this.getProjectsByEmployeeIDForDailyAttendance();
              },
            );
          }
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };

  


  getExpenseHeads = () => {
    const params = {};

    ProgressDialog.show();
    ReimbursementApi.getExpenseHeads(
      params,
      res => {
        ProgressDialog.hide();
        if (res) {
          const Table = res.Table;
          if (Table) {
            let list = [];
            if (Array.isArray(Table)) {
              for (let index = 0; index < Table.length; index++) {
                const head = Table[index];
                let objData = {
                  id: head.ID,
                  name: head.HeadName,
                };
                list.push(objData);
              }
            } else {
              let objData = {
                id: Table.ID,
                name: Table.HeadName,
              };
              list.push(objData);
            }
          
            this.setState({headList: list
            });
          }
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };

  getSupervisor = () => {
    const EmpId = this.state.EmployeeID;

    const params = {
      EmpId,
    };

    ProgressDialog.show();
    ReimbursementApi.getSupervisor(
      params,
      res => {
        ProgressDialog.hide();
        if (res) {
          const {Table} = res;

          if (Table) {
            this.setState({
              supervisor: Table.EmployeeName,
              supervisorId: Table.EmpID,
            });
          }
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };

  getProjectsByEmployeeIDForDailyAttendance = () => {
    const {EmployeeID} = this.state
  
  
      const params = {
        empID:EmployeeID,
        AttDate:""
      };
  
      ProgressDialog.show();
      ReimbursementApi.getProjectsByEmployeeIDForDailyAttendance(
        params,
        res => {
          ProgressDialog.hide();
          if (res) {
            const Table = res.Table;
            if (Table) {
              let list = [];
              if (Array.isArray(Table)) {
                for (let index = 0; index < Table.length; index++) {
                  const prj = Table[index];
                  let objData = {
                    id: prj.ID,
                    name: prj.ProjectName,
                  };
                  list.push(objData);
                }
              } else {
                let objData = {
                  id: Table.ID,
                  name: Table.ProjectName,
                };
                list.push(objData);
              }
            
              this.setState({projectList: list
              });
            }
          }
        },
        () => {
          ProgressDialog.hide();
        },
      );
    };

    getMoreInformation=(objInfo)=>{
      let _otherInformation = this.state.otherInformation
      let _objInfo = objInfo
      _objInfo.RowStateID=2
      _otherInformation.push(_objInfo)


      console.log("_objInfo_objInfo_objInfo_objInfo",_objInfo)
      this.setState({
        otherInformation:_otherInformation,
        isVisibleAddMoreInfo:false
      })
    }


    handleSubmit=()=>{
      const {otherInformation,rId,remarks,ReimbursementDate,fromDate,toDate,EmployeeID} = this.state

      const _ReimbursementDate = Utils.formatDate(ReimbursementDate, 'DD-MM-yyyy');
      const _fromDate = Utils.formatDate(fromDate, 'DD-MM-yyyy');
      const _toDate = Utils.formatDate(toDate, 'DD-MM-yyyy');



      let _otherInformation = []
      // JSON.stringify(otherInf)

      for (let index = 0; index < otherInformation.length; index++) {
        const otherInfo = otherInformation[index];

        
        let objOther = {
          ExpenseHeadID:otherInfo.ExpenseHeadID,
          Amount:otherInfo.Amount,
          ProjectID:otherInfo.projectId,
          FileName:otherInfo.FileName,
          FilePath:otherInfo.FilePath,
          FileContent:otherInfo.fileType,
          RowStateID:otherInfo.RowStateID,
        }
        _otherInformation.push(objOther)
        
      }
      _otherInformation= JSON.stringify(_otherInformation)
      if (rId == 0) {
        Utils.showToast('Please select reimbursment type.');
      } else if (!remarks) {
        Utils.showToast('please enter reason.');
      }else if (otherInformation.length==0) {
        Utils.showToast('please add atleast 1 reimbursment details.');
      } else {

        let params = {
          reimbursementDate:_ReimbursementDate,
          reimbursementTypeID:rId,
          employeeID:EmployeeID,
          remarks:remarks,
          fromDate:_fromDate,
          toDate:_toDate,
          reimbursementSubDetails:_otherInformation
        }
          console.log("params",params)

          ProgressDialog.show();
          ReimbursementApi.InsertReimbursement(
            params,
            res => {
              if (res) {
              ProgressDialog.hide();

                  console.log('===========> getLeaveBalanceByDate ===========>', "res");
                  Utils.showToast('Reimbursement request submitted successfully');
            goBack()
              }
            },
            (error) => {
              ProgressDialog.hide();
               alert(error)
              //Utils.showToast('Reimbursement request submitted successfully');
              // reset('LeaveList');
              // goBack()
            },
          );

      }

    }

  render() {
    const {
      employeeName,
      ApplicationDate,
      circleId,
      projectId,
      carDetails,
      carNumber,
      riggerName,
      receivedKM,
      attendanceTypeId,
      selectedAttachment,

      isVisibleAddMoreInfo,
      otherInformation,
      empList,
      EmployeeID,
      supervisor,
      ReimbursementDate,
      rId,
      rType,
      remarks,
      toDate,fromDate,
      headList,
      projectList,
    } = this.state;
    return (
      <>
        {!isVisibleAddMoreInfo ? (
          <MainContainer
            header={{
              left: {
                image: Images.ic_BackWhite,
                onPress: () => goBack(),
              },
              title: 'Apply For Reimbursement',
              hideUnderLine: true,
              light: true,
            }}>
            <ScrollContainer>
              <View>
                <ViewWithTitle title="General Details">
                <CustomPicker
                list={empList || []}
                selectedItem={{id: EmployeeID}}
                label={'Employee Name'}
                onSelect={item => {
                  this.setState(
                    {
                      EmployeeID: item.id,
                      employeeName: item.name,
                    },
                    () => {
                      this.getSupervisor();
                      this.getProjectsByEmployeeIDForDailyAttendance();
                      
                    },
                  );
                }}
              />

              <FloatingEditText
                value={supervisor}
                onChangeText={text => onTextChanged('supervisor', text)}
                label={'Approver'}
                editable="false"
              />

              <CustomDatePicker
                selectedDate={ReimbursementDate || new Date()}
                minimumDate={ReimbursementDate || new Date()}
                label={'Application Date'}
                containerStyle={{flex: 1}}
                disabled={true}
                rightIcon={Images.ic_Calendar}
              />
                
                  <CustomPicker
                    list={rType||[]}
                    selectedItem={{id: rId}}
                    label={'Reimbursement Type'}
                    onSelect={item => this.onTextChanged('rId', item.id)}
                  />

                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <CustomDatePicker
                      selectedDate={fromDate || new Date()}
                      // minimumDate={ new Date()}
                      onDateChanged={date => {
                        this.onTextChanged('fromDate', date);
                      }}
                      label={'From Date'}
                      containerStyle={{flex: 1, width: '50%',marginRight:ResponsivePixels.size20}}
                      editable={false}
                      rightIcon={Images.ic_Calendar}

                    />
                    
                    <CustomDatePicker
                      selectedDate={toDate || new Date()}
                      minimumDate={fromDate || new Date()}
                      onDateChanged={date => {
                        this.onTextChanged('toDate', date);
                      }}
                      label={'To Date'}
                      containerStyle={{flex: 1, width: '50%'}}
                      editable={false}
                      rightIcon={Images.ic_Calendar}

                    />
                  </View>
                  <FloatingEditText
                    value={remarks}
                    onChangeText={text => this.onTextChanged('remarks', text)}
                    label="Reason"
                    multiline={true}
                  />
                </ViewWithTitle>

                <ViewWithTitle title="Reimbursement Details">
                  <View style={{flex: 1,  marginTop: ResponsivePixels.size10}}>
                    {otherInformation.length != 0 &&
                      otherInformation.map((item, index) => {
                        console.log('item ==>', item);

                        const {
                          ProjectID,
                          ExpenseHeadID,
                          Amount,
                          FileName,
                          FilePath,
                          headName,
                          projectName
                        } = item


                      
                        
            
                        return (
                          <Card
                            style={{
                              margin: ResponsivePixels.size5,
                              padding: ResponsivePixels.size15,
                            }}
                            key={index}>
                            <View>
                            
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
                    Expense Head
                  </Text>
                  <Text
                    style={{
                      fontSize: ResponsivePixels.size15,
                      color: Colors.black,
                      fontWeight: 'bold',
                    }}>
                      {headName}
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
                    source={Images.ic_attachment}
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
                    Attachment
                  </Text>
                  <Text
                    style={{
                      fontSize: ResponsivePixels.size15,
                      color: Colors.black,
                      fontWeight: 'bold',
                    }}>
                      {FileName}
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
                    source={Images.ic_money}
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
                    Amount
                  </Text>
                  <Text
                    style={{
                      fontSize: ResponsivePixels.size15,
                      color: Colors.black,
                      fontWeight: 'bold',
                    }}>
                  {Amount}
                  </Text>
                </View>
              </View>


                              <View
                                style={{
                                  position: 'absolute',
                                  right: -2,
                                  bottom: 5,
                                  flexDirection: 'row',
                                  flex: 2,
                                  width: ResponsivePixels.size60,
                                  backgroundColor: 'transparent',
                                }}>
                             
<Clickable     onPress={() => {
                                    let otherInformation =
                                      this.state.otherInformation;
                                    var index = otherInformation.findIndex(
                                      function (o) {
                                        return o.FileName === item.FileName;
                                      },
                                    );
                                    if (index !== -1)
                                      otherInformation.splice(index, 1);

                                    this.setState({
                                      otherInformation: otherInformation,
                                    });
                                  }}>



                             <View
                  style={{
                    width: ResponsivePixels.size10,
                    height: ResponsivePixels.size10,
                    borderRadius: 100 / 2,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    padding:ResponsivePixels.size20,
                    backgroundColor: Colors.Red900,
                  }}>
                  <Image
                    source={Images.ic_close}
                    style={{
                      width: ResponsivePixels.size12,
                      height: ResponsivePixels.size12,
                      tintColor:Colors.white
                    }}
                    resizeMode={'cover'}
                  />
                </View>
                </Clickable>

                                {/* <ImageButton
                                  source={Images.ic_close}
                                  imageStyle={{
                                    width: ResponsivePixels.size15,
                                    height: ResponsivePixels.size15,
                                    flex: 1,
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                  }}
                                  onPress={() => {
                                    let otherInformation =
                                      this.state.otherInformation;
                                    var index = otherInformation.findIndex(
                                      function (o) {
                                        return o._ID === item._ID;
                                      },
                                    );
                                    if (index !== -1)
                                      otherInformation.splice(index, 1);

                                    this.setState({
                                      otherInformation: otherInformation,
                                    });
                                  }}
                                /> */}
                              </View>
                            </View>
                          </Card>
                        );
                      })}
                  </View>

                  <Button
                    title="ADD REIMBURSEMENT DETAILS +"
                    style={{margin: ResponsivePixels.size16}}
                    onPress={() => {
                      this.handleMoreInformation(true);
                    }}
                  />
                </ViewWithTitle>

                <Button
                  title={strings.submit}
                  style={{margin: ResponsivePixels.size16}}
                  onPress={() => {
                    this.handleSubmit()
                  }}
                />
              </View>
            </ScrollContainer>
          </MainContainer>
        ) : (
          <MoreReimbursement
          headList={headList}
          projectList={projectList}
          EmployeeID={EmployeeID}
          getMoreInformation={(objinfo)=>{this.getMoreInformation(objinfo)}}
            handleMoreInformation={isVisible => {
              this.handleMoreInformation(isVisible);
            }}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddReimbursement);
