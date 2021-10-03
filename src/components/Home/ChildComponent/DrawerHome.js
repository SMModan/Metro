import React, { useState } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FlatList, Image, Text, View } from 'react-native';
import { Clickable } from "../../common";
import { Colors, FontName, Images } from "../../../utils";
import { createStackNavigator } from '@react-navigation/stack';

const Drawer = createDrawerNavigator();

export default function DrawerHome() {
    return (
        <Drawer.Navigator drawerContent={(props) => <SideMenu {...props} />} drawerType="slide" drawerStyle={{ width: wp(60) }} initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeStack} />
        </Drawer.Navigator>
    );
}

const Stack = createStackNavigator();

const HomeStack = () => {
    return <Stack.Navigator headerMode="none" >
        {/* Skyward  
        Add all your routes here
        and use this,props.navigation.openDrawer() to open drawer.
        */}
        <Stack.Screen component={HomeTabs} name="Home" />

    </Stack.Navigator>

}
const SideMenu = ({ navigation }) => {

    const [routes, setRoutes] = useState([
        {
            title: "Home",
            icon: Images.ic_home,
            route: "Home"
        },
        {
            title: "Car Attendence",
            icon: Images.ic_Appointment,
            route: ""
        },
        {
            title: "Leave",
            icon: Images.ic_contact,
            route: ""
        },
        {
            title: "Cash Advance",
            icon: Images.ic_Call,
            route: "WeightInList"
        },
        {
            title: "Reimburshment",
            icon: Images.ic_task,
            route: ""
        },
        {
            title: "Report",
            icon: Images.ic_HelpDesk,
            route: ""
        }
    ])
    return (
        <View style={{ flex: 1, backgroundColor: "white", padding: 16, paddingTop: 64 }}>

            <View style={{ alignItems: "center", justifyContent: "center" }}>

                <Image style={{ width: 100, height: 1000, backgroundColor: "gray", borderRadius: 50 }} />
                <Text style={[{ marginTop: 16, fontSize: 20, fontFamily: FontName.bold, color: Colors.yellow }]}>{"User Name"}</Text>

            </View>


            <FlatList
                style={{ flex: 1, marginTop: 16 }}
                data={routes}
                renderItem={({ item }) => (
                    <Clickable onPress={() => navigation.navigate(item.route)} style={{ flexDirection: "row", paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: Colors.editTextHintColor, alignItems: "center" }}>
                        <Image source={item.icon} />
                        <Text style={[{ marginStart: 16, fontSize: 16, fontFamily: FontName.regular, color: Colors.black }]}>{item.title}</Text>
                    </Clickable>
                )}
            />
            <Clickable onPress={() => {
                AlertDialog.show({
                    title: "Logout",
                    message: "Do you really want to logout?",
                    positiveButton: {
                        title: "Yes",
                        onPress: () => {
                            AlertDialog.hide()
                            loginApi.logout()
                            // store.dispatch(setSessionField(IS_LOGGED_IN, false))
                        }
                    },
                    negativeButton: {
                        title: "No",
                        onPress: () => {

                            AlertDialog.hide()
                        }
                    }
                })
            }} style={{ flexDirection: "row", justifyContent: "center", paddingVertical: 16, }}>
                <Image source={Images.ic_logout} />

                <Text style={[{ marginStart: 16 }]}>{"Logout"}</Text>
            </Clickable>
        </View>
    )
}