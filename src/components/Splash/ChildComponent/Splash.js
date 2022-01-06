import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../../actions/CommonActions';
import { Colors, Images } from '../../../utils';


class Splash extends Component {

  timer = ""
  componentDidMount() {
    this.startTimer('SelectCountry')
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