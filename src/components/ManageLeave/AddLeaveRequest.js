import moment from 'moment';
import React, { Component } from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { store } from '../../App';
import { strings } from '../../language/Language';
import { goBack } from '../../navigation/Navigator';
import { Colors, Images, Utils } from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import {
  Button, Checkbox, Clickable, CustomDatePicker,
  CustomPicker,
  FloatingEditText,
  MainContainer, ProgressDialog, ScrollContainer,
  ViewWithTitle
} from '../common';
import PhotoPicker from '../common/PhotoPicker';
import LeaveApi from './Api/LeaveApi';
import styles from './styles/Leave.style';



class AddLeaveRequest extends Component {
  state = {
    fromDate: new Date(),
    toDate: undefined,
    EmployeeID: 0,
    supervisor: undefined,
    
    employeeName: '',
    contactNo: '',
    leaveList: [],
    leaveTypeId: 0,
    fromDateIsCheck: false,
    toDateIsCheck: false,
    isAllDayCheck: false,
    balance: 0,
    totalDays: 0,
    ReportingManagerId: 0,
    attachment: '',
    remarks: '',
  };

  componentDidMount() {
    this.setState(
      {
        fromDate: new Date(),
      },
      () => {
        this.getEmplyeesUserHierarchy();
        // this.getLeaveBalanceByDate();
      },
    );
  }

