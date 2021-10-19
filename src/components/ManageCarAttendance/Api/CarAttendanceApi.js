import {
  GET_DAILY_ATTENDANCE_DETAILS_FOR_VEHICLE
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
  } 
};

export default CarAttendanceApi;
