import {
  GET_ALL_CONTACT,
  GET_CUSTOMER,
  INSERT_OR_UPDATE_CONTACT,
  GET_CONTACT_BY_ID
} from '../../../network/ApiConstants';
import apiCall from '../../../network/ApiService';

const contactApi = {
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
  addOrUpdateContact(params, onDone, onError) {
    apiCall(
      INSERT_OR_UPDATE_CONTACT,
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
  getCustomers(params, onDone, onError) {
    apiCall(
      GET_CUSTOMER,
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
  getContactByID(param, onDone, onError) {
  
    apiCall(GET_CONTACT_BY_ID,  param , (res) => {
  
  
        if (onDone) {
            onDone(res)
        }
    }, (error) => {
        if (onError) {
            onError(error)
        }
    })
  },
};

export default contactApi;
