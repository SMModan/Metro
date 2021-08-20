import moment from 'moment';
import {
  GET_ALL_APPOINTMENT,
  GET_ALL_NOTIFICATION,
  GET_APPOINTMENT_ACTIVITY_BY_ID,
  GET_APPOINTMENT_STARTDATE_ENDDATE_BY_USER_TIMEZONE,
  GET_RELATED_TO_BY_ENTITY_ID,
  INSERT_OR_UPDATE_APPOINTMENT_ACTIVITY
} from '../../../network/ApiConstants';
import apiCall from '../../../network/ApiService';

const AppointmentApi = {
  getAllAppointment(params, onDone, onError) {
    
    apiCall(
      GET_ALL_APPOINTMENT,
      params,
      res => {
        if (onDone) {
          onDone(res);
        }
      },
      error => {
        if (onError) {
          onError(error);
        }
      },
    );
  },
  getRelatedToByEntityID(params) {

    return new Promise((resolve, reject) => {

      apiCall(GET_RELATED_TO_BY_ENTITY_ID, params, (res) => {

        const { Table } = res
        let results = []
        if (Table) {
          if (Array.isArray(Table)) {

            results = Table.map((t) => ({
              id: t.ID,
              name: t.FullName
            }))
          } else {
            results = [{
              id: Table.ID,
              name: Table.FullName
            }]
          }
        }

        // results = results.filter((t) => t.name.length > 0)

        // console.log("results", results)

        resolve(results)
      }, (error) => {
        resolve([])
      })

    })


  },
  InsertOrUpdateAppointment(params, onDone, onError) {
    apiCall(
      INSERT_OR_UPDATE_APPOINTMENT_ACTIVITY,
      params,
      res => {
        if (onDone) {
          onDone(res);
        }
      },
      error => {
        if (onError) {
          onError(error);
        }
      },
    );
  },
  getAppointment(ID) {

    return new Promise((resolve, reject) => {

      apiCall(GET_APPOINTMENT_ACTIVITY_BY_ID, { ID }, (res) => {

        const { Table, Table2 } = res
        let results = {}
        if (Table) {
          let users = []
          let usersIds = []
          if (Table2) {
            let { AssignUserName, AssignUserID } = Table2
            users = AssignUserName.split(",").map((item) => {

              const data = item.split("~")

              return { id: data[1].trim(), name: data[1].trim() }
            })
            usersIds = AssignUserID.toString().split(",")
          }
          results = { ...Table, ActivityID: Table.ID, OwnerRemarks: Table.Remarks, AssignUserID: usersIds, AssignUserName: users, IsFullDayEvent: Table.IsAllDayEvent ? 1 : 0 }
        }

        // results = results.filter((t) => t.name.length > 0)

        // console.log("results", results)

        resolve(results)
      }, (error) => {
        resolve({})
      })

    })


  },
  getAppointmentDates(ID) {

    return new Promise((resolve, reject) => {

      apiCall(GET_APPOINTMENT_STARTDATE_ENDDATE_BY_USER_TIMEZONE, { ID }, (res) => {

        const { Table, Table1 } = res
        const { StartTime } = Table
        const { EndTime } = Table1

        // results = results.filter((t) => t.name.length > 0)

        // console.log("results", results)

        const startMoment = moment(StartTime).local()
        const endMoment = moment(EndTime).local()

        const startDate = startMoment.toDate()
        const endDate = endMoment.toDate()
        const StartHr = startMoment.format("HH")
        const EndHr = endMoment.format("HH")
        const StartMin = startMoment.format("mm")
        const EndMin = endMoment.format("mm")
        console.log("startMoment", startMoment.get("hours"), startMoment.get("minute"))
        resolve({ StartDate: startDate, EndDate: endDate, StartHr, EndHr, StartMin, EndMin })
      }, (error) => {
        resolve([])
      })

    })


  },

  async getAppointmentDetails(ID) {

    const appointment = await this.getAppointment(ID)
    const date = await this.getAppointmentDates(ID)

    return { ...appointment, ...date }
  },
};

export default AppointmentApi;
