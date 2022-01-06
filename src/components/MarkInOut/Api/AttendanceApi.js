import { GetDailyAttendanceDetails, GetLastMarkInTime, GetProjectsByEmployeeIDForDailyAttendance1, GET_EMPLOYEES_USER_HIERARCHY, InsertDailyAttendance, InsertDailyAttendanceForLocation } from '../../../network/ApiConstants';
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
