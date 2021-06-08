import React, { Component } from 'react'
import { Text, View } from 'react-native'
import AddOppProductUi from './AddOppProductUi'

class AddOppProduct extends Component {

    state = {
        products: [{
            name: "Product 1"
        }],
        selectedIndex: 0
    }

    render() {
        return (
            <AddOppProductUi selectedIndex={this.state.selectedIndex}
                onSelectProduct={(index) => {
                    this.setState({ selectedIndex: index })

                }}
                onAddProduct={() => {

                    console.log("Click")
                    this.setState({ products: [...this.state.products, { name: `Product ${this.state.products.length + 1}` }] })
                }} products={this.state.products} />
        )
    }
}

export default AddOppProduct
