import React, {Component} from 'react';
import {View, Text, FlatList, ScrollView, DatePicker} from 'react-native';

import {
  ImageButton,
  ChipViewContainer,
  SegmentView,
  UploadView,
  FloatingEditText,
  ViewWithTitle,
  ProgressDialog,
  CustomDatePicker,
} from '../common';
import {CustomPicker, MainContainer} from '../common';
import {connect} from 'react-redux';
import styles from '../HomeDetails/styles/HelpDesk.style';
import {strings} from '../../language/Language';
import {Images} from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import {Button, ScrollContainer} from '../common';
import {
  TaskInformation,
  AssignTo,
  Reminder,
  OwnerRemarks,
} from './BaseComponents';
import {
  DROPDWON_GET_PRIORITY,
  DROPDWON_GET_RELATED_TO,
  DROPDWON_GET_TASK_NAME,
} from '../../utils/AppConstants';
import WrappedComponentTask from './WrappedComponentTask';
import AppointmentApi from '../Appointments/Api/AppointmentApi';
import SelectionView from '../common/SelectionView';
import {Chip} from 'react-native-paper';
import _ from "lodash"
import { goBack } from '../../navigation/Navigator';


//  JCAAGF00U916CCN

export const ChildViews = props => {
  const {taskNameList} = props;
  return (
    <ScrollContainer>
      <View style={styles.mainView}>
        <TaskInformation taskNameList />

        <AssignTo />
        <Reminder />
        <OwnerRemarks />

        <View
          style={{
            flexDirection: 'row',
            margin: ResponsivePixels.size16,
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Button
            title={strings.save}
            bordered
            style={{width: 100, marginEnd: 8}}
          />
          <Button
            title={strings.saveContinue}
            style={{flex: 1}}
            onPress={() => {
              props.navigation.push('AddTaskAttachment');
            }}
          />
        </View>
      </View>
    </ScrollContainer>
  );
};
class AddTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskNameList: [],
      relatedTo: [],
      RelatedList: [],
      priorityList: [],
      AssignUserName: [],
      assignTo: [],
      alertList: [],
      mins: [],
      hours: [],
      EntityID: 0,
      alertId: 0,
      EntityFieldName: '',
      StartHr:'',
      StartMin:'',
      ownerRemarks:""
    };
  }

  componentDidMount() {
    const taskNameList = this.props.session[DROPDWON_GET_TASK_NAME];
    const priorityList = this.props.session[DROPDWON_GET_PRIORITY];
    const relatedTo = this.props.session.GetRelatedTo;
    const assignTo = this.props.session.GetUserForAssignActivity;
    const alertList = this.props.session.GetReminderAlert;
    console.log('relatedTo', relatedTo);

    const mins =["00", "15", "30", "45"].map((item, index) => {
      return { id: item, name: item.toString() }
  })

  const hours = _.range(0, 26).map((item, index) => {

    const value = index.toString().length > 1 ? index.toString() : `0${index}`

    return { id: value, name: value }
})
    this.setState(
      {
        taskNameList,
        relatedTo,
        priorityList,
        assignTo,
        hours,
        alertList,
        mins
      },
      () => {
        console.log('taskNametaskName', taskNameList);
      },
    );
  }

  onTextChanged = (key, value) => {
    // console.log("AssignTerritoryID", key, value)

    this.setState({
      [key]: value,
    });
  };

  onTextChanged = (key, value) => {
    console.log('key', key, value);

    this.setState({
      [key]: value,
    });

    if (key == 'EntityID' && value) {
      this.getRelatedToByEntityID(value);
    }
  };

  getRelatedToByEntityID = async (EntityID, flag) => {
    const {ActivityID, EntityFieldID, EntityFieldName} = this.state;

    ProgressDialog.show();
    const list = await AppointmentApi.getRelatedToByEntityID({
      EntityID,
      Prefix: '',
    });
    ProgressDialog.hide();
    if (flag) this.setState({RelatedList: list});
    else
      this.setState({
        RelatedList: list,
        EntityFieldID: '',
        EntityFieldName: '',
      });
  };

  onSelectUser = item => {
    const {AssignUserName} = this.state;
    AssignUserName.push(item);
    this.setState({AssignUserName: [...AssignUserName]});
  };

  onRemoveUser = index => {
    const {AssignUserName} = this.state;
    AssignUserName.splice(index, 1);
    this.setState({AssignUserName: [...AssignUserName]});
  };

  render() {
    const {
      taskNameList,
      taskId,
      relatedTo,
      EntityID,
      EntityFieldName,
      RelatedList,
      EntityFieldID,
      priorityList,
      priorityId,
      assignTo,
      AssignUserName,
      StartDate,
      StartHr,
      StartMin,
      mins,
      hours,
      alertId,
      alertList,
      ownerRemarks
    } = this.state;
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => goBack(),
          },
          title: 'Add Task',
          hideUnderLine: true,
          light: true,
        }}>
        <ScrollContainer>

          <ViewWithTitle title="Task Information">
            <CustomPicker
              selectedItem={{id: taskId}}
              onSelect={item => {
                this.onTextChanged('taskId', item.id);
              }}
              list={taskNameList}
              label={'Task Name'}
              rightIcon={Images.ic_down}
            />

            <ChipViewContainer
              selectedChip={{id: EntityID}}
              onSelect={item => {
                console.log('item', item);
                this.onTextChanged('EntityID', item.id);
                this.onTextChanged('EntityName', item.name);
              }}
              title="Related to"
              chips={[{id: 0, name: 'General'}, ...relatedTo]}
            />
            {EntityID == 0 ? (
              <FloatingEditText
                onChangeText={text =>
                  this.onTextChanged('EntityFieldName', text)
                }
                value={EntityFieldName}
                label={'Related Name'}
              />
            ) : RelatedList.length ? (
              <CustomPicker
                list={RelatedList}
                selectedItem={{id: EntityFieldID}}
                label={'Related Name'}
                onSelect={item => this.onTextChanged('EntityFieldID', item.id)}
              />
            ) : null}

            <CustomPicker
              selectedItem={{id: priorityId}}
              onSelect={item => {
                this.onTextChanged('priorityId', item.id);
              }}
              list={priorityList}
              label={'Priority'}
              rightIcon={Images.ic_down}
            />

            <View
              style={{
                flexDirection: 'row',
                marginVertical: 16,
                alignItems: 'flex-start',
              }}>
              <ImageButton
                source={Images.ic_add_blue}
                onPress={() => {
                  SelectionView.show({
                    title: 'Assign to',
                    onSelect: this.onSelectUser,
                    data: assignTo || [],
                  });
                }}
              />
              <View>
                <Text
                  style={[
                    {
                      color: Colors.blueGray700,
                      fontSize: ResponsivePixels.size18,
                      lineHeight: ResponsivePixels.size24,
                      fontWeight: '600',
                      fontFamily: FontName.regular,
                    },
                    {marginStart: 8},
                  ]}>
                  {'Assign to'}
                </Text>

                {AssignUserName?.length ? (
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {AssignUserName.map((item, index) => (
                      <Chip
                        key={index}
                        style={{margin: 5, backgroundColor: Colors.blueGray200}}
                        textStyle={{fontSize: 13, color: Colors.black}}
                        onClose={() => {
                          this.onRemoveUser(index);
                        }}
                        icon="account">
                        {item.name}
                      </Chip>
                    ))}
                  </View>
                ) : null}
              </View>
            </View>

            {/* <SegmentView title={'Priority'} segments={[{ name: "Low" }, { name: "Medium" }, { name: "High" },]} /> */}
          </ViewWithTitle>

     
     
          <ViewWithTitle title="Reminder">

          <View style={{ flexDirection: 'row', width: '100%', }}>
                <CustomDatePicker selectedDate={StartDate} onDateChanged={(date) => {
                    this.onTextChanged("StartDate", date)
                }} label={"Due Date"} containerStyle={{ flex: 1, }} />
                <CustomPicker selectedItem={{ id: StartHr }} 
                onSelect={(item) => this.onTextChanged("StartHr", item.id)} list={hours} label={'HH'} 
                inputType="numeric" floaingStyle={{ width: 80, marginHorizontal: 10 }} />
                <CustomPicker selectedItem={{ id: StartMin }} onSelect={(item) => this.onTextChanged("StartMin", item.id)} 
                list={mins} label={'MM'} inputType="numeric" floaingStyle={{ width: 80 }} />
            </View>
            <CustomPicker
              selectedItem={{id: alertId}}
              onSelect={item => {
                this.onTextChanged('alertId', item.id);
              }}
              list={alertList}
              label={'Alert'}
              rightIcon={Images.ic_down}
            />
            </ViewWithTitle>

            <ViewWithTitle title="Owner's Remark">
            <FloatingEditText
                onChangeText={text =>
                  this.onTextChanged('ownerRemarks', text)
                }
                value={ownerRemarks}
                label={'Owner Remarks'}
              />
            </ViewWithTitle>

            <Button  title={strings.submit} style={{ margin: ResponsivePixels.size16 }} />
        </ScrollContainer>
      </MainContainer>
    );
  }
}

export default WrappedComponentTask(AddTask);
