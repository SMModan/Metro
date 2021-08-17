// import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import { store } from '../App';
import { KEY_TOKEN } from '../data/PrefKeys';
import { BASE_URL } from './ApiConstants';
import queryString from "query-string"
import { setSessionField } from '../reducers/SessionReducer';
import { fetch } from "@react-native-community/netinfo";
export const METHOD = {

    POST: "post",
    GET: "get",
    PUT: "put",
    DELETE: "delete",
    PATCH: "patch"

}

export default async (endpoint, params = {}, onSuccess, onFailure, method = METHOD.POST, skipToken = false) => {

    const token = store.getState().session.token;
    const connectionString = store.getState().session.connectionString;
    const machineCode = store.getState().session.machineCode || "dasmdmasndbasmdbsmadbmnsadbmasbdm";
    //   const connectionString = await getItem(KEY_LANGUAGE_ID, "1")
    // const { company_uuid } = store.getState().common.companyDetails
    // const token = "Token eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE1NjkzMjY3NDN9.lYVts0p2gD8RXvyGYcSoabB8qgeZXAaZB1M14wQDnmSEbu9ZV3EtBfJ32QgGMpQvQ-094WfNRcN2HPsgCLaBqg";

    // params.language = 'en'
    console.log(BASE_URL + endpoint + '\n------------------Params-------------------')
    console.log("Token", token);
    console.log("connectionString", connectionString);
    console.log("machineCode", machineCode);


    const isConnected = await fetch()
    console.log("Internet connection", isConnected);

    if (!isConnected.isConnected)
        onFailure('Please check your internet connection.')
    else {

        //  params.language_id = lang;

        if (params._path != undefined) {
            endpoint = `${endpoint}/${params._path}`
            delete params._path;
        }

        // params = { ...params, ...store.getState().common.deviceInfo }
        let headers = {
            // Authorization: token || "",
            // "Accept": 'application/json',
        }
        // console.log("Header API key : ", headers.apiKey)
        if (params._parts) {

            headers = {
                ...headers,
                'Content-Type': 'multipart/form-data'
            }
        }


        if (!skipToken && token && connectionString) {
            params.Token = token
            params.ConnectionString = connectionString
        }
        params.MachineCode = machineCode
        // let paramsData = new FormData()

        // for (const property in params) {
        //     if (params[property] != undefined)
        //         paramsData.append(property, params[property])
        // }

        // if (paramsData._parts.length)
        //     params = paramsData
        // console.log(params);

        console.log(JSON.stringify(params));
        console.log('---------------------------------------------')

        //params = stringify(params)
        const config = {
            baseURL: BASE_URL,
            params,
            timeout: 60000,
            headers: headers,
        }

        let request = {}


        switch (method) {

            case METHOD.POST:
                request = axios.post(endpoint, queryString.stringify(params), config)
                break;
            case METHOD.GET:
                request = axios.get(endpoint, config)
                break;
            case METHOD.DELETE:
                request = axios.delete(endpoint, config)
                break;
            case METHOD.PUT:
                request = axios.put(endpoint, params, config)
                break;
            case METHOD.PATCH:
                request = axios.patch(endpoint, params, config)
                break;
        }

        //  console.log("state", store.getState())
        request.then((response) => {
            console.log('------------------ Response-------------------')
            // console.log(endpoint + '\n Response', JSON.stringify(response.data));
            console.log('---------------------------------------------')

            var parser = require('fast-xml-parser');

            if (response) {
                if (response.status == 200) {
                    //    if (response.data.status == 1 || response.data.success == 1) {
                    try {
                        const jsonResponse = parser.parse(response.data)
                        console.log(endpoint + '\n JSONResponse', JSON.stringify(jsonResponse));

                        // console.log("jsonResponse",jsonResponse.Response.)
                        if (jsonResponse && jsonResponse.Response) {

                            if (jsonResponse.Response.IsSucceed) {
                                // console.log(endpoint + '\n JSONResponse', JSON.stringify(jsonResponse.Response.Data['diffgr:diffgram']['NewDataSet']));

                                onSuccess(jsonResponse.Response.Data ? jsonResponse.Response.Data['diffgr:diffgram']['NewDataSet'] : jsonResponse.Response)

                                const { ConnectionString, AuthenticationToken } = jsonResponse.Response
                                if (AuthenticationToken && ConnectionString) {

                                    store.dispatch(setSessionField("token", AuthenticationToken))
                                    store.dispatch(setSessionField("connectionString", ConnectionString))
                                }

                            } else {
                                if (jsonResponse.Response.ErrorMessage === "UnAuthorized User") {
                                    onFailure('Session expired')

                                } else
                                    onFailure(jsonResponse.Response.ErrorMessage || "Something went wrong")

                            }
                        } else {
                            onFailure('Something went wrong')

                        }
                        // console.log("data", JSON.stringify(parser.parse(response.data)))

                        //onSuccess(response)

                    } catch (err) {
                        console.log('Error', err);
                        onFailure('Something went wrong')
                    }

                    // } else {
                    //     const error = response.data.error[0];

                    //     onFailure(error && typeof (error) === "string" ? error : 'Something went wrong')
                    // }
                } else if (response.status == 401) {


                    onFailure('Session expired')

                } else {

                    onFailure(error && typeof (error) === "string" ? error : 'Something went wrong')

                }
            } else {
                onFailure('Something went wrong')
            }
            console.log('---------------------------------------------')

        }).catch(error => {


            console.log('Error', error);

            if (error && error.response) {
                console.log('error.response', error.response);

                switch (error.response.status) {

                    case 401:

                        onFailure('Session expired')

                        break;

                    default:
                        onFailure(error.message)
                        break


                }
            } else
                onFailure('Something went wrong')
        })
    }

}

