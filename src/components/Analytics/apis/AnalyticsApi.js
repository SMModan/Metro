import {
  GET_OPPORTUNITY_STAGE_WISE_OPPORTUNITYDATA_DASHBOARD, GET_PRODUCTBRAND_WISE_OPPORTUNITYDATA_DASHBOARD, GET_PRODUCTCATEGORYWISE_OPPORTUNITYDATA_DASHBOARD,
  GET_SALESMANWISE_OPPORTUNITYDATA_DASHBOARD, GET_SALESSTAGE_WISE_OPPORTUNITYDATA_DASHBOARD, GET_SOURCEWISE_OPPORTUNITYDATA_DASHBOARD, GET_TERRITORYWISE_OPPORTUNITYDATA_DASHBOARD
} from '../../../network/ApiConstants';
import apiCall from "../../../network/ApiService";


const AnalyticsApi = {

getProductCategoryOppoprtunityData(params, onDone, onError) {

    apiCall(GET_PRODUCTCATEGORYWISE_OPPORTUNITYDATA_DASHBOARD, params, (res) => {
        if (onDone) {
            onDone(res)
        }
    }, (error) => {
        if (onError) {
            onError(error)
        }
    })
},
GetSalesmanWiseOpportunityDataForDashboardChart(params, onDone, onError) {

    apiCall(GET_SALESMANWISE_OPPORTUNITYDATA_DASHBOARD, params, (res) => {
        if (onDone) {
            onDone(res)
        }
    }, (error) => {
        if (onError) {
            onError(error)
        }
    })
},
GetTerritoryWiseOpportunityDataForDashboardChart(params, onDone, onError) {

    apiCall(GET_TERRITORYWISE_OPPORTUNITYDATA_DASHBOARD, params, (res) => {
        if (onDone) {
            onDone(res)
        }
    }, (error) => {
        if (onError) {
            onError(error)
        }
    })
},
GetSourceWiseOpportunityDataForDashboardChart(params, onDone, onError) {

    apiCall(GET_SOURCEWISE_OPPORTUNITYDATA_DASHBOARD, params, (res) => {
        if (onDone) {
            onDone(res)
        }
    }, (error) => {
        if (onError) {
            onError(error)
        }
    })
},
GetSalesStageWiseOpportunityDataForDashboardChart(params, onDone, onError) {

    apiCall(GET_SALESSTAGE_WISE_OPPORTUNITYDATA_DASHBOARD, params, (res) => {
        if (onDone) {
            onDone(res)
        }
    }, (error) => {
        if (onError) {
            onError(error)
        }
    })
},
GetProductBrandWiseOpportunityDataForDashboardChart(params, onDone, onError) {

    apiCall(GET_PRODUCTBRAND_WISE_OPPORTUNITYDATA_DASHBOARD, params, (res) => {
        if (onDone) {
            onDone(res)
        }
    }, (error) => {
        if (onError) {
            onError(error)
        }
    })
},
GetOpportunityStageWiseOpportunityDataForDashboardChart(params, onDone, onError) {

    apiCall(GET_OPPORTUNITY_STAGE_WISE_OPPORTUNITYDATA_DASHBOARD, params, (res) => {
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

export default AnalyticsApi;
