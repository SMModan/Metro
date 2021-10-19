import {
  GetCashAdvanceByID,
  GET_CASH_ADVANCE_BY_EMPLOYEEID, Get_Circlewise_CreditLimit_And_RemainingAmount_For_CashAdvance, GET_EMPLOYEES_USER_HIERARCHY, Get_ExpenseHeads, Get_Projects_By_EmployeeID_For_Daily_Attendance, GET_SUPERVISOR, GET_USER_BASIC_PROFILE, InsertCashAdvance, UpdateCashAdvance
} from '../../../network/ApiConstants';
import apiCall from '../../../network/ApiService';

const CashAdvanceApi = {
  getAllList(params, onDone, onError) {

    apiCall(
      GET_CASH_ADVANCE_BY_EMPLOYEEID,
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
  }, getCashAdvanceByID(params, onDone, onError) {

    apiCall(
      GetCashAdvanceByID,
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
  }  , getEmplyeesUserHierarchy(params, onDone, onError) {

    apiCall(
      GET_EMPLOYEES_USER_HIERARCHY,
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
  },getExpenseHeads(params, onDone, onError) {

    apiCall(
      Get_ExpenseHeads,
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
  }, getBasicUserProfile(params, onDone, onError) {
    apiCall(
      GET_USER_BASIC_PROFILE,
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
  },getSupervisor(params, onDone, onError) {

    apiCall(
      GET_SUPERVISOR,
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
  },getProjectsByEmployeeIDForDailyAttendance(params, onDone, onError) {

    apiCall(
      Get_Projects_By_EmployeeID_For_Daily_Attendance,
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
  },getCirclewiseCreditLimitAndRemainingAmountForCashAdvance(params, onDone, onError) {

    apiCall(
      Get_Circlewise_CreditLimit_And_RemainingAmount_For_CashAdvance,
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
  },insertCashAdvance(params, onDone, onError) {

    apiCall(
      InsertCashAdvance,
      params,
      res => {
        console.log("res======================================================================================================================>",res)
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
  },UpdateCashAdvance(params, onDone, onError) {

    apiCall(
      UpdateCashAdvance,
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

export default CashAdvanceApi;
