import React, {Component} from 'react';
import {View, ImageBackground, Image, Alert, BackHandler} from 'react-native';

import {connect} from 'react-redux';
import {strings} from '../../language/Language';
import {goBack, push, replace, reset} from '../../navigation/Navigator';
import {Images, Utils} from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import {
  Button,
  ChipViewContainer,
  CustomDatePicker,
  CustomPicker,
  FloatingEditText,
  MainContainer,
  ScrollContainer,
  ViewWithTitle,
  Clickable,
  ProgressDialog,
} from '../common';
import {RadioButton, Text} from 'react-native-paper';
import styles from './styles/Attendance.style';

import PhotoPicker from '../common/PhotoPicker';
import CarAttendanceApi from './Api/CarAttendanceApi';
import {store} from '../../App';
import backgroundServer from 'react-native-background-actions';
import {setSessionField} from '../../reducers/SessionReducer';
import Geolocation from 'react-native-geolocation-service';
import { unSubscribeForLocation } from './LocationAndRequestService';
import { Label } from 'native-base';

class EndTrip extends Component {
  state = {
    circleList: [],
    AssignUserRemarks: [],
    selectedAttachment: '',
    circleId: 0,
  };
  componentDidMount() {
    console.log(
      'this.props.navigation.state.params.',
      this.props.route?.params?.item,
    );

    const item = this.props.route?.params?.item;
    this.setState(
      {
        itemProps: item,
      },
      () => {
        this.GetPendingCarOutNumber();
        //  this.GetProjectByLocationId()
      },
    );
  }

  onTextChanged = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  GetMarkinForSelectedDate = () => {
    const EmployeeID = store.getState().session.user.EmployeeID;
    const {circleId} = this.state;

    const date = new Date();
    const _date = Utils.formatDate(date, 'DD-MMM-YYYY');

    const params = {
      EmployeeID,
      Date: _date,
    };

    ProgressDialog.show();
    CarAttendanceApi.GetMarkinForSelectedDate(
      params,
      res => {
        ProgressDialog.hide();

        if (res) {
          console.log(
            'res >>>>>>>>>>>>>>>>>>>>>>>=======================>',
            res,
          );
          this.InsertDailyAttendanceForLocation();
        }
      },
      res => {
        console.log('res <<<<<<<<<<<<<<<<<=====>>>>>>>>>>>>>', res);

        Alert.alert('Warn', `${res}`, [
          {
            text: 'Ok',
            onPress: () => {
              this.InsertDailyAttendanceForLocation();
            },
          },
        ]);
        // InsertDailyAttendanceForLocation

        ProgressDialog.hide();
      },
    );
  };

  GetPendingCarOutNumber = () => {
    const EmployeeID = store.getState().session.user.EmployeeID;

    const params = {
      EmployeeID,
    };

    ProgressDialog.show();
    CarAttendanceApi.GetPendingCarOutNumber(
      params,
      res => {
        ProgressDialog.hide();

        if (res) {
          const table = res.Table;
          if (table) {
            this.setState({
              carNumber: '' + table?.CarNumber,
            });
          }
          console.log(
            'res >>>>>>>>>>>>>>>>>>>>>>>=======================>',
            this.state.carNumber,
          );
        }
      },
      res => {
        console.log('res <<<<<<<<<<<<<<<<<=====>>>>>>>>>>>>>', res);
        ProgressDialog.hide();
      },
    );
  };

