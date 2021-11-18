import axios from 'axios';
import moment from 'moment';
import { store } from '../../../App';
import {
  GET_ALL_APPOINTMENT,
  GET_LEAVE_FOR_EMPLOYEE,
  GET_APPOINTMENT_ACTIVITY_BY_ID,
  GET_APPOINTMENT_STARTDATE_ENDDATE_BY_USER_TIMEZONE,
  GET_RELATED_TO_BY_ENTITY_ID,
  INSERT_OR_UPDATE_APPOINTMENT_ACTIVITY,
  GET_USER_BASIC_PROFILE,
  GET_EMPLOYEES_USER_HIERARCHY,
  GET_SUPERVISOR,
  GET_LEAVE_TYPE,
  GET_LEAVE_BALANCE,
  GET_LEAVE_DAYS_BY_DATE,
  INSERT_LEAVE_APPLICATION,GetLeaveApproval, UpdateApprovalStatus
} from '../../../network/ApiConstants';
import apiCall from '../../../network/ApiService';



const LeaveApi = {
  getAllLeaves(params, onDone, onError) {

    apiCall(
      GET_LEAVE_FOR_EMPLOYEE,
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
  GetLeaveApproval(params, onDone, onError) {

    apiCall(
      GetLeaveApproval,
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
  },UpdateApprovalStatus(params, onDone, onError) {

    apiCall(
      UpdateApprovalStatus,
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
  },
  getEmplyeesUserHierarchy(params, onDone, onError) {

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
  }, getSupervisor(params, onDone, onError) {

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
  },getLeaveType(params, onDone, onError) {

    apiCall(
      GET_LEAVE_TYPE,
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
  },getLeaveBalance(params, onDone, onError) {

    apiCall(
      GET_LEAVE_BALANCE,
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
  },getLeaveDaysByDate(params, onDone, onError) {

    apiCall(
      GET_LEAVE_DAYS_BY_DATE,
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
  },AddLeaveRequest1(params, onDone, onError) {

    apiCall(
      INSERT_LEAVE_APPLICATION,
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
  AddLeaveRequest(params, onDone, onError) {

    const { EmployeeID, ReportingManagerId, FromDate, ToDate, TotalDays,Remarks,FromHalfDay,ToHalfDay,IsAllHalfDay,LeaveRequestTypeID
     ,DocumentName,DocumentContentType,DocumentContent,PhoneNumDuringLeave,StateID,EmployeeName} = params
     const token = store.getState().session.user.AuthenticationToken;
     const imageUrl = store.getState().session.imageUrl;



    let xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap110:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap110="http://www.w3.org/2003/05/soap-envelope">
    <soap110:Body>
          <InsertLeaveApplication  xmlns="http://metrotele.org/">
            <Token>${token}</Token>
            <EmployeeID>${EmployeeID}</EmployeeID>
            <ReportingManagerId>${ReportingManagerId}</ReportingManagerId>
            <FromDate>${FromDate}</FromDate>
            <ToDate>${ToDate}</ToDate>
            <TotalDays>${TotalDays}</TotalDays>
            <Remarks>${Remarks}</Remarks>
            <FromHalfDay>${FromHalfDay}</FromHalfDay>
            <ToHalfDay>${ToHalfDay}</ToHalfDay>
            <IsAllHalfDay>${IsAllHalfDay}</IsAllHalfDay>
            <LeaveRequestTypeID>${LeaveRequestTypeID}</LeaveRequestTypeID>
            <DocumentName>${DocumentName}</DocumentName>
            <DocumentContentType>${DocumentContentType}</DocumentContentType>
            <DocumentContent>${DocumentContent}</DocumentContent>
            <PhoneNumDuringLeave>${PhoneNumDuringLeave}</PhoneNumDuringLeave>
            <StateID>${StateID}</StateID>
            <EmployeeName>"test"</EmployeeName>
          </InsertLeaveApplication>
        </soap110:Body>
      </soap110:Envelope>`


    axios.post(imageUrl,
        xmls,
        {
            headers:
                { 'Content-Type': 'text/xml' }
        }).then(res => {

          var parser = require('fast-xml-parser');
          const jsonResponse = parser.parse(res?.data)
          const InsertLeaveApplicationResult =  jsonResponse && jsonResponse['soap:Envelope']['soap:Body']['InsertLeaveApplicationResponse']['InsertLeaveApplicationResult']

            onDone(InsertLeaveApplicationResult)
        }).catch(err => {
            console.log("errerrerr",err)
            console.log("err->", err.response.data)
            onError(err)
        });

},
};

export default LeaveApi;
