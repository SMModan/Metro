import {
  GetAnnouncement, GetHolidayDetailsByToken
} from '../../../network/ApiConstants';
import apiCall, { METHOD } from '../../../network/ApiService';

const HomeApis = {
  GetAnnouncement(params, onDone, onError) {

    apiCall(
      GetAnnouncement,
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
  GetHolidayDetailsByToken(params, onDone, onError) {

    apiCall(
      GetHolidayDetailsByToken,
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

export default HomeApis;
