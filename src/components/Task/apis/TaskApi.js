import {
  GET_CONATACTS_BY_CUSTOMER_ID,
  GET_CUSTOMER,
  INSERT_OR_UPDATE_OPPORTUNITY,
  GET_ALL_TASKLIST,
  ADD_TASK,
  DELETE_TASK_ATTACHMENT,
  GET_TASK_BY_ACTIVITY_ID,
  IMAGE_BASE_URL,
  GETMULTIPLEREMARKS,
  SENDREMARKS,
  DELETEREMARKS,
  UPDATETASKSTATUS
} from '../../../network/ApiConstants';
import { store } from "../../../App"
import apiCall, { METHOD } from "../../../network/ApiService"
import axios from "axios"
import moment from 'moment';


const TaskApi = {
  updateTaskStatus(params, onDone, onError) {
    apiCall(
      UPDATETASKSTATUS,
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
  },deleteRemarks(params, onDone, onError) {
    apiCall(
      DELETEREMARKS,
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
  sendRemarks(params, onDone, onError) {
    apiCall(
      SENDREMARKS,
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
  }, getAllRemarsk(params, onDone, onError) {
    apiCall(
      GETMULTIPLEREMARKS,
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
  }, getAllTaskList(params, onDone, onError) {
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
  }, 
  
  addTask(params, onDone, onError) {
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
        { MaxCustomerID: 1 },
        res => {
          const { Table } = res;
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
        { CustomerID },
        res => {
          const { Table } = res;
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

          </UpdateTaskAttachment>
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
  getTaskDetails(ID) {
    return new Promise((resolve, reject) => {
      apiCall(
        GET_TASK_BY_ACTIVITY_ID,
        { ID },
        res => {
          const { Table1, Table3, Table6,Table5 } = res;
          let _assigneeDetails = []

          let results = {};
          if (Table1) {
            let users = []
            let attachments = []
            if (Table3) {
                console.log("Table3 ===>>>>>",Table3)
              if (Array.isArray(Table3)) {
                users = Table3.map(t => ({
                  id: t.AssignUserID,
                  name: t.AssignUserName.split("~")[1]?.trim(),
                }));
              } else {
                users = [
                  {
                    id: Table3.AssignUserID,
                    name: Table3.AssignUserName.split("~")[1]?.trim(),
                  },
                ];
              }
            }

            if (Table5) {
                if (Array.isArray(Table5)) {
                  _assigneeDetails = Table5.map(t => ({
                    id: t.ID,
                    taskStatusId: t.TaskStatusID,
                    userId: t.UserID,
                    userName: t.UserName,
                    TaskRemarks: t.TaskRemarks,
                    formatedCompletionDate: t.FormatedCompletionDate,
                  }));
                } else {
                  _assigneeDetails = [
                    {
                      id: Table5.ID,
                      taskStatusId: Table5.TaskStatusID,
                      userId: Table5.UserID,
                      userName: Table5.UserName,
                      TaskRemarks: Table5.TaskRemarks,
                      formatedCompletionDate: Table5.FormatedCompletionDate,
                    },
                  ];
                }
              }


            if (Table6) {

              if (Array.isArray(Table6)) {
                attachments = Table6.map(t => ({
                  id: t.ID,
                  name: t.DocumentName,
                  path: t.FilePath,
                  file: { source: { uri: `${IMAGE_BASE_URL}${t.FilePath?.replace("~", "")}` } }

                }));
              } else {
                attachments = [
                  {
                    id: Table6.ID,
                    name: Table6.DocumentName,
                    path: Table6.FilePath,
                    file: { source: { uri: `${IMAGE_BASE_URL}${Table6.FilePath?.replace("~", "")}` } }

                  },
                ];
              }
            }
            const dueDate = moment(Table1.DueDate)
            let StartHr = 0
            let StartMin = 0
            if (Table1.DueDate) {
              const date = Table1.DueDate.split("T")
              const time = date[1].split(":")
              StartHr = time[0]
              StartMin = time[1]
            }
            console.log("Hr", StartHr, StartMin, dueDate.toDate().getTime())
            results = {
              ...Table1, taskId: Table1.TaskNameID, StartHr, StartMin, StartDate: dueDate.toDate(), alertId: Table1.ReminderAlertID,
              ownerRemarks: Table1.Remarks, AssignUserName: users, attachments,_assigneeDetails
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
  }
};

export default TaskApi;
