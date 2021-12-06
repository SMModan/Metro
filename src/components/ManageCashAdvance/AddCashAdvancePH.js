import React, { Component } from 'react';
import { BackHandler, Image, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { strings } from '../../language/Language';
import { replace } from '../../navigation/Navigator';
import { Colors, Images, Utils } from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import {
  Button, Clickable, CustomDatePicker,
  CustomPicker,
  FloatingEditText,
  MainContainer, ProgressDialog, ScrollContainer,
  ViewWithTitle
} from '../common';
import CashAdvanceApi from './Api/CashAdvanceApi';
import MoreCashAdvance from './MoreCashAdvance';



class AddCashAdvancePH extends Component {
  state = {
    loading: false,
    user: this.props.session.user,
    empList: [],
    EmployeeID: 0,
    cashAdvanceDate: undefined,
    supervisor: '',
    supervisorId: 0,
    projectList: [],
    headList: [],
    headId: '',
    remainingCredit: '0',
    adhocAmount: '0',
    projectId: '',
    amount: '',
    reason: '',
    useAdHocAmount: false,
    isVisibleAdvanceDetail: false,
    otherInformation: [],
  };

  componentDidMount() {
    this.setState(
      {
        cashAdvanceDate: new Date(),
      },
      () => {
        this.getEmplyeesUserHierarchy();
        this.getExpenseHeads();
      },
    );
  }

  handleMoreInformation = isVisibleAdvanceDetail => {
    this.setState({
      isVisibleAdvanceDetail,
    });
  };

  getMoreInformation = objInfo => {
    let _otherInformation = this.state.otherInformation;
    let _objInfo = objInfo;
    _objInfo.RowStateID = 2;
    _otherInformation.push(_objInfo);

    console.log('_objInfo_objInfo_objInfo_objInfo', _objInfo);
    this.setState({
      otherInformation: _otherInformation,
      isVisibleAdvanceDetail: false,
    });
  };

  getBasicUserProfile = () => {
    const params = {};

    ProgressDialog.show();
    CashAdvanceApi.getBasicUserProfile(
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
                this.getCirclewiseCreditLimitAndRemainingAmountForCashAdvance();
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

  getCirclewiseCreditLimitAndRemainingAmountForCashAdvance = () => {
    const {EmployeeID, cashAdvanceDate} = this.state;
    const _date = Utils.formatDate(cashAdvanceDate, 'MM/DD/YYYY');

    const params = {
      employeeID: EmployeeID,
      cashAdvanceDate: _date,
    };

    ProgressDialog.show();
    CashAdvanceApi.getCirclewiseCreditLimitAndRemainingAmountForCashAdvance(
      params,
      res => {
        ProgressDialog.hide();
        if (res) {
          const table = res.Table;
          console.log('tabletabletabletabletable', table);

          if (table) {
            this.setState({
              remainingCredit: table.RemainingCredit
                ? table.RemainingCredit.toString()
                : '0',
              adhocAmount: table.AdhocAmount
                ? table.AdhocAmount.toString()
                : '0',
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
    const {EmployeeID, cashAdvanceDate} = this.state;

    const params = {
      empID: EmployeeID,
      AttDate: '',
    };

    ProgressDialog.show();
    CashAdvanceApi.getProjectsByEmployeeIDForDailyAttendance(
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

            this.setState({projectList: list});
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
    CashAdvanceApi.getExpenseHeads(
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

            this.setState({headList: list});
          }
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
    CashAdvanceApi.getEmplyeesUserHierarchy(
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

  getSupervisor = () => {
    const EmpId = this.state.EmployeeID;

    const params = {
      EmpId,
    };

    ProgressDialog.show();
    CashAdvanceApi.getSupervisor(
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

  onTextChanged = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleSubmit = () => {
    const {
      EmployeeID,
      cashAdvanceDate,
      supervisorId,
      headId,
      projectId,
      amount,
      reason,
      remainingCredit,
      useAdHocAmount,
      adhocAmount,
      otherInformation,
    } = this.state;

    const _cashAdvanceDate = Utils.formatDate(cashAdvanceDate, 'DD-MM-yyyy');
    console.log('otherInformationotherInformation', otherInformation);

    if (!reason) {
      Utils.showToast('please enter reason.');
    } else if (otherInformation.length == 0) {
      Utils.showToast('please add atleast 1 information.');
    } else {
      let _otherInformation = [];

      for (let index = 0; index < otherInformation.length; index++) {
        const info = otherInformation[index];
        const {ExpenseHeadID, Amount, ProjectID, Remarks} = info;
        let obj = {
          ExpenseHeadID: ExpenseHeadID,
          Amount: Amount,
          ProjectID: ProjectID,
          Remarks: Remarks,
        };
        _otherInformation.push(obj);
      }
      let stringifyOtherInformation = JSON.stringify(_otherInformation);

      let params = {
        cashAdvanceDate: _cashAdvanceDate,
        employeeID: EmployeeID,
        adhocAmount: 0.0,
        isAdhocApply: false,
        remarks: reason,
        remainingAmount: remainingCredit,
        cashAdvanceSubDetails: stringifyOtherInformation,
      };

      console.log('paramsparamsparamsparams', params);
      ProgressDialog.show();
      CashAdvanceApi.insertCashAdvance(
        params,
        res => {
          ProgressDialog.hide();
          if (res) {

            const FriendlyMessage = res.FriendlyMessage
            if(FriendlyMessage){
              alert(FriendlyMessage);
            }else{
              Utils.showToast('Cash advance request submitted successfully');
            }
            replace('CashAdvanceList');
          }
        },
        error => {
          alert(error);
          // Utils.showToast('Cash advance request submitted successfully');
          ProgressDialog.hide();
        },
      );
    }
  };

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    replace('CashAdvanceList');
    return true;
  }

  render() {
    const {
      supervisor,
      empList,
      EmployeeID,
      cashAdvanceDate,
      projectId,
      projectList,
      headList,
      headId,
      remainingCredit,
      amount,
      reason,
      adhocAmount,
      useAdHocAmount,
      isVisibleAdvanceDetail,
      otherInformation,
    } = this.state;

    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => replace('CashAdvanceList'),
          },
          title: 'Add Cash Advance',
          hideUnderLine: true,
          light: true,
        }}>
        <ScrollContainer>
          {!isVisibleAdvanceDetail ? (
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
                        this.getCirclewiseCreditLimitAndRemainingAmountForCashAdvance();
                      },
                    );
                  }}
                />

                <FloatingEditText
                  value={supervisor}
                  onChangeText={text => onTextChanged('employeeName', text)}
                  label={'Approver'}
                  editable="false"
                />

                <CustomDatePicker
                  selectedDate={cashAdvanceDate || new Date()}
                  minimumDate={cashAdvanceDate || new Date()}
                  onDateChanged={date => {
                    onTextChanged('cashAdvanceDate', date);
                  }}
                  label={'Cash Advance Date'}
                  containerStyle={{flex: 1}}
                  editable={false}
                  disabled={true}
                  rightIcon={Images.ic_Calendar}
                />

                <FloatingEditText
                  value={remainingCredit}
                  label={'Remaining Amount'}
                  editable={false}
                />
                <FloatingEditText
                  value={reason}
                  onChangeText={text => this.onTextChanged('reason', text)}
                  label="Reason"
                  multiline={true}
                />
              </ViewWithTitle>

              <ViewWithTitle title="More Details">
                <View style={{flex: 1, marginTop: ResponsivePixels.size10}}>
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
                        ProjectName,
                      } = item;

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
                                  Project Name
                                </Text>
                                <Text
                                  style={{
                                    fontSize: ResponsivePixels.size15,
                                    color: Colors.black,
                                    fontWeight: 'bold',
                                  }}>
                                  {ProjectName}
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
                              <Clickable
                                onPress={() => {
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
                                    padding: ResponsivePixels.size20,
                                    backgroundColor: Colors.Red900,
                                  }}>
                                  <Image
                                    source={Images.ic_close}
                                    style={{
                                      width: ResponsivePixels.size12,
                                      height: ResponsivePixels.size12,
                                      tintColor: Colors.white,
                                    }}
                                    resizeMode={'cover'}
                                  />
                                </View>
                              </Clickable>
                            </View>
                          </View>
                        </Card>
                      );
                    })}
                </View>

                <Button
                  title="ADD CASH ADVANCE DETAILS +"
                  style={{
                    margin: ResponsivePixels.size16,
                    marginTop: ResponsivePixels.size25,
                  }}
                  onPress={() => {
                    this.setState({
                      isVisibleAdvanceDetail: true,
                    });
                  }}
                />
              </ViewWithTitle>

              <Button
                title={strings.submit}
                style={{margin: ResponsivePixels.size16}}
                onPress={() => {
                  this.handleSubmit();
                }}
              />
            </View>
          ) : (
            <MoreCashAdvance
              headList={headList}
              projectList={projectList}
              EmployeeID={EmployeeID}
              getMoreInformation={objinfo => {
                this.getMoreInformation(objinfo);
              }}
              handleMoreInformation={isVisible => {
                this.handleMoreInformation(isVisible);
              }}
            />
          )}
        </ScrollContainer>
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddCashAdvancePH);
