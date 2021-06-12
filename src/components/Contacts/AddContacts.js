import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import {
  MainContainer,
} from '../common';
import { connect } from 'react-redux';
import styles from '../HomeDetails/styles/HelpDesk.style';
import { strings } from '../../language/Language';
import { Images } from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import { Button, ScrollContainer } from '../common'
import {
  CustomerInfo,
  ContactInfo
} from './BaseComponents';


class AddContacts extends Component {

  render() {
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => this.props.navigation.goBack(),
          },
          title: 'Contact',
          hideUnderLine: true,
          light: true,
        }}>
        <ScrollContainer>
          <View style={styles.mainView}>
            <CustomerInfo />
            <ContactInfo />
            <Button title={strings.save} style={{ margin: ResponsivePixels.size16 }} />
          </View>
        </ScrollContainer>
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddContacts);
