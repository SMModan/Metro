import React, {Component} from 'react';
import {View, Text, FlatList, ScrollView} from 'react-native';
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
  AMCInfo, 
  IssueDescription,
  OtherInfo,
  AssignTo,
  AddAttachment } from './BaseComponents';


export const ChildViews = ({isAddNew, selectedIndex, userChanged}) => {
  return (
    <ScrollContainer>
            <View style={styles.mainView}>
                <CustomerInfo/>
                <ContactInfo/>
                {isAddNew ? <AMCInfo/> : null}
                <IssueDescription/>
                <OtherInfo/>
                <AssignTo selectedIndex={selectedIndex} userChanged={userChanged}/>
                <AddAttachment/>

                <Button title={strings.save} style={{ margin: ResponsivePixels.size16 }} />
            </View>
        </ScrollContainer>
  )
}
class AddHelpDesk extends Component {

  state = {
    selectedIndex: 0
  }

  render() {
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => this.props.navigation.goBack(),
          },
          title: 'Add Issue',
          hideUnderLine: true,
          light: true,
        }}>
        <ChildViews isAddNew={true} selectedIndex={this.state.selectedIndex} userChanged={(index)=>{
          this.setState({
            selectedIndex: index
          })
        }}/>
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddHelpDesk);
