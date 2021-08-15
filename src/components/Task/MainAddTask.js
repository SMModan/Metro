import React, { Component } from 'react'
import { Text, View } from 'react-native'
import AddTask from './AddTask'
import { TaskContext } from './TaskContext'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TaskAttachment from './attachment/TaskAttachment'
import { Image } from 'react-native'
import { Colors, FontName, Images } from '../../utils'
import { MainContainer } from '../common'
import { goBack } from '../../navigation/Navigator'

const Tab = createMaterialTopTabNavigator();

class MainAddTask extends Component {

    state = {
        task: {},

    }

    setTask = (task) => {

        this.setState({ task })
    }

    render() {
        // console.log("opportunityId", this.props.route?.params)
        const { item } = this.props.route?.params || {}
        return (
            <MainContainer
                header={{
                    left: {
                        image: Images.ic_BackWhite,
                        onPress: () => goBack(),
                    },
                    title: item ? "Update Task" : 'Add Task',
                    hideUnderLine: true,
                    light: true,
                }}>
                <TaskContext.Provider value={{ item, task: this.state.task, setTask: this.setTask }}>
                    {!item ? <AddTask />
                        :
                        <Tab.Navigator
                            initialRouteName="Customer"
                            swipeEnabled
                            lazy
                            backBehavior="initialRoute"
                            keyboardDismissMode="auto"
                            tabBarOptions={{
                                activeTintColor: 'white',
                                labelStyle: { textTransform: 'none', fontSize: 15, fontFamily: FontName.regular },
                                scrollEnabled: false,

                                style: { backgroundColor: Colors.secondary500 },
                                showIcon: true,
                                indicatorStyle: { backgroundColor: Colors.primaryColor500 }
                            }}
                        >

                            <Tab.Screen
                                name="Task"
                                component={AddTask}
                                options={{ tabBarLabel: 'Task', tabBarIcon: ({ color }) => <Image style={{ tintColor: color, width: 16, height: 16, resizeMode: "contain" }} source={Images.ic_task} /> }}
                            />

                            <Tab.Screen
                                name="Attachment"
                                initialParams={{ id: item.TaskActivityID, editMode: true }}
                                component={TaskAttachment}
                                options={{ tabBarLabel: 'Attachment', tabBarIcon: ({ color }) => <Image style={{ tintColor: color, width: 16, height: 16, resizeMode: "contain" }} source={Images.ic_attachment} /> }}
                            />

                        </Tab.Navigator>}
                </TaskContext.Provider>
            </MainContainer>
        )
    }
}

export default MainAddTask
