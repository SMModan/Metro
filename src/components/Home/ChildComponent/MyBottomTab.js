import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Analytics from '../../Analytics/Analytics';
import DummyView from './DummyView';
import { Images, Colors, FontName, FontSize } from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import NotificationList from '../../Notification/NotificationList';
// import ReportsMain from '../../Reports/ChildComponent/ReportsMain';
// import MonieMattersMain from '../../MonieMatters/ChildComponent/MonieMattersMain';
// import PaymentMain from '../../Payments/ChildComponent/PaymentMain';
// import HelpMain from '../../Help/ChildComponent/HelpMain';


const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      shifting
      initialRouteName="Analytics"
      tabBarOptions={{
        activeTintColor: Colors.primaryColor500,
        inactiveTintColor: Colors.blueGray500,
        style: {
          backgroundColor: Colors.white,
          paddingTop: ResponsivePixels.size5,
          height: ResponsivePixels.size70,
          paddingBottom: ResponsivePixels.size5,
          // height:ResponsivePixels.size90,
          //   borderTopColor: Colors.lightGreenColor,
          //   borderTopWidth: 1
        },
        labelStyle: {
          fontSize: FontSize.fontSize12,
          fontFamily: FontName.regular,
          paddingTop: ResponsivePixels.size5
        },
      }}>
      <Tab.Screen
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Image
              source={Images.ic_BottomTab1}
              style={{ tintColor: color }}
            />
          ),
        }}
        name="Dashboard"
        component={Home}
      />

      <Tab.Screen
        options={{
          title: "Analytics",

          tabBarIcon: ({ color }) => (
            <Image
              source={Images.ic_BottomTab2}
              style={{ tintColor: color }}
            />
          ),
        }}
        name="Analytics"
        component={Analytics}
      />

      <Tab.Screen
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => (
            <Image
              source={Images.ic_BottomTab3}
              style={{ tintColor: color }}
            />
          ),
        }}
        name="Notifications"
        component={NotificationList}
      />

      <Tab.Screen
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Image
              source={Images.ic_BottomTab4}
              style={{ tintColor: color }}
            />
          ),
        }}
        name="Profile"
        component={DummyView}
      />


    </Tab.Navigator>
  );
}