import React, { Component } from 'react'
import { Text, View } from 'react-native'
import opportunityApi from '../../apis/OpportunityApis'
import AddOppProductUi from './AddOppProductUi'
import _ from "lodash"
import { OpportunityContext } from '../AddOpportunity'
import WrappedComponentOpportunity from '../WrappedComponentOpportunity'
import { ProgressDialog } from '../../../common'
import { Utils } from '../../../../utils'
import { goBack } from '../../../../navigation/Navigator'

class AddOppProduct extends Component {

    state = {
        products: [{
            id: 0,
            name: "Product 1",
            productId: "",
            productGroupId: "",
            productCategoryId: "",
            qty: "0",
            amount: "",
            rate: "0",
            specification: "",
            description: "",
            productLevel: "",
            state: 0,
        }],

        productGroups: [],
        productCategories: [],
        productLevels: [],
        loading: true,

        selectedIndex: 0,
        oppProducts: []
    }

    componentDidMount = () => {

        let { opportunity } = this.props.oppContext;

        // console.log("componentDidMount", opportunity)
        if (opportunity.products && opportunity.products.length) {

            const products = opportunity.products.map((p, index) => {

                const { ProductID, ID, LevelID, ProductDescription, ProductName, ProductGroupID, ProductCategoryID, Quantity, Rate, Amount, Specification } = p
                return {

                    name: `Product ${index + 1}`,
                    productId: ProductID,
                    id: ID,
                    productName: ProductName,
                    productGroupId: ProductGroupID,
                    productCategoryId: ProductCategoryID,
                    qty: Quantity.toString(),
                    amount: Amount.toString(),
                    rate: Rate.toString(),
                    specification: Specification,
                    description: ProductDescription,
                    productLevel: LevelID,
                    state: 4,
                }
            })

            // console.log("products", products)
            this.setState({
                products: [...products]
            })
        }
        this.getAllDropDowns()


    }

    searchOpp = async (text) => {
        try {


            const oppProducts = await opportunityApi.getProductForOpportunity(text)
            this.setState({
                oppProducts
            })
        } catch (error) {
            // this.setState({
            //     loading: false,
            // })
            console.log("Error", error)
        }
    }

    getProductById = async (id) => {

        const product = await opportunityApi.getProductByID(id)

        if (product) {

            const { ProductCategoryID, ProductGroupID, UnitPrice, ProductDescription, Description } = product

            this.onTextChanged("productGroupId", ProductGroupID)
            this.onTextChanged("productCategoryId", ProductCategoryID)
            this.onTextChanged("description", ProductDescription)
            this.onTextChanged("specification", Description)
            console.log("UnitPrice", UnitPrice)
            // this.onTextChanged("rate", UnitPrice?.toString())
        }

    }

    componentDidUpdate = (prevPops, prevState, snapshot) => {

    }
    searchOppDelayed = _.debounce(this.searchOpp, 300)
    getAllDropDowns = async () => {

        // ProgressDialog.show()
        try {

            let { opportunity } = this.props.oppContext;

            const productGroups = await opportunityApi.getProductGroups()
            const productCategories = await opportunityApi.getProductCategories()
            const productLevels = opportunity.CurrencyID ? await opportunityApi.getPriceBookLevelByCurrencyId(opportunity.CurrencyID) : []

            // console.log("productCategories", productCategories)
            this.setState({
                loading: false,
                productGroups, productCategories, productLevels
            })
        } catch (error) {
            this.setState({
                loading: false,
            })
            console.log("Error", error)
        }
        // ProgressDialog.hide()

    }

    getProductRate = async () => {
        let { opportunity } = this.props.oppContext;
        const { products, selectedIndex } = this.state

        const { CurrencyID } = opportunity
        const { productLevel, productId } = products[selectedIndex]

        if (CurrencyID && productLevel && productId) {
            const productRate = await opportunityApi.getProductRateByCurrencyIdLevelId({
                CurrencyID,
                LevelID: productLevel,
                ProductID: productId
            })

            if (productRate) {

                const { Rate } = productRate

                this.onTextChanged("rate", Rate?.toString())
            }

        }

    }

    onTextChanged = (key, value) => {

        const { products, selectedIndex } = this.state

        products[selectedIndex][key] = value
        this.setState({
            products
        })

        console.log("key", key)
        switch (key) {
            case "productLevel":
            case "productId":

                this.getProductRate()
                break;
        }
    }

