import React, {Component} from 'react';
import {View, ImageBackground, Image, BackHandler} from 'react-native';

import {connect} from 'react-redux';
import {strings} from '../../language/Language';
import {goBack, push, replace, reset} from '../../navigation/Navigator';
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
class EditCashAdvance extends Component {
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
    useAdHocAmount:false,
    IsEditable:false,
    ProjectName:"",
    table:{}
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
    const ID = this.props.route?.params?.cashAdvanceId
    const params = {
      ID
    };

    ProgressDialog.show();
    CashAdvanceApi.getCashAdvanceByID(
      params,
      res => {
        ProgressDialog.hide();
        if (res) {

          const table = res.Table 
          if(table){
            const _date =  this.splitDate(table?.CashAdvanceDate)

            this.setState({

              supervisor:table?.ApproverName,
              EmployeeID:table?.EmployeeID,
              cashAdvanceDate:_date,
              headId:table?.CircleID,
              employeeName:table?.EmployeeName,
              useAdHocAmount:table?.IsAdhocAmount,
              IsEditable:table?.IsEditable,
              PrimaryHeadID:table?.PrimaryHeadID,
              PrimaryHeadName:table?.PrimaryHeadName,
              ProjectName:table?.ProjectName,
              projectId:table?.ProjectID,
              reason:table?.Remarks,
              table:table,
            },()=>{
              this.getCirclewiseCreditLimitAndRemainingAmountForCashAdvance()
            })
          }
          console.log('===========>================================= getBasicUserProfilegetBasicUserProfilegetBasicUserProfile =======================================================>', res);
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
       //  console.log("tabletabletabletabletable",table)

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
            },()=>{
              this.getCashAdvanceDetails()
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
      } = this.state;

     const _cashAdvanceDate = Utils.formatDate(cashAdvanceDate, 'yyyy-MM-DD');
    // const _toDate = Utils.formatDate(toDate, 'yyyy-MM-DD');

    console.log("-=============>-=============>_cashAdvanceDate -=============>",_cashAdvanceDate)

   
    const intRemainingCredit= parseInt(remainingCredit)
    const intAdhocAmountCredit= parseInt(adhocAmount)
    const intamount= parseInt(amount)


    if (!headId) {
      Utils.showToast('Please select Expense Head.');
    } else if (!amount) {
      Utils.showToast('please enter amount.');
    } else if (intRemainingCredit<intamount) {
      Utils.showToast('amount should be less then credit availble.');
    }else if (intAdhocAmountCredit<intamount) {
      Utils.showToast('amount should be less then Ad Hoc Amount availble.');
    } else if (!reason) {
      Utils.showToast('please enter reason.');
    } else {

      // request.addProperty("ID", getIntent().getStringExtra(CASH_ADVANCE_ID));
      // request.addProperty("expenseHeadID", tempexpenseheadid);
      // request.addProperty("amount", amount+"");
      // request.addProperty("remarks", binding.acaEdtreason.getText().toString());
      const ID = this.props.route?.params?.cashAdvanceId

      let params = {
          ID,
            expenseHeadID:headId,
            amount:amount,
            remarks:reason,
      };

      // console.log("paramsparamsparamsparams",params)
      ProgressDialog.show();
      CashAdvanceApi.UpdateCashAdvance(
        params,
        res => {
          ProgressDialog.hide();
          if (res) {
            Utils.showToast('Cash advance request updated successfully');
            reset("CashAdvanceList")
          }
        },
        (error) => {
          alert(error)
          ProgressDialog.hide();
        },
      );
    }
  };
  
  
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  handleBackButtonClick() {
    replace("CashAdvanceList")
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
      ProjectName,
      IsEditable,
      employeeName
    } = this.state;

    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => replace("CashAdvanceList"),
          },
          title: 'Edit Cash Advance',
          hideUnderLine: true,
          light: true,
        }}>
        <ScrollContainer>
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
                value={ProjectName}
                label={'Project Name'}
                editable="false"
              />
               
                <CustomPicker 
                list={headList || []}  selectedItem={{ id: headId }} label={'Expense Head'} onSelect={(item) => this.onTextChanged("headId", item.id)} />
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

            <ViewWithTitle title="Approver Details">
          

              <FloatingEditText
                value={""}
                label={'Approver Amount'}
                editable={false}
              />
         
              <FloatingEditText
                value={""}
                label={'Account Approver Amount'}
                editable={false}
              />
              <FloatingEditText
                value={""}
                editable={false}
                label="Approver Remarks"
              />

              <FloatingEditText
                value={""}
                editable={false}
                label="Account Approver Remarks"
              />
            </ViewWithTitle>

            <Button
              title="Update"
              disabled={!IsEditable}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditCashAdvance);
