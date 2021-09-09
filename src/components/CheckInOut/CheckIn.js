import React, {Component} from 'react';
import _ from 'lodash';
import {
  ActivityIndicator,
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {
  Button,
  Button as DialogButton,
  Card,
  Chip,
  Dialog,
  FAB,
  Portal,
  TextInput,
  Title,
} from 'react-native-paper';
import {AirbnbRating} from 'react-native-ratings';
import {connect} from 'react-redux';
import {Colors, Images, Utils} from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import {
  Clickable,
  FloatingEditText,
  MainContainer,
  MyFlatList,
  ProgressDialog,
} from '../common';
import CheckInApi from './Api/CheckInApi';
import { push } from '../../navigation/Navigator';

export class CheckIn extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
            checkoutDialogue:false,
            latitude:0,
            longitude:0
        }
    }
    

  hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
      ProgressDialog.hide()
    }

    if (status === 'disabled') {
        ProgressDialog.hide()

      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  };

  hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await this.hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      Utils.showToast('Location permission denied by user.');
      ProgressDialog.hide()

    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Utils.showToast('Location permission revoked by user.');
      ProgressDialog.hide()

    }
    return false;
  };

  getLocation = async (type) => {
    const hasPermission = await this.hasLocationPermission();
    console.log('hasPermission', hasPermission);
    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        console.log('latitude == ', latitude);
        console.log('longitude == ', longitude);
      ProgressDialog.hide()

        this.setState(
          {
            latitude,
            longitude,
          },
          () => {
              if(type == 0){
                  this.checkInApiCall()
              }else{
                  this.setState({
                    checkoutDialogue:true
                  })
              }
          },
        );
        // setLocation(position);
        console.log(position);
      },
      error => {
        // Alert.alert(`Code ${error.code}`, error.message);
        // setLocation(null);
        this.setState({
          latitude: '',
          longitude: '',
        });
        ProgressDialog.hide()
        Utils.showToast(error.message);
        console.log(error);
      },
      {
        accuracy: {
          android: 'low',
          ios: 'best',
        },
        enableHighAccuracy: false,
        timeout: 5000,
        distanceFilter: 250,
        forceRequestLocation: true,
        forceLocationManager: true,
        showLocationDialog: true,
      },
    );
  };

  checkInApiCall = () => {
    const {latitude, longitude} = this.state;

    // const userID =this.props.session.user.ID

    const {TransactionTypeID,HeaderID,IsCheckIn,userID,CheckInID,CheckInTime} = this.props



    ProgressDialog.show();
    // completed status == 2
    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    const sec = new Date().getSeconds(); //Current Seconds
    let formattedDate =
      date + '-' + month + '-' + year + ' ' + hours + ':' + min;
    let formattedDateTime =
      date + '-' + month + '-' + year + ' ' + hours + ':' + min;
    const latlang = `${latitude},${longitude}`;

    let objParam = {
      TransactionTypeID: TransactionTypeID,
      HeaderID: HeaderID,
      DetailID: 0,
      UserID: userID,
      CheckinDate: formattedDate,
      CheckInTime: formattedDateTime,
      CheckinRemarks: '',
      CheckInLocation: latlang,
      CheckInLocationName: 'Gujarat 380063 India',
    };

    console.log('objParam', objParam);

    const params = {
      paramList: JSON.stringify(objParam),
    };

    CheckInApi.callCheckIn(
      params,
      res => {
        ProgressDialog.hide();
        console.log('res  ==================>', res);

        const CheckInID = res.ID;
        this.props.updateListAfterCheckInCheckOut(0,CheckInID,HeaderID)

        Utils.showToast('CheckIn SuccessFully.');
      },
      error => {
        ProgressDialog.hide();
        Utils.showToast(error);
      },
    );
  };

  generateUniqueId = date => {
    let myDate = `HEL${
      date.getMonth() + 1
    }${date.getFullYear()}-${date.getDay()}`;
    return myDate;
  };

  checkOutApiCall = () => {
    const {remarks} = this.state;
    // const userID =this.props.session.user.ID


    const {CheckInID,CheckInTime,userID} = this.props
    let splitString,_date,time,checkInHr,checkInMin

    console.log("checkinTime ======>",CheckInTime)
    if(CheckInTime){
        splitString = CheckInTime.split('T');
        _date = splitString[0];
        time = splitString[1].split(':');
        checkInHr = time[0];
        checkInMin = time[1];
    }else{
        checkInHr = 0;
        checkInMin = 0;
    }
    

    console.log('_date', _date);
    console.log('checkInHr', checkInHr);
    console.log('checkInMin', checkInMin);

    const { latitude, longitude} = this.state;
    ProgressDialog.show();
    // completed status == 2
    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    const sec = new Date().getSeconds(); //Current Seconds
    let formattedDate =
      date + '-' + month + '-' + year + ' ' + hours + ':' + min;
    let formattedDateTime =
      date + '-' + month + '-' + year + ' ' + hours + ':' + min;
    const latlang = `${latitude},${longitude}`;
    let spentHours,spentMin

    if(CheckInTime){
        spentHours = hours - checkInHr;
        spentHours = Math.abs(spentHours);
        spentMin = min - checkInMin;
        spentMin = Math.abs(spentMin);
    }else{
        spentHours=0
        spentMin=0
    }
  

    let spentTime = `${spentHours}.${spentMin}`;
    console.log('spentTime =======>   ', spentTime);

    // {"ID":2349,"UserID":1,"CheckOutTime":"2021-09-04 14:28","TotalTimeSpend":"0.01"
    // ,"CheckoutRemarks":"test react","CheckOutLocation":"23.0594316,72.5503684"
    // ,"CheckOutLocationName":"Samarpan Tower , Naranpura , Ahmedabad  \nGujarat  \n380063 , India "}; }

    let objParam = {
      ID: CheckInID,
      UserID: userID,
      CheckOutTime: formattedDateTime,
      TotalTimeSpend: spentTime,
      CheckoutRemarks: remarks,
      CheckOutLocation: latlang,
      CheckOutLocationName: 'Gujarat 380063 India',
    };

    console.log('objParam', objParam);

    const params = {
      paramList: JSON.stringify(objParam),
    };

    CheckInApi.callCheckOut(
      params,
      res => {
        ProgressDialog.hide();
        console.log('res  ==================>', res);
    
        this.props.updateListAfterCheckInCheckOut(1,CheckInID,0)

        Utils.showToast('CheckOut SuccessFully.');
      },
      error => {
        ProgressDialog.hide();
        Utils.showToast(error);
      },
    );
  };

  getCurrentAddress = (latitude, longitude) => {
    console.log('latitude == ', latitude);
    console.log('longitude == ', longitude);
    // Search by geo-location (reverse geo-code)
    Geocoder.init("AIzaSyAvE_MSDLTAi8UGeTfU4UOC-aV8awuKHLs");

    Geocoder.from(latitude, longitude)
      .then(json => {
        var addressComponent = json.results[0].address_components[0];
        console.log('addressComponent ====================>', addressComponent);
      })
      .catch(error => console.warn(error));
  };

  render() {
      const {lableText,TransactionTypeID,HeaderID,IsCheckIn,CheckInID,CheckInTime} = this.props
      const {checkoutDialogue} = this.state
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          padding: ResponsivePixels.size5,
          paddingRight: ResponsivePixels.size10,
        }}>
        <Button
          labelStyle={{
            fontSize: ResponsivePixels.size12,
            color: '#2262F7',
            textAlign: 'left',
            textAlignVertical: 'center',
          }}
          style={{
            alignItems: 'flex-start',
            width: '35%',
            borderWidth: ResponsivePixels.size1,
            borderColor: Colors.Black,
          }}
          uppercase={false}
          onPress={() => {}}>
          {TransactionTypeID==4?this.generateUniqueId(lableText):lableText}
        </Button>
        <View
          style={{
            flexDirection: 'row',
            width: '65%',
            borderWidth: ResponsivePixels.size1,
            borderRadius: ResponsivePixels.size5,
            borderColor: Colors.Black,
            marginLeft: ResponsivePixels.size5,
            marginRight: ResponsivePixels.size5,
          }}>
          <Button
            labelStyle={{
              fontSize: ResponsivePixels.size12,
              color: Colors.Black,
              textAlign: 'left',
            }}
            style={{
              alignItems: 'flex-start',
              width: '55%',
              borderEndColor: '#2262F7',
              backgroundColor: Colors.BlackColor100,
            }}
            uppercase={false}
            onPress={() => {
                push('MyCheckInOut', {
                     TransactionTypeID,
                     HeaderID,
                  });
            }}>
            My Check-In
          </Button>

          <Button
            labelStyle={{
              fontSize: ResponsivePixels.size12,
              color: '#FFFFFF',
              textAlign: 'left',
            }}
            style={{
              alignItems: 'flex-start',
              width: '45%',
              borderEndColor: '#2262F7',
              backgroundColor:
                IsCheckIn != 'No' ? Colors.Orange500 : Colors.Green900,
            }}
            uppercase={false}
            onPress={() => {
                ProgressDialog.show()
              if (IsCheckIn == 'No') {
                // this.checkInApiCall(HeaderID);
                this.getLocation(0)
              } else {
              this.getLocation(1)
              }
            }}>
            {IsCheckIn == 'No' ? 'CheckIn' : 'CheckOut'}
          </Button>
        </View>

        <Portal>
                <Dialog visible={checkoutDialogue} onDismiss={() => { this.setState({ checkoutDialogue: false }) }}>
                    <Dialog.Title>Add Remarks</Dialog.Title>
                    <Dialog.Content>
                        <View style={{ paddingVertical: 8 }}>
                            <TextInput label={"Enter Remarks"} onChangeText={(remarks)=>{this.setState({remarks})}} />
                        </View>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <DialogButton color={Colors.blueGray600} style={{}} onPress={()=>this.setState({ checkoutDialogue: false }) }>Cancel</DialogButton>
                        <DialogButton color={Colors.primaryColor500} onPress={()=>{
                          const {checkoutID,checkoutTime,remarks} = this.state
                    //       checkoutID:item.ID,
                    // checkoutTime:item.CheckInTime


                    if(remarks){
                      this.setState({ checkoutDialogue: false },()=>{
                        this.checkOutApiCall(checkoutID,checkoutTime)
                      })
                    }
                                             
                        } }>Save</DialogButton>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
         
      </View>
    );
  }
}


const mapStateToProps = (state) => ({
    session: state.session
  });
  
  const mapDispatchToProps = {};
  
  export default connect(mapStateToProps, mapDispatchToProps)(CheckIn);