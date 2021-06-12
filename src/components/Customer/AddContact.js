import React, {Component} from 'react';
import {View, } from 'react-native';
import {
  MainContainer,
} from '../common';
import {connect} from 'react-redux';
import styles from '../HomeDetails/styles/HelpDesk.style';
import {strings} from '../../language/Language';
import {Images } from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import { Button, ScrollContainer } from '../common'
import { 
  CustomerInfo, 
  ContactInfo,
   } from './BaseComponents';
  //  JCAAGF00U916CCN

export const ChildViews = (props) => {
  return (
    <ScrollContainer>
            <View style={styles.mainView}>
                <CustomerInfo/>
                <ContactInfo />
                <Button title={strings.save} style={{ margin: ResponsivePixels.size16 }} />
            </View>
        </ScrollContainer>
  )
}
class AddContact extends Component {

  render() {
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => this.props.navigation.goBack(),
          },
          title: 'Add Contact',
          hideUnderLine: true,
          light: true,
        }}>
        <ChildViews isAddNew={true} {...this.props}/>
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddContact);
