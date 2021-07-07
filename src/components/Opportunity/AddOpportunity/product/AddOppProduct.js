import React, { Component } from 'react'
import { Text, View } from 'react-native'
import opportunityApi from '../../apis/OpportunityApis'
import AddOppProductUi from './AddOppProductUi'
import _ from "lodash"
class AddOppProduct extends Component {

    state = {
        products: [{
            name: "Product 1",
            productId: "",
            productGroupId: "",
            productCategoryId: "",
            qty: "",
            amount: "",
            rate: "",
            specification: "",
            description: "",
            productLevel: "",
        }],

        productGroups: [],
        productCategories: [],
        loading: true,

        selectedIndex: 0,
        oppProducts: []
    }

    componentDidMount = () => {

        console.log("componentDidMount", "componentDidMount")
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

    searchOppDelayed = _.debounce(this.searchOpp, 1000)
    getAllDropDowns = async () => {

        // ProgressDialog.show()
        try {


            const productGroups = await opportunityApi.getProductGroups()
            const productCategories = await opportunityApi.getProductCategories()

            // console.log("productCategories", productCategories)
            this.setState({
                loading: false,
                productGroups, productCategories,
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

        const { products, selectedIndex } = this.state

        products[selectedIndex][key] = value
        this.setState({
            products
        })
    }

    getDefaultProduct = () => {

        return {
            name: `Product ${this.state.products.length + 1}`,
            productId: "",
            productGroupId: "",
            productCategoryId: "",
            qty: "",
            amount: "",
            rate: "",
            specification: "",
            description: "",
            productLevel: "",

        }
    }

    render() {

        const { productGroups, oppProducts, loading, productCategories, products } = this.state
        return (
            <AddOppProductUi oppProducts={oppProducts} onSearchProduct={this.searchOppDelayed} loading={loading} productGroups={productGroups} productCategories={productCategories} onTextChanged={this.onTextChanged} selectedIndex={this.state.selectedIndex}
                onSelectProduct={(index) => {
                    this.setState({ selectedIndex: index })

                }}
                onAddProduct={() => {

                    console.log("Click")
                    this.setState({ products: [...this.state.products, { ...this.getDefaultProduct() }] })
                }} products={products} />
        )
    }
}

export default AddOppProduct
