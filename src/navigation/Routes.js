import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { store } from '../App';
import AddNotes from '../components/Home/ChildComponent/AddNotes';
import AnnouncementDetails from '../components/Home/ChildComponent/AnnouncementDetails';
import DrawerHome from '../components/Home/ChildComponent/DrawerHome';
import MyLeaveCount from '../components/Home/ChildComponent/MyLeaveCount';
import SignIn from '../components/Login/ChildComponent/SignIn';
import EndTrip from '../components/ManageCarAttendance/EndTrip';
import CarAttendance from '../components/ManageCarAttendance/List/CarAttendance';
import StartTrip from '../components/ManageCarAttendance/StartTrip';
import AddCashAdvance from '../components/ManageCashAdvance/AddCashAdvance';
import AddCashAdvancePH from '../components/ManageCashAdvance/AddCashAdvancePH';
import EditCashAdvance from '../components/ManageCashAdvance/EditCashAdvance';
import EditCashAdvancePH from '../components/ManageCashAdvance/EditCashAdvancePH';
import CashAdvance from '../components/ManageCashAdvance/List/CashAdvance';
import AddLeaveRequest from '../components/ManageLeave/AddLeaveRequest';
import LeaveApprovalList from '../components/ManageLeave/List/LeaveApprovalList';
import LeaveList from '../components/ManageLeave/List/LeaveList';
import AddReimbursement from '../components/ManageReimbursement/AddReimbursement';
import EditReimbursement from '../components/ManageReimbursement/EditReimbursement';
import Reimbursement from '../components/ManageReimbursement/List/Reimbursement';
import ReportList from '../components/ManageReports/List/ReportList';
import AddAttendance from '../components/MarkInOut/AddAttendance';
import AttendanceList from '../components/MarkInOut/List/AttendanceList';
import Profile from '../components/Profile/Profile';
import SelectCountry from '../components/SelectCountry/ChildComponent/SelectCountry';
import ShowMeRoute from '../components/ShowMeRoute/ShowMeRoute';
/////Skyward
import Splash from '../components/Splash/ChildComponent/Splash';
import { navigationRef } from './Navigator';



const Stack = createStackNavigator();

export default () => {
  const [loaded, setLoaded] = useState(false);
  const [initialRoue, setInitialRoute] = useState('SignIn');

  useEffect(() => {
    // openSQLiteDB();
    const session = store.getState().session;
    console.log('session.is_logged_in', session.country_id);
    
    //  setInitialRoute(!session.country_id ? 'SelectCountry':!session.is_logged_in ? 'CashAdvanceList':"CashAdvanceList");
    setInitialRoute(!session.country_id ? 'SelectCountry':!session.is_logged_in ? 'SignIn':"Home");
    SplashScreen.hide();

    setLoaded(true);
  }, []);

  return (
    loaded && (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator headerMode="none" initialRouteName={initialRoue}>
          {/* Skyward  */}
          <Stack.Screen component={DrawerHome} name="Home" />
          <Stack.Screen component={Splash} name="Splash" />
          <Stack.Screen component={SelectCountry} name="SelectCountry" />
          <Stack.Screen component={SignIn} name="SignIn" />
          <Stack.Screen component={CarAttendance} name="CarAttendanceList" />
          <Stack.Screen component={StartTrip} name="StartTrip" />
          <Stack.Screen component={LeaveList} name="LeaveList" />
          <Stack.Screen component={AddLeaveRequest} name="AddLeave" />
          <Stack.Screen component={CashAdvance} name="CashAdvanceList" />
          <Stack.Screen component={AddCashAdvance} name="AddCashAdvance" />
          <Stack.Screen component={AddCashAdvancePH} name="AddCashAdvancePH" />
          <Stack.Screen component={EditCashAdvancePH} name="EditCashAdvancePH" />
          <Stack.Screen component={EditCashAdvance} name="EditCashAdvance" />
          <Stack.Screen component={Reimbursement} name="ReimbursementList" />
          <Stack.Screen component={AddReimbursement} name="AddReimbursement" />
          <Stack.Screen component={EditReimbursement} name="EditReimbursement" />
          <Stack.Screen component={ReportList} name="Reports" />
          <Stack.Screen component={AddNotes} name="AddNotes" />
          <Stack.Screen component={MyLeaveCount} name="MyLeaveCount" />
          <Stack.Screen component={LeaveApprovalList} name="LeaveApprovalList" />
          <Stack.Screen component={AttendanceList} name="MarkInOutList" />
          <Stack.Screen component={AddAttendance} name="AddAttendance" />
          <Stack.Screen component={Profile} name="Profile" />
          <Stack.Screen component={ShowMeRoute} name="ShowMeRoute" />
          <Stack.Screen component={EndTrip} name="EndTrip" />
          <Stack.Screen component={AnnouncementDetails} name="AnnouncementDetails" />




        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};
