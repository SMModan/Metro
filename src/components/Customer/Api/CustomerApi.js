import {
  ADD_UPDATE_CUSTOMER,
  GET_ALL_CONTACT, GET_ALL_CUSTOMER, GET_COUNTRIES, GET_CUSTOMER_BY_ID, GET_CUSTOMER_CATEGORY, GET_CUSTOMER_TYPE, GET_STATE
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
  AddCustomer(params, onDone, onError) {
    apiCall(
      ADD_UPDATE_CUSTOMER,
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
   getCustomerCategory(params, onDone, onError) {
    apiCall(
      GET_CUSTOMER_CATEGORY,
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
  getCustomerType(params, onDone, onError) {
    apiCall(
      GET_CUSTOMER_TYPE,
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
  getCustomerById(params, onDone, onError) {
    apiCall(
      GET_CUSTOMER_BY_ID,
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




export default CustomerApi;
