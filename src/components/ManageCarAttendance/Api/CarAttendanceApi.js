import {
  GetLeaveBalanceByEmployeeID,
  GetProjectByLocationId,
  GetWorkLocation,
  GetMarkinForSelectedDate,
  GET_DAILY_ATTENDANCE_DETAILS_FOR_VEHICLE,
  InsertDailyAttendanceForLocation,
  InsertDailyAttendanceForVehicle
} from '../../../network/ApiConstants';
import apiCall from '../../../network/ApiService';

const CarAttendanceApi = {
  getAllList(params, onDone, onError) {

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
  } ,
   GetWorkLocation(params, onDone, onError) {

    apiCall(
      GetWorkLocation,
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
  GetProjectByLocationId(params, onDone, onError) {

    apiCall(
      GetProjectByLocationId,
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
  GetMarkinForSelectedDate(params, onDone, onError) {

    apiCall(
      GetMarkinForSelectedDate,
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
  InsertDailyAttendanceForLocation(params, onDone, onError) {

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
  InsertDailyAttendanceForVehicle(params, onDone, onError) {

    apiCall(
      InsertDailyAttendanceForVehicle,
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

export default CarAttendanceApi;
