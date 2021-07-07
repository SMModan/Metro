import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { strings } from '../../../language/Language'
import { goBack } from '../../../navigation/Navigator'
import { Colors, FontName, Images } from '../../../utils'
import { MainContainer } from '../../common'
import OppAttachment from './attachment/OppAttachment'
import AddOppCustomer from './customer/AddOppCustomer'
import AddOppProduct from './product/AddOppProduct'
import OppTaskList from './task/OppTaskList'

const Tab = createMaterialTopTabNavigator();
const AddOpportunityUi = ({ opportunityId }) => {

    return (
        <MainContainer header={{
            title: !opportunityId ? strings.addOpportunity : strings.editOpportunity, left: {
                image: Images.ic_BackWhite,
                onPress: () => goBack(),
            },
        }}>
            {/* <MyTabs tabs={[{
                name: "Customer",
                component: <AddOppCustomer />

            }, {
                name: "Product",
                component: <AddOppProduct />

            },
                , {
                name: "Task",
                component: <OppTaskList />

            }, {
                name: "Attachment",
                component: <OppAttachment />

            }]} /> */}
            <Tab.Navigator
                initialRouteName="Customer"
                swipeEnabled
                lazy
                backBehavior="initialRoute"
                keyboardDismissMode="auto"
                tabBarOptions={{
                    activeTintColor: 'white',
                    labelStyle: { textTransform: 'none', fontSize: 15, fontFamily: FontName.regular },
                    scrollEnabled: opportunityId ? true : false,

                    style: { backgroundColor: Colors.secondary500 },
                    showIcon: true,
                    indicatorStyle: { backgroundColor: Colors.primaryColor500 }
                }}
            >
                <Tab.Screen
                    name="Customer"
                    component={AddOppCustomer}
                    initialParams={{ opportunityId: opportunityId }}
                    options={{ title: 'Customer', tabBarIcon: ({ color }) => <Image style={{ tintColor: color, width: 16, height: 16, resizeMode: "contain" }} source={Images.ic_contact} /> }}
                />
                <Tab.Screen
                    name="Product"
                    component={AddOppProduct}
                    options={{ tabBarLabel: 'Product', tabBarIcon: ({ color }) => <Image style={{ tintColor: color, width: 16, height: 16, resizeMode: "contain" }} source={Images.ic_product} /> }}
                />
                {opportunityId ?

                    <Tab.Screen
                        name="Task"
                        component={OppTaskList}
                        options={{ tabBarLabel: 'Task', tabBarIcon: ({ color }) => <Image style={{ tintColor: color, width: 16, height: 16, resizeMode: "contain" }} source={Images.ic_task} /> }}
                    /> : null}

                {opportunityId ? <Tab.Screen
                    name="Attachment"
                    initialParams={{ editMode: true }}
                    component={OppAttachment}
                    options={{ tabBarLabel: 'Attachment', tabBarIcon: ({ color }) => <Image style={{ tintColor: color, width: 16, height: 16, resizeMode: "contain" }} source={Images.ic_attachment} /> }}
                />

                    : null}
            </Tab.Navigator>

        </MainContainer>
    )
}

export default AddOpportunityUi

const styles = StyleSheet.create({})
