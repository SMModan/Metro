import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { getDropDowns } from '../../../../data/DatabaseHelper'
import Utils from '../../../../utils/Utils'
import { DROPDWON_GET_OPPORTUNITY_CATEGORY, DROPDWON_GET_OPPORTUNITY_CURRENCY, DROPDWON_GET_OPPORTUNITY_SALES_STAGE, DROPDWON_GET_OPPORTUNITY_STAGE, DROPDWON_GET_TERRITORY_FOR_ASSIGN_OPPORTUNITY } from '../../../../utils/AppConstants'
import { AlertDialog, ProgressDialog } from '../../../common'
import opportunityApi from '../../apis/OpportunityApis'
import AddOppCustomerUi from './AddOppCustomerUi'
import { goBack, push } from '../../../../navigation/Navigator'

class AddOppCustomer extends Component {

    state = {
        contactDialogVisible: false,
        contactList: [],
        selectedContactIndex: -1,
        loading: true,
        opportunityId: this.props.route?.params?.opportunityId || 0

    }

    componentDidMount = () => {

        if (this.state.opportunityId) {

            this.getOppertunityById()
        } else
            this.getAllDropDowns()

    }

    getOppertunityById = () => {

        opportunityApi.getOpportunityByID(this.state.opportunityId, (res) => {

            const { Table } = res
            const { OpportunityName, CustomerName, TerritoryID, CustomerID, StageID, CloseDate, CurrencyID, Amount, OpportunityDesc, OpportunityCategoryID, CompetitionStatus, OpportunitySalesStageID, } = Table

            this.setState({ OpportunityName, CustomerName, TerritoryID, CustomerID, StageID, CloseDate, CurrencyID, Amount, OpportunityDescription: OpportunityDesc, OpportunityCategoryID, CompetitionStatus, OpportunitySalesStageID, })
            this.getAllDropDowns()

        }, (error) => {

            Utils.showToast(error)
            goBack()
        })
    }

    getAllDropDowns = async () => {

        // ProgressDialog.show()
        try {


            const customers = await opportunityApi.getCustomers()
            const territories = await getDropDowns(DROPDWON_GET_TERRITORY_FOR_ASSIGN_OPPORTUNITY)
            const stages = await getDropDowns(DROPDWON_GET_OPPORTUNITY_STAGE)
            const oppCategories = await getDropDowns(DROPDWON_GET_OPPORTUNITY_CATEGORY)
            const oppCurrencies = await getDropDowns(DROPDWON_GET_OPPORTUNITY_CURRENCY)
            const oppSalesStages = await getDropDowns(DROPDWON_GET_OPPORTUNITY_SALES_STAGE)
            console.log("territories", territories)

            this.setState({
                loading: false,
                territories, customers, stages, oppCategories, oppCurrencies, oppSalesStages
            })
        } catch (error) {
            this.setState({
                loading: false,
            })
            console.log("Error", error)
        }
        // ProgressDialog.hide()

    }

    onTextChanged = (key, value) => {

        this.setState({
            [key]: value
        })
    }

    saveOpportunity = () => {

        const { OpportunityName, TerritoryID, CustomerID, StageID, CloseDate, CurrencyID, Amount, OpportunityDescription, OpportunityCategoryID, CompetitionStatus, OpportunitySalesStageID, opportunityId } = this.state

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
                OpportunityTypeID: 0, AssignTerritoryID: 0, OpportunityID: opportunityId, ProductDetails: "", AssignUserName: ""
            }
            opportunityApi.addOrUpdateOpportunity(params, (res) => {
                ProgressDialog.hide()

                AlertDialog.show({
                    title: "Attachment",
                    message: "Do you want to add attachment",
                    positiveButton: {
                        onPress: () => {
                            AlertDialog.hide()
                            push("OppAttachment", { id: res.ID })
                        },
                        title: "Yes"
                    },
                    negativeButton: {
                        onPress: () => {
                            AlertDialog.hide()
                        },
                        title: "No"
                    }
                })
                goBack()
            }, (error) => {

                Utils.showToast(error)
                ProgressDialog.hide()
            })
        }
    }

    render() {
        const { contactDialogVisible, loading, selectedContactIndex, contactList, territories, stages, oppCategories, oppCurrencies, oppSalesStages, customers, OpportunityName, CustomerName, TerritoryID, CustomerID, StageID, CloseDate, CurrencyID, Amount, OpportunityDescription, OpportunityCategoryID, CompetitionStatus, OpportunitySalesStageID, opportunityId } = this.state
        return (
            <AddOppCustomerUi opportunity={{ ID: opportunityId, OpportunityName, CustomerName, TerritoryID, CustomerID, StageID, CloseDate, CurrencyID, Amount, OpportunityDescription, OpportunityCategoryID, CompetitionStatus, OpportunitySalesStageID, }} loading={loading} onTextChanged={this.onTextChanged} customers={customers} territories={territories} stages={stages} oppCategories={oppCategories} oppCurrencies={oppCurrencies} oppSalesStages={oppSalesStages} selectedContactIndex={selectedContactIndex} onContactSelect={(index) => {

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
