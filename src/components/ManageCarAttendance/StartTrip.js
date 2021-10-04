import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import {
  Button, ScrollContainer,
  MainContainer, ProgressDialog, ProgressView
} from '../common';
import { connect } from 'react-redux';
import styles from '../HomeDetails/styles/HelpDesk.style';
import { strings } from '../../language/Language';
import { Images, Utils } from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import {
  EventInfo,
  AppointmentInfo,
  Remarks
} from './BaseComponents';
import AppointmentApi from './Api/AppointmentApi';
import moment from 'moment';
import { goBack, push } from '../../navigation/Navigator';


export const StartTrip = React.createContext({})
class AddAppointments extends Component {

  state = {
    Location: "",
    IsFullDayEvent: 0,
    StartTime: "",
    EndTime: "",
    Subject: "",
    OwnerRemarks: "",
    AssigneeRemarks: "",
    AssignUserName: "",
    EntityID: 0,
    EntityName: "",
    EntityFieldID: 0,
    EntityFieldName: "",
    ReminderAlertID: 0,
    ActivityID: 0,
    AssignUserName: [],
    RelatedList: [],
    loading: false,
    AssignUserID: [],
    ActivityOwnerID: 0,
    user: this.props.session.user,
    AssignUserRemarks: []
  }

  componentDidMount = () => {

    console.log("this.props.route.params?.item?.ID", this.state.user)
    if (this.props.route.params?.item?.ID)
      this.getAppointmentDetails()
  }

  getAppointmentDetails = async () => {

    this.setState({ ...this.props.route.params?.item, loading: true })
    const appointment = await AppointmentApi.getAppointmentDetails(this.props.route.params?.item?.ID)

    console.log("appointment ======> in response", appointment)
    if (appointment.EntityID)
      this.getRelatedToByEntityID(appointment.EntityID, true)
    this.setState({ ...appointment, loading: false })
  }
  onTextChanged = (key, value) => {
    console.log("key", key, value)

    this.setState({
      [key]: value
    })

    if (key == "EntityID" && value) {

      this.getRelatedToByEntityID(value)
    }
  }
  onSelectUser = (item) => {
    // const selectedUser = this.state.selectedUser
    const { AssignUserName } = this.state
    AssignUserName.push(item)
    this.setState({ AssignUserName: [...AssignUserName] })

  }
  onRemoveUser = (index) => {
    const { AssignUserName } = this.state
    AssignUserName.splice(index, 1)
    this.setState({ AssignUserName: [...AssignUserName] })

  }

  getRelatedToByEntityID = async (EntityID, flag) => {
    const { ActivityID, EntityFieldID, EntityFieldName } = this.state

    ProgressDialog.show()
    const list = await AppointmentApi.getRelatedToByEntityID({
      EntityID,
      Prefix: ""
    })
    ProgressDialog.hide()
    if (flag)
      this.setState({ RelatedList: list, })
    else
      this.setState({ RelatedList: list, EntityFieldID: "", EntityFieldName: "" })
  }

  saveAppoinment = () => {

    const { Location, AssignUserName, EntityName, ActivityID, EntityID, ReminderAlertID, EntityFieldID, 
      EntityFieldName, AssigneeRemarks, IsFullDayEvent, OwnerRemarks, StartDate, StartHr, StartMin, EndDate,
       EndHr, EndMin, Subject, } = this.state
    if (Utils.isEmpty(Location)) {
      Utils.showToast("Please enter Location")
    }
    else if (Utils.isEmpty(StartDate) || Utils.isEmpty(StartHr) || Utils.isEmpty(StartMin)) {
      Utils.showToast("Please select Start Date")
    }
    else if (Utils.isEmpty(EndDate) || Utils.isEmpty(EndMin) || Utils.isEmpty(EndHr)) {
      Utils.showToast("Please select End Date")
    }
    else if (Utils.isEmpty(Subject)) {
      Utils.showToast("Please enter Subject")

    } else {
      
      const params = {
        Location,
        IsFullDayEvent,
        Subject,
        StartDate: moment(StartDate).format("DD-MM-YYYY"),
        StartTime: `${StartHr}:${StartMin}`,
        EndDate: EndDate ? moment(EndDate).format("DD-MM-YYYY") : "",
        EndTime: EndHr && EndMin ? `${EndHr}:${EndMin}` : "",
        OwnerRemarks,
        AssigneeRemarks: AssigneeRemarks || "",
        AssignUserName: AssignUserName.map((item) => item.name).join(","),
        EntityID,
        EntityName,
        ActivityID,
        ReminderAlertID,
        EntityFieldID,
        EntityFieldName,
      }
      ProgressDialog.show()
      AppointmentApi.InsertOrUpdateAppointment(params, (res) => {
        ProgressDialog.hide()
        if (this.props.route.params?.item?.ID){
        Utils.showToast("Appointment updated succesfully.")
        }else{
          Utils.showToast("Appointment added succesfully.")
        }

        goBack()
      }, (error) => {
        ProgressDialog.hide()
        Utils.showDangerToast(error)
      })
    }
  }
  render() {
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => goBack(),
          },
          title: this.props.route?.params?.item?.ID?'Update Appointment':"Add Appointment",
          hideUnderLine: true,
          light: true,
        }}>
        <AppoinmentContext.Provider value={{ ...this.state, onTextChanged: this.onTextChanged, onRemoveUser: this.onRemoveUser, onSelectUser: this.onSelectUser }}>
          {this.state.loading ? <ProgressView /> : <ScrollContainer>
            <View style={styles.mainView}>
              <EventInfo />
              <AppointmentInfo />
              <Remarks />
              <Button onPress={this.saveAppoinment} title={strings.submit} style={{ margin: ResponsivePixels.size16 }} />
            </View>
          </ScrollContainer>}
        </AppoinmentContext.Provider>
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.session
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StartTrip);
