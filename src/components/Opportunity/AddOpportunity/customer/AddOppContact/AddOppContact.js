import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { goBack } from '../../../../../navigation/Navigator'
import { Utils } from '../../../../../utils'
import { DROPDWON_GET_CUSTOMER_CATEGORY, DROPDWON_GET_CUSTOMER_TYPE, DROPDWON_GET_OPPORTUNITY_CATEGORY, DROPDWON_GET_TERRITORY_FOR_ASSIGN_OPPORTUNITY } from '../../../../../utils/AppConstants'
import { ProgressDialog } from '../../../../common'
import opportunityApi from '../../../apis/OpportunityApis'
import WrappedComponentOpportunity from '../../WrappedComponentOpportunity'
import AddOppContactUi from './AddOpppContactUi'

class AddOppContact extends Component {

    state = {
        CustomerID: 0,
        CustomerName: "",
        TerritoryID: 0,
        CustomerTypeID: 0,
        IndustryID: 0,
        SourceID: 0,
        PartnerID: 0,
        CustomerDescription: "",
        PhoneNo: "",
        EmailID: "",
        CustomerCategoryID: 0,
        addressList: [],
        terrotories: this.props.session[DROPDWON_GET_TERRITORY_FOR_ASSIGN_OPPORTUNITY],
        customerCategories: this.props.session[DROPDWON_GET_CUSTOMER_CATEGORY],
        customerTypes: this.props.session[DROPDWON_GET_CUSTOMER_TYPE],

    }

    onTextChanged = (key, value) => {
        // console.log("AssignTerritoryID", key, value)

        this.setState({
            [key]: value
        })
    }
    onSave = () => {

        const { CustomerName, CustomerID, TerritoryID, IndustryID, SourceID, PartnerID, addressList, CustomerTypeID, PhoneNo, EmailID, CustomerCategoryID, CustomerDescription } = this.state
        if (Utils.isEmpty(CustomerName)) {
            Utils.showToast("Please enter Customer Name")
        }
        else if (Utils.isEmpty(CustomerTypeID)) {
            Utils.showToast("Please select Customer Type")

        }
        else if (Utils.isEmpty(CustomerCategoryID)) {
            Utils.showToast("Please select Customer Type")

        }

        else if (!Utils.isValidEmail(EmailID)) {
            Utils.showToast("Please enter valid Email Id")
        } else {

            const params = {
                CustomerID,
                CustomerName,
                TerritoryID,
                CustomerTypeID,
                PhoneNo,
                CustomerDescription,
                EmailID, CustomerCategoryID,
                IndustryID, SourceID, PartnerID, addressList: JSON.stringify(addressList),
            }
            ProgressDialog.show()
            opportunityApi.addOrUpdateCustomer(params, (res) => {
                ProgressDialog.hide()

                this.props.route?.params?.onSave({ id: res.ID, name: CustomerName })
                goBack()
            }, (error) => {
                ProgressDialog.hide()

            })
        }

    }
    render() {
        return (
            <AddOppContactUi {...this.state} onSave={this.onSave} onTextChanged={this.onTextChanged} />
        )
    }
}

export default WrappedComponentOpportunity(AddOppContact)
