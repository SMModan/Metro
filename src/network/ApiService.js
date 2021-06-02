import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {BASE_URL} from './ApiConstants';
import {getToken, setItem} from '../data/PrefUtils';
import {AlertDialog} from '../components/common';
import {store} from '../App';
import Navigator from '../navigation/Navigator';
import {IS_LOGGED_IN} from '../data/PrefKeys';
import {HOME_LOGOUT} from '../reducers/types';
import Axios from 'axios';
import {COMPANY_ID} from '../utils/AppConstants';
import Utils from '../utils/Utils';

export const METHOD = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch',
};
export const getApiCall = async (
  endpoint,
  params = {},
  onSuccess,
  onFailure,
) => {
  params.language = 'en';

  console.log(endpoint + '------------------Params2-------------------');
  console.log(JSON.stringify(params));
  console.log('---------------------------------------------');

  const connectionInfo = await NetInfo.getConnectionInfo();
  let token = await getToken()
  if (connectionInfo.type === 'none')
    onFailure('Please check your internet connection.');
  else {
    Axios.get(endpoint, {
      baseURL: BASE_URL,
      params,
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((response) => {
        console.log('------------------ Response-------------------');

        console.log(
          BASE_URL + endpoint + ' Response',
          JSON.stringify(response),
        );

        console.log('---------------------------------------------');

        if (response) {
          if (response.status == 200) {
            try {
              onSuccess(response.data);
              // onSuccess(response)
            } catch (err) {
              console.log('Error', err);
              onFailure('Something went wrong');
            }
          } else if (response.status == 401) {
            AlertDialog.show({
              title: 'Session Expired',
              message: 'Session is expired. Need to re-login',
              positiveButton: {
                title: 'Relogin',
                onPress: async () => {
                  AlertDialog.hide();
                  await setItem(IS_LOGGED_IN, '0');
                  store.dispatch({
                    type: HOME_LOGOUT,
                  });
                  Navigator.resetNavigation('splash');
                },
              },
            });
            onFailure('Session expired');
          } else {
            onFailure(
              error && typeof error === 'string'
                ? error
                : 'Something went wrong',
            );
          }
        } else {
          onFailure('Something went wrong');
        }
      })
      .catch((error) => {
        console.log('Error', error);
        onFailure(error.response);
      });
  }
};

export default async (
  endpoint,
  params = {},
  onSuccess,
  onFailure,
  method = METHOD.POST,
) => {
  let token = await getToken();
  const connectionInfo = await NetInfo.getConnectionInfo();

  if (connectionInfo.type === 'none')
    onFailure('Please check your internet connection.');
  else {
    console.log('---------------------------------------------2');
    if (params.amount != null) {
      params.amount = params.amount.toString().replace(',', '');
    }
    const config = {
      baseURL: BASE_URL,
      params,
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    let request = {};

    switch (method) {
      case METHOD.POST:
        request = axios.post(endpoint, params, config);
        break;
      case METHOD.GET:
        request = axios.get(endpoint, config);
        break;
      case METHOD.DELETE:
        request = axios.delete(endpoint, config);
        break;
      case METHOD.PUT:
        request = axios.put(endpoint, params, config);
        break;
      case METHOD.PATCH:
        request = axios.patch(endpoint, params, config);
        break;
    }

    console.log(
      BASE_URL + endpoint + '\n------------------Params-------------------',
    );
    console.log(JSON.stringify(params));
    console.log('---------------------------------------------');

    console.log('---------------------token-------------------' + token);

    request
      .then((response) => {
        console.log('------------------Response-------------------');
        console.log(endpoint + '\n Response', JSON.stringify(response));
        console.log('---------------------------------------------');

        if (response) {
          if (response.data.isSuccess == true) {
            onSuccess(response.data);
          } else if (response.status == 401) {
            AlertDialog.show({
              title: 'Session Expired',
              message: 'Session is expired. Need to re-login',
              positiveButton: {
                title: 'Relogin',
                onPress: async () => {
                  AlertDialog.hide();
                  await setItem(IS_LOGGED_IN, '0');
                  // store.dispatch({
                  //   type: HOME_LOGOUT,
                  // });
                  Navigator.resetNavigation('Splash');
                },
              },
            });
            onFailure('Session expired');
          } else {
            const error = response.data;
            onFailure(
              error && typeof error === 'string'
                ? error
                : 'Something went wrong',
            );
          }
        } else {
          onFailure('Something went wrong');
        }
      })
      .catch((error) => {
        console.log('Error', error);
        if (error && error.response && error.response.status == 401) {
          AlertDialog.show({
            title: 'Session Expired',
            message: 'Session is expired. Need to re-login',
            positiveButton: {
              title: 'Re-Login',
              onPress: async () => {
                AlertDialog.hide();
                Navigator.resetNavigation('Splash');
              },
            },
          });
          onFailure('Session expired');
        } else {
          onFailure(error.response ? error.response : 'Something went wrong');
        }
      });
  }
};
