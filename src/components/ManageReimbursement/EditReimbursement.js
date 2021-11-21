import React, {Component} from 'react';
import {View, ImageBackground, Modal, Image, BackHandler} from 'react-native';

import {connect} from 'react-redux';
import {strings} from '../../language/Language';
import {goBack, push, replace} from '../../navigation/Navigator';
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
import EditMoreReimbursement from './EditMoreReimbursement';
import { AddmoreInfoDialogue } from '../Customer/BaseComponents';
class EditReimbursement extends Component {
  state = {
    loading: false,
    user: this.props.session.user,
    AssignUserRemarks: [],
    selectedAttachment: '',

    isVisibleAddMoreInfo: false,
    isVisibleEditMoreInfo: false,
    editMoreInfoObj:{},
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

  handleMoreInformationDialogue = isMoreInformation => {
    this.setState({
      isVisibleAddMoreInfo: isMoreInformation,
    });
  };

  
  handleEditMoreInformationDialogue = isVisibleEditMoreInfo => {
    this.setState({
      isVisibleEditMoreInfo: isVisibleEditMoreInfo,
    });
  };

componentDidMount() {

  console.log("this.props.route.params.item",this.props.route.params.item.ID)
  this.setState(
    {
      fromDate: new Date(),
      toDate: new Date(),
      ID:this.props.route.params.item.ID
    },
    () => {
      this.getReimbursementByID()
    this.getExpenseHeads();

    },
  );
}


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
getReimbursementByID = () => {
const {ID} = this.state
    const params = {
      ID,
    };

    ProgressDialog.show();
    ReimbursementApi.getReimbursementByID(
      params,
      res => {
        ProgressDialog.hide();
        if (res) {
          const {Table,Table1} = res;

          console.log("Table",Table)
          if (Table) {
           this.setState({
             ...Table,
             rId:Table.TypeID,
             remarks:Table.Remarks
           },()=>{
             this.getProjectsByEmployeeIDForDailyAttendance()
           })
          }

          if(Table1){
            console.log("Table1Table1Table1Table1 ==========================================>>>>>>>>>>>>>>>>>",Table1)
            if (Array.isArray(Table1)) {
              for (let index = 0; index < Table1.length; index++) {
                let element = Table1[index];
                element.RowStateID=4
                Table1[index]=element
              }

              this.setState(
                { otherInformation:[...Table1]}
                
               );
            }else{
              let results = [
                {...Table1,RowStateID:4}
              ];

              this.setState({
                otherInformation:results
              })
            }
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
        // _otherInfo.RowStateID=3
        let _objInfo = objInfo
        _objInfo.ID=0
        _objInfo.RowStateID=2
        _objInfo.ApprovalStatusID=2
      _otherInformation.push(_objInfo)

      console.log("otherInformation",_objInfo)

      this.setState({
        otherInformation:_otherInformation,
        isVisibleAddMoreInfo:false
      },()=>{
      })
    }

    updateMoreInformation=(objInfo)=>{

    const {otherInformation,editMoreInfoObj} = this.state
    const  objIndex = otherInformation.findIndex((obj => obj.ID == editMoreInfoObj.ID));
    let _otherInformation = otherInformation

        if(objIndex!=-1){
          let _objInfo = objInfo
        _objInfo.RowStateID=4
        _objInfo.ApprovalStatusID=2
        console.log("updatedInfoooooo",_objInfo)

          _otherInformation[objIndex]=_objInfo
        }

      this.setState({
        otherInformation:_otherInformation,
        isVisibleEditMoreInfo:false
      },()=>{
      })
    }

    handleSubmit=()=>{
      const {otherInformation,rId,Remarks,ReimbursementDate,fromDate,toDate,EmployeeID} = this.state

      const _ReimbursementDate = Utils.formatDate(ReimbursementDate, 'DD-MM-yyyy');
      const _fromDate = Utils.formatDate(fromDate, 'DD-MM-yyyy');
      const _toDate = Utils.formatDate(toDate, 'DD-MM-yyyy');

      let _otherInformation = []
      // JSON.stringify(otherInf)

      for (let index = 0; index < otherInformation.length; index++) {
        const otherInfo = otherInformation[index];
        
        let objOther = {
          ID:otherInfo.ID,
          ExpenseHeadID:otherInfo.ExpenseHeadID,
          Amount:otherInfo.Amount,
          ProjectID:otherInfo.ProjectID,
          FileName:otherInfo.FileName,
          FilePath:otherInfo.FilePath,
          FileContent:otherInfo.fileType,
          RowStateID:otherInfo.RowStateID,
          ApprovalStatusID:2
        }
      console.log("============================== otherInformationotherInformation ==============================",objOther)

        _otherInformation.push(objOther)
      }

      _otherInformation= JSON.stringify(_otherInformation)
      if (rId == 0) {
        Utils.showToast('Please select reimbursment type.');
      } else if (!Remarks) {
        Utils.showToast('please enter reason.');
      }else if (otherInformation.length==0) {
        Utils.showToast('please add atleast 1 reimbursment details.');
      } else {

        let params = {
          ID:this.props.route.params.item.ID,
          reimbursementDate:_ReimbursementDate,
          reimbursementTypeID:rId,
          employeeID:EmployeeID,
          remarks:Remarks,
          fromDate:_fromDate,
          toDate:_toDate,
          reimbursementSubDetails:_otherInformation,

        }
          console.log("params",params)

          ProgressDialog.show();
          ReimbursementApi.UpdateReimbursement(
            params,
            res => {
              ProgressDialog.hide();
              if (res) {
                  Utils.showToast('Reimbursement request submitted successfully');
                  replace("ReimbursementList")
              }
            },
            (error) => {
              ProgressDialog.hide();
               alert(error)
            },
          );

      }

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


    componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
      replace("ReimbursementList")
      return true;
    }



  render() {
    const {
      EmployeeName,
      Remarks,
      ApproverName,
      CreatedDate,
      ReimbursementTypeName,
      FromDate,
      ToDate,
      isVisibleEditMoreInfo,
      isVisibleAddMoreInfo,
      otherInformation,
      editMoreInfoObj,
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
      
      <MainContainer
            header={{
              left: {
                image: Images.ic_BackWhite,
                onPress: () => replace("ReimbursementList"),
              },
              title: 'Edit Reimbursement',
              hideUnderLine: true,
              light: true,
            }}>
            <ScrollContainer>
            {isVisibleAddMoreInfo? <MoreReimbursement
          headList={headList}
          projectList={projectList}
          EmployeeID={EmployeeID}
          getMoreInformation={(objinfo)=>{this.getMoreInformation(objinfo)}}
            handleMoreInformation={isVisible => {
              this.handleMoreInformationDialogue(isVisible);
            }}
          />:isVisibleEditMoreInfo? <EditMoreReimbursement
          headList={headList}
          projectList={projectList}
          EmployeeID={EmployeeID}
          editMoreInfoObj={editMoreInfoObj}
          updateMoreInformation={(objinfo)=>{this.updateMoreInformation(objinfo)}}
          handleEditMoreInformationDialogue={isVisible => {
              this.handleEditMoreInformationDialogue(isVisible);
            }}
          />
          :

              <View>
                <ViewWithTitle title="General Details">
             

<FloatingEditText
                value={EmployeeName}
                label={'Employee Name'}
                editable="false"
              />
              <FloatingEditText
                value={ApproverName}
                label={'Approver'}
                editable="false"
              />

<FloatingEditText
                value={this.splitDate(CreatedDate)}
                label={'Application Date'}
                editable="false"
                rightIcon={Images.ic_Calendar}
              />
              {/* <CustomDatePicker
                selectedDate={ReimbursementDate || new Date()}
                minimumDate={ReimbursementDate || new Date()}
                label={'Application Date'}
                containerStyle={{flex: 1}}
                disabled={true}
                rightIcon={Images.ic_Calendar}
              /> */}
                
              

<FloatingEditText
                value={ReimbursementTypeName}
                label={'Reimbursement Type'}
                editable="false"
              />

                  <View style={{flexDirection: 'row', width: '100%'}}>
                    {/* <CustomDatePicker
                      selectedDate={fromDate || new Date()}
                      // minimumDate={ new Date()}
                      onDateChanged={date => {
                        this.onTextChanged('fromDate', date);
                      }}
                      label={'From Date'}
                      editable={false}
                      rightIcon={Images.ic_Calendar}

                    /> */}

<FloatingEditText
                value={this.splitDate(FromDate)}
                label={'From Date'}
                style={{flex: 1, width: '50%',marginRight:ResponsivePixels.size20}}
                editable="false"
                rightIcon={Images.ic_Calendar}
              />

<FloatingEditText
                value={this.splitDate(ToDate)}
                label={'From Date'}
                style={{flex: 1, width: '50%',marginRight:ResponsivePixels.size20}}
                editable="false"
                rightIcon={Images.ic_Calendar}
              />
                    
                    {/* <CustomDatePicker
                      selectedDate={toDate || new Date()}
                      minimumDate={fromDate || new Date()}
                      onDateChanged={date => {
                        this.onTextChanged('toDate', date);
                      }}
                      label={'To Date'}
                      containerStyle={{flex: 1, width: '50%'}}
                      editable={false}
                      rightIcon={Images.ic_Calendar}

                    /> */}
                  </View>
                  <FloatingEditText
                    value={Remarks}
                    onChangeText={text => this.onTextChanged('Remarks', text)}
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
                          ExpenseHeadName,
                          ProjectName,
                          Amount,
                          FileName,
                          FilePath,
                          headName,
                          projectName,
                          RowStateID
                        } = item

console.log("item",item)
                      
                        // if(){
                          return (
                          RowStateID!=3? 
                          <Card
                          style={{
                            margin: ResponsivePixels.size5,
                            padding: ResponsivePixels.size15,
                          }}
                          onPress={()=>{
                              this.setState({
                                isVisibleEditMoreInfo:true,
                                editMoreInfoObj:item
                              })
                          }}
                          key={index}>
                          <View>
                          <Text
                  style={{
                    fontSize: ResponsivePixels.size15,
                    color: Colors.black,
                    fontWeight: 'bold',
                  }}>
                    {ProjectName}
                </Text>
                          
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
                                
                                    let _otherInfo = otherInformation[index]
                                    _otherInfo.RowStateID=3
                                    otherInformation[index]=_otherInfo
                                 

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

                          
                            </View>
                          </View>
                        </Card>:null
                            
                          );
                        // }
            
                     
                      })
                      }
                  </View>

                  <Button
                    title="ADD REIMBURSEMENT DETAILS +"
                    style={{margin: ResponsivePixels.size16}}
                    onPress={() => {
                      this.handleMoreInformationDialogue(true);
                    }}
                  />
                </ViewWithTitle>

                <Button
                  title="Update"
                  style={{margin: ResponsivePixels.size16}}
                  onPress={() => {
                    this.handleSubmit()
                  }}
                />
              </View>}
            </ScrollContainer>
          </MainContainer>
      
      </>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditReimbursement);
