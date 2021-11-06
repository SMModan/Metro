import React, {Component} from 'react';
import {Text, View, Image, Dimensions, Linking} from 'react-native';
import {Card} from 'react-native-paper';
import {goBack} from '../../navigation/Navigator';

import {Images, Colors, Utils} from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import {
  FloatingEditText,
  MainContainer,
  ProgressDialog,
  ScrollContainer,
} from '../common';
import StepIndicator from 'react-native-step-indicator';
const {width} = Dimensions.get('window');
const labels = ['', ''];
const customStyles = {
  stepIndicatorSize: 20,
  stepIndicatorSize: 15,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 1,
  stepStrokeCurrentColor: '#7eaec4',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: Colors.secondary500,
  stepStrokeUnFinishedColor: Colors.secondary500,
  separatorFinishedColor: Colors.secondary500,
  separatorUnFinishedColor: Colors.secondary500,
  stepIndicatorFinishedColor: Colors.secondary500,
  stepIndicatorUnFinishedColor: Colors.secondary500,
  stepIndicatorCurrentColor: Colors.secondary500,
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: 'transparent',
  stepIndicatorLabelUnFinishedColor: 'transparent',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#7eaec4',
};

export default class ShowMeRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startLocation: '',
      endLocation: '',
    };
  }

  render() {
    const {endLocation, startLocation} = this.state;
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => goBack(),
          },
          title: 'Show Me Route',
          hideUnderLine: true,
          light: true,
          isHome: true,
        }}>
        <ScrollContainer>
          <Card
            style={{
              margin: ResponsivePixels.size20,
              padding: ResponsivePixels.size10,
            }}>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <StepIndicator
                customStyles={customStyles}
                currentPosition="0"
                labels={labels}
                stepCount={2}
                direction="vertical"
              />
              <View style={{flexDirection: 'column', width: '80%'}}>
                <FloatingEditText
                  value={startLocation}
                  onChangeText={text => this.setState({startLocation: text})}
                  label={'Source Location'}
                  rightIcon={Images.ic_location}
                />
                <FloatingEditText
                  value={endLocation}
                  onChangeText={text => this.setState({endLocation: text})}
                  label={'Destination Location'}
                  rightIcon={Images.ic_location}
                />
              </View>
            </View>

            <Button
              title="Go"
              style={{
                margin: ResponsivePixels.size30,
                marginLeft: ResponsivePixels.size70,
              }}
              onPress={() => {
                const {startLocation, endLocation} = this.state;

                if (!startLocation) {
                  Utils.showToast('Please enter start Location.');
                } else if (!endLocation) {
                  Utils.showToast('Please enter end Location.');
                } else {
                  // alert("testing")
                  var url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${endLocation}`;
                  Linking.canOpenURL(url)
                    .then(supported => {
                      if (!supported) {
                        console.log("Can't handle url: " + url);
                      } else {
                        return Linking.openURL(url);
                      }
                    })
                    .catch(err => console.error('An error occurred', err));
                }
              }}
            />
          </Card>
        </ScrollContainer>
      </MainContainer>
    );
  }
}
