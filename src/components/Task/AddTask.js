import _ from "lodash";
import moment from 'moment';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { strings } from '../../language/Language';
import { goBack, push } from '../../navigation/Navigator';
import { Images, Utils } from '../../utils';
import {
  DROPDWON_GET_PRIORITY, DROPDWON_GET_TASK_NAME
} from '../../utils/AppConstants';
import ResponsivePixels from '../../utils/ResponsivePixels';
import AppointmentApi from '../Appointments/Api/AppointmentApi';
import { Button, ChipViewContainer, CustomDatePicker, CustomPicker, FloatingEditText, ImageButton, MainContainer, ProgressDialog, ScrollContainer, ViewWithTitle } from '../common';
import SelectionView from '../common/SelectionView';
import TaskApi from './apis/TaskApi';
import WrappedComponentTask from './WrappedComponentTask';


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
      StartHr: '',
      StartMin: '',
      ownerRemarks: "",
      CommandName: "",
      AssigneeRemarks: "",
      ActivityID: 0,
      SetNextTimeHr: "",
      SetNextTimeMin: "",
    };
  }

  componentDidMount = () => {
    console.log("this.props.taskContext.item", this.props.taskContext.item)

    this.getDropDowns()
    this.getTaskDetails()
  }

  // onTextChanged = (key, value) => {
  //   // console.log("AssignTerritoryID", key, value)

  //   this.setState({
  //     [key]: value,
  //   });
  // };

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
    const { ActivityID, EntityFieldID, EntityFieldName } = this.state;

    ProgressDialog.show();
    const list = await AppointmentApi.getRelatedToByEntityID({
      EntityID,
      Prefix: '',
    });
    ProgressDialog.hide();
    if (flag) this.setState({ RelatedList: list });
    else
      this.setState({
        RelatedList: list,
        EntityFieldID: '',
        EntityFieldName: '',
      });
  };

  onSelectUser = item => {
    const { AssignUserName } = this.state;
    AssignUserName.push(item);
    this.setState({ AssignUserName: [...AssignUserName] });
  };

  onRemoveUser = index => {
    const { AssignUserName } = this.state;
    AssignUserName.splice(index, 1);
    this.setState({ AssignUserName: [...AssignUserName] });
  };

  getDropDowns = () => {
    const taskNameList = this.props.session[DROPDWON_GET_TASK_NAME];
    const priorityList = this.props.session[DROPDWON_GET_PRIORITY];
    const relatedTo = this.props.session.GetRelatedTo;
    const assignTo = this.props.session.GetUserForAssignActivity;
    const alertList = this.props.session.GetReminderAlert;
    console.log('relatedTo', relatedTo);

    const mins = ["00", "15", "30", "45"].map((item, index) => {
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
  getTaskDetails = async () => {
    console.log("this.props.item", this.props.taskContext.item)
    if (this.props.taskContext.item) {

      const details = await TaskApi.getTaskDetails(this.props.taskContext.item?.TaskActivityID)
      console.log("details", details)
      this.setState({
        ...details
      })

      this.props.taskContext.setTask(details)

      if (details.EntityID) {
        this.onTextChanged("EntityID", details.EntityID)
      }
    }

  }

  handleSubmit = () => {
    // InsertOrUpdateTaskActivityVersion4{Token=7FEFC4F7-65A0-436D-A2CA-C7AE96FD15B3; MachineCode=ce4620df04b20dca; ConnectionString=Data Source=NEXUS;Initial Catalog=SKYWARD_SkywardTechnoSolutionsPvtLtd_20160702051609037;User Id=apex;Password=passw0rd!;; ActivityID=0; TaskNameID=2; TaskName=Phone; TaskStatusID=1; EntityID=13; EntityName=Customer; EntityFieldID=2710; EntityFieldName=(A.Y.A.Y GHARKUL PVT LTD.) TECHNO SHARES; OwnerRemarks=remarks; AssigneeRemarks=; AssignUserName=,talatizalak@gmail.com; PriorityID=3; PriorityName=High; DueDate=01-08-2021; DueTime=16:15; ReminderAlertID=8; GeneralActivityName=; CompletionDateTime=; SetNextReminderDate=; SetNextReminderTime=; CommandName=SaveAndComplete; }

    const { taskId, TaskName, EntityID, ActivityID, AssigneeRemarks, EntityName, EntityFieldID, EntityFieldName, ownerRemarks,
      AssignUserName, PriorityID, SetNextReminderDate, SetNextTimeHr, SetNextTimeMin, PriorityName, StartDate, StartHr, StartMin, alertId, CommandName } = this.state

    const params = {
      ActivityID: ActivityID,
      TaskNameID: taskId || "",
      TaskName: TaskName || "",
      TaskStatusID: 1,
      EntityID: EntityID || '',
      EntityName: EntityName || '',
      EntityFieldID: EntityFieldID || "",
      EntityFieldName: EntityFieldName || "",
      OwnerRemarks: ownerRemarks || "",
      AssigneeRemarks: AssigneeRemarks || "",
      AssignUserName: AssignUserName.map((item) => item.name).join(","),
      PriorityID: PriorityID || "",
      PriorityName: PriorityName || "",
      DueDate: moment(StartDate).format("DD-MM-YYYY"),
      DueTime: `${StartHr}:${StartMin}`,
      ReminderAlertID: alertId,
      GeneralActivityName: "",
      CompletionDateTime: "",
      SetNextReminderDate: SetNextReminderDate ? moment(SetNextReminderDate).format("DD-MM-YYYY") : "",
      SetNextReminderTime: SetNextTimeHr && SetNextTimeMin ? `${SetNextTimeHr}:${SetNextTimeMin}` : "",
      CommandName: CommandName || "Save"
    }
    ProgressDialog.show()
    console.log("params======", params)
    TaskApi.addTask(params, (res) => {
      ProgressDialog.hide()
      if (res.ID && !this.props.taskContext.item) {
        push("TaskAttachment", { id: res.ID, editMode: false })

        // AlertDialog.show({
        //     title: "Attachment",
        //     message: "Do you want to add attachment",
        //     positiveButton: {
        //         onPress: () => {
        //             AlertDialog.hide()
        //             console.log("============================== res ==================================== ",res.ID)
        //          //  navigate("TaskAttachment", { id: res.ID, editMode: false })
        //          this.props.navigation.replace("TaskAttachment", { id: res.ID, editMode: false })

        //         },
        //         title: "Yes"
        //     },
        //     negativeButton: {
        //         onPress: () => {
        //             AlertDialog.hide()
        //         },
        //         title: "No"
        //     }
        // })
      }
      else
        goBack()
    }, (error) => {

      Utils.showToast(error)
      ProgressDialog.hide()
    })

  }
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
      PriorityID,
      assignTo,
      AssignUserName,
      StartDate,
      StartHr,
      StartMin,
      mins,
      hours,
      alertId,
      alertList,
      ownerRemarks,
      AssigneeRemarks,
      ActivityOwnerID,
      ActivityID,
      SetNextReminderDate,
      SetNextTimeHr,
      SetNextTimeMin,
    } = this.state;
    const isOwner = ActivityOwnerID == this.props.session.user.ID

    console.log("this.props.taskContext.item.TaskStatus", this.props.taskContext.item.TaskStatus)
    return (

      <ScrollContainer>

        <ViewWithTitle title="Task Information">
          <CustomPicker
            selectedItem={{ id: taskId }}
            onSelect={item => {
              this.onTextChanged('taskId', item.id);
              this.onTextChanged('TaskName', item.name);
            }}
            list={taskNameList}
            label={'Task Name'}
            rightIcon={Images.ic_down}
          />

          <ChipViewContainer
            selectedChip={{ id: EntityID }}
            onSelect={item => {
              console.log('item', item);
              this.onTextChanged('EntityID', item.id);
              this.onTextChanged('EntityName', item.name);
            }}
            title="Related to"
            chips={[{ id: 0, name: 'General' }, ...relatedTo]}
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
              selectedItem={{ id: EntityFieldID }}
              label={'Related Name'}
              onSelect={item => {
                this.onTextChanged('EntityFieldID', item.id)
                this.onTextChanged('EntityFieldName', item.name)
              }}
            />
          ) : null}

          <CustomPicker
            selectedItem={{ id: PriorityID }}
            onSelect={item => {
              this.onTextChanged('PriorityID', item.id);
              this.onTextChanged('PriorityName', item.name);
            }}
            list={priorityList}
            label={'Priority'}
            rightIcon={Images.ic_down}
          />
          <View>
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
              <Text
                style={[
                  {
                    color: Colors.blueGray700,
                    fontSize: ResponsivePixels.size18,
                    lineHeight: ResponsivePixels.size24,
                    fontWeight: '600',
                    fontFamily: FontName.regular,
                  },
                  { marginStart: 8 },
                ]}>
                {'Assign to'}
              </Text>
            </View>
            <View>

              {AssignUserName?.length ? (
                <View style={{ flexWrap: 'wrap', }}>
                  {AssignUserName.map((item, index) => (
                    <Chip
                      key={index}
                      style={{ margin: 5, backgroundColor: Colors.blueGray200 }}
                      textStyle={{ fontSize: 13, color: Colors.black }}
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
          {this.props.taskContext.item ? <View style={{ flexDirection: 'row', width: '100%', }}>
            <CustomDatePicker selectedDate={SetNextReminderDate} onDateChanged={(date) => {
              this.onTextChanged("SetNextReminderDate", date)
            }} label={"Set Next Reminder"} containerStyle={{ flex: 1, }} />
            <CustomPicker selectedItem={{ id: SetNextTimeHr }}
              onSelect={(item) => this.onTextChanged("SetNextTimeHr", item.id)} list={hours} label={'HH'}
              inputType="numeric" floaingStyle={{ width: 80, marginHorizontal: 10 }} />
            <CustomPicker selectedItem={{ id: SetNextTimeMin }} onSelect={(item) => this.onTextChanged("SetNextTimeMin", item.id)}
              list={mins} label={'MM'} inputType="numeric" floaingStyle={{ width: 80 }} />
          </View> : null}
          <CustomPicker
            selectedItem={{ id: alertId }}
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
            editable={!ActivityID || isOwner}
            value={ownerRemarks}
            label={'Owner Remarks'}
          />
          {!isOwner ? <FloatingEditText value={AssigneeRemarks} onChangeText={(text) => this.onTextChanged("AssigneeRemarks", text)} label={"Your Remarks"} /> : null}

        </ViewWithTitle>

        {!this.props.taskContext.item || this.props.taskContext.item.TaskStatus.toLowerCase() != 'completed' ? <View style={{ flexDirection: "row", margin: ResponsivePixels.size16, alignItems: "center", justifyContent: "space-evenly" }}>
          <Button title={strings.save} bordered style={{ width: 100, marginEnd: 8 }}
            onPress={() => {
              this.setState({
                CommandName: "Save"
              }, () => {
                this.handleSubmit()
              })
            }} />
          <Button title={strings.saveComplete} style={{ flex: 1, }} onPress={() => {
            this.setState({
              CommandName: "SaveAndComplete"
            }, () => {
              this.handleSubmit()
            })
          }} />
        </View> : null}
      </ScrollContainer>
    );
  }
}

export default WrappedComponentTask(AddTask);
