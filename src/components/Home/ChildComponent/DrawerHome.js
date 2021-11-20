import React, {useState,useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {FlatList, Image, Text, View} from 'react-native';
import {AlertDialog, Clickable} from '../../common';
import {Colors, FontName, Images} from '../../../utils';
import {createStackNavigator} from '@react-navigation/stack';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import HomeTabs from './MyBottomTab';
import CarAttendance from '../../ManageCarAttendance/List/CarAttendance';
import LeaveList from '../../ManageLeave/List/LeaveList';
import CashAdvance from '../../ManageCashAdvance/List/CashAdvance';
import Reimbursement from '../../ManageReimbursement/List/Reimbursement';
import ReportList from '../../ManageReports/List/ReportList';
import {NavigationContainer} from '@react-navigation/native';
import {push, reset} from '../../../navigation/Navigator';
import StartTrip from '../../ManageCarAttendance/StartTrip';
import AddLeaveRequest from '../../ManageLeave/AddLeaveRequest';
import AddCashAdvance from '../../ManageCashAdvance/AddCashAdvance';
import AddReimbursement from '../../ManageReimbursement/AddReimbursement';
import {store} from '../../../App';
import {IS_LOGGED_IN} from '../../../data/PrefKeys';
import {setSessionField} from '../../../reducers/SessionReducer';
import AttendanceList from '../../MarkInOut/List/AttendanceList';
import { SIDEMENU_INDIA, SIDEMENU_PH, SIDEMENU_SA, SIDEMENU_TH } from '../../../utils/AppConstants';
const Drawer = createDrawerNavigator();

export default function DrawerHome() {


  return (
    <Drawer.Navigator
      drawerContent={props => <SideMenu {...props} />}
      initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeStack} />

      <Drawer.Screen component={CarAttendance} name="CarAttendanceList" />
      <Drawer.Screen component={LeaveList} name="LeaveList" />
      <Drawer.Screen component={CashAdvance} name="CashAdvanceList" />
      <Drawer.Screen component={Reimbursement} name="ReimbursementList" />
      <Stack.Screen component={StartTrip} name="StartTrip" />
      <Stack.Screen component={AddLeaveRequest} name="AddLeave" />
      <Stack.Screen component={AddCashAdvance} name="AddCashAdvance" />
      <Stack.Screen component={AddReimbursement} name="AddReimbursement" />
      <Drawer.Screen component={ReportList} name="Reports" />
      <Drawer.Screen component={AttendanceList} name="MarkInOutList" />
    </Drawer.Navigator>
  );
}




const Stack = createStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      {/* Skyward  
        Add all your routes here
        and use this,props.navigation.openDrawer() to open drawer.
        */}

      <Stack.Screen component={HomeTabs} name="Home" />
    </Stack.Navigator>
  );
};
const SideMenu = ({navigation}) => {

  const countryId = store.getState().session.country_id

  const [routes, setRoutes] = useState([
    {
      title: 'Home',
      icon: Images.ic_home,
      route: 'Dashboard',
    },
    {
      title: 'Car Attendence',
      icon: Images.ic_Appointment,
      route: 'CarAttendanceList',
    },
    {
      title: 'Markin - Markout',
      icon: Images.ic_Appointment,
      route: 'MarkInOutList',
    },
    {
      title: 'Leave',
      icon: Images.ic_HelpDesk,
      route: 'LeaveList',
    },
    {
      title: 'Cash Advance',
      icon: Images.ic_Call,
      route: 'CashAdvanceList',
    },
    {
      title: 'Reimburshment',
      icon: Images.ic_task,
      route: 'ReimbursementList',
    },
    {
      title: 'Reports',
      icon: Images.ic_HelpDesk,
      route: 'Reports',
    },
  ]);
useEffect(() => {
  
  if(countryId ==1){
    setRoutes(SIDEMENU_INDIA)
  }else if(countryId ==2){
    setRoutes(SIDEMENU_PH)
  }else if(countryId ==3){
    setRoutes(SIDEMENU_SA)
  }else if(countryId ==4){
    setRoutes(SIDEMENU_TH)
  }else{
    setRoutes(SIDEMENU_INDIA)
  }

}, [])
  
const renderCell = ({index}) => {
  const item = routes[index];

  return (
    <Clickable
    onPress={() => navigation.navigate(item.route)}
    style={{
      flexDirection: 'row',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: Colors.editTextHintColor,
      alignItems: 'center',
    }}>
    <Text
      style={[
        {
          marginStart: ResponsivePixels.size20,
          fontSize: ResponsivePixels.size20,
          fontFamily: FontName.regular,
          color: Colors.black,
        },
      ]}>
      {item.title}
    </Text>
  </Clickable>
  );
};


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
        paddingTop: ResponsivePixels.size50,
      }}>
      <Clickable
        onPress={() => {
          //  props.navigation.toggleDrawer();
          navigation.toggleDrawer();
          push('Profile');
        }}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              width: ResponsivePixels.size100,
              height: ResponsivePixels.size100,
              borderColor: Colors.secondary500,
              backgroundColor: Colors.secondary500,
              margin: ResponsivePixels.size5,
              borderWidth: 2,
              borderRadius: 75,
              alignSelf: 'center',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={Images.ic_Person}
              style={{
                width: ResponsivePixels.size60,
                height: ResponsivePixels.size60,
                tintColor: Colors.white,
              }}
              resizeMode={'contain'}
            />
          </View>
          <Text
            style={[
              {
                marginTop: 16,
                fontSize: 20,
                fontFamily: FontName.bold,
                color: Colors.yellow,
              },
            ]}>
            {'Admin Admin - EMP001'}
          </Text>
          <Text
            style={[
              {
                marginTop: ResponsivePixels.size2,
                fontSize: ResponsivePixels.size15,
                fontFamily: FontName.bold,
                color: Colors.black,
                textDecorationLine: 'underline',
              },
            ]}>
            View Profile
          </Text>
        </View>
      </Clickable>
      <FlatList
        style={{flex: 1, marginTop: ResponsivePixels.size20}}
        data={routes}
        renderItem={item => renderCell(item)}
      />
      <Clickable
        onPress={() => {
          AlertDialog.show({
            title: 'Logout',
            message: 'Do you really want to logout?',
            positiveButton: {
              title: 'Yes',
              onPress: () => {
                AlertDialog.hide();
                push('SignIn');
                //    loginApi.logout()
                store.dispatch(setSessionField('is_logged_in', false));
                store.dispatch(setSessionField('user', {}));
                store.dispatch(setSessionField('country_id', undefined));
                store.dispatch(setSessionField('country_name', undefined));
                reset('SelectCountry');
              },
            },
            negativeButton: {
              title: 'No',
              onPress: () => {
                AlertDialog.hide();
              },
            },
          });
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingVertical: 16,
        }}>
        <Image
          source={Images.ic_logout}
          style={{
            width: ResponsivePixels.size20,
            height: ResponsivePixels.size20,
            resizeMode: 'contain',
          }}
        />
        <Text style={[{marginStart: 16}]}>{'Logout'}</Text>
      </Clickable>
    </View>
  );
};
