import React, { Component } from 'react'
import { Image, View, StatusBar, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../../actions/CommonActions'
import { Images, FontName, FontSize, Colors } from '../../../utils';


class Splash extends Component {

  timer = ""
  componentDidMount() {

    this.startTimer('SignIn')
  }

  startTimer(routeName) {

    timer = setInterval(() => {

      this.props.navigation.replace(routeName)
    }, 1000)
  }
  componentWillUnmount() {

    clearInterval(timer)
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.Defaultwhite,
          justifyContent: "center",
          alignItems: 'center'
        }}>
        <Image source={Images.ic_LoginLogo} />
      </View>
    );
  }
}

const mapStateToProps = () => {

  return {}
}


export default connect(mapStateToProps, actions)(Splash)