  getBasicUserProfile = () => {
    const params = {};

    ProgressDialog.show();
    LeaveApi.getBasicUserProfile(
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
                this.getLeaveType();
                this.getSupervisor();
              },
            );
          }

          console.log('===========> getBasicUserProfile ===========>', Table);
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };

  getEmplyeesUserHierarchy = () => {
    const params = {};

    ProgressDialog.show();
    LeaveApi.getEmplyeesUserHierarchy(
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
            this.setState({empList: list}, () => {
              this.getBasicUserProfile()
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
    LeaveApi.getSupervisor(
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

  getLeaveType = () => {
    const EmployeeID = this.state.EmployeeID;

    const params = {
      EmployeeID,
    };

    ProgressDialog.show();
    LeaveApi.getLeaveType(
      params,
      res => {
        ProgressDialog.hide();
        if (res) {
          const Table = res.Table;
          if (Table) {
            let list = [];
            if (Array.isArray(Table)) {
              for (let index = 0; index < Table.length; index++) {
                const leaveType = Table[index];
                let objData = {
                  id: leaveType.ID,
                  name: leaveType.LeaveName,
                };
                list.push(objData);
              }
            } else {
              let objData = {
                id: Table.ID,
                name: Table.LeaveName,
              };
              list.push(objData);
            }
            this.setState({leaveTypeList: list}, () =>
              console.log('this.state', this.state.leaveTypeList),
            );
          }
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };

  getLeaveBalance = () => {
    // const EmployeeID = store.getState().session.user.EmployeeID;
    const {fromDate, leaveTypeId, EmployeeID} = this.state;
    const _date = Utils.formatDate(fromDate, 'DD/MMM/YYYY');

    const params = {
      EmployeeId: EmployeeID,
      Fromdate: _date,
      LeaveTypeID: leaveTypeId,
    };

    LeaveApi.getLeaveBalance(
      params,
      res => {
        if (res) {
          console.log('res        =========             ========    ', res);
          this.setState(
            {
              balance: res.Balance.toString(),
            },
            () => {
              console.log(
                'get leave balance ===============><=====================',
                this.state.balance,
              );
            },
          );
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };

  getLeaveBalanceByDate = () => {
    // const EmployeeID = store.getState().session.user.EmployeeID;
    const {fromDate, toDate, EmployeeID} = this.state;

    const _fromDate = Utils.formatDate(fromDate, 'DD-MMM-YYYY');
    const _toDate = Utils.formatDate(toDate, 'DD-MMM-YYYY');
    // const _toDate = Utils.formatDate(toDate, 'MM/DD/YYYY');

    const params = {
      EmployeeID: EmployeeID,
      FromDate: _fromDate,
      ToDate: _toDate,
    };

    LeaveApi.getLeaveDaysByDate(
      params,
      res => {
        if (res) {
          const Table = res.Table;
          if (Table) {
            this.setState({
              totalDays: Table.TotalDays,
            });
          }
          console.log('===========> getLeaveBalanceByDate ===========>', res);
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };



  onTextChanged = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleSubmit = () => {
    const UserType = store.getState().session.user.UserType;

    const {
      EmployeeID,
      supervisorId,
      fromDate,
      toDate,
      totalDays,
      remarks,
      fromDateIsCheck,
      toDateIsCheck,
      isAllDayCheck,
      leaveTypeId,
      contactNo,
      StateID,
      employeeName,
      attachment,
      supervisor,
      balance
      
    } = this.state;

    const _fromDate = Utils.formatDate(fromDate, 'yyyy-MM-DD');
    const _toDate = Utils.formatDate(toDate, 'yyyy-MM-DD');

    const isSameDate = _fromDate==_toDate
    const DocumentName = attachment?.fileName;
    // const DocumentContentType= attachment.type
    const DocumentContent = attachment?.base64;
    console.log('attachment type', attachment.type);

    // let blob =  this.base64ToBlob(DocumentContent);
    // console.log('btoB64 resp === ', blob);
    console.log("_fromDate ===================>",isSameDate && fromDateIsCheck && toDateIsCheck)
    if (EmployeeID == 0) {
      Utils.showToast('Please enter employee name.');
    } 
    else if (!supervisor) {
      Utils.showToast('No supervisor found.');
    } 
    else if (leaveTypeId == 0) {
      Utils.showToast('Please select leave type.');
    }  else if (!fromDate || !toDate) {
      Utils.showToast('Please enter duration (Start and End Date).');
    }else if (balance==0) {
      Utils.showToast('Leave balance is not available.');
    }else if (totalDays==0) {
      Utils.showToast('Total Days count is not valid.');
    } else if (!contactNo) {
      Utils.showToast('Please enter contact number.');
    } else if (!remarks) {
      Utils.showToast('Please enter remarks.');
    }else if(isSameDate && fromDateIsCheck && toDateIsCheck){
      Utils.showToast('You can not select both half day for same date');
      this.setState({
        fromDateIsCheck:false,
        totalDays:totalDays+0.5
      })
    }else if(leaveTypeId==2  && totalDays>2 && !attachment){
      Utils.showToast('Please upload the document.');
    }else {
      let params = {
        EmployeeID: EmployeeID,
        ReportingManagerId: supervisorId,
        FromDate: _fromDate,
        ToDate: _toDate,
        TotalDays: totalDays,
        Remarks: remarks,
        FromHalfDay: fromDateIsCheck,
        ToHalfDay: toDateIsCheck,
        IsAllHalfDay: isAllDayCheck,
        LeaveRequestTypeID: leaveTypeId,
        DocumentName: 'LeaveDoc',
        DocumentContentType: attachment.fileName,
        DocumentContent: DocumentContent || '',
        PhoneNumDuringLeave: contactNo,
        StateID: UserType === 'A' ? 3 : 2,
        EmployeeName: employeeName,
      };

      ProgressDialog.show();
      LeaveApi.AddLeaveRequest(
        params,
        jsonResponse => {
          // console.log("res Insert leave for  ===============================>",jsonResponse.InsertLeaveApplicationResponse);
          console.log('\n JSONResponse', jsonResponse);
          const isSucceed = jsonResponse.IsSucceed;
          if (isSucceed) {
            Utils.showToast('Leave request submitted successfully');
            // reset('LeaveList');
            goBack()

          } else {
            const message = jsonResponse.Massage;
            const ErrorMessage = jsonResponse.ErrorMessage;
            if(message){
                alert(message);
            }else if(ErrorMessage){
              alert(ErrorMessage);
            }else{
              alert("Somthing went wrong.");
            }
          }
          ProgressDialog.hide();
        },
        () => {
          ProgressDialog.hide();
        },
      );
    }
  };

  base64ToBlob = async encoded => {
    let url = `data:image/jpg;base64,${encoded}`;
    let res = await fetch(url);
    let blob = await res?.blob();
    return blob;
  };

  render() {
    const {
      employeeName,
      contactNo,
      supervisor,
      applicationDate,
      leaveTypeList,
      leaveTypeId,
      fromDate,
      toDate,
      fromDateIsCheck,
      toDateIsCheck,
      isAllDayCheck,
      balance,
      remarks,
      selectedAttachment,
      totalDays,
      empList,
      EmployeeID,
    } = this.state;

    console.log('balance ===>>>>', balance);
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => goBack(),
          },
          title: 'New Leave',
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
                      this.getLeaveType();
                    },
                  );
                }}
              />

              <FloatingEditText
                value={supervisor}
                onChangeText={text => onTextChanged('supervisor', text)}
                label={'Supervisor'}
                editable="false"
              />

              <CustomDatePicker
                selectedDate={applicationDate || new Date()}
                minimumDate={applicationDate || new Date()}
                label={'Application Date'}
                containerStyle={{flex: 1}}
                disabled={true}
                rightIcon={Images.ic_Calendar}
              />

              <CustomPicker
                list={leaveTypeList || []}
                selectedItem={{id: leaveTypeId}}
                label={'Leave Type'}
                onSelect={item => {
                  this.setState(
                    {
                      leaveTypeId: item.id,
                    },
                    () => {
                      this.getLeaveBalance();
                    },
                  );
                }}
              />
            </ViewWithTitle>

            <ViewWithTitle title="Time Period">
              <View style={{flexDirection: 'row', width: '100%'}}>
                <CustomDatePicker
                  selectedDate={
                    fromDate ? moment(fromDate).toDate() : undefined
                  }
                  onDateChanged={date => {


                    this.setState(
                      {
                        fromDate: date,
                        toDate:undefined,
                        fromDateIsCheck:false,
                        toDateIsCheck:false,
                        isAllDayCheck:false,
                        totalDays:0
                      },
                      () => {
                        console.log('fromDate===>', this.state.fromDate);
                      },
                    );
                  }}
                  label={'From Date'}
                  containerStyle={{flex: 1, width: '50%'}}
                  editable={false}
                  rightIcon={Images.ic_Calendar}
                />

                <Checkbox
                  label="isHalfDay"
                  color={Colors.Red900}
                  style={{width: '50%', marginTop: ResponsivePixels.size20}}
                  checked={fromDateIsCheck}
                  onPress={() => {
                   

                    let _totalDays = this.state.totalDays

                    if(fromDateIsCheck){
                      _totalDays = _totalDays+0.5
                    }else{
                      _totalDays = _totalDays-0.5
                    }
                    this.setState({
                      totalDays:_totalDays
                    },()=>{
                      this.onTextChanged('fromDateIsCheck', !fromDateIsCheck);
                      this.onTextChanged('isAllDayCheck', false);
                    })

                  }}
                />
              </View>

              <View
                style={{flexDirection: 'row', width: '100%', flexWrap: 'wrap'}}>
                <CustomDatePicker
                  selectedDate={toDate}
                  minimumDate={fromDate}
                  onDateChanged={date => {


                    this.setState(
                      {
                        toDate: date,
                        fromDateIsCheck:false,
                        toDateIsCheck:false,
                        isAllDayCheck:false,
                        totalDays:0
                      },
                      () => {
                        console.log('toDate===>', this.state.toDate);
                        this.getLeaveBalanceByDate();
                      },
                    );
                  }}
                  label={'To Date'}
                  containerStyle={{flex: 1, width: '50%'}}
                  editable={false}
                  rightIcon={Images.ic_Calendar}
                />
                <Checkbox
                  label="isHalfDay"
                  color={Colors.Red900}
                  style={{width: '50%', marginTop: ResponsivePixels.size20}}
                  checked={toDateIsCheck}
                  onPress={() => {

                    let _totalDays = this.state.totalDays

                    if(toDateIsCheck){
                      _totalDays = _totalDays+0.5
                    }else{
                      _totalDays = _totalDays-0.5
                    }
                    this.setState({
                      totalDays:_totalDays
                    },()=>{
                      this.onTextChanged('toDateIsCheck', !toDateIsCheck);
                      this.onTextChanged('isAllDayCheck', false);
                    })

               
                  }}
                />
              </View>

              <Checkbox
                label="IsAllHalfDay"
                color={Colors.Red900}
                checked={isAllDayCheck}
                onPress={() => {
                  

                  let _totalDays = this.state.totalDays

                  if(toDateIsCheck){
                    _totalDays=_totalDays+0.5
                  }
                  if(fromDateIsCheck){
                    _totalDays=_totalDays+0.5
                  }


                  if(isAllDayCheck){
                    _totalDays = _totalDays*2
                  }else{
                    _totalDays = _totalDays/2
                  }
                  this.setState({
                    totalDays:_totalDays
                  },()=>{
                    this.onTextChanged('fromDateIsCheck', false);
                  this.onTextChanged('toDateIsCheck', false);
                  this.onTextChanged('isAllDayCheck', !isAllDayCheck);
                  })

                  // this.getLeaveBalanceByDate();
                }}
              />

              <View style={{width: '100%', flexDirection: 'row'}}>
                <FloatingEditText
                  value={balance.toString()}
                  label={'Leave Balance'}
                  editable={false}
                  style={{width: '50%', marginRight: ResponsivePixels.size10}}
                />

                <FloatingEditText
                  value={totalDays.toString()}
                  onChangeText={text => onTextChanged('carDetails', text)}
                  label={'Total Days'}
                  editable={false}
                  style={{width: '50%'}}
                />
              </View>
            </ViewWithTitle>

            <ViewWithTitle title="Personal Details">
              <FloatingEditText
                value={contactNo.toString()}
                onChangeText={text => this.onTextChanged('contactNo', text)}
                label="Contact No"
              />

              <FloatingEditText
                value={remarks}
                onChangeText={text => this.onTextChanged('remarks', text)}
                label="Remarks"
                multiline={true}
              />

              <View
                style={{backgroundColor: Colors.white, paddingHorizontal: 16}}>
                <View>
                  <Clickable
                    onPress={() => {
                      PhotoPicker({
                        onFileSelect: res => {
                          this.setState(
                            {
                              attachment: res,
                              selectedAttachment: res.source,
                              visibleDialog: false,
                            },
                            () => {
                              console.log(
                                'selectedAttachment0',
                                this.state.selectedAttachment,
                              );
                            },
                          );
                        },
                        noImage: false,
                      });
                    }}
                    style={{
                      height: ResponsivePixels.size200,
                      marginTop: ResponsivePixels.size20,
                    }}>
                    <ImageBackground
                      imageStyle={{borderRadius: ResponsivePixels.size16}}
                      source={selectedAttachment}
                      style={styles.uploadView}>
                      {!selectedAttachment ? (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image source={Images.ic_upload} />
                          <Text style={styles.uploadText}>Upload here</Text>
                        </View>
                      ) : null}
                    </ImageBackground>
                  </Clickable>
                </View>
              </View>
            </ViewWithTitle>

            <Button
              title={strings.applyForLeave}
              style={{margin: ResponsivePixels.size16}}
              onPress={() => {
                this.handleSubmit();
              }}
            />
          </View>
        </ScrollContainer>
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddLeaveRequest);
