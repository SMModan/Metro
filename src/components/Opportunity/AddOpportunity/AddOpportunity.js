import React, { Component } from 'react'
import { Text, View } from 'react-native'
import AddOpportunityUi from './AddOpportunityUi'

class AddOpportunity extends Component {


    render() {
        // console.log("opportunityId", this.props.route?.params)

        return (
            <AddOpportunityUi opportunityId={this.props.route?.params?.opportunityId} />
        )
    }
}

export default AddOpportunity
