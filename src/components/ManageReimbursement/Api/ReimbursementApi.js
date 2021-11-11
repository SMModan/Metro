import axios from 'axios';
import { store } from '../../../App';
import {
  GetReimbursementByID,
  GetReimbursementTypes,
  GET_EMPLOYEES_USER_HIERARCHY,
  Get_ExpenseHeads,
  Get_Projects_By_EmployeeID_For_Daily_Attendance,
  GET_REIMBURSEMENT_BY_EMPLOYEEID,
  GET_SUPERVISOR,
  GET_USER_BASIC_PROFILE,
  InsertReimbursement,
  UpdateReimbursement
} from '../../../network/ApiConstants';
import apiCall from '../../../network/ApiService';

const ReimbursementApi = {
  getAllList(params, onDone, onError) {

    apiCall(
      GET_REIMBURSEMENT_BY_EMPLOYEEID,
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
  } , getEmplyeesUserHierarchy(params, onDone, onError) {

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
  }, GetReimbursementTypes(params, onDone, onError) {

    apiCall(
      GetReimbursementTypes,
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
  getBasicUserProfile(params, onDone, onError) {
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
  },getReimbursementByID(params, onDone, onError) {

    apiCall(
      GetReimbursementByID,
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
  },addReimbursementFile(params, onDone, onError) {

    const { EmployeeID,fileName,DocumentContent} = params
     const token = store.getState().session.user.AuthenticationToken;

console.log("tokennnn",token)
console.log("EmployeeID",EmployeeID)
console.log("fileName",fileName)
console.log("DocumentContent",DocumentContent)

    let xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap110:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap110="http://www.w3.org/2003/05/soap-envelope">
    <soap110:Body>
          <UploadExpenseDocument  xmlns="http://metrotele.org/">
            <Token>${token}</Token>
            <employeeID>${EmployeeID}</employeeID>
            <f>${DocumentContent}</f>
            <fileName>${fileName}</fileName>
          </UploadExpenseDocument>
        </soap110:Body>
      </soap110:Envelope>`


    axios.post('http://120.72.93.235:8050/Webservice/Metroservice.asmx?wsdl',
        xmls,
        {
            headers:
                { 'Content-Type': 'text/xml' }
        }).then(res => {

          var parser = require('fast-xml-parser');
          const jsonResponse = parser.parse(res?.data)

          console.log("jsonResponsejsonResponse",JSON.stringify(jsonResponse))
          const InsertLeaveApplicationResult =  jsonResponse && jsonResponse['soap:Envelope']['soap:Body']['UploadExpenseDocumentResponse']['UploadExpenseDocumentResult']

            onDone(InsertLeaveApplicationResult)
        }).catch(err => {
            console.log("errerrerr",err)
            console.log("err->", err.response.data)
            onError(err)
        });

},

InsertReimbursement(params, onDone, onError) {

  apiCall(
    InsertReimbursement,
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
UpdateReimbursement(params, onDone, onError) {

  apiCall(
    UpdateReimbursement,
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

export default ReimbursementApi;
