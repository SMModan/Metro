import React, { Component } from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { strings } from '../../language/Language';
import { Colors, Images, Utils } from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import {
  Button,
  Clickable,
  CustomPicker,
  FloatingEditText,
  MainContainer,
  ProgressDialog,
  ScrollContainer,
  ViewWithTitle
} from '../common';
import PhotoPicker from '../common/PhotoPicker';
import ReimbursementApi from './Api/ReimbursementApi';
import styles from './styles/Reimbursement.style';

class MoreReimbursement extends Component {
  state = {
    loading: false,
    AssignUserRemarks: [],
    selectedAttachment: '',
    projectId: '',
    headId: '',
    amount: '',
    projectName: '',
    headName: '',
    attachment: '',
  };

  onTextChanged = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleSubmit = () => {
    const {
      attachment,
      selectedAttachment,
      projectId,
      headId,
      projectName,
      headName,
      amount,
    } = this.state;
    const {EmployeeID, getMoreInformation} = this.props;
    const fileName = attachment.fileName;
    const fileType = attachment.type;
    const DocumentContent = attachment?.base64;

    if (!projectId) {
      Utils.showToast('please select project.');
    } else if (!headId) {
      Utils.showToast('please select Expense head.');
    } else if (!amount) {
      Utils.showToast('please enter amount.');
    } else {
      let params = {
        fileName,
        DocumentContent,
        EmployeeID,
      };

      ProgressDialog.show();
      ReimbursementApi.addReimbursementFile(
        params,
        jsonResponse => {
          // console.log("res Insert leave for  ===============================>",jsonResponse.InsertLeaveApplicationResponse);
          console.log('\n JSONResponse', jsonResponse);
          const isSucceed = jsonResponse.IsSucceed;

          if (isSucceed) {
            let objInfo = {
              ProjectID: projectId,
              ExpenseHeadID: headId,
              Amount: amount,
              FileName: fileName,
              fileType: fileType,
              FilePath: jsonResponse?.FilePath,
              headName,
              projectName,
              ExpenseHeadName: headName,
              ProjectName: projectName,
            };

            getMoreInformation(objInfo);
          }else{
            const ErrorMessage = jsonResponse?.ErrorMessage

            if(ErrorMessage){
              alert(ErrorMessage)
            }
          }

          // if (isSucceed) {
          //   Utils.showToast('Leave request submitted successfully');
          //   reset('LeaveList');
          // } else {
          //   const message = jsonResponse.Massage;
          //   alert(message);
          // }
          ProgressDialog.hide();
        },
        (error) => {
          ProgressDialog.hide();
        },
      );
    }
  };

  render() {
    const {projectId, headId, amount, selectedAttachment} = this.state;

    const {handleMoreInformation, headList, projectList, EmployeeID} =
      this.props;
    return (
      <MainContainer
        header={{
          title: 'Add Reimbursement Details',
          hideUnderLine: true,
          light: true,
          isHome: true,
        }}>
        <ScrollContainer>
          <View>
            <ViewWithTitle title="Reimbursement Details">
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
        </ScrollContainer>
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MoreReimbursement);
