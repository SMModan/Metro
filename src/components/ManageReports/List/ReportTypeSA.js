import React, { Component } from 'react';
import {
  Animated,
  Dimensions, Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Colors } from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';

const {width} = Dimensions.get('window');

 class ReportTypeSA extends Component {

constructor(props) {
    super(props)

    this.state = {
        active: 1,
        xTabOne: 0,
        xTabTwo: 0,
        xTabThree: 0,
        animatedWidth: '50%',
        announcementType: 1,
        translateX: new Animated.Value(80),
        translateXTabOne: new Animated.Value(width),
        translateXTabTwo: new Animated.Value(0),
        translateXTabThree: new Animated.Value(width),
        translateY: -1000,
          selectedIndex: 0,

    }
}

    
  handleSlide = type => {
    let {
      active,
      xTabOne,
      xTabTwo,
      xTabThree,
      translateX,
      translateXTabOne,
      translateXTabTwo,
      translateXTabThree,
    } = this.state;
    Animated.spring(translateX, {
      toValue: type,
      duration: 20,
    }).start();
    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 20,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 20,
        }).start(),
        Animated.spring(translateXTabThree, {
          toValue: width,
          duration: 20,
        }).start(),
      ]);
    } else if (active === 1) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: width,
          duration: 20,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          duration: 20,
        }).start(),
        Animated.spring(translateXTabThree, {
          toValue: width,
          duration: 20,
        }).start(),
      ]);
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: width,
          duration: 20,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 20,
        }).start(),
        Animated.spring(translateXTabThree, {
          toValue: 0,
          duration: 20,
        }).start(),
      ]);
    }
  };

    render() {
        let {
            xTabOne,
            xTabTwo,
            xTabThree,
            translateX,
            active,
            translateXTabOne,
            translateXTabTwo,
            translateXTabThree,
            translateY,
            animatedWidth,
          } = this.state;
        return (
            <View
            style={{
              flexDirection: 'row',
              marginTop: ResponsivePixels.size15,
              height: ResponsivePixels.size40,
              position: 'relative',
            }}>
            <Animated.View
              style={{
                position: 'absolute',
                width: animatedWidth || '50%',
                height: '100%',
                top: 0,
                left: 0,
                backgroundColor: Colors.Red900,
                borderRadius: 50,
                transform: [
                  {
                    translateX,
                  },
                ],
              }}
            />

            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: Colors.Red900,
                borderRadius: 50,
                borderRightWidth: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
              onLayout={event =>
                this.setState({
                  xTabOne: event.nativeEvent.layout.x,
                })
              }
              onPress={() =>
                this.setState(
                  {
                    active: 0,
                    animatedWidth: '25%',
                    announcementType: 2,
                    listData: [],
                  },
                  () => {
                    this.props.handleActiveIndex(0);
                    this.handleSlide(xTabOne);
                  },
                )
              }>
              <Text
                style={{
                  color: active === 0 ? '#fff' : Colors.secondary500,
                }}>
                Attendance
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: Colors.Red900,
                borderRadius: 1,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              onLayout={event =>
                this.setState({
                  xTabTwo: event.nativeEvent.layout.x,
                })
              }
              onPress={() =>
                this.setState(
                  {
                    active: 1,
                    animatedWidth: '50%',
                    announcementType: 1,
                    listData: [],
                  },
                  () => {
                    this.props.handleActiveIndex(1);

                    this.handleSlide(xTabTwo);
                  },
                )
              }>
              <Text
                style={{
                  color: active === 1 ? '#fff' : Colors.secondary500,
                }}>
                Car Attendance
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: Colors.Red900,
                borderRadius: 50,
                borderLeftWidth: 0,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              onLayout={event =>
                this.setState({
                  xTabThree: event.nativeEvent.layout.x,
                })
              }
              onPress={() =>
                this.setState({active: 2, animatedWidth: '25%'}, () =>
                  this.handleSlide(xTabThree),
                  this.props.handleActiveIndex(2)

                )
              }>
              <Text
                style={{
                  color: active === 2 ? '#fff' : Colors.secondary500,
                }}>
                Location
              </Text>
            </TouchableOpacity>
          </View>
        )
    }
}

export default ReportTypeSA
// SAPH