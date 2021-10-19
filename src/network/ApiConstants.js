// export const BASE_URL = 'http://dev.skywardcrm.com/Services/CRMMobileapp.asmx/';
export const BASE_URL = 'http://120.72.93.235:5001/Webservice/Metroservice.asmx/';
export const IMAGE_BASE_URL = 'https://www.skywardcrm.com';

//LOGIN APIS

export const USER_AUTHENTICATION = "UserAuthentication"
export const GET_LEAVE_FOR_EMPLOYEE = "GetLeaveForEmployee"
export const GET_REIMBURSEMENT_BY_EMPLOYEEID = "GetReimbursementByEmployeeID"
export const GET_CASH_ADVANCE_BY_EMPLOYEEID = "GetCashAdvanceByEmployeeID"
export const GET_DAILY_ATTENDANCE_DETAILS_FOR_VEHICLE = "GetDailyAttendanceDetailsForVehicle"


// Leave Module End Points
export const GET_USER_BASIC_PROFILE = "GetBasicUserProfile"
export const GET_EMPLOYEES_USER_HIERARCHY = "GetEmplyeesUserHierarchy"
export const GET_SUPERVISOR = "GetSupervisor"
export const GET_LEAVE_TYPE = "GetLeaveType"
export const GET_LEAVE_BALANCE = "GetLeaveBalance"
export const GET_LEAVE_DAYS_BY_DATE = "GetLeaveDaysByDate"
export const INSERT_LEAVE_APPLICATION = "InsertLeaveApplication"

// Cash Advance end points
export const Get_ExpenseHeads = "GetExpenseHeads"
export const Get_Projects_By_EmployeeID_For_Daily_Attendance = "GetProjectsByEmployeeIDForDailyAttendance"
export const Get_Circlewise_CreditLimit_And_RemainingAmount_For_CashAdvance = "GetCirclewiseCreditLimitAndRemainingAmountForCashAdvance"
export const InsertCashAdvance = "InsertCashAdvance"
export const UpdateCashAdvance = "UpdateCashAdvance"
export const GetCashAdvanceByID = "GetCashAdvanceByID"


//Reimbursement end Points
export const GetReimbursementTypes = "GetReimbursementTypes"
export const InsertReimbursement = "InsertReimbursement"


//Home api end points
export const GetAnnouncement = "GetAnnouncement"
export const GetHolidayDetailsByToken = "GetHolidayDetailsByToken"








//other api end points
export const GET_COMPANY_BY_USERNAME = "GetCompanyNameByUserName"
export const GET_ALL_OPPORTUNITIES = "GetAllOpportunities"
export const GET_OPPORTUNITY_BY_ID = "GetOpportunityByID"
export const GET_OPPORTUNITY_ACTIVITY_BY_ID = "GetOpportunityActivityByID"
export const GET_CUSTOMER = "GetCustomers"
export const GET_CONATACTS_BY_CUSTOMER_ID = "GetContactsDetailsByCustomerID"
export const INSERT_OR_UPDATE_OPPORTUNITY = "InsertOrUpdateOpportunityVersion4"
export const INSERT_OPPORTUNITY_ATTACHMENT = "InsertOpportunityAttachment"
export const UPDATE_OPPORTUNITY_ATTACHMENT = "UpdateOpportunityAttachment"
export const DELETE_OPPORTUNITY_ATTACHMENT = "DeleteOpportunityAttachment"
export const GET_OPPORTUNITY_ATTACHMENT = "GetOpportunityAttachmentsByOpportunityID"
export const INSERT_USER_DEVICE_TOKEN = "InsertUserDeviceToken"

export const GET_PRODUCT_GROUPS = "GetProductGroup"
export const GET_PRODUCT_CATEGORIES = "GetProductCategory"
export const GET_PRODUCTS_FOR_OPP = "GetProductsForOpportunity"
export const GET_PRODUCT_BY_ID = "GetProductByID"
export const GET_PRICE_BOOK_LEVEL_BY_CURRENCY_ID = "GetPriceBookLevelByCurrencyIDAndUserID"
export const GET_PRODUCT_RATE_BY_CURRENCY_ID_LEVEL_ID = "GetProductRateByCurrencyIDAndLevelID"
export const GET_TERRITORY_FOR_ASSIGN_OPPORTUNITY = "GetUserAssignTerritoriesByUserID"
export const GET_USERS_BY_TERRITORY_ID_FOR_ASSIGN_OPPORTUNITY = "GetUsersByTerritoryIDForAssignOpportunity"
export const INSERT_OR_UPDATE_CUSTOMER_VERSION1 = "InsertOrUpdateCustomerVersion1"


// TaskList Api end points

export const GET_ALL_TASKLIST = "GetAllTaskActivityVersion1"
export const GETMULTIPLEREMARKS = "GetTaskActivityMultipleRemarksByTaskActivityID"
export const SENDREMARKS = "InsertTaskActivityMultipleRemarks"
export const DELETEREMARKS = "DeleteTaskActivityMultipleRemarks"
export const UPDATETASKSTATUS = "UpdateTaskStatusVersion1"

