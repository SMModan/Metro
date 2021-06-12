import React, { Component } from 'react'
import { Text, View } from 'react-native'
import AddOppCustomerUi from './AddOppCustomerUi'

class AddOppCustomer extends Component {

    state = {
        contactDialogVisible: false,
        contactList: [
            { name: "Ankit kumar", phoneNumber: "9876546465", email: "ankit@ak.com", checked: true },
            { name: "Benjamin kumar", phoneNumber: "9876546466", email: "Benjamin@ak.com", checked: false }],
        selectedContactIndex: -1

    }

    render() {
        const { contactDialogVisible, selectedContactIndex, contactList } = this.state
        return (
            <AddOppCustomerUi selectedContactIndex={selectedContactIndex} onContactSelect={(index) => {

                this.setState({ selectedContactIndex: index })
            }} contactList={contactList} onSelectContact={() => {
                this.setState({ contactDialogVisible: true })
            }} onDismiss={() => {
                this.setState({ contactDialogVisible: false })

            }} contactDialogVisible={contactDialogVisible} />
        )
    }
}

export default AddOppCustomer
