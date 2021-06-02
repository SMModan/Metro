import React, {Component} from 'react';
import {View, Text,Image} from 'react-native';
import {
  MainContainer,
  ScrollContainer,
  Clickable,
  Button,
  EditText,
  FloatingEditText,
} from '../../common';
import {connect} from 'react-redux';
import styles from '../styles/SignIn.style';
import {strings} from '../../../language/Language';
import {Images,Colors} from '../../../utils';
import SplashScreen from 'react-native-splash-screen'

class SignIn extends Component {
  async componentDidMount() {

    SplashScreen.hide();
  }

  render() {
    return (
      <MainContainer
        header={{ hideUnderLine: true, backgroundColor: Colors.white }}>
        <ScrollContainer>
          <View style={styles.ContainerView}>
            <View style={styles.ContainView}>
              <View style={styles.topView}>
                <Image source=
                  {Images.ic_LoginLogo} />
                <Text style={styles.loginTitle}>
                  {strings.LoginTitle}
                </Text>
                <Text style={styles.loginDesc}>
                  {strings.loginDescription}
                </Text>
              </View>
              <FloatingEditText
              leftIcon={Images.ic_Person}
              inputType="email-address"
                style={styles.textEmail}
                label={strings.txtEmailAddress}
              />
              <FloatingEditText
              password
              leftIcon={Images.ic_Password}
                style={styles.textPassword}
                label={strings.txtPassword}
              />
               <FloatingEditText
              password
              leftIcon={Images.ic_Company}
                style={styles.textPassword}
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
                  onPress={() => this.props.navigation.push('MyBottomTab')}
                  title={strings.btnLogin}></Button>
              </View>
            </View>
          </View>
        </ScrollContainer>
        </MainContainer>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);