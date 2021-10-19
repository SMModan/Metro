import React, {Component} from 'react';
import {View, ImageBackground, Image} from 'react-native';

import {connect} from 'react-redux';
import {strings} from '../../language/Language';
import {goBack, push} from '../../navigation/Navigator';
import {Images, Colors,Utils} from '../../utils';
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
  Clickable,
  Checkbox,
  ProgressDialog,
} from '../common';
import {RadioButton, Text} from 'react-native-paper';

import PhotoPicker from '../common/PhotoPicker';
import CashAdvance from './List/CashAdvance';
import CashAdvanceApi from './Api/CashAdvanceApi';
class AddCashAdvance extends Component {
  state = {
    loading: false,
    user: this.props.session.user,
    empList:[],
    EmployeeID:0,
    cashAdvanceDate : undefined,
    supervisor: "",
    supervisorId:0,
    projectList:[],
    headList:[],
    headId:"",
    remainingCredit:"0",
    adhocAmount:"0",
    projectId:"",
    amount:"",
    reason:"",
    useAdHocAmount:false
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
                this.getProjectsByEmployeeIDForDailyAttendance()
                this.getCirclewiseCreditLimitAndRemainingAmountForCashAdvance()
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
    const {EmployeeID,cashAdvanceDate} = this.state
    const _date = Utils.formatDate(cashAdvanceDate, 'MM/DD/YYYY');
  
      const params = {
        employeeID:EmployeeID,
        cashAdvanceDate:_date
      };
  
    ProgressDialog.show();
    CashAdvanceApi.getCirclewiseCreditLimitAndRemainingAmountForCashAdvance(
      params,
      res => {
        ProgressDialog.hide();
        if (res) {

         const table = res.Table
         console.log("tabletabletabletabletable",table)

         if(table){

          
           this.setState({
            remainingCredit:table.RemainingCredit?table.RemainingCredit.toString():"0",
            adhocAmount:table.AdhocAmount?table.AdhocAmount.toString():"0"
          })
         }
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };


getProjectsByEmployeeIDForDailyAttendance = () => {
  const {EmployeeID,cashAdvanceDate} = this.state


    const params = {
      empID:EmployeeID,
      AttDate:""
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

    // loading: false,
    // user: this.props.session.user,
    // empList:[],
    // EmployeeID:0,
    // cashAdvanceDate : undefined,
    // supervisor: "",
    // supervisorId:0,
    // projectList:[],
    // headList:[],
    // headId:0,
    // remainingCredit:"0",
    // adhocAmount:"0"



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
      adhocAmount
      } = this.state;

     const _cashAdvanceDate = Utils.formatDate(cashAdvanceDate, 'yyyy-MM-DD');
    // const _toDate = Utils.formatDate(toDate, 'yyyy-MM-DD');


    const intRemainingCredit= parseInt(remainingCredit)
    const intamount= parseInt(amount)


    if (!projectId) {
      Utils.showToast('Please select project.');
    }else if (!headId) {
      Utils.showToast('Please select Expense Head.');
    } else if (!amount) {
      Utils.showToast('please enter amount.');
    } else if (intRemainingCredit<intamount) {
      Utils.showToast('amount should be less then credit availble.');
    } else if (!reason) {
      Utils.showToast('please enter reason.');
    } else {
      let params = {
            cashAdvanceDate:_cashAdvanceDate,
            employeeID:EmployeeID,
            projectID:projectId,
            expenseHeadID:headId,
            amount:amount,
            adhocAmount:adhocAmount,
            isAdhocApply:useAdHocAmount,
            remarks:reason,
            remainingAmount:remainingCredit

      };

      console.log("paramsparamsparamsparams",params)
      ProgressDialog.show();
      CashAdvanceApi.insertCashAdvance(
        params,
        res => {
          ProgressDialog.hide();
          if (res) {
            Utils.showToast('Cash advance request submitted successfully');
            reset('CashAdvanceList');
          }
        },
        (error) => {
          alert(error)
          ProgressDialog.hide();
        },
      );
    }
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
      cashAdvanceDate,
      projectId,
      projectList,
      headList,
      headId,
      remainingCredit,
      amount,
      reason,
      adhocAmount,
      useAdHocAmount
    } = this.state;

    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => goBack(),
          },
          title: 'Add Cash Advance',
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
                      this.getProjectsByEmployeeIDForDailyAttendance()
                      this.getCirclewiseCreditLimitAndRemainingAmountForCashAdvance()
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
               <CustomPicker list={projectList||[]}  
               selectedItem={{ id: projectId }} label={'Project Name'} onSelect={(item) => this.onTextChanged("projectId", item.id)} />
                <CustomPicker list={headList || []}  selectedItem={{ id: headId }} label={'Expense Head'} onSelect={(item) => this.onTextChanged("headId", item.id)} />
            </ViewWithTitle>

            <ViewWithTitle title="Amount">
              <View style={{flexDirection: 'row', width: '100%'}}>
              <FloatingEditText
                value={amount}
                onChangeText={text => this.onTextChanged('amount', text)}
                label={'Amount'}
                inputType="numeric"
                style={{width:"50%",marginRight:ResponsivePixels.size10}}
              />
                <FloatingEditText
                value={remainingCredit}
                label={'Remaining Amount'}
                editable={false}
                style={{width:"50%"}}
              />
             
              </View>




              <View
                style={{flexDirection: 'row', width: '100%', flexWrap: 'wrap'}}>
                 <FloatingEditText
                value={adhocAmount}
                label={'Ad Hoc Amount'}
                editable={false}
                style={{width:"50%"}}
              />
                <Checkbox
                  label="AdhocAmmount"
                  color={Colors.Red900}
                  style={{marginTop:ResponsivePixels.size20}}
                  checked={useAdHocAmount}
                  onPress={() => {
                    this.onTextChanged('useAdHocAmount', !useAdHocAmount);
                  }}
                />
              </View>

              <FloatingEditText
                value={reason}
                onChangeText={text => this.onTextChanged('reason', text)}
                label="Reason"
                multiline={true}
              />
            </ViewWithTitle>

            <Button
              title={strings.submit}
              style={{margin: ResponsivePixels.size16}}
              onPress={()=>{this.handleSubmit()}}

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

export default connect(mapStateToProps, mapDispatchToProps)(AddCashAdvance);
