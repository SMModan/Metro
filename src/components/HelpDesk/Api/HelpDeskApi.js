import {
  GET_ALL_CONTACT
} from '../../../network/ApiConstants';
import apiCall from '../../../network/ApiService';

const HelpDeskApi = {
  getAllContactList(params, onDone, onError) {
    apiCall(
      GET_ALL_CONTACT,
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

export default HelpDeskApi;
