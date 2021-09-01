import axios from 'axios';
import moment from 'moment';
import { store } from '../../../App';
import { GET_ALL_HELPDESK_LIST, GET_AMC_BY_CUSTOMERID, GET_ASSIGN_TO_USERS, GET_CONATACTS_BY_CUSTOMER_ID, GET_CUSTOMERS_FOR_HELPDESK, GET_CUSTOMER_ADDRESS_BY_CUSTOMERID, GET_HELP_DESK_BY_ID, GET_IS_ADMIN_AND_IS_MODULE_ADMIN_BY_ENTITY_ID, GET_PRODUCTS_FOR_HELPDESK_VERSION1, GET_PRODUCT_CATEGORY, GET_PRODUCT_SERIAL_NO_BY_PRODUCT_ID_AND_AMCID, IMAGE_BASE_URL, INSERT_HELP_DESK, INSERT_HELP_DESK_SOLUTION_VERSION3, UPDATE_HELP_DESK } from '../../../network/ApiConstants';
import apiCall from '../../../network/ApiService';

const HelpDeskApi = {
  getAllList(params, onDone, onError) {
    apiCall(
      GET_ALL_HELPDESK_LIST,
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
  getIsAdmin(EntityID) {
    return new Promise((resolve, reject) => {

      apiCall(
        GET_IS_ADMIN_AND_IS_MODULE_ADMIN_BY_ENTITY_ID,
        { EntityID },
        res => {
          const { Table1 } = res

          if (Table1) {
            resolve(Table1.IsAdmin);
          } else {
            resolve(false);

          }
        },
        error => {
          resolve(false);

        },
      );
    })
  },
  insertSolution(params) {
    return new Promise((resolve, reject) => {

      apiCall(
        INSERT_HELP_DESK_SOLUTION_VERSION3,
        params,
        res => {

          resolve();

        },
        error => {
          reject(error)
        },
      );
    })
  },
  getHelpDeskDetails(HelpDeskID, onDone, onError) {

    apiCall(
      GET_HELP_DESK_BY_ID,
      { HelpDeskID },
      res => {
        const { Table, Table1, Table2, Table3, Table4 } = res
        let results = {}
        let AssignUserDetails = []
        let solutions = []
        if (Table) {
          const { ContactID, ContactMobileNo, FilePath, PlanVisitDate, ContactPersonName, IsSendMailToCustomer, EmailID } = Table
          const { ProductID, Remarks, ProductSerialNoDetailID, ProductCategoryID, SerialNo, } = Table1 || {}
          results = {
            ...results, ...Table, ContactID: { id: ContactID, EmailID, name: ContactPersonName, MobileNo: ContactMobileNo?.toString() }, sendMailToCustomer: IsSendMailToCustomer, ProductID, ProductRemarks: Remarks, ProductSerialNoDetailID, ProductCategoryID, SerialNo, PlanVisitDate: PlanVisitDate ? moment(PlanVisitDate).toDate() : undefined,
            file: { source: { uri: FilePath ? `${IMAGE_BASE_URL}${FilePath?.replace("~", "")}` : undefined } }

          }
        }
        if (Table4) {
          if (Array.isArray(Table4)) {

            AssignUserDetails = Table4.map((t) => ({
              recordId: t.ID,
              Priority: t.UserStatusID,
              id: t.UserID,
              OnHoldReason: t.OnHoldReason,
              state: 4,
              CompletionDateTime: undefined,
              DigiSignFileName: t.DigiSignFileName,
              DigiSignFilePath: t.DigiSignFilePath,
              DigiSignContentType: t.DigiSignContentType,
              DigiSignRemarks: t.DigiSignRemarks,
              DigiSignRating: t.DigiSignRating,
            }))
          } else {
            AssignUserDetails = [{
              recordId: Table4.ID,
              Priority: Table4.UserStatusID,
              OnHoldReason: Table4.OnHoldReason,
              state: 4,
              id: Table4.UserID,
              CompletionDateTime: undefined,
            }]
          }
        }
        if (Table2) {
          if (Array.isArray(Table2)) {

            solutions = Table2.map((t) => {
              let StartHr = ""
              let StartMin = ""
              if (t.SolutionDate) {
                const date = t.SolutionDate.split("T")
                const time = date[1].split(":")
                StartHr = time[0]
                StartMin = time[1]
              }
              return {
                id: t.ID,
                HelpDeskID: t.HelpDeskID,
                SolutionDate: moment(t.SolutionDate).toDate(),
                Actiontaken: t.ActionTaken,
                SolutionUserId: t.UserID,
                ExternalSolution: t.ExternalSolution,
                TimetakenHr: t.TimeTaken.toString().split(".")[0],
                TimetakenMin: t.TimeTaken.toString().split(".")[1],
                RowStatus: "modify",
                SolutionMin: StartMin,
                SolutionHr: StartHr,
              }
            })
          } else {

            let StartHr = ""
            let StartMin = ""
            if (Table2.SolutionDate) {
              const date = Table2.SolutionDate.split("T")
              const time = date[1].split(":")
              StartHr = time[0]
              StartMin = time[1]
            }
            solutions = [{
              id: Table2.ID,
              HelpDeskID: Table2.HelpDeskID,
              SolutionDate: moment(Table2.SolutionDate).toDate(),
              Actiontaken: Table2.ActionTaken,
              SolutionUserId: Table2.UserID,
              ExternalSolution: Table2.ExternalSolution,
              SolutionMin: StartMin,
              SolutionHr: StartHr,
              TimetakenHr: Table2.TimeTaken.toString().split(".")[0],
              TimetakenMin: Table2.TimeTaken.toString().split(".")[1],
              RowStatus: "modify"

            }]
          }
        }
        results.AssignUserDetails = AssignUserDetails
        results.solutions = solutions

        if (onDone) {

          onDone(results)
        }
      },
      error => {
        if (onError) {
          onError(error);
        }
      },
    );
  },
  insertHelpDesk(params, onDone, onError) {
    apiCall(
      INSERT_HELP_DESK,
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
  updateHelpDesk(params, onDone, onError) {
    apiCall(
      UPDATE_HELP_DESK,
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
  uploadHelpDeskAttachment(params) {

    return new Promise((resolve, reject) => {
      const { f, fileName, contentType } = params
      const { token, connectionString, machineCode } = store.getState().session

      let xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
        <soap12:Body>
          <UploadFileForHelpDesk xmlns="http://tempuri.org/">
            <Token>${token}</Token>
            <MachineCode>${machineCode || "dasmdmasndbasmdbsmadbmnsadbmasbdm"}</MachineCode>
            <ConnectionString>${connectionString}</ConnectionString>
            <f>${f}</f>
            <fileName>${fileName}</fileName>
            <contentType>${contentType}</contentType>
          </UploadFileForHelpDesk>
        </soap12:Body>
      </soap12:Envelope>`

      axios.post('https://www.skywardcrm.com/Services/CRMMobileApp.asmx?wsdl',
        xmls,
        {
          headers:
            { 'Content-Type': 'text/xml' }
        }).then(res => {
          var parser = require('fast-xml-parser');
          const jsonResponse = parser.parse(res.data)
          console.log("Upload", res);
          console.log("UploadjsonResponse", JSON.stringify(jsonResponse));
          let response = {}
          if (jsonResponse) {
            if (jsonResponse["soap:Envelope"]) {
              const soapEnvelope = jsonResponse["soap:Envelope"]

              const { UploadFileForHelpDeskResponse } = soapEnvelope["soap:Body"] || {}
              const { UploadFileForHelpDeskResult } = UploadFileForHelpDeskResponse || {}
              const { IsSucceed, FileName, FilePath, FileContentType } = UploadFileForHelpDeskResult || {}

              if (IsSucceed) {
                response = { FileName, FilePath, FileContentType }
              }
            }
          }
          resolve(response)
        }).catch(err => {
          console.log("UploadError", err)
          reject(err)
        });

    })
  },
  uploadHelpDeskSignature(params) {

    return new Promise((resolve, reject) => {
      const { f, fileName, contentType } = params
      const { token, connectionString, machineCode } = store.getState().session

      let xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
        <soap12:Body>
          <UploadFileForHelpDeskSignature  xmlns="http://tempuri.org/">
            <Token>${token}</Token>
            <MachineCode>${machineCode || "dasmdmasndbasmdbsmadbmnsadbmasbdm"}</MachineCode>
            <ConnectionString>${connectionString}</ConnectionString>
            <f>${f}</f>
            <fileName>${fileName}</fileName>
            <contentType>${contentType}</contentType>
          </UploadFileForHelpDeskSignature >
        </soap12:Body>
      </soap12:Envelope>`

      axios.post('https://www.skywardcrm.com/Services/CRMMobileApp.asmx?wsdl',
        xmls,
        {
          headers:
            { 'Content-Type': 'text/xml' }
        }).then(res => {
          var parser = require('fast-xml-parser');
          const jsonResponse = parser.parse(res.data)
          console.log("Upload", res);
          console.log("UploadjsonResponse", JSON.stringify(jsonResponse));
          let response = {}
          if (jsonResponse) {
            if (jsonResponse["soap:Envelope"]) {
              const soapEnvelope = jsonResponse["soap:Envelope"]

              const { UploadFileForHelpDeskSignatureResponse } = soapEnvelope["soap:Body"] || {}
              const { UploadFileForHelpDeskSignatureResult } = UploadFileForHelpDeskSignatureResponse || {}
              const { IsSucceed, FileName, FilePath, FileContentType } = UploadFileForHelpDeskSignatureResult || {}

              if (IsSucceed) {
                response = { FileName, FilePath, FileContentType }
              }
            }
          }
          resolve(response)
        }).catch(err => {
          console.log("UploadError", err)
          reject(err)
        });

    })
  },
  getCustomerForHelpDesk() {

    return new Promise((resolve, reject) => {

      apiCall(GET_CUSTOMERS_FOR_HELPDESK, { MaxCustomerID: 1 }, (res) => {

        const { Table } = res
        let results = []
        if (Table) {
          if (Array.isArray(Table)) {

            results = Table.map((t) => ({
              id: t.ID,
              name: t.CustomerName
            }))
          } else {
            results = [{
              id: Table.ID,
              name: Table.CustomerName
            }]
          }
        }

        // results = results.filter((t) => t.name.length > 0)

        // console.log("results", results)

        resolve(results)
      }, (error) => {
        resolve([])
      })

    })
  },
  getContactByCustomerId(CustomerID) {

    return new Promise((resolve, reject) => {

      apiCall(GET_CONATACTS_BY_CUSTOMER_ID, { CustomerID }, (res) => {

        const { Table } = res
        let results = []
        if (Table) {
          if (Array.isArray(Table)) {

            results = Table.map((t) => ({
              id: t.ID,
              name: t.ContactName,
              Phone: t.Phone,
              EmailID: t.EmailID,
              MobileNo: t.MobileNo?.toString()
            }))
          } else {
            results = [{
              id: Table.ID,
              name: Table.ContactName,
              Phone: Table.Phone,
              MobileNo: Table.MobileNo?.toString(),
              EmailID: Table.EmailID
            }]
          }
        }

        // results = results.filter((t) => t.name.length > 0)

        // console.log("results", results)

        resolve(results)
      }, (error) => {
        resolve([])
      })

    })
  },
  getCustomerAddressFromCustomerId(customerID) {

    return new Promise((resolve, reject) => {

      apiCall(GET_CUSTOMER_ADDRESS_BY_CUSTOMERID, { customerID }, (res) => {

        const { Table } = res
        let results = []
        if (Table) {
          if (Array.isArray(Table)) {

            results = Table.map((t) => ({
              id: t.ID,
              name: t.CustomerAddress
            }))
          } else {
            results = [{
              id: Table.ID,
              name: Table.CustomerAddress
            }]
          }
        }

        // results = results.filter((t) => t.name.length > 0)

        // console.log("results", results)

        resolve(results)

        // results = results.filter((t) => t.name.length > 0)

        // console.log("results", results)

        resolve(results)
      }, (error) => {
        resolve([])
      })

    })
  },
  getProductCategories() {

    return new Promise((resolve, reject) => {

      apiCall(GET_PRODUCT_CATEGORY, {}, (res) => {

        const { Table } = res
        let results = []
        if (Table) {
          if (Array.isArray(Table)) {

            results = Table.map((t) => ({
              id: t.ID,
              name: t.ProductCategoryName
            }))
          } else {
            results = [{
              id: Table.ID,
              name: Table.ProductCategoryName
            }]
          }
        }

        // results = results.filter((t) => t.name.length > 0)

        // console.log("results", results)

        resolve(results)
      }, (error) => {
        resolve([])
      })

    })
  },
  getProducts(ProductCategoryID, AMCID = 0) {

    return new Promise((resolve, reject) => {

      apiCall(GET_PRODUCTS_FOR_HELPDESK_VERSION1, { Prefix: "", ProductCategoryID, AMCID }, (res) => {

        const { Table } = res
        let results = []
        if (Table) {
          if (Array.isArray(Table)) {

            results = Table.map((t) => ({
              id: t.ID,
              name: t.ProductName
            }))
          } else {
            results = [{
              id: Table.ID,
              name: Table.ProductName
            }]
          }
        }

        // results = results.filter((t) => t.name.length > 0)

        // console.log("results", results)

        resolve(results)
      }, (error) => {
        resolve([])
      })

    })
  },
  getAMCByCustomerID(customerID, productID = 0) {

    return new Promise((resolve, reject) => {

      apiCall(GET_AMC_BY_CUSTOMERID, { customerID, productID }, (res) => {

        const { Table } = res
        let results = []
        if (Table) {
          if (Array.isArray(Table)) {

            results = Table.map((t) => ({
              id: t.ID,
              name: t.Name
            }))
          } else {
            results = [{
              id: Table.ID,
              name: Table.Name
            }]
          }
        }

        // results = results.filter((t) => t.name.length > 0)

        // console.log("results", results)

        resolve(results)
      }, (error) => {
        resolve([])
      })

    })
  },
  getProductSerialNoByProductIDAndAMCID(ProductID, AMCID = 0) {

    return new Promise((resolve, reject) => {

      apiCall(GET_PRODUCT_SERIAL_NO_BY_PRODUCT_ID_AND_AMCID, { ProductID, Prefix: "", AMCID }, (res) => {

        const { Table } = res
        let results = []
        if (Table) {
          if (Array.isArray(Table)) {

            results = Table.map((t) => ({
              id: t.ID,
              name: t.SerialNo
            }))
          } else {
            results = [{
              id: Table.ID,
              name: Table.SerialNo
            }]
          }
        }

        // results = results.filter((t) => t.name.length > 0)

        // console.log("results", results)

        resolve(results)
      }, (error) => {
        resolve([])
      })

    })
  },
  getAssignToUser() {

    return new Promise((resolve, reject) => {

      apiCall(GET_ASSIGN_TO_USERS, {}, (res) => {

        const { Table } = res
        let results = []
        if (Table) {
          if (Array.isArray(Table)) {

            results = Table.map((t) => ({
              id: t.ID,
              name: t.UserName
            }))
          } else {
            results = [{
              id: Table.ID,
              name: Table.UserName
            }]
          }
        }

        // results = results.filter((t) => t.name.length > 0)

        // console.log("results", results)

        resolve(results)
      }, (error) => {
        resolve([])
      })

    })
  }
};

export default HelpDeskApi;