  InsertDailyAttendanceForLocation = () => {
    const EmployeeID = store.getState().session.user.EmployeeID;
    const {circleId, remarks, itemProps,latitude,longitude } = this.state;

    const dateee = itemProps.AttDate;

    const _date = Utils.formatDate(dateee, 'DD-MMM-yyyy HH:mm:ss');
    console.log('_date  =======>>>>><<<<<<<<<>>>>>>>>><<<<<>>>>>>>', _date);
    const latLang = `${latitude},${longitude}`

    const params = {
      Location: latLang,
      Remarks: remarks,
      Time: _date,
      Address: 'Ahmedabad',
      EmployeeID,
    };

    console.log('params === InsertDailyAttendanceForLocation', params);

    ProgressDialog.show();

    CarAttendanceApi.InsertDailyAttendanceForLocation(
      params,
      res => {
        ProgressDialog.hide();

        if (res) {
          const isSucceed = res.IsSucceed;

          if (isSucceed) {
            this.InsertDailyAttendanceForVehicle();
          }
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };

  InsertDailyAttendanceForVehicle = async () => {
    const EmployeeID = store.getState().session.user.EmployeeID;
    const {carNumber, remarks, attachment, carReleaseKM,latitude,longitude} = this.state;

    ProgressDialog.show();
    let res = {};
    if (attachment && attachment.fileName) {
      res = await CarAttendanceApi.uploadCarDocument({
        EmployeeID,
        fileName: attachment.fileName,
        DocumentContent: attachment.base64,
      });
    }

   
    const tripDistance = this.props.session.distances|| 0;
    let _distanceTotalKm = (tripDistance / 1000).toFixed(2);
    
      console.log("tripDistance ====>>>>>>>",tripDistance)
      console.log("_distanceTotalKm ====>>>>>>>",_distanceTotalKm)
      // alert("TotalDistance---> "+_distanceTotalKm)
    const params = {
      EmployeeId: EmployeeID,
      DocumentName: res?.FileName || '',
      DocumentPath: res?.FilePath || '',
      CarNum: carNumber,
      DocumentType: attachment?.type || '',
      RiggerName: '',
      ReceiveKM: '0',
      ReleasedKM: carReleaseKM,
      Remarks: remarks,
      WorkLocationID: '0',
      ProjectID: '0', //testing
      CarVenderName: '',
      TotalKM: ""+_distanceTotalKm,
      VechicleType: '0',
      ISAC: '0',
      StartLatitude: '',
      StartLongitude: '',
      EndLongitude: `${latitude}`||0,
      EndLatitude: `${longitude}`||0,
      MarkType: 2,
      AttendanceType: '0',
    };
    CarAttendanceApi.InsertDailyAttendanceForVehicle(
      params,
      res => {
        if (res) {
         
          ProgressDialog.hide();
          const IsSucceed = res.IsSucceed;
          if (IsSucceed) {
            store.dispatch(setSessionField("distances", 0))

            Alert.alert('Sucess', `Trip End Successfully..`, [
              {
                text: 'Ok',
                onPress: () => {
                  replace('CarAttendanceList');
                },
              },
            ]);
          }
        }
      },
      error => {
        Alert.alert('Warn', error, [
          {
            text: 'Ok',
            onPress: () => {
              reset('Home');
            },
          },
        ]);
        ProgressDialog.hide();
      },
    );
  };

  


  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  handleBackButtonClick() {
    reset("CarAttendanceList")
    return true;
  }


  render() {
    const {
      employeeName,
      carNumber,
      remarks,
      selectedAttachment,
      applicationDate,
      carReleaseKM,
    } = this.state;
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => replace('CarAttendanceList'),
          },
          title: 'End Trip',
          hideUnderLine: true,
          light: true,
        }}>
        <ScrollContainer>
          <View>
            <ViewWithTitle title="General Details">
              <FloatingEditText
                value={employeeName}
                onChangeText={text => onTextChanged('employeeName', text)}
                label={'Admin Admin EMP001'}
                editable="false"
              />
              <CustomDatePicker
                selectedDate={applicationDate || new Date()}
                minimumDate={applicationDate || new Date()}
                onDateChanged={date => {
                  this.onTextChanged('applicationDate', date);
                }}
                label={'Application Date'}
                containerStyle={{flex: 1}}
                disabled={true}
              />
            </ViewWithTitle>

            <ViewWithTitle title="Car Details">
              <FloatingEditText
                value={carNumber || ''}
                onChangeText={text => this.onTextChanged('carNumber', text)}
                label="Car Number"
                editable={false}
              />
              <Label style={{marginTop:ResponsivePixels.size5,fontSize:ResponsivePixels.size15,color:Colors.blueGray400}}>eg: GJ01-KH 1234</Label>

              <FloatingEditText
                value={carReleaseKM}
                onChangeText={text => this.onTextChanged('carReleaseKM', text)}
                inputType="numeric"
                label={'Car Release KM'}
              />
<Label style={{marginTop:ResponsivePixels.size5,fontSize:ResponsivePixels.size15,color:Colors.blueGray400}}>Enter actual km shown on speedometer</Label>

              <FloatingEditText
                value={remarks}
                onChangeText={text => this.onTextChanged('remarks', text)}
                label="Remarks"
                multiline={true}
              />

              <View>
                <Clickable
                  onPress={() => {
                    PhotoPicker({
                      onFileSelect: res => {
                        this.setState(
                          {
                            attachment: res,
                            selectedAttachment: res.source,
                            visibleDialog: false,
                          },
                          () => {
                            console.log(
                              'selectedAttachment0',
                              this.state.selectedAttachment,
                            );
                          },
                        );
                      },
                    });
                  }}
                  style={{
                    height: ResponsivePixels.size200,
                    marginTop: ResponsivePixels.size20,
                  }}>
                  <ImageBackground
                    imageStyle={{borderRadius: ResponsivePixels.size16}}
                    source={selectedAttachment}
                    style={styles.uploadView}>
                    {!selectedAttachment ? (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image source={Images.ic_upload} />
                        <Text style={styles.uploadText}>Capture Photo</Text>
                      </View>
                    ) : null}
                  </ImageBackground>
                </Clickable>
<Label style={{marginTop:ResponsivePixels.size5,fontSize:ResponsivePixels.size15,color:Colors.blueGray400,alignSelf:"center"}}>Take picture of Speedometer with actual KM shown</Label>

              </View>
            </ViewWithTitle>

            <Button
              title="End Trip"
              style={{margin: ResponsivePixels.size16}}
              onPress={() => {

                
                Geolocation.getCurrentPosition((position) => {
                  const { latitude, longitude } = position.coords
                  
                  this.setState({
                    latitude,
                    longitude
                  },()=>{
                    console.log("latitude =======>>>>>>>",latitude);
                    console.log("longitude =======>>>>>>>",longitude);
                  })
                })


                const {carReleaseKM, attachment} = this.state;
                if (!carReleaseKM) {
                  Utils.showToast('Please enter Release KM.');
                } else if (!remarks) {
                  Utils.showToast('Please enter Remarks.');
                } else if (!attachment) {
                  Utils.showToast('Please upload document.');
                } else {
                  this.GetMarkinForSelectedDate();
                  backgroundServer.stop();
                  unSubscribeForLocation()
                  // geolocation.stopObserving();
                }
              }}
            />
          </View>
        </ScrollContainer>
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EndTrip);