    getDefaultProduct = () => {

        return {
            id: 0,
            name: `Product ${this.state.products.length + 1}`,
            productId: "",
            productGroupId: "",
            productCategoryId: "",
            qty: "0",
            amount: "",
            rate: "0",
            specification: "",
            description: "",
            productLevel: "",
            state: 0,

        }
    }


    updateProducts = () => {

        const products = this.state.products.filter((p) => {

            return !p.productId
        })
        if (products.length) {
            Utils.showToast("Please select Product")
            return
        }

        const { OpportunityName, TerritoryID, CustomerID, StageID, CloseDate, CurrencyID, Amount, OpportunityDesc, OpportunityCategoryID, CompetitionStatus, OpportunitySalesStageID, ID } = this.props.oppContext.opportunity

        console.log("props.oppContext.opportunity", this.props.oppContext.opportunity)

        let ProductDetails = this.state.products.map((p) => {

            // console.log("amount", p.amount)
            return `${p.id}$${p.productId}$${p.productName}$${p.specification || ""}$${p.state}$${parseFloat(p.qty || 0).toFixed(2)}$${p.productCategoryId || 0}$${p.productGroupId || 0}$${(parseFloat(p.rate || 0) * parseFloat(p.qty || 0)).toFixed(2)}$${p.productLevel || 0}$${parseFloat(p.rate || 0).toFixed(2)}$${p.description || ""}`
        })

        ProductDetails = ProductDetails.join("@")

        if (ID) {
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
                /*
                
                insertProductString = insertProductString + arrAllProductsList.get(i).getId() + "$" +
                                                    arrAllProductsList.get(i).getProductid() + "$" + arrAllProductsList.get(i).getProductname() + "$" +
                                                    arrAllProductsList.get(i).getDecription() + "$" + arrAllProductsList.get(i).getRowstate() + "$" +
                                                    arrAllProductsList.get(i).getQuantity()+ "$" + arrAllProductsList.get(i).getProductCategoryID()
                                                    + "$" + arrAllProductsList.get(i).getProductDomainID() +"$"+arrAllProductsList.get(i).getAmount()
                                                    + "$" + arrAllProductsList.get(i).getLevelId() + "$" + arrAllProductsList.get(i).getRate()+  "$" + arrAllProductsList.get(i).getProductDescription()+ "@";
                */

                const params = {
                    OpportunityName, TerritoryID, CustomerID, StageID, CloseDate: Utils.formatDate(CloseDate, "DD-MM-YYYY"), CurrencyID, Amount, OpportunityDescription: OpportunityDesc, OpportunityCategoryID, CompetitionStatus, OpportunitySalesStageID,
                    OpportunityTypeID: 0, AssignTerritoryID: 0, OpportunityID: ID || 0, ProductDetails: ProductDetails, AssignUserName: ""
                }
                opportunityApi.addOrUpdateOpportunity(params, (res) => {
                    ProgressDialog.hide()
                    goBack()
                }, (error) => {

                    Utils.showToast(error)
                    ProgressDialog.hide()
                })
            }
        } else {


            this.props.oppContext.setOpportunity({ ...this.props.oppContext.opportunity, ProductDetails })
            goBack()

        }
    }

    deleteProduct = () => {


        const { products, selectedIndex } = this.state

        console.log("selectedIndex", selectedIndex, products[selectedIndex]["state"])
        if (products[selectedIndex]["state"] == 0) {
            products.splice(selectedIndex, 1)

        } else
            products[selectedIndex]["state"] = 3


        this.setState({ selectedIndex: products.filter(p => p.state != 3).length - 1 })

        this.setState({
            products,
        })
    }

    render() {
        // let { opportunity } = this.props.oppContext;

        // const { ID } = opportunity
        const { productGroups, oppProducts, productLevels, loading, productCategories, products } = this.state
        // console.log("OpportunityID", ID)
        return (
            <AddOppProductUi productLevels={productLevels} onSelectProductForOpp={this.getProductById} oppProducts={oppProducts} onSearchProduct={this.searchOppDelayed} loading={loading} productGroups={productGroups} productCategories={productCategories} onTextChanged={this.onTextChanged} selectedIndex={this.state.selectedIndex}
                onSelectProduct={(index) => {
                    this.setState({ selectedIndex: index })

                }}
                onAddProduct={() => {

                    const products = [...this.state.products, { ...this.getDefaultProduct() }]
                    console.log("Click")
                    this.setState({ products, selectedIndex: products.length - 1 })
                }} products={products.filter(p => p.state != 3)}
                onSubmit={this.updateProducts}
                onDelete={this.deleteProduct}
            />
        )
    }
}

export default WrappedComponentOpportunity(AddOppProduct)
