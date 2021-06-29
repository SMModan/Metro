// import {Toast} from 'native-base';
import { Platform } from 'react-native';
import moment from 'moment';
import { AlertDialog } from '../components/common/AlertDialog';
import { Snackbar } from 'react-native-snackbar-material';
//import RNFetchBlob from 'rn-fetch-blob';

export default class Utils {
  static isValidEmail(email) {
    let reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return reg.test(email) === true && email.length <= 40;
  }

  static isValidMobile(mobile) {
    let length = mobile.length;
    return /^\d+$/.test(mobile) && length >= 8 && length <= 15;
  }

  static formatDate(date, format = 'DD-MM-YYYY HH:mm', milis = false) {
    if (!date)
      return ""
    // const newDate = !milis ? date * 1000 : date;
    return moment(date).format(format);
  }
  static isValidPassword(password) {
    let length = password.length;

    return length >= 6 && length <= 20;
  }

  static isEmpty(value) {
    return !value || value.toString().trim().length <= 0;
  }

  static showGotoLoginDialog(navigation) {
    AlertDialog.show({
      title: 'Please Login',
      message: 'You must have to login to perform this action',
      positiveButton: {
        title: 'Login',
        onPress: () => {
          AlertDialog.hide();
          // this.resetNavigation(navigation, 'login');
        },
      },
      negativeButton: {
        title: 'Cancel',
        onPress: () => {
          AlertDialog.hide();
        },
      },
      cancelable: true,
    });
  }

  static showToast(message, duration = 2) {
    Snackbar.error({
      content: message,
      duration: duration,
      action: {
        onPress: () => { },
        label: 'CLOSE',
      },
    });
  }

  static showWarningToast(message, duration = 2500) {
    this.showToast(message, duration);
  }

  static showDangerToast(message, duration = 2500) {
    this.showToast(message);
  }

  static getDeviceType() {
    return this.isIos() ? 'I' : 'A';
  }

  static handleApiError(error) {
    this.showDangerToast(
      this.isEmpty(error)
        ? 'Something went wrong'
        : error.data.applicationMessages[0],
    );
  }

  static isIos() {
    return Platform.OS === 'ios';
  }

  // static downloadFile = (uri,fileName,callback) => {

  //     let path = RNFetchBlob.fs.dirs.DownloadDir + "/" + fileName

  //     RNFetchBlob
  //         .config({
  //             // add this option that makes response data to be stored as a file,
  //             // this is much more performant.
  //             fileCache: true,
  //             addAndroidDownloads: {
  //                 useDownloadManager: true,
  //                 notification: true,
  //                 mediaScannable: true,
  //                 title:fileName,
  //                 indicator:true,
  //                 path: path

  //             }

  //         })
  //         .fetch('GET', uri, {
  //             //some headers ..
  //         })
  //         .progress({ interval: 100 },(received, total) => {
  //             console.log('progress', received / total)
  //         })
  //         .then((res) => {
  //             // the temp file path
  //             console.log('The file saved to ', res.path())
  //             RNFetchBlob.android.actionViewIntent(res.path(), 'application/pdf')
  //             if(callback)
  //             callback()
  //         }).catch((error) => {
  //             console.log('file error', error)

  //         })
  // }
}
