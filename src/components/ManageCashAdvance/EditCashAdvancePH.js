import React, { Component } from 'react';
import { BackHandler, Image, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { replace, reset } from '../../navigation/Navigator';
import { Colors, Images, Utils } from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import {
  Button, Clickable, FloatingEditText,
  MainContainer, ProgressDialog, ScrollContainer,
  ViewWithTitle
} from '../common';
import CashAdvanceApi from './Api/CashAdvanceApi';
import EditMoreCashAdvance from './EditMoreCashAdvance';
import MoreCashAdvance from './MoreCashAdvance';


class EditCashAdvancePH extends Component {
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
    IsEditable: false,
    ProjectName: '',
    table: {},
    editItem: {},
    otherInformation: [],
    isVisibleAdvanceDetail: false,
  };

  componentDidMount() {
    this.setState(
      {
        cashAdvanceDate: new Date(),
      },
      () => {
        this.getExpenseHeads();
      },
    );
  }

  getProjectsByEmployeeIDForDailyAttendance = () => {
    const {EmployeeID} = this.state;

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

  splitDate = strDate => {
    let date = '';
    if (strDate) {
      const TStartSplit = strDate.split('T');
      const sDate = TStartSplit[0];
      date = `${sDate}`;
    }
    return date;
  };

  getCashAdvanceDetails = () => {
    const ID = this.props.route?.params?.cashAdvanceId;
    const params = {
      ID,
    };

    ProgressDialog.show();
    CashAdvanceApi.getCashAdvanceByID(
      params,
      res => {
        ProgressDialog.hide();
        if (res) {
          const table = res.Table;
          let table1 = res.Table1;
          if (table) {
            const _date = this.splitDate(table?.CashAdvanceDate);

            this.setState(
              {
                supervisor: table?.ApproverName,
                EmployeeID: table?.EmployeeID,
                cashAdvanceDate: _date,
                headId: table?.CircleID,
                employeeName: table?.EmployeeName,
                useAdHocAmount: table?.IsAdhocAmount,
                IsEditable: table?.IsEditable,
                PrimaryHeadID: table?.PrimaryHeadID,
                PrimaryHeadName: table?.PrimaryHeadName,
                ProjectName: table?.ProjectName,
                projectId: table?.ProjectID,
                reason: table?.Remarks,
                table: table,
              },
              () => {
                this.getCirclewiseCreditLimitAndRemainingAmountForCashAdvance();
                this.getProjectsByEmployeeIDForDailyAttendance();
              },
            );
          }

          if (table1) {
            if (Array.isArray(table1)) {
              for (let index = 0; index < table1.length; index++) {
                let newTable = table1[index];
                newTable.RowStateID = 4;
                table1[index] = newTable;
              }

              this.setState({otherInformation: [...table1]}, () =>
                console.log('this.state', this.state.listData),
              );
            } else {
              table1.RowStateID = 4;
              let results = [{...table1}];

              this.setState({
                otherInformation: results,
              });
            }
          }
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
          //  console.log("tabletabletabletabletable",table)

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

            this.setState({headList: list}, () => {
              this.getCashAdvanceDetails();
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
      headId,
      projectId,
      amount,
      reason,
      remainingCredit,
      useAdHocAmount,
      adhocAmount,
      otherInformation,
    } = this.state;

    if (!reason) {
      Utils.showToast('please enter reason.');
    } else if (otherInformation.length == 0) {
      Utils.showToast('please add atleast 1 information.');
    } else {
      // UpdateCashAdvance{Token=b9ebfcd2-56b1-4379-9835-b76855b1ed91; ID=3;
      //    cashAdvanceSubDetails=[{"ID":6,"ExpenseHeadID":1,"Amount":"0.00","ProjectID":1,"Remarks":"0.00","RowStateID":4}]; remarks=test; }

      let _otherInformation = [];

      for (let index = 0; index < otherInformation.length; index++) {
        const info = otherInformation[index];
        const {ExpenseHeadID, Amount, ProjectID, Remarks, RowStateID, ID} =
          info;
        let obj = {
          ExpenseHeadID: ExpenseHeadID,
          Amount: Amount,
          ProjectID: ProjectID,
          Remarks: Remarks,
          RowStateID: RowStateID,
          ID:ID,
        };
        _otherInformation.push(obj);
      }
      let stringifyOtherInformation = JSON.stringify(_otherInformation);

      const ID = this.props.route?.params?.cashAdvanceId;

      let params = {
        ID,
        remarks: reason,
        cashAdvanceSubDetails: stringifyOtherInformation,
      };

      console.log('paramsparamsparamsparams', params);

      ProgressDialog.show();
      CashAdvanceApi.UpdateCashAdvance(
        params,
        res => {
          ProgressDialog.hide();
          if (res) {
            console.log("res  =======>>>>>>>>>>>>>>>>>>>>>>",res)
            const FriendlyMessage = res.FriendlyMessage
            if(FriendlyMessage){
              alert(FriendlyMessage);
            }else{
              Utils.showToast('Cash advance request updated successfully');
            }
            reset('CashAdvanceList');

          }
        },
        error => {
          alert(error);
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

  handleMoreInformation = isVisibleAdvanceDetail => {
    this.setState({
      isVisibleAdvanceDetail,
    });
  };

  handleEditMoreInformation = isVisibleEditAdvanceDetail => {
    this.setState({
      isVisibleEditAdvanceDetail,
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

  EditMoreInformation = objInfo => {
    let _otherInformation = this.state.otherInformation;
    let _objInfo = objInfo;

    var index = _otherInformation.findIndex(function (o) {
      return o.UniqueID === objInfo.UniqueID;
    });
    if (index !== -1) {
      _otherInformation[index] = _objInfo;
    }

    this.setState({
      otherInformation: _otherInformation,
      isVisibleEditAdvanceDetail: false,
    });
  };

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
      ProjectName,
      IsEditable,
      employeeName,
      isVisibleAdvanceDetail,
      isVisibleEditAdvanceDetail,
      otherInformation,
      editItem,
    } = this.state;

    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => replace('CashAdvanceList'),
          },
          title: 'Edit Cash Advance',
          hideUnderLine: true,
          light: true,
        }}>
        <ScrollContainer>
          <View>
            {isVisibleAdvanceDetail ? (
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
            ) : isVisibleEditAdvanceDetail ? (
              <EditMoreCashAdvance
                headList={headList}
                projectList={projectList}
                EmployeeID={EmployeeID}
                getMoreInformation={objinfo => {
                  this.EditMoreInformation(objinfo);
                }}
                editItem={editItem}
                handleMoreInformation={isVisible => {
                  this.handleEditMoreInformation(isVisible);
                }}
              />
            ) : (
              <View>
                <ViewWithTitle title="General Details">
                  <FloatingEditText
                    value={employeeName}
                    label={'EmployeeName'}
                    editable="false"
                  />

                  <FloatingEditText
                    value={supervisor}
                    label={'Approver'}
                    editable="false"
                  />
                  <FloatingEditText
                    value={cashAdvanceDate}
                    label={'Cash Advance Date'}
                    editable="false"
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
                        console.log('item ===========================>', item);

                        const {
                          ProjectID,
                          ExpenseHeadID,
                          Amount,
                          ExpenseHeadName,
                          ProjectName,
                          RowStateID,
                        } = item;

                        return RowStateID !== 3 ? (
                          <Clickable
                            onPress={() => {
                              this.setState({
                                isVisibleEditAdvanceDetail: true,
                                editItem: item,
                              });
                            }}>
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
                                      {ExpenseHeadName}
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
                                          return o.UniqueID === item.UniqueID;
                                        },
                                      );
                                      if (index !== -1) {
                                        let otherInfoObj =
                                          otherInformation[index];
                                        otherInfoObj.RowStateID = 3;
                                        otherInformation[index] = otherInfoObj;
                                      }
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
                          </Clickable>
                        ) : null;
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
                  title="Update"
                  disabled={!IsEditable}
                  style={{margin: ResponsivePixels.size16}}
                  onPress={() => {
                    this.handleSubmit();
                  }}
                />
              </View>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditCashAdvancePH);
