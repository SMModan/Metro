import axios from 'axios';
import { store } from '../../../App';
import {
  GetLeaveBalanceByEmployeeID,
  GetProjectByLocationId,
  GetWorkLocation,
  GetMarkinForSelectedDate,
  GET_DAILY_ATTENDANCE_DETAILS_FOR_VEHICLE,
  InsertDailyAttendanceForLocation,
  InsertDailyAttendanceForVehicle,
  GetPendingCarOutNumber
} from '../../../network/ApiConstants';
import apiCall from '../../../network/ApiService';


const CarAttendanceApi = {
  getAllList(params, onDone, onError) {

    apiCall(
      GET_DAILY_ATTENDANCE_DETAILS_FOR_VEHICLE,
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
  GetWorkLocation(params, onDone, onError) {

    apiCall(
      GetWorkLocation,
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
  GetProjectByLocationId(params, onDone, onError) {

    apiCall(
      GetProjectByLocationId,
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
  GetMarkinForSelectedDate(params, onDone, onError) {

    apiCall(
      GetMarkinForSelectedDate,
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
  },  GetPendingCarOutNumber(params, onDone, onError) {

    apiCall(
      GetPendingCarOutNumber,
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
  InsertDailyAttendanceForLocation(params, onDone, onError) {

    apiCall(
      InsertDailyAttendanceForLocation,
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
  InsertDailyAttendanceForVehicle(params, onDone, onError) {

    apiCall(
      InsertDailyAttendanceForVehicle,
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
  uploadCarDocument(params) {
    return new Promise((resolve, reject) => {

      const { EmployeeID, fileName, DocumentContent } = params
      const token = store.getState().session.user.AuthenticationToken;
      const imageUrl = store.getState().session.imageUrl;




      let xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap110:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap110="http://www.w3.org/2003/05/soap-envelope">
    <soap110:Body>
          <UploadFileForAttendance  xmlns="http://metrotele.org/">
            <Token>${token}</Token>
            <employeeID>${EmployeeID}</employeeID>
            <f>${DocumentContent}</f>
            <fileName>${fileName}</fileName>
          </UploadFileForAttendance>
        </soap110:Body>
      </soap110:Envelope>`
      // http://120.72.93.235:8050/Webservice/MetroService.asmx
      // axios.post('http://120.72.93.235:8050/Webservice/Metroservice.asmx?wsdl',
      axios.post(imageUrl,
        xmls,
        {
          headers:
            { 'Content-Type': 'text/xml' }
        }).then(res => {

          var parser = require('fast-xml-parser');
          const jsonResponse = parser.parse(res?.data)

          console.log("jsonResponsejsonResponse", JSON.stringify(jsonResponse))
          const InsertLeaveApplicationResult = jsonResponse && jsonResponse['soap:Envelope']['soap:Body']['UploadFileForAttendanceResponse']['UploadFileForAttendanceResult']

          resolve(InsertLeaveApplicationResult)
        }).catch(err => {
          console.log("errerrerr", err)
          console.log("err->", err.response.data)
          reject(err)
        });

    })
  }
};

export default CarAttendanceApi;
