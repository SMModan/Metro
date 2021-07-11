import {
  GET_ALL_CONTACT, GET_ALL_CUSTOMER, GET_COUNTRIES, GET_STATE
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
  getAllContriesrList(params, onDone, onError) {
    apiCall(
      GET_COUNTRIES,
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
  }, getAllStateList(params, onDone, onError) {
    apiCall(
      GET_STATE,
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
