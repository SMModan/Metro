import _ from 'lodash';
import React, { Component } from 'react';
import { Image, Platform, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { store } from '../../../App';
import { strings } from '../../../language/Language';
import { reset } from '../../../navigation/Navigator';
import { setSessionField } from '../../../reducers/SessionReducer';
import { Colors, Images } from '../../../utils';
import { syncAllData } from '../../../utils/SyncDataManager';
import Utils from '../../../utils/Utils';
import {
  Button,
  CustomPicker,
  FloatingEditText,
  MainContainer,
  ProgressDialog,
  ScrollContainer
} from '../../common';
import loginApi from '../apis/LoginApis';
import styles from '../styles/SignIn.style';

//Meghait22@gmail.com
// skyw@rd
class SignIn extends Component {
  state = {
    userName: '',
    password: '',
    companyName: [],
    selectedCompany: {},
    companyId: '',
  };

  async componentDidMount() {
    // createDefaultTables();
    console.log("session.deviceToken", this.props.session)
  }

  getCompnayNameByUserName = userName => {
    loginApi.getCompanyNameByUserName(
      userName,
      res => {
        ProgressDialog.hide();

        // console.log("Res", res)

        if (res) {
          const { Table1 } = res;

          if (Table1) {
            let results = []
            if (Array.isArray(Table1)) {

              results = Table1.map((t) => ({
                id: t.DBName,
                name: t.CompanyName
              }))
            } else {
              results = [{
                id: Table1.DBName,
                name: Table1.CompanyName
              }]
            }

            this.setState({
              companyName: results,
              selectedCompany: results[0]
            })
          }
        }
      },
      () => {
        ProgressDialog.hide();

        Utils.showToast('Company Not found');
      },
    );
  };





  permissionApi = (userId,connectionString)=>{
    const params = {
      UserID: userId,
      ConnectionString: connectionString,
    };
    
    loginApi.PermissionApi(
      params,
      res => {
        if (res) {
          
          const table = res.Table
          for (let index = 0; index < table.length; index++) {
            const permission = table[index];
            const programName = permission.ProgramName
            const showIcon = permission.ShowIcon
            console.log("<============================ programName ============================>", programName)

            if(programName=="Check In/Out"){
            console.log("<============================ Res ============================>", showIcon)

              store.dispatch(setSessionField("checkinout", showIcon));
            }else if(programName=="Mark In - Out"){
              console.log("<============================ Res ============================>", showIcon)

              store.dispatch(setSessionField("markinout", showIcon));
            }else if(programName=="Trip In - Out"){
              console.log("<============================ Res ============================>", showIcon)

              store.dispatch(setSessionField("tripinout", showIcon));
            }else if(programName=="Customer"){
              console.log("<============================ Res ============================>", showIcon)

              store.dispatch(setSessionField("customer", showIcon));
            }else if(programName=="Contact"){
              console.log("<============================ Res ============================>", showIcon)

              store.dispatch(setSessionField("contact", showIcon));
            }else if(programName=="Opportunity"){
              console.log("<============================ Res ============================>", showIcon)

              store.dispatch(setSessionField("opportunity", showIcon));
            }else if(programName=="Task Activity"){
              console.log("<============================ Res ============================>", showIcon)

              store.dispatch(setSessionField("task", showIcon));
            }else if(programName=="Appointment Activity"){
              console.log("<============================ Res ============================>", showIcon)

              store.dispatch(setSessionField("appointment", showIcon));
            }else if(programName=="HelpDesk"){
              console.log("<============================ Res ============================>", showIcon)

              store.dispatch(setSessionField("helpDesk", showIcon));
            }else if(programName=="Quotation"){
              console.log("<============================ Res ============================>", showIcon)

              store.dispatch(setSessionField("quotation", showIcon));
            }
          }
          ProgressDialog.hide();
          reset('Home');

          if (!this.props.session.isSync) {
            syncAllData()
          } else {
            ProgressDialog.hide();
            reset('Home');
          }
        } else
          ProgressDialog.hide();
       
      },
      error => {
        ProgressDialog.hide();
        Utils.showToast(error);
      },
    );
  }



  login = () => {
    const params = {
      UserName: this.state.userName,
      CompanyName: this.state.selectedCompany.name,
      Password: this.state.password,
    };
    ProgressDialog.show();
    loginApi.login(
      params,
      res => {
        // console.log("Res", res)

        if (res) {
          const { Table } = res;
          const userId = Table.ID
          const connectionString = store.getState().session.connectionString;
          store.dispatch(setSessionField('user', Table));
          store.dispatch(setSessionField('is_logged_in', true));
          loginApi.setDeviceToken({ DeviceToken: this.props.session.deviceToken, DeviceType: Platform.select({ android: "A", ios: "I" }) })
          this.permissionApi(userId,connectionString)
        } else
          ProgressDialog.hide();

      },
      error => {
        ProgressDialog.hide();
        Utils.showToast(error);
      },
    );
  };

  searchCompany = text => {
    console.log('Text', text);
    this.setState({ userName: text });

    if (Utils.isValidEmail(text)) {
      // ProgressDialog.show()
      // Keyboard.dismiss()
      this.getCompnayNameByUserName(text);
    }
  };

  searchDelay = _.debounce(this.searchCompany, 1000);

  render() {
    return (
      <MainContainer
        header={{ 
          hideUnderLine: true,
          light: false,
          isHome: true,
         backgroundColor: Colors.white 
         
         }}>
           
        <ScrollContainer>
          {/* <ProgressDialog visible={true} /> */}
          <View style={styles.ContainerView}>
            <View style={styles.ContainView}>
              <View style={styles.topView}>
                <Image source={Images.ic_LoginLogo} />
                <Text style={styles.loginTitle}>{strings.LoginTitle}</Text>
                <Text style={styles.loginDesc}>{strings.loginDescription}</Text>
              </View>
              <FloatingEditText
                leftIcon={Images.ic_Person}
                inputType="email-address"
                style={styles.textEmail}
                // value={this.state.userName}
                onChangeText={this.searchDelay}
                label={strings.txtEmailAddress}
              />
              <FloatingEditText
                password
                leftIcon={Images.ic_Password}
                style={styles.textPassword}
                value={this.state.password}
                onChangeText={text => this.setState({ password: text })}
                label={strings.txtPassword}
              />
              <CustomPicker
                disabled={this.state.companyName <= 1}
                leftIcon={Images.ic_Company}
                style={styles.textPassword}
                selectedItem={this.state.selectedCompany}
                list={this.state.companyName}
                onSelect={item => this.setState({ selectedCompany: item })}
                label={strings.textSelectCompany}
              />
              {/* <View style={styles.forgotPasswordView}>
                <Clickable onPress={() => this.props.navigation.push('ForgotPassword')} style={styles.btnForgotTitle}>
                  <Text style={styles.forgotTitle}>
                    {strings.Forgotpassword}
                  </Text>
                </Clickable>
              </View> */}
              <View style={styles.bottomShadowView}>
                <Button
                  disabled={!this.state.selectedCompany.name || !this.state.password}
                  onPress={this.login}
                  title={strings.btnLogin}
                />
              </View>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);