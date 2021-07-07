import {
  GET_ALL_APPOINTMENT,
  GET_ALL_NOTIFICATION
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

 
};

export default AppointmentApi;
