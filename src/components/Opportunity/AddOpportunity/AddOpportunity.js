import React, { Component } from 'react'
import { Text, View } from 'react-native'
import AddOpportunityUi from './AddOpportunityUi'

export const OpportunityContext = React.createContext({});

class AddOpportunity extends Component {

    state = {
        opportunity: {},

    }

    setOpportunity = (opportunity) => {

        this.setState({ opportunity })
    }

    render() {
        // console.log("opportunityId", this.props.route?.params)

        return (
            <OpportunityContext.Provider value={{ opportunity: this.state.opportunity, setOpportunity: this.setOpportunity }}>
                <AddOpportunityUi opportunityId={this.props.route?.params?.opportunityId} />
            </OpportunityContext.Provider>
        )
    }
}

export default AddOpportunity
