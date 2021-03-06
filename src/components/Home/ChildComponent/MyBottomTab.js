import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { Image, Text } from 'react-native';
import { Badge } from 'react-native-paper';
import { store } from '../../../App';
import { Colors, FontName, FontSize, Images } from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import { ProgressDialog } from '../../common';
import LeaveApprovalList from '../../ManageLeave/List/LeaveApprovalList';
import ShowMeRoute from '../../ShowMeRoute/ShowMeRoute';
import HomeApis from '../apis/HomeApis';
import Home from './Home';
import MyLeaveCount from './MyLeaveCount';
// import ReportsMain from '../../Reports/ChildComponent/ReportsMain';
// import MonieMattersMain from '../../MonieMatters/ChildComponent/MonieMattersMain';
// import PaymentMain from '../../Payments/ChildComponent/PaymentMain';
// import HelpMain from '../../Help/ChildComponent/HelpMain';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  const [PendingCount, setPendingCount] = useState(0);
  const [Country, setCountry] = useState(1);
  useEffect(() => {

  const countryId = store.getState().session.country_id
    setCountry(countryId)

console.log("countryId in my bottam bar",countryId)
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

{Country !=3 && Country !=4  &&  <>
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
                <Badge style={{position: 'absolute', top: 0, right: ResponsivePixels.size15,backgroundColor:Colors.Red900}}>
                  <Text>{PendingCount||0}</Text>
                </Badge>
              ) : null}
            </>
          ),
        }}
        name="LeaveApprovalList"
        component={LeaveApprovalList}
      />
</>}
    

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
        name="ShowMeRoute"
        component={ShowMeRoute}
      />
    </Tab.Navigator>
  );
}
