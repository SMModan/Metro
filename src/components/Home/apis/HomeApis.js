import {
  GetAnnouncement, GetHolidayDetailsByToken, GetLeaveBalanceByEmployeeID, GetPendingleaveApprovalCount
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
  },
  GetLeaveBalanceByEmployeeID(params, onDone, onError) {

    apiCall(
      GetLeaveBalanceByEmployeeID,
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
  GetPendingleaveApprovalCount(params, onDone, onError) {

    apiCall(
      GetPendingleaveApprovalCount,
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
