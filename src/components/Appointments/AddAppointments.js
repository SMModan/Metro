import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import {
  Button, ScrollContainer,
  MainContainer,
} from '../common';
import { connect } from 'react-redux';
import styles from '../HomeDetails/styles/HelpDesk.style';
import { strings } from '../../language/Language';
import { Images } from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import {
  EventInfo,
  AppointmentInfo,
  Remarks
} from './BaseComponents';


export const ChildViews = () => {
  return (
    <ScrollContainer>
      <View style={styles.mainView}>
        <EventInfo />
        <AppointmentInfo />
        <Remarks />
        <Button title={strings.submit} style={{ margin: ResponsivePixels.size16 }} />
      </View>
    </ScrollContainer>
  )
}
class AddAppointments extends Component {

  render() {
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => this.props.navigation.goBack(),
          },
          title: 'Add Appointment',
          hideUnderLine: true,
          light: true,
        }}>
        <ChildViews />
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddAppointments);
