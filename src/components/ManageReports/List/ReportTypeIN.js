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

 class ReportTypeIN extends Component {

constructor(props) {
    super(props)

    this.state = {
        active: 0,
        xTabOne: 0,
        xTabTwo: 0,
        animatedWidth: '50%',
        announcementType: 0,
        translateX: new Animated.Value(0),
        translateXTabOne: new Animated.Value(0),
        translateXTabTwo: new Animated.Value(width),
        translateY: -1000,
          selectedIndex: 0,

    }
}

    
  handleSlide = type => {
    let {
      active,
      xTabOne,
      xTabTwo,
      translateX,
      translateXTabOne,
      translateXTabTwo,
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
      
      ]);
    } 
  };

    render() {
        let {
            xTabOne,
            xTabTwo,
            translateX,
            active,
            translateXTabOne,
            translateXTabTwo,
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
                width: animatedWidth ,
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
                    animatedWidth: '50%',
                  },
                  () => {
                    //  this.getAllAnnouncementNews();
                    this.props.handleActiveIndex(1);
                    this.handleSlide(xTabOne);
                  },
                )
              }>
              <Text
                style={{
                  color: active === 0 ? '#fff' : Colors.secondary500,
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
                borderRightWidth: 1,
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
                  },
                  () => {
                   this.props.handleActiveIndex(2);
                    this.handleSlide(xTabTwo);
                  },
                )
              }>
              <Text
                style={{
                  color: active === 1 ? '#fff' : Colors.secondary500,
                }}>
                    Location
              </Text>
            </TouchableOpacity>

    
          </View>
        )
    }
}

export default ReportTypeIN
