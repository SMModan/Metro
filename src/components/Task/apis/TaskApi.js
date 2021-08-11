import {
  GET_CONATACTS_BY_CUSTOMER_ID,
  GET_CUSTOMER,
  INSERT_OR_UPDATE_OPPORTUNITY,
  GET_ALL_TASKLIST,
  ADD_TASK,
  DELETE_TASK_ATTACHMENT
} from '../../../network/ApiConstants';
import { store } from "../../../App"
import apiCall, { METHOD } from "../../../network/ApiService"
import axios from "axios"


const TaskApi = {
  getAllTaskList(params, onDone, onError) {
    apiCall(
      GET_ALL_TASKLIST,
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
  },addTask(params, onDone, onError) {
    apiCall(
      ADD_TASK,
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

  addOrUpdateOpportunity(params, onDone, onError) {
    apiCall(
      INSERT_OR_UPDATE_OPPORTUNITY,
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
  getCustomers() {
    return new Promise((resolve, reject) => {
      apiCall(
        GET_CUSTOMER,
        {MaxCustomerID: 1},
        res => {
          const {Table} = res;
          let results = [];
          if (Table) {
            if (Array.isArray(Table)) {
              results = Table.map(t => ({
                id: t.ID,
                name: t.CustomerName,
              }));
            } else {
              results = [
                {
                  id: Table.ID,
                  name: Table.CustomerName,
                },
              ];
            }
          }

          // results = results.filter((t) => t.name.length > 0)
          // console.log("results", results)

          resolve(results);
        },
        error => {
          resolve([]);
        },
      );
    });
  },
  getContactByCustomerId(CustomerID) {
    return new Promise((resolve, reject) => {
      apiCall(
        GET_CONATACTS_BY_CUSTOMER_ID,
        {CustomerID},
        res => {
          const {Table} = res;
          let results = [];
          if (Table) {
            if (Array.isArray(Table)) {
              results = Table.map(t => ({
                id: t.ID,
                name: t.ContactName,
                email: t.EmailID,
                mobileNumber: t.MobileNo,
              }));
            } else {
              results = [
                {
                  id: Table.ID,
                  name: Table.ContactName,
                  email: Table.EmailID,
                  mobileNumber: Table.MobileNo,
                },
              ];
            }
          }

          // results = results.filter((t) => t.name.length > 0)

          // console.log("results", results)

          resolve(results);
        },
        error => {
          resolve([]);
        },
      );
    });
  },


  insertTastAttachment(params, onDone, onError) {

    // apiCall(INSERT_OPPORTUNITY_ATTACHMENT, params, (res) => {


    //     if (onDone) {
    //         onDone(res)
    //     }
    // }, (error) => {
    //     if (onError) {
    //         onError(error)
    //     }
    // })

    const { TaskActivityID, DocumentName, FileName, FileContentType, File } = params
    const { token, connectionString, machineCode } = store.getState().session

    let xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
        <soap12:Body>
          <InsertTaskAttachment xmlns="http://tempuri.org/">
            <Token>${token}</Token>
            <MachineCode>${machineCode || "dasmdmasndbasmdbsmadbmnsadbmasbdm"}</MachineCode>
            <ConnectionString>${connectionString}</ConnectionString>
            <TaskActivityID>${TaskActivityID}</TaskActivityID>
            <DocumentName>${DocumentName}</DocumentName>
            <FileName>${FileName}</FileName>
            <FileContentType>${FileContentType}</FileContentType>
            <File>${File}</File>
          </InsertTaskAttachment>
        </soap12:Body>
      </soap12:Envelope>`


    //       <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    //   <soap12:Body>
    //     <InsertOpportunityAttachment xmlns="http://tempuri.org/">
    //       <Token>string</Token>
    //       <MachineCode>string</MachineCode>
    //       <ConnectionString>string</ConnectionString>
    //       <OpportunityID>int</OpportunityID>
    //       <DocumentName>string</DocumentName>
    //       <FileName>string</FileName>
    //       <FileContentType>string</FileContentType>
    //       <File>base64Binary</File>
    //     </InsertOpportunityAttachment>
    //   </soap12:Body>
    // </soap12:Envelope>
    console.log("xmls", xmls)

    axios.post('https://www.skywardcrm.com/Services/CRMMobileApp.asmx?wsdl',
        xmls,
        {
            headers:
                { 'Content-Type': 'text/xml' }
        }).then(res => {
            console.log(res);
            onDone(res)
        }).catch(err => {
            console.log(err)
            onError(err)
        });
},
updateTaskAttachment(params, onDone, onError) {

    const { TaskActivityID, DocumentName, FileName, FilePath, ID, FileContentType, File } = params
    const { token, connectionString, machineCode } = store.getState().session

    let xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
        <soap12:Body>
          <UpdateTaskAttachment xmlns="http://tempuri.org/">
            <Token>${token}</Token>
            <MachineCode>${machineCode || "dasmdmasndbasmdbsmadbmnsadbmasbdm"}</MachineCode>
            <ConnectionString>${connectionString}</ConnectionString>
            <ID>${ID}</ID>
            <TaskActivityID>${TaskActivityID}</TaskActivityID>
            <DocumentName>${DocumentName}</DocumentName>
           <FilePath>${FilePath}</FilePath>
           <FileName>${FileName}</FileName>
           <FileContentType>${FileContentType}</FileContentType>
    <File>${File}</File> 
           <IsModified>${File ? 1 : 0}</IsModified>

          </UpdateOpportunityAttachment>
        </soap12:Body>
      </soap12:Envelope>`


    console.log("xmls", xmls)

    axios.post('https://www.skywardcrm.com/Services/CRMMobileApp.asmx?wsdl',
        xmls,
        {
            headers:
                { 'Content-Type': 'text/xml' }
        }).then(res => {
            console.log(res);
            onDone(res)
        }).catch(err => {
            console.log(err)
            onError(err)
        });

},
deleteTaskAttachment(params, onDone, onError) {

    apiCall(DELETE_TASK_ATTACHMENT, params, (res) => {


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

export default TaskApi;
