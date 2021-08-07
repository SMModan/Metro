import React, { Component } from 'react'
import { FlatList, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { store } from '../../../App'
import { deleteDropDowns, insertDropDowns } from '../../../data/DatabaseHelper'
import { reset } from '../../../navigation/Navigator'
import apiCall from "../../../network/ApiService"
import { setSessionField } from '../../../reducers/SessionReducer'
import { Colors, FontName } from '../../../utils'
import ResponsivePixels from '../../../utils/ResponsivePixels'
import { MainContainer } from '../../common'

class SyncData extends Component {

    index = 0
    state = {
        offlineData: [
            {
                name: "Customer Types",
                status: 0,
                endPoint: "GetCustomerType"
            },
            {
                name: "Customer Categories",
                status: 0,
                endPoint: "GetCustomerCategory"
            },
            {
                name: "Customer Territories",
                status: 0,
                endPoint: "GetUserAssignTerritoriesByUserID"
            },
            {
                name: "Countries",
                status: 0,
                endPoint: "GetCountries"
            },
            {
                name: "Stage",
                status: 0,
                endPoint: "GetOpportunityStage"
            },
            {
                name: "OpportunityCurrency",
                status: 0,
                endPoint: "GetOpportunityCurrency"
            },
            {
                name: "OpportunityCategory",
                status: 0,
                endPoint: "GetOpportunityCategory"
            },
            {
                name: "TerritoryForAssignOpportunity",
                status: 0,
                endPoint: "GetTerritoryForAssignOpportunity"
            },
            {
                name: "OpportunitySalesStage",
                status: 0,
                endPoint: "GetOpportunitySalesStage"
            },
            {
                name: "OpportunityBillingType",
                status: 0,
                endPoint: "GetOpportunityBillingType"
            },{
                    name: "GetTaskName",
                    status: 0,
                    endPoint: "GetTaskName"
                },

            // {
            //     name: "GetProductsForOpportunity",
            //     status: 0,
            //     endPoint: "GetProductsForOpportunity"
            // },
            // {
            //     name: "GetProductCategory",
            //     status: 0,
            //     endPoint: "GetProductCategory"
            // },
            // {
            //     name: "GetProductGroup",
            //     status: 0,
            //     endPoint: "GetProductGroup"
            // },
            // {
            //     name: "GetTaskName",
            //     status: 0,
            //     endPoint: "GetTaskName"
            // },
            // {
            //     name: "GetReminderAlert",
            //     status: 0,
            //     endPoint: "GetReminderAlert"
            // },
            // {
            //     name: "GetPriority",
            //     status: 0,
            //     endPoint: "GetPriority"
            // },
            // {
            //     name: "GetUserForAssignActivity",
            //     status: 0,
            //     endPoint: "GetUserForAssignActivity"
            // },
            // {
            //     name: "GetRelatedTo",
            //     status: 0,
            //     endPoint: "GetRelatedTo"
            // },
        ],
        currentDownloading: []


    }


    componentDidMount = async () => {

        if (this.props.session.isSync)
            await deleteDropDowns()
        this.getData(this.state.offlineData[this.index].endPoint)
    }


    getData = (endPoint) => {
        console.log("--------------------------------------------")
        console.log("index", this.index)
        const currentDownloadings = this.state.currentDownloading

        if (this.index <= this.state.offlineData.length - 1) {

            this.state.offlineData[this.index].status = 1

            currentDownloadings.push(this.state.offlineData[this.index])
            this.setState({ currentDownloading: [...currentDownloadings] })
            apiCall(endPoint, {}, async (res) => {

                const { Table, Table1 } = res

                console.log("Table && typeof (Table) == Array", Table && typeof (Table))
                console.log("Table1 && typeof (Table1) == Array", Table1 && typeof (Table1))
                if (Table && Array.isArray(Table)) {
                    await Promise.all(Table.map(async (t) => {
                        const { ID, Name, TerritoryName, CurrencyName, CountryName, TerritoryID } = t

                        // if (ID && Name) {
                        console.log("Going to insert1")

                        await insertDropDowns(ID || TerritoryID, Name || TerritoryName || CurrencyName || CountryName, endPoint)
                        // }
                    }))
                } else if (Table1 && Array.isArray(Table1)) {
                    await Promise.all(Table1.map(async (t) => {
                        const { ID, Name, TerritoryName, CurrencyName, CountryName, TerritoryID, } = t

                        // if (ID && Name) {
                        console.log("Going to insert1")

                        await insertDropDowns(ID || TerritoryID, Name || TerritoryName || CurrencyName || CountryName, endPoint)
                        // }
                    }))
                }


                this.state.offlineData[this.index].status = 2
                currentDownloadings.splice(this.index, 1, this.state.offlineData[this.index])
                this.setState({ currentDownloading: [...currentDownloadings] })
                this.index++
                if (this.index <= this.state.offlineData.length - 1)
                    this.getData(this.state.offlineData[this.index].endPoint)
                else {

                    store.dispatch(setSessionField("isSync", true))
                    reset("Home")
                }

                console.log("--------------------------------------------")

            }, (error) => {
                this.index++
                this.getData(this.state.offlineData[this.index].endPoint)
                console.log("--------------------------------------------")

                console.log("error", error)
                console.log("--------------------------------------------")

                // if (onError) {
                //     onError(error)
                // }
            })
        }
    }


    getStatus = (status) => {

        switch (status) {

            case 0:
                return "Waiting for Download...."

            case 1:
                return "Downloading...."

            case 2:
                return "Downloaded"
        }

    }

    render() {
        return (
            <MainContainer
                header={{ title: "Syncing Data.....", hideUnderLine: true, backgroundColor: Colors.blueGray900 }}>

                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.currentDownloading}
                    renderItem={({ item }) => {

                        return (
                            <View style={{ padding: 16 }}>

                                <Text style={{ marginVertical: 4, fontFamily: FontName.regular, fontSize: ResponsivePixels.size17 }}>{item.name}</Text>
                                <Text style={{ fontFamily: FontName.regular, fontSize: ResponsivePixels.size14 }}>{this.getStatus(item.status)}</Text>

                            </View>
                        )
                    }}
                />
            </MainContainer>
        )
    }
}


const mapStateToProps = (state) => ({
    session: state.session
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SyncData)
