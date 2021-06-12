import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AddAppointments from '../components/Appointments/AddAppointments';
import AddContact from '../components/Customer/AddContact';
import AddCustomer from '../components/Customer/ViewCustomer';
import AddHelpDesk from '../components/HelpDesk/AddHelpDesk';
import UpdateHelpDesk from '../components/HelpDesk/UpdateHelpDesk';
import MyBottomTab from '../components/Home/ChildComponent/MyBottomTab';
import Appointments from '../components/HomeDetails/ChildComponent/Appointments';
import HelpDesk from '../components/HomeDetails/ChildComponent/HelpDesk';
import Opportunity from '../components/HomeDetails/ChildComponent/Opportunity';
import SignIn from '../components/Login/ChildComponent/SignIn';
import NotificationList from '../components/Notification/NotificationList';
import AddOpportunity from '../components/Opportunity/AddOpportunity/AddOpportunity';
import AddOppContact from '../components/Opportunity/AddOpportunity/customer/AddOppContact/AddOppContact';
/////Skyward
import Splash from '../components/Splash/ChildComponent/Splash';
import AddTask from '../components/Task/AddTask';
import Attachment from '../components/Task/attachment/Attachment';
import TaskList from '../components/Task/TaskList';
import { navigationRef } from './Navigator';


const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator headerMode="none" initialRouteName="Splash">
        {/* Skyward  */}
        <Stack.Screen component={MyBottomTab} name="MyBottomTab" />
        <Stack.Screen component={Splash} name="Splash" />
        <Stack.Screen component={SignIn} name="SignIn" />
        <Stack.Screen component={HelpDesk} name="HelpDesk" />
        <Stack.Screen component={AddHelpDesk} name="AddHelpDesk" />
        <Stack.Screen component={UpdateHelpDesk} name="UpdateHelpDesk" />
        <Stack.Screen component={Opportunity} name="Opportunity" />
        <Stack.Screen component={AddOpportunity} name="AddOpportunity" />
        <Stack.Screen component={AddOppContact} name="AddOppContact" />
        <Stack.Screen component={Appointments} name="Appointments" />
        <Stack.Screen component={AddAppointments} name="AddAppointments" />
        <Stack.Screen component={TaskList} name="Tasks" />
        <Stack.Screen component={AddTask} name="AddTask" />
        <Stack.Screen component={Attachment} name="AddTaskAttachment" />
        <Stack.Screen component={AddContact} name="AddCustomer" />
        <Stack.Screen component={NotificationList} name="Notifications" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};