import React, {Component} from 'react';
import {View, Text, FlatList, ScrollView,DatePicker} from 'react-native';
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
  TaskInformation, 
  AssignTo,
  Reminder,
  OwnerRemarks,
   } from './BaseComponents';
  //  JCAAGF00U916CCN

export const ChildViews = (props) => {
  return (
    <ScrollContainer>
            <View style={styles.mainView}>
                <TaskInformation/>
                <AssignTo />
                <Reminder />
                <OwnerRemarks/>
             
                <View style={{ flexDirection: "row", margin: ResponsivePixels.size16, alignItems: "center", justifyContent: "space-evenly" }}>
                    <Button title={strings.save} bordered style={{ width: 100, marginEnd: 8 }} />
                    <Button title={strings.saveContinue} style={{ flex: 1, }} onPress={()=>{props.navigation.push("AddTaskAttachment")}}/>
                </View>
            </View>
        </ScrollContainer>
  )
}
class AddTask extends Component {

  render() {
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => this.props.navigation.goBack(),
          },
          title: 'Add Task',
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

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
