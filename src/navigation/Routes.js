import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { store } from '../App';
import AddAppointments from '../components/Appointments/AddAppointments';
import Appointments from '../components/Appointments/List/Appointments';
import AddContacts from '../components/Contacts/AddContacts';
import Contacts from '../components/Contacts/List/Contacts';
import AddCustomer from '../components/Customer/AddCustomer';
import EditCustomer from '../components/Customer/EditCustomer';
import Customer from '../components/Customer/List/Customer';
import AddHelpDesk from '../components/HelpDesk/AddHelpDesk';
import HelpDesk from '../components/HelpDesk/List/HelpDesk';
import MyCheckin from '../components/HelpDesk/List/MyCheckin';
import UpdateHelpDesk from '../components/HelpDesk/UpdateHelpDesk';
import AddNotes from '../components/Home/ChildComponent/AddNotes';
import DrawerHome from '../components/Home/ChildComponent/DrawerHome';
import MyLeaveCount from '../components/Home/ChildComponent/MyLeaveCount';
import SignIn from '../components/Login/ChildComponent/SignIn';
import EndTrip from '../components/ManageCarAttendance/EndTrip';
import CarAttendance from '../components/ManageCarAttendance/List/CarAttendance';
import StartTrip from '../components/ManageCarAttendance/StartTrip';
import AddCashAdvance from '../components/ManageCashAdvance/AddCashAdvance';
import EditCashAdvance from '../components/ManageCashAdvance/EditCashAdvance';
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
import AddOpportunity from '../components/Opportunity/AddOpportunity/AddOpportunity';
import OppAttachment from '../components/Opportunity/AddOpportunity/attachment/OppAttachment';
import AddOppContact from '../components/Opportunity/AddOpportunity/customer/AddOppContact/AddOppContact';
import Opportunity from '../components/Opportunity/list/Opportunity';
import Profile from '../components/Profile/Profile';
import QuotationList from '../components/Quotation/QuotationList';
import QuotationView from '../components/Quotation/QuotationView';
import SelectCountry from '../components/SelectCountry/ChildComponent/SelectCountry';
import ShowMeRoute from '../components/ShowMeRoute/ShowMeRoute';
/////Skyward
import Splash from '../components/Splash/ChildComponent/Splash';
import AddNewTask from '../components/Task/AddNewTask';
import AddRemarks from '../components/Task/AddRemarks';
import TaskAttachment from '../components/Task/attachment/TaskAttachment';
import TaskList from '../components/Task/List/TaskList';
import MainAddTask from '../components/Task/MainAddTask';
import { navigationRef } from './Navigator';



const Stack = createStackNavigator();

export default () => {
  const [loaded, setLoaded] = useState(false);
  const [initialRoue, setInitialRoute] = useState('SignIn');

  useEffect(() => {
    // openSQLiteDB();
    const session = store.getState().session;
    console.log('session.is_logged_in', session.country_id);
    
     setInitialRoute(!session.country_id ? 'SelectCountry':!session.is_logged_in ? 'EndTrip':"EndTrip");
    // setInitialRoute(!session.country_id ? 'SelectCountry':!session.is_logged_in ? 'AddAttendance':"AddAttendance");
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








          <Stack.Screen component={HelpDesk} name="HelpDesk" />
          <Stack.Screen component={AddHelpDesk} name="AddHelpDesk" />
          <Stack.Screen component={UpdateHelpDesk} name="UpdateHelpDesk" />
          <Stack.Screen component={Opportunity} name="Opportunity" />
          <Stack.Screen component={AddOpportunity} name="AddOpportunity" />
          <Stack.Screen component={AddOppContact} name="AddOppContact" />
          <Stack.Screen component={Appointments} name="Appointments" />
          <Stack.Screen component={AddAppointments} name="AddAppointments" />
          <Stack.Screen component={OppAttachment} name="OppAttachment" />
          <Stack.Screen component={TaskAttachment} name="TaskAttachment" />
          <Stack.Screen component={Customer} name="Customer" />
          <Stack.Screen component={Contacts} name="Contacts" />
          <Stack.Screen component={AddContacts} name="AddContacts" />
          <Stack.Screen component={AddCustomer} name="AddCustomer" />
          <Stack.Screen component={EditCustomer} name="EditCustomer" />
          <Stack.Screen component={TaskList} name="Tasks" />
          <Stack.Screen component={QuotationList} name="Quotation" />
          <Stack.Screen component={QuotationView} name="QuotationView" />
          <Stack.Screen component={MainAddTask} name="MainAddTask" />
          <Stack.Screen component={AddNewTask} name="AddNewTask" />
          <Stack.Screen component={AddRemarks} name="AddRemarks" />
          <Stack.Screen component={MyCheckin} name="MyCheckInOut" />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};
