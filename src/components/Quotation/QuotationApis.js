import {  GET_QUOTATION_LIST } from "../../network/ApiConstants"
import apiCall from "../../network/ApiService"

const QuotationApis = {

    getAllQuotation(params, onDone, onError) {
        apiCall(GET_QUOTATION_LIST, params, (res) => {
            if (onDone) {
                onDone(res)
            }
        }, (error) => {
            if (onError) {
                onError(error)
            }
        })
    }
}

export default QuotationApis