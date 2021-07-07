import { GET_ALL_HELPDESK_LIST } from '../../../network/ApiConstants';
import apiCall from '../../../network/ApiService';

const HelpDeskApi = {
  getAllList(params, onDone, onError) {
    apiCall(
      GET_ALL_HELPDESK_LIST,
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
