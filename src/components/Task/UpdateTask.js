import _ from "lodash";
import moment from 'moment';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from "react-native-gesture-handler";
import { Chip } from 'react-native-paper';
import { strings } from '../../language/Language';
import { goBack, push } from '../../navigation/Navigator';
import { Images, Utils } from '../../utils';
import {
  DROPDWON_GET_PRIORITY, DROPDWON_GET_TASK_NAME
} from '../../utils/AppConstants';
import ResponsivePixels from '../../utils/ResponsivePixels';
import AppointmentApi from '../Appointments/Api/AppointmentApi';
import { Button, ChipViewContainer, CustomDatePicker, CustomPicker, FloatingEditText, ImageButton, MainContainer, ProgressDialog, ProgressView, ScrollContainer, ViewWithTitle } from '../common';
import SelectionView from '../common/SelectionView';
import TaskApi from './apis/TaskApi';
import WrappedComponentTask from './WrappedComponentTask';


class UpdateTask extends Component {
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
      user: this.props.session.user,
      loading: true
    };
  }

  componentDidMount = () => {

    this.getTaskDetails()
  }

  // onTextChanged = (key, value) => {
  //   // console.log("AssignTerritoryID", key, value)

  //   this.setState({
  //     [key]: value,
  //   });
  // };

  onTextChanged = (key, value) => {
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
    const relatedTo = this.props.session.GetRelatedTo || [];
    const assignTo = this.props.session.GetUserForAssignActivity || [];
    const alertList = this.props.session.GetReminderAlert || [];

    const mins = ["00", "15", "30", "45"].map((item, index) => {
      return { id: item, name: item.toString() }
    })

    const hours = _.range(0, 26).map((item, index) => {

      const value = index.toString().length > 1 ? index.toString() : `0${index}`

      return { id: value, name: value }
    })

    if (this.props.taskContext.item) {
      const {PriorityID} = this.state
      for (let index = 0; index < priorityList.length; index++) {
        const element = priorityList[index];
        if(element.id === PriorityID){
          this.setState({
            PriorityName:element.name
          },()=>{
            console.log("Priority Name ====>   ",this.state.PriorityName)
          })
        }
      }
      console.log("<======= priorityList ===>",priorityList)
    }
   
    this.setState(
      {
        taskNameList,
        relatedTo,
        priorityList,
        assignTo,
        hours,
        alertList,
        mins,
        loading: false
      },
      () => {
        // console.log('taskNametaskName', taskNameList);
      },
    );
  }
  getTaskDetails = async () => {
    if (this.props.taskContext.item) {

      const details = await TaskApi.getTaskDetails(this.props.taskContext.item?.TaskActivityID)
      
      console.log("<================================= details =====================================>", details._assigneeDetails)


      this.setState({
        ...details
      })

      this.props.taskContext.setTask(details)

      if (details.EntityID) {
        this.getRelatedToByEntityID(details.EntityID, true);

      }
    }
    this.getDropDowns()

  }






  handleSubmit = () => {
    // InsertOrUpdateTaskActivityVersion4{Token=7FEFC4F7-65A0-436D-A2CA-C7AE96FD15B3; MachineCode=ce4620df04b20dca; ConnectionString=Data Source=NEXUS;Initial Catalog=SKYWARD_SkywardTechnoSolutionsPvtLtd_20160702051609037;User Id=apex;Password=passw0rd!;; ActivityID=0; TaskNameID=2; TaskName=Phone; TaskStatusID=1; EntityID=13; EntityName=Customer; EntityFieldID=2710; EntityFieldName=(A.Y.A.Y GHARKUL PVT LTD.) TECHNO SHARES; OwnerRemarks=remarks; AssigneeRemarks=; AssignUserName=,talatizalak@gmail.com; PriorityID=3; PriorityName=High; DueDate=01-08-2021; DueTime=16:15; ReminderAlertID=8; GeneralActivityName=; CompletionDateTime=; SetNextReminderDate=; SetNextReminderTime=; CommandName=SaveAndComplete; }
    const { taskId, TaskName, EntityID, TaskActivityID, AssigneeRemarks, EntityName, EntityFieldID, EntityFieldName, ownerRemarks,
      AssignUserName, PriorityID, SetNextReminderDate, SetNextTimeHr, SetNextTimeMin, PriorityName, StartDate, StartHr, StartMin, 
      alertId, CommandName,RelatedList } = this.state
      let _RelatedName= ""
      console.log("===>SetNextTimeHrSetNextTimeHr ===>",""+SetNextTimeHr)
      console.log("===>SetNextTimeMinSetNextTimeMin ===>",""+SetNextTimeMin)
      for (let index = 0; index < RelatedList.length; index++) {
        const _related = RelatedList[index];
        if(_related.id == EntityFieldID){
          _RelatedName=_related.name
        }
      }
      let _nextHrMin = ''
      if(SetNextTimeHr && SetNextTimeMin){
        _nextHrMin = `${SetNextTimeHr}:${SetNextTimeMin}`
      }

    let params={ActivityID:TaskActivityID,
       TaskNameID:taskId,
        TaskName:TaskName,
         TaskStatusID:1,
          EntityID:EntityID,
           EntityName:EntityName,
            EntityFieldID:EntityFieldID,
             EntityFieldName:_RelatedName,
              OwnerRemarks:ownerRemarks,
               AssigneeRemarks:AssigneeRemarks,
                AssignUserName:"megha@skywardcloud.com",
                 PriorityID:PriorityID,
                  PriorityName:PriorityName,
                   DueDate:moment(StartDate).format("DD-MM-YYYY"),
                    DueTime:`${StartHr}:${StartMin}`,
                    ReminderAlertID: alertId||0 ,
                      GeneralActivityName:"",
                       CompletionDateTime:"",
                        SetNextReminderDate:moment(SetNextReminderDate).format("DD-MM-YYYY"),
                         SetNextReminderTime:_nextHrMin||"",
                          CommandName:CommandName || "Save" 
                        }
    ProgressDialog.show()
    console.log("params======", params)
    TaskApi.addTask(params, (res) => {
      ProgressDialog.hide()
      Utils.showToast("Task Updated Successfully.")
      if (res.ID && !this.props.taskContext.item) {
        push("TaskAttachment", { id: res.ID, editMode: false })
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
      loading,
      user,
      _assigneeDetails
    } = this.state;
    const isOwner = ActivityID == 0 || ActivityOwnerID == this.props.session.user.ID
    const isAssignedToMe = AssignUserName?.find((item) => item.id == user.ID)

    // console.log("this.props.taskContext.item.TaskStatus", this.props.taskContext.item.TaskStatus)
    return (

      loading ? <ProgressView /> : <ScrollContainer>

        <ViewWithTitle title="Task Information">
          <CustomPicker
            selectedItem={{ id: taskId }}
            onSelect={item => {
              this.onTextChanged('taskId', item.id);
              this.onTextChanged('TaskName', item.name);
            }}
            disabled={!isOwner}
            list={taskNameList}
            label={'Task Name'}
            rightIcon={Images.ic_down}
          />

          <ChipViewContainer
            selectedChip={{ id: EntityID }}
            disabled={!isOwner}

            onSelect={item => {
              // console.log('item', item);
              this.onTextChanged('EntityID', item.id);
              this.onTextChanged('EntityName', item.name);
            }}
            title="Related to"
            chips={[{ id: 0, name: 'General' }, ...relatedTo]}
          />
          {EntityID == 0 ? (
            <FloatingEditText
              disabled={!isOwner}
              onChangeText={text =>
                this.onTextChanged('EntityFieldName', text)
              }
              value={EntityFieldName}
              label={'Related Name'}
            />
          ) : RelatedList.length ? (
            <CustomPicker
              list={RelatedList}
              disabled={!isOwner}
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
            disabled={!isOwner}
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
                disabled={!isOwner}
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
                      disabled={!isOwner}
                      style={{ margin: 5, backgroundColor: Colors.blueGray200 }}
                      textStyle={{ fontSize: 13, color: Colors.black }}
                      onClose={isOwner ? () => {
                        this.onRemoveUser(index);
                      } : undefined}
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
            <CustomDatePicker disabled={!isOwner}
              selectedDate={StartDate} onDateChanged={(date) => {
                this.onTextChanged("StartDate", date)
              }} label={"Due Date"} containerStyle={{ flex: 1, }} />
            <CustomPicker disabled={!isOwner}
              selectedItem={{ id: StartHr }}
              onSelect={(item) => this.onTextChanged("StartHr", item.id)} list={hours} label={'HH'}
              inputType="numeric" floaingStyle={{ width: 80, marginHorizontal: 10 }} />
            <CustomPicker selectedItem={{ id: StartMin }} onSelect={(item) => this.onTextChanged("StartMin", item.id)}
              list={mins} disabled={!isOwner}
              label={'MM'} inputType="numeric" floaingStyle={{ width: 80 }} />
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
            disabled={!isOwner}
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
            editable={isOwner}
            value={ownerRemarks}
            label={'Owner Remarks'}
          />
        </ViewWithTitle>

      

        {isOwner && _assigneeDetails.length ?  <FlatList style={{ margin: ResponsivePixels.size10 }} data={_assigneeDetails}
                ListHeaderComponent={() => (<View style={{ flexDirection: "row", alignItems: "center", }}>
                    <View style={{ borderWidth: 1, flex: 1, padding: 8 }}>
                        <Text style={{ color: Colors.black, fontSize: FontSize.fontSize16 }}>{"UserName"}</Text>
                    </View>
                    <View style={{ borderWidth: 1, flex: 1, padding: 8 }}>
                        <Text style={{ color: Colors.black, fontSize: FontSize.fontSize16 }}>{"Completion Date"}</Text>
                    </View>
                </View>)}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                        <View style={{ borderWidth: 1, flex: 1, padding: 8 }}>
                            <Text style={{ color: Colors.blueGray900,minHeight:ResponsivePixels.size60 ,textAlignVertical:"center"  }}>{item.userName}</Text>
                        </View>
                        <View style={{ borderWidth: 1, flex: 1, padding: 8 }}>
                            <Text numberOfLines={3} style={{ color: Colors.blueGray900,textAlign:"center"
                            ,minHeight:ResponsivePixels.size60,textAlignVertical:"center" }}>
                              {item.formatedCompletionDate?item.formatedCompletionDate:"--"}</Text>
                        </View>
                       
                    </View>
                )}
            /> 
            : null}


     





        {!this.props.taskContext.item || this.props.taskContext.item.TaskStatus?.toLowerCase() != 'completed' ? <View style={{ flexDirection: "row", margin: ResponsivePixels.size16, alignItems: "center", justifyContent: "space-evenly" }}>
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

export default WrappedComponentTask(UpdateTask);
