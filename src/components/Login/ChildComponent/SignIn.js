import _ from 'lodash';
import React, {Component} from 'react';
import {BackHandler, Image, Platform, Text, View} from 'react-native';
import {connect} from 'react-redux';
import session from 'redux-persist/lib/storage/session';
import {store} from '../../../App';
import {strings} from '../../../language/Language';
import {push, reset} from '../../../navigation/Navigator';
import {setSessionField} from '../../../reducers/SessionReducer';
import {Colors, Images} from '../../../utils';
import {syncAllData} from '../../../utils/SyncDataManager';
import Utils from '../../../utils/Utils';
import {
  Button,
  CustomPicker,
  FloatingEditText,
  MainContainer,
  ProgressDialog,
  ScrollContainer,
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
  }

  login = () => {
    const params = {
      Username: this.state.userName,
      Password: this.state.password,
    };
    ProgressDialog.show();
    loginApi.login(
      params,
      res => {
        if (res) {
          store.dispatch(setSessionField('user', res));
          store.dispatch(setSessionField('is_logged_in', true));
          reset('Home');
          ProgressDialog.hide();
        } else ProgressDialog.hide();
      },
      error => {
        ProgressDialog.hide();
        Utils.showToast(error);
      },
    );
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
    reset('SelectCountry');
    return true;
  }

  render() {
    return (
      <MainContainer
        header={{
          hideUnderLine: true,
          isHome: true,
          backgroundColor: Colors.white,
        }}>
        <ScrollContainer>
          {/* <ProgressDialog visible={true} /> */}

          <View style={styles.ContainerView}>
            <Image source={Images.ic_Logo} style={styles.logo} />

            <View style={styles.ContainView}>
              <Text style={styles.loginTitle}>{strings.LoginTitle}</Text>

              <FloatingEditText
                leftIcon={Images.ic_Person}
                inputType="email-address"
                style={styles.textEmail}
                // value={this.state.userName}
                onChangeText={text => this.setState({userName: text})}
                label={strings.txtUserName}
              />
              <FloatingEditText
                password
                leftIcon={Images.ic_Password}
                style={styles.textPassword}
                value={this.state.password}
                onChangeText={text => this.setState({password: text})}
                label={strings.txtPassword}
              />

              <View style={styles.bottomShadowView}>
                <Button
                  disabled={!this.state.userName || !this.state.password}
                  onPress={() => {
                    this.login();
                  }}
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
