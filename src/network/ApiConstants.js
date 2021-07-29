// export const BASE_URL = 'http://dev.skywardcrm.com/Services/CRMMobileapp.asmx/';
export const BASE_URL = 'https://www.skywardcrm.com/Services/CRMMobileApp.asmx/';
export const IMAGE_BASE_URL = 'https://www.skywardcrm.com';

//LOGIN APIS
export const GET_COMPANY_BY_USERNAME = "GetCompanyNameByUserName"
export const USER_AUTHENTICATION = "UserAuthentication"
export const GET_ALL_OPPORTUNITIES = "GetAllOpportunities"
export const GET_OPPORTUNITY_BY_ID = "GetOpportunityByID"
export const GET_CUSTOMER = "GetCustomers"
export const GET_CONATACTS_BY_CUSTOMER_ID = "GetContactsDetailsByCustomerID"
export const INSERT_OR_UPDATE_OPPORTUNITY = "InsertOrUpdateOpportunityVersion4"
export const INSERT_OPPORTUNITY_ATTACHMENT = "InsertOpportunityAttachment"
export const UPDATE_OPPORTUNITY_ATTACHMENT = "UpdateOpportunityAttachment"
export const DELETE_OPPORTUNITY_ATTACHMENT = "DeleteOpportunityAttachment"
export const GET_OPPORTUNITY_ATTACHMENT = "GetOpportunityAttachmentsByOpportunityID"

export const GET_PRODUCT_GROUPS = "GetProductGroup"
export const GET_PRODUCT_CATEGORIES = "GetProductCategory"
export const GET_PRODUCTS_FOR_OPP = "GetProductsForOpportunity"
export const GET_PRODUCT_BY_ID = "GetProductByID"
export const GET_PRICE_BOOK_LEVEL_BY_CURRENCY_ID = "GetPriceBookLevelByCurrencyIDAndUserID"
export const GET_PRODUCT_RATE_BY_CURRENCY_ID_LEVEL_ID = "GetProductRateByCurrencyIDAndLevelID"
export const GET_TERRITORY_FOR_ASSIGN_OPPORTUNITY = "GetUserAssignTerritoriesByUserID"
export const GET_USERS_BY_TERRITORY_ID_FOR_ASSIGN_OPPORTUNITY = "GetUsersByTerritoryIDForAssignOpportunity"


// TaskList Api end points

export const GET_ALL_TASKLIST = "GetAllTaskActivityVersion1"


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

// Get All Appointment Api end points

export const GET_ALL_APPOINTMENT = "GetAllAppointmentActivity"
export const GET_RELATED_TO_BY_ENTITY_ID = "GetRelatedToByEntityID"
export const INSERT_OR_UPDATE_APPOINTMENT_ACTIVITY = "InsertOrUpdateAppointmentActivity"
export const GET_APPOINTMENT_STARTDATE_ENDDATE_BY_USER_TIMEZONE = "GetAppointmentStartDateEndDateByUserTimeZone"
export const GET_APPOINTMENT_ACTIVITY_BY_ID = "GetAppointmentActivityByID"

// Get All HelpDesk List Api end points
export const GET_ALL_HELPDESK_LIST = "GetHelpDesksVersion1"
