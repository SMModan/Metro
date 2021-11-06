import moment from 'moment';
import { store } from '../../../App';
import {
  GetDailyAttendanceDetails,
  GetDailyEmployeeLocationForMAP,
  GET_ALL_APPOINTMENT,
  GET_ALL_NOTIFICATION,
  GET_APPOINTMENT_ACTIVITY_BY_ID,
  GET_APPOINTMENT_STARTDATE_ENDDATE_BY_USER_TIMEZONE,
  GET_DAILY_ATTENDANCE_DETAILS_FOR_VEHICLE,
  GET_EMPLOYEES_USER_HIERARCHY,
  GET_RELATED_TO_BY_ENTITY_ID,
  INSERT_OR_UPDATE_APPOINTMENT_ACTIVITY
} from '../../../network/ApiConstants';
import apiCall from '../../../network/ApiService';

const ReportsApi = {
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
  },GetDailyAttendanceDetailsForVehicle(params, onDone, onError) {

    apiCall(
      GET_DAILY_ATTENDANCE_DETAILS_FOR_VEHICLE,
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
  },GetDailyAttendanceDetails(params, onDone, onError) {

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
  },GetDailyEmployeeLocationForMAP(params, onDone, onError) {

    apiCall(
      GetDailyEmployeeLocationForMAP,
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

export default ReportsApi;
