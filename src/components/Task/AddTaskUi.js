import React, { Component } from 'react'
import { Text, View } from 'react-native'
import AddTask from './AddTask'

export const TaskContext = React.createContext({});

class AddTaskUi extends Component {

    state = {
        opportunity: {},

    }

    setOpportunity = (opportunity) => {

        this.setState({ opportunity })
    }

    render() {
        // console.log("opportunityId", this.props.route?.params)

        return (
            <TaskContext.Provider value={{ opportunity: this.state.opportunity, setOpportunity: this.setOpportunity }}>
                <AddTask taskid={this.props.route?.params?.taskid} />
            </TaskContext.Provider>
        )
    }
}

export default AddTaskUi
