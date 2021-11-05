import axios from 'axios';
import moment from 'moment';
import { store } from '../../../App';
import {
  GET_ALL_APPOINTMENT,
  GET_LEAVE_FOR_EMPLOYEE,
  GET_APPOINTMENT_ACTIVITY_BY_ID,
  GET_APPOINTMENT_STARTDATE_ENDDATE_BY_USER_TIMEZONE,
  GET_RELATED_TO_BY_ENTITY_ID,
  INSERT_OR_UPDATE_APPOINTMENT_ACTIVITY,
  GET_USER_BASIC_PROFILE,
  GET_EMPLOYEES_USER_HIERARCHY,
  GET_SUPERVISOR,
  GET_LEAVE_TYPE,
  GET_LEAVE_BALANCE,
  GET_LEAVE_DAYS_BY_DATE,
  INSERT_LEAVE_APPLICATION,GetLeaveApproval, GetDailyAttendanceDetails, GetLastMarkInTime, GetProjectsByEmployeeIDForDailyAttendance, InsertDailyAttendanceForLocation, GetProjectsByEmployeeIDForDailyAttendance1, InsertDailyAttendance
} from '../../../network/ApiConstants';
import apiCall from '../../../network/ApiService';

const AttendanceApi = {
  GetDailyAttendanceDetails(params, onDone, onError) {

    apiCall(
      GetDailyAttendanceDetails,
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


  GetLastMarkInTime(params, onDone, onError) {

    apiCall(
      GetLastMarkInTime,
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
  }, InsertDailyAttendanceForLocation(params, onDone, onError) {

    apiCall(
      InsertDailyAttendanceForLocation,
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
  GetProjectsByEmployeeIDForDailyAttendance(params, onDone, onError) {

    apiCall(
      GetProjectsByEmployeeIDForDailyAttendance1,
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
  }, InsertDailyAttendance(params, onDone, onError) {

    apiCall(
      InsertDailyAttendance,
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

 
  getEmplyeesUserHierarchy(params, onDone, onError) {

    apiCall(
      GET_EMPLOYEES_USER_HIERARCHY,
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
 
};

export default AttendanceApi;
