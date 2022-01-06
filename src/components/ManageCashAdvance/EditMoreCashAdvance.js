import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { strings } from '../../language/Language';
import { Colors, Utils } from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import {
  Button, CustomPicker,
  FloatingEditText, ViewWithTitle
} from '../common';

class EditMoreCashAdvance extends Component {
  state = {
    loading: false,
    AssignUserRemarks: [],
    selectedAttachment: '',
    projectId: '',
    headId: '',
    amount: '',
    projectName: '',
    headName: '',
    remarks: '',
    UniqueID:""
  };

  onTextChanged = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleSubmit = () => {
    const {
      projectId,
      headId,
      projectName,
      headName,
      UniqueID,
      amount,remarks,ID} = this.state
    const { getMoreInformation} = this.props;

     if (!headId) {
      Utils.showToast('please select Expense head.');
    }else if (!projectId) {
      Utils.showToast('please select project.');
    }  else if (!amount) {
      Utils.showToast('please enter amount.');
    }else if (!remarks) {
      Utils.showToast('please enter remarks.');
    } else {
      let objInfo = {
        ProjectID:projectId,
        ExpenseHeadID:headId,
        Amount:amount,
        headName,
        projectName,
        ExpenseHeadName:headName,
        ProjectName:projectName,
        Remarks:remarks,
        RowStateID:4,
        UniqueID:UniqueID,
        ID:ID
      }

      getMoreInformation(objInfo);
    }
  };

  componentDidMount() {
    const {
      ProjectID,
      ExpenseHeadID,
      Amount,
      ExpenseHeadName,
      ProjectName,
      RowStateID,
      Remarks,
      UniqueID,
      ID
    } = this.props.editItem;


    console.log("editItemeditItemeditItem -==============------------>>",this.props.editItem)
    this.setState({

      projectId:ProjectID,
      ProjectID,
      headId:ExpenseHeadID,
      ExpenseHeadID,
      amount:""+Amount,
      Amount,
      ProjectName,
      ExpenseHeadName,
      headName:ExpenseHeadName,
      projectName:ProjectName,
      ProjectName,
      Remarks,
      remarks:Remarks,
      RowStateID:4,
      UniqueID:UniqueID,
      ID:ID
    })
  }
  
  
  render() {
    const {projectId, headId, amount, remarks} = this.state;

    const {handleMoreInformation, headList, projectList, EmployeeID} =
      this.props;

      console.log("headList  ====??????",headList);
    return (
     <React.Fragment>
          <View>
            <ViewWithTitle title="Edit CashAdvance Details">
              <CustomPicker
                list={headList || []}
                selectedItem={{id: headId}}
                label={'Expense Head'}
                onSelect={item => {
                  this.onTextChanged('headId', item.id);
                  this.onTextChanged('headName', item.name);
                }}
              />

              <CustomPicker
                list={projectList || []}
                selectedItem={{id: projectId}}
                label={'Project Name'}
                onSelect={item => {
                  this.onTextChanged('projectId', item.id);
                  this.onTextChanged('projectName', item.name);
                }}
              />
              <FloatingEditText
                value={amount}
                onChangeText={text => this.onTextChanged('amount', text)}
                label={'Amount'}
                inputType="numeric"
              />

              <FloatingEditText
                value={remarks}
                onChangeText={text => this.onTextChanged('remarks', text)}
                label="Reason"
                multiline={true}
              />
            </ViewWithTitle>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              padding: ResponsivePixels.size10,
            }}>
            <Button
              title={'Cancel'}
              style={{
                marginRight: ResponsivePixels.size16,
                width: '40%',
                backgroundColor: Colors.gray,
              }}
              onPress={() => {
                handleMoreInformation();
              }}
            />
            <Button
              title={strings.submit}
              style={{width: '50%', marginRight: ResponsivePixels.size16}}
              onPress={() => {
                this.handleSubmit();
              }}
            />
          </View>
          </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditMoreCashAdvance);
