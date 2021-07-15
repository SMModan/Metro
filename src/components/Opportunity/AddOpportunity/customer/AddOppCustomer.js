import React, { Component } from 'react'
import { goBack } from '../../../../navigation/Navigator'
import { DROPDWON_GET_OPPORTUNITY_CATEGORY, DROPDWON_GET_OPPORTUNITY_CURRENCY, DROPDWON_GET_OPPORTUNITY_SALES_STAGE, DROPDWON_GET_OPPORTUNITY_STAGE, DROPDWON_GET_TERRITORY_FOR_ASSIGN_OPPORTUNITY } from '../../../../utils/AppConstants'
import Utils from '../../../../utils/Utils'
import { AlertDialog, ProgressDialog } from '../../../common'
import opportunityApi from '../../apis/OpportunityApis'
import WrappedComponentOpportunity from "../WrappedComponentOpportunity"
import AddOppCustomerUi from './AddOppCustomerUi'
class AddOppCustomer extends Component {

    state = {
        contactDialogVisible: false,
        contactList: [],
        selectedUser: [],
        users: [],
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

        opportunityApi.getOpportunityByID(this.state.opportunityId, async (res) => {

            const { Table, Table2, Table6, Table7 } = res
            const { OpportunityName, CustomerName, TerritoryID, CustomerID, StageID, CloseDate, CurrencyID, Amount, OpportunityDesc, OpportunityCategoryID, CompetitionStatus, OpportunitySalesStageID, } = Table
            console.log("this.context", Table)
            let products = []
            // let ProductDetails = []
            if (Table2) {
                if (Array.isArray(Table2)) {
                    products = Table2
                } else {
                    products = [Table2]
                }
            }

            if (Table6) {

                const { AssignUserID } = Table6
                const { TerritoryID } = Table7

                this.setState({ AssignTerritoryID: TerritoryID })
                if (AssignUserID) {
                    const ids = AssignUserID.split(",")

                    this.getUsersByTerritoryIDForAssignOpportunity(TerritoryID, ids)

                }
            }
            if (this.props.oppContext)
                this.props.oppContext.setOpportunity({ ...Table, products })

            const assignTerritories = await opportunityApi.getTerritoryForAssignOpportunity(this.state.opportunityId)
            this.setState({ OpportunityName, CustomerName, TerritoryID, CustomerID, StageID, CloseDate, CurrencyID, Amount, OpportunityDescription: OpportunityDesc, OpportunityCategoryID, CompetitionStatus, OpportunitySalesStageID, assignTerritories })
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
            const territories = this.props.session[DROPDWON_GET_TERRITORY_FOR_ASSIGN_OPPORTUNITY]
            const stages = this.props.session[DROPDWON_GET_OPPORTUNITY_STAGE]
            const oppCategories = this.props.session[DROPDWON_GET_OPPORTUNITY_CATEGORY]
            const oppCurrencies = this.props.session[DROPDWON_GET_OPPORTUNITY_CURRENCY]
            const oppSalesStages = this.props.session[DROPDWON_GET_OPPORTUNITY_SALES_STAGE]
            console.log("territories", oppCurrencies)
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
        // console.log("AssignTerritoryID", key, value)

        this.setState({
            [key]: value
        })

        if (this.props.oppContext)
            this.props.oppContext.setOpportunity({ ...this.props.oppContext.opportunity, [key]: value })



        if (key === "AssignTerritoryID") {

            // console.log("AssignTerritoryID", value)
            this.getUsersByTerritoryIDForAssignOpportunity(value)
        }
    }

    getUsersByTerritoryIDForAssignOpportunity = async (assignTerritoryID, selectedIds) => {

        const users = await opportunityApi.getUsersByTerritoryIDForAssignOpportunity(this.state.opportunityId, assignTerritoryID)
        let selectedUser = []
        if (selectedIds && users) {
            selectedUser = users.filter((u) => selectedIds.includes(u.id.toString()))
        }

        // console.log("selectedUser", users, selectedUser, selectedIds)
        this.setState({ users, selectedUser })
    }

    saveOpportunity = () => {

        const { OpportunityName, TerritoryID, CustomerID, StageID, CloseDate, CurrencyID, Amount, OpportunityDescription, OpportunityCategoryID, CompetitionStatus, OpportunitySalesStageID, opportunityId, AssignTerritoryID, selectedUser } = this.state

        const { ProductDetails } = this.props.oppContext.opportunity
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
            const selectedUserIds = selectedUser?.map((s) => s.name)

            ProgressDialog.show("please wait")
            const params = {
                OpportunityName, TerritoryID, CustomerID, StageID, CloseDate: Utils.formatDate(CloseDate, "DD-MM-YYYY"), CurrencyID: CurrencyID || 0, Amount: Amount || 0, OpportunityDescription: OpportunityDescription || "", OpportunityCategoryID: OpportunityCategoryID || 0, CompetitionStatus: CompetitionStatus || "", OpportunitySalesStageID: OpportunitySalesStageID || 0,
                OpportunityTypeID: 0, AssignTerritoryID: AssignTerritoryID || 0, OpportunityID: opportunityId, ProductDetails: ProductDetails || "", AssignUserName: selectedUserIds?.length ? selectedUserIds.join(",") : ""
            }
            opportunityApi.addOrUpdateOpportunity(params, (res) => {
                ProgressDialog.hide()

                if (res.ID) {
                    AlertDialog.show({
                        title: "Attachment",
                        message: "Do you want to add attachment",
                        positiveButton: {
                            onPress: () => {
                                AlertDialog.hide()
                                this.props.navigation.replace("OppAttachment", { id: res.ID, editMode: false })
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
                }
                else
                    goBack()
            }, (error) => {

                Utils.showToast(error)
                ProgressDialog.hide()
            })
        }
    }

    render() {
        const { contactDialogVisible, users, assignTerritories, loading, selectedContactIndex, contactList, territories, stages, oppCategories, oppCurrencies, oppSalesStages, customers, OpportunityName, CustomerName, TerritoryID, AssignTerritoryID, CustomerID, StageID, CloseDate, CurrencyID, Amount, OpportunityDescription, OpportunityCategoryID, CompetitionStatus, OpportunitySalesStageID, opportunityId, selectedUser } = this.state
        const selectedUserIds = selectedUser.map((s) => s.id)
        return (
            <AddOppCustomerUi users={users?.filter((u) => !selectedUserIds.includes(u.id))} assignTerritories={assignTerritories} opportunity={{ ID: opportunityId, OpportunityName, CustomerName, TerritoryID, CustomerID, StageID, CloseDate, AssignTerritoryID, CurrencyID, Amount, OpportunityDescription, OpportunityCategoryID, CompetitionStatus, OpportunitySalesStageID, }} loading={loading}
                onTextChanged={this.onTextChanged} customers={customers} territories={territories} stages={stages} oppCategories={oppCategories} oppCurrencies={oppCurrencies} oppSalesStages={oppSalesStages} selectedContactIndex={selectedContactIndex} onContactSelect={(index) => {

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
                selectedUsers={selectedUser}
                onSelectUser={(item) => {
                    // const selectedUser = this.state.selectedUser

                    selectedUser.push(item)


                    this.setState({ selectedUser: [...selectedUser] })

                }}
                onSave={this.saveOpportunity}
                onRemoveUser={(index) => {
                    selectedUser.splice(index, 1)
                    this.setState({ selectedUser: [...selectedUser] })

                }}
                contactDialogVisible={contactDialogVisible} />
        )
    }
}


export default WrappedComponentOpportunity(AddOppCustomer)
