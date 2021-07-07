import {
  GET_ALL_NOTIFICATION
} from '../../../network/ApiConstants';
import apiCall from '../../../network/ApiService';

const NotificationApi = {
  getAllNotificaiton(params, onDone, onError) {
    apiCall(
      GET_ALL_NOTIFICATION,
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

export default NotificationApi
