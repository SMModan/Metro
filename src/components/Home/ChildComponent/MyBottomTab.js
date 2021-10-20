import React, {useState, useEffect} from 'react';
import {Text, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Analytics from '../../Analytics/Analytics';
import DummyView from './DummyView';
import {Images, Colors, FontName, FontSize} from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import NotificationList from '../../Notification/NotificationList';
import MyLeaveCount from './MyLeaveCount';
import HomeApis from '../apis/HomeApis';
import {ProgressDialog} from '../../common';
import {Badge} from 'react-native-paper';
// import ReportsMain from '../../Reports/ChildComponent/ReportsMain';
// import MonieMattersMain from '../../MonieMatters/ChildComponent/MonieMattersMain';
// import PaymentMain from '../../Payments/ChildComponent/PaymentMain';
// import HelpMain from '../../Help/ChildComponent/HelpMain';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  const [PendingCount, setPendingCount] = useState(0);
  useEffect(() => {
    GetPendingleaveApprovalCount();
  }, []);

  const GetPendingleaveApprovalCount = () => {
    // const {announcementType} = this.state;

    ProgressDialog.show();
    HomeApis.GetPendingleaveApprovalCount(
      {},
      res => {
        ProgressDialog.hide();
        if (res) {
          const {Table} = res;
          console.log(
            'Table  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
            Table,
          );

          // {"Balance": 17, "EmployeeName": "Harshil  Thaker", "ID": 1, "LeaveName": "Annual Leaves"}

          if (Table) {
            setPendingCount(Table?.PendingCount);
          }
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };

  return (
    <Tab.Navigator
      shifting
      initialRouteName="Dashboard"
      tabBarOptions={{
        activeTintColor: Colors.Red900,
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
          paddingTop: ResponsivePixels.size5,
        },
      }}>
      <Tab.Screen
        options={{
          title: 'Dashboard',
          tabBarIcon: ({color}) => (
            <Image source={Images.ic_BottomTab1} style={{tintColor: color}} />
          ),
        }}
        name="Dashboard"
        component={Home}
      />

      <Tab.Screen
        options={{
          title: 'Leaves Balance',

          tabBarIcon: ({color}) => (
            <Image
              source={Images.ic_leave_balance}
              style={{
                tintColor: color,
                width: ResponsivePixels.size25,
                height: ResponsivePixels.size25,
              }}
            />
          ),
        }}
        name="MyLeaveCount"
        component={MyLeaveCount}
      />

      <Tab.Screen
        options={{
          title: 'Leave Approvals',
          tabBarIcon: ({color}) => (
            <>
              <Image
                source={Images.ic_leave_approval}
                style={{
                  tintColor: color,
                  width: ResponsivePixels.size25,
                  height: ResponsivePixels.size25,
                }}
              />

              {PendingCount === 0 ? (
                <Badge style={{position: 'absolute', top: 0, right: ResponsivePixels.size15}}>
                  <Text>{PendingCount}</Text>
                </Badge>
              ) : null}
            </>
          ),
        }}
        name="Notifications"
        component={NotificationList}
      />

      <Tab.Screen
        options={{
          title: 'Show Me Route',
          tabBarIcon: ({color}) => (
            <Image
              source={Images.ic_location}
              style={{
                tintColor: color,
                width: ResponsivePixels.size25,
                height: ResponsivePixels.size25,
              }}
            />
          ),
        }}
        name="Route"
        component={DummyView}
      />
    </Tab.Navigator>
  );
}
