import axios from 'axios';
import moment from 'moment';
import { Toast } from 'native-base';
import { store } from '../../../App';
import { CHECKIN, CHECKINOUTLISTING, CHECKOUT, GET_ALL_HELPDESK_LIST, GET_AMC_BY_CUSTOMERID, GET_ASSIGN_TO_USERS, GET_CONATACTS_BY_CUSTOMER_ID, GET_CUSTOMERS_FOR_HELPDESK, GET_CUSTOMER_ADDRESS_BY_CUSTOMERID, GET_HELP_DESK_BY_ID, GET_IS_ADMIN_AND_IS_MODULE_ADMIN_BY_ENTITY_ID, GET_PRODUCTS_FOR_HELPDESK_VERSION1, GET_PRODUCT_CATEGORY, GET_PRODUCT_SERIAL_NO_BY_PRODUCT_ID_AND_AMCID, IMAGE_BASE_URL, INSERT_HELP_DESK, INSERT_HELP_DESK_SOLUTION_VERSION3, UPDATE_HELP_DESK } from '../../../network/ApiConstants';
import apiCall from '../../../network/ApiService';
import { Utils } from '../../../utils';

const CheckInApi = {
  callCheckIn(params, onDone, onError) {
    apiCall(
      CHECKIN,
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
  },  callCheckOut(params, onDone, onError) {
    apiCall(
      CHECKOUT,
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
  }, getAllCheckInCheckOutList(params, onDone, onError) {
    apiCall(
      CHECKINOUTLISTING,
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

export default CheckInApi;
