import { CHECKIN, CHECKINOUTLISTING, CHECKOUT } from '../../../network/ApiConstants';
import apiCall from '../../../network/ApiService';

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
