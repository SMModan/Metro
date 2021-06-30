import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { getDropDowns } from '../../../../data/DatabaseHelper'
import Utils from '../../../../utils/Utils'
import { DROPDWON_GET_OPPORTUNITY_CATEGORY, DROPDWON_GET_OPPORTUNITY_CURRENCY, DROPDWON_GET_OPPORTUNITY_SALES_STAGE, DROPDWON_GET_OPPORTUNITY_STAGE, DROPDWON_GET_TERRITORY_FOR_ASSIGN_OPPORTUNITY } from '../../../../utils/AppConstants'
import { ProgressDialog } from '../../../common'
import opportunityApi from '../../apis/OpportunityApis'
import AddOppCustomerUi from './AddOppCustomerUi'
import { goBack } from '../../../../navigation/Navigator'

class AddOppCustomer extends Component {

    state = {
        contactDialogVisible: false,
        contactList: [],
        selectedContactIndex: -1,


    }

    componentDidMount = () => {

        this.getAllDropDowns()

    }

    getAllDropDowns = async () => {

        ProgressDialog.show()
        try {


            const customers = await opportunityApi.getCustomers()
            const territories = await getDropDowns(DROPDWON_GET_TERRITORY_FOR_ASSIGN_OPPORTUNITY)
            const stages = await getDropDowns(DROPDWON_GET_OPPORTUNITY_STAGE)
            const oppCategories = await getDropDowns(DROPDWON_GET_OPPORTUNITY_CATEGORY)
            const oppCurrencies = await getDropDowns(DROPDWON_GET_OPPORTUNITY_CURRENCY)
            const oppSalesStages = await getDropDowns(DROPDWON_GET_OPPORTUNITY_SALES_STAGE)
            console.log("territories", territories)
            this.setState({
                territories, customers, stages, oppCategories, oppCurrencies, oppSalesStages
            })
        } catch (error) {

            console.log("Error", error)
        }
        ProgressDialog.hide()

    }

    onTextChanged = (key, value) => {

        this.setState({
            [key]: value
        })
    }

    saveOpportunity = () => {

        const { OpportunityName, TerritoryID, CustomerID, StageID, CloseDate, CurrencyID, Amount, OpportunityDescription, OpportunityCategoryID, CompetitionStatus, OpportunitySalesStageID, } = this.state

        if (Utils.isEmpty(CustomerID)) {
            Utils.showToast("Please select Customer")

        }
        else if (Utils.isEmpty(OpportunityName)) {

            Utils.showToast("Please enter Opportunity Name")
        }
        else if (Utils.isEmpty(CloseDate)) {
            Utils.showToast("Please select Close Date")

        }
        else if (Utils.isEmpty(TerritoryID)) {
            Utils.showToast("Please select Territory")

        }
        else if (Utils.isEmpty(StageID)) {
            Utils.showToast("Please select Stage")

        } else {

            ProgressDialog.show()
            const params = {
                OpportunityName, TerritoryID, CustomerID, StageID, CloseDate, CurrencyID, Amount, OpportunityDescription, OpportunityCategoryID, CompetitionStatus, OpportunitySalesStageID,
                OpportunityTypeID: 0, AssignTerritoryID: 0, OpportunityID: 0, ProductDetails: "", AssignUserName: ""
            }
            opportunityApi.addOrUpdateOpportunity(params, () => {
                ProgressDialog.hide()
                goBack()
            }, (error) => {

                Utils.showToast(error)
                ProgressDialog.hide()
            })
        }
    }

    render() {
        const { contactDialogVisible, selectedContactIndex, contactList, territories, stages, oppCategories, oppCurrencies, oppSalesStages, customers } = this.state
        return (
            <AddOppCustomerUi onTextChanged={this.onTextChanged} customers={customers} territories={territories} stages={stages} oppCategories={oppCategories} oppCurrencies={oppCurrencies} oppSalesStages={oppSalesStages} selectedContactIndex={selectedContactIndex} onContactSelect={(index) => {

                this.setState({ selectedContactIndex: index })
            }} contactList={contactList} onSelectContact={() => {
                this.setState({ contactDialogVisible: true })
            }} onDismiss={() => {
                this.setState({ contactDialogVisible: false })

            }}
                onSelectCustomer={async (item) => {

                    const contacts = await opportunityApi.getContactByCustomerId(item.id)

                    this.setState({ contactList: contacts })
                }}
                onSave={this.saveOpportunity}
                contactDialogVisible={contactDialogVisible} />
        )
    }
}

export default AddOppCustomer
