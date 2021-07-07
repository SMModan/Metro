import { GET_ALL_OPPORTUNITIES, GET_COMPANY_BY_USERNAME, GET_CONATACTS_BY_CUSTOMER_ID, GET_CUSTOMER, GET_OPPORTUNITY_BY_ID, GET_PRODUCTS_FOR_OPP, GET_PRODUCT_CATEGORIES, GET_PRODUCT_GROUPS, INSERT_OR_UPDATE_OPPORTUNITY, USER_AUTHENTICATION } from "../../../network/ApiConstants"
import apiCall, { METHOD } from "../../../network/ApiService"

const opportunityApi = {

    getAllOpportunities(params, onDone, onError) {

        apiCall(GET_ALL_OPPORTUNITIES, params, (res) => {


            if (onDone) {
                onDone(res)
            }
        }, (error) => {
            if (onError) {
                onError(error)
            }
        })
    },
    getOpportunityByID(OpportunityID, onDone, onError) {

        apiCall(GET_OPPORTUNITY_BY_ID, { OpportunityID }, (res) => {


            if (onDone) {
                onDone(res)
            }
        }, (error) => {
            if (onError) {
                onError(error)
            }
        })
    },

    addOrUpdateOpportunity(params, onDone, onError) {

        apiCall(INSERT_OR_UPDATE_OPPORTUNITY, params, (res) => {


            if (onDone) {
                onDone(res)
            }
        }, (error) => {
            if (onError) {
                onError(error)
            }
        })
    },
    getCustomers() {



        return new Promise((resolve, reject) => {

            apiCall(GET_CUSTOMER, { MaxCustomerID: 1 }, (res) => {

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
    getProductGroups() {



        return new Promise((resolve, reject) => {

            apiCall(GET_PRODUCT_GROUPS, {}, (res) => {

                const { Table } = res
                let results = []
                if (Table) {
                    if (Array.isArray(Table)) {

                        results = Table.map((t) => ({
                            id: t.ID,
                            name: t.ProductGroupName
                        }))
                    } else {
                        results = [{
                            id: Table.ID,
                            name: Table.ProductGroupName
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
    getProductCategories() {



        return new Promise((resolve, reject) => {

            apiCall(GET_PRODUCT_CATEGORIES, {}, (res) => {

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
    getProductForOpportunity(Prefix) {



        return new Promise((resolve, reject) => {

            apiCall(GET_PRODUCTS_FOR_OPP, { Prefix }, (res) => {

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
                            email: t.EmailID,
                            mobileNumber: t.MobileNo
                        }))
                    } else {
                        results = [{
                            id: Table.ID,
                            name: Table.ContactName,
                            email: Table.EmailID,
                            mobileNumber: Table.MobileNo
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
}


export default opportunityApi