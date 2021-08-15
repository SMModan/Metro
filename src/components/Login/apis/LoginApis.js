import {
  GET_COMPANY_BY_USERNAME,
  INSERT_USER_DEVICE_TOKEN,
  USER_AUTHENTICATION,
} from '../../../network/ApiConstants';
import apiCall, { METHOD } from '../../../network/ApiService';

const loginApi = {
  getCompanyNameByUserName(userName, onDone, onError) {
    apiCall(
      GET_COMPANY_BY_USERNAME,
      { UserName: userName },
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
      METHOD.POST,
      true,
    );
  },
  login(params, onDone, onError) {
    apiCall(
      USER_AUTHENTICATION,
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
      METHOD.POST,
      true,
    );
  },
  setDeviceToken(params, onDone, onError) {
    apiCall(
      INSERT_USER_DEVICE_TOKEN,
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
      METHOD.POST,
      true,
    );
  },
};

export default loginApi;