export const ADD_TASK = "InsertOrUpdateTaskActivityVersion4"
export const INSERT_TASK_ATTACHMENT = "InsertTaskAttachment"
export const UPDATE_TASK_ATTACHMENT = "UpdateTaskAttachment"
export const DELETE_TASK_ATTACHMENT = "DeleteTaskAttachment"
export const GET_TASK_BY_ACTIVITY_ID = "GetTaskActivityByID"

// Contact Api end points
export const GET_ALL_CONTACT = "GetAllContacts"
export const INSERT_OR_UPDATE_CONTACT = "InsertOrUpdateContact"
export const GET_CONTACT_BY_ID = "GetContactByID"


// Notificaiton Api end points
export const GET_ALL_NOTIFICATION = "GetUserNotificationDetailsByUserID"


// Get All customer Api end points
export const GET_ALL_CUSTOMER = "GetAllCustomers"
export const GET_COUNTRIES = "GetCountries"
export const GET_STATE = "GetStatesByCountryID"
export const GET_CUSTOMER_CATEGORY = "GetCustomerCategory"
export const GET_CUSTOMER_TYPE = "GetCustomerType"
export const GET_CUSTOMER_BY_ID = "GetCustomerByID"
export const ADD_UPDATE_CUSTOMER = "InsertOrUpdateCustomerVersion1"

// Get All Appointment Api end points

export const GET_ALL_APPOINTMENT = "GetAllAppointmentActivity"
export const GET_RELATED_TO_BY_ENTITY_ID = "GetRelatedToByEntityID"
export const INSERT_OR_UPDATE_APPOINTMENT_ACTIVITY = "InsertOrUpdateAppointmentActivity"
export const GET_APPOINTMENT_STARTDATE_ENDDATE_BY_USER_TIMEZONE = "GetAppointmentStartDateEndDateByUserTimeZone"
export const GET_APPOINTMENT_ACTIVITY_BY_ID = "GetAppointmentActivityByID"

// Get All HelpDesk List Api end points
export const GET_ALL_HELPDESK_LIST = "GetHelpDesksVersion1"
export const GET_CUSTOMERS_FOR_HELPDESK = "GetCustomersForHelpdesk"
export const GET_CONTACTS_BY_CUSTOMERID = "GetContactsByCustomerID"
export const GET_CUSTOMER_ADDRESS_BY_CUSTOMERID = "GetCustomerAddressByCustomerID"
export const GET_AMC_BY_CUSTOMERID = "GetAMCByCustomerID"
export const GET_PRODUCTS_FOR_HELPDESK_VERSION1 = "GetProductsForHelpDeskVersion1"
export const GET_HELPDESK_PROBLEM_DESCRIPTION = "GetHelpDeskProblemDescription"
export const GET_PRODUCT_CATEGORY = "GetProductCategory"
export const GET_PRODUCT_SERIAL_NO_BY_PRODUCT_ID_AND_AMCID = "GetProductSerialNoByProductIDAndAMCID"
export const GET_ASSIGN_TO_USERS = "GetAssignToUsers"
export const UPLOAD_FILE_FOR_HELPDESK = "UploadFileForHelpDesk"
export const INSERT_HELP_DESK = "InsertHelpdeskVersion6DigitalSignature"
export const UPDATE_HELP_DESK = "UpdateHelpdeskVersion7DigitalSignature"
export const GET_HELP_DESK_BY_ID = "GetHelpDeskByID"
export const GET_IS_ADMIN_AND_IS_MODULE_ADMIN_BY_ENTITY_ID = "GetIsAdminAndIsModuleAdminByEntityID"
export const INSERT_HELP_DESK_SOLUTION_VERSION3 = "InsertHelpdeskSolutionVersion3"

export const GET_QUOTATION_LIST = "GetAllQuotations"
export const DOWNLOAD_QUOTATION = "DownloadQuotation"
export const LOGOUTAPI= "LogoutVersion1"
export const USERPERMISSION= "GetUserPermissions"


// Get Analytics 

export const GET_PRODUCTCATEGORYWISE_OPPORTUNITYDATA_DASHBOARD = "GetProductCategoryWiseOpportunityDataForDashboardChart"
export const GET_SALESMANWISE_OPPORTUNITYDATA_DASHBOARD = "GetSalesmanWiseOpportunityDataForDashboardChart"
export const GET_TERRITORYWISE_OPPORTUNITYDATA_DASHBOARD = "GetTerritoryWiseOpportunityDataForDashboardChart"
export const GET_SOURCEWISE_OPPORTUNITYDATA_DASHBOARD = "GetSourceWiseOpportunityDataForDashboardChart"
export const GET_SALESSTAGE_WISE_OPPORTUNITYDATA_DASHBOARD = "GetSalesStageWiseOpportunityDataForDashboardChart"
export const GET_PRODUCTBRAND_WISE_OPPORTUNITYDATA_DASHBOARD = "GetProductBrandWiseOpportunityDataForDashboardChart"
export const GET_OPPORTUNITY_STAGE_WISE_OPPORTUNITYDATA_DASHBOARD = "GetOpportunityStageWiseOpportunityDataForDashboardChart"


// Check In Out Api


export const CHECKIN = "InsertCheckInOut"
export const CHECKOUT = "UpdateCheckInOut"
export const CHECKINOUTLISTING = "GetCheckInoutByTransactionType"

