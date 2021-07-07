import {
  GET_ALL_CONTACT, GET_ALL_CUSTOMER
} from '../../../network/ApiConstants';
import apiCall from '../../../network/ApiService';

const CustomerApi = {
  getAllCustomerList(params, onDone, onError) {
    apiCall(
      GET_ALL_CUSTOMER,
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

export default CustomerApi;
