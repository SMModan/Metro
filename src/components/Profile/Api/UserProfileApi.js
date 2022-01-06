import { GetBasicUserProfile } from '../../../network/ApiConstants';
import apiCall from '../../../network/ApiService';

const UserProfileApi = {
  GetBasicUserProfile(params, onDone, onError) {

    apiCall(
      GetBasicUserProfile,
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
};

export default UserProfileApi;
