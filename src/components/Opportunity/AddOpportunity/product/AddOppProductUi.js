import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Chip } from 'react-native-paper'
import { strings } from '../../../../language/Language'
import { Colors, Images, Utils } from '../../../../utils'
import ResponsivePixels from '../../../../utils/ResponsivePixels'
import { Button, ChipViewContainer, FloatingEditText, ScrollContainer, TextButton, ViewWithTitle } from '../../../common'

const AddOppProductUi = ({ products, onAddProduct, selectedIndex, onSelectProduct }) => {
    return (
        <ScrollContainer>
            <View style={styles.mainView}>
                <ViewWithTitle innerStyle={{
                    backgroundColor: Colors.secondary50, paddingHorizontal: 0,
                    paddingVertical: 0,
                }} title="Product Information">

                    <View style={{ backgroundColor: Colors.secondary50, paddingHorizontal: 16, paddingVertical: 8, flexDirection: "row" }}>
                        <Chip onPress={onAddProduct} textStyle={{ fontSize: 13, color: Colors.white }}
                            style={{ margin: 5, backgroundColor: Colors.blue, }}
                        >+</Chip>
                        <ScrollView horizontal>
                            {products.map((item, index) => <Chip key={index} style={{ margin: 5, backgroundColor: selectedIndex === index ? Colors.secondary500 : Colors.white }}
                                textStyle={{ fontSize: 13, color: selectedIndex === index ? Colors.white : Colors.blueGray900 }}
                                onPress={() => onSelectProduct && onSelectProduct(index)}>{item.name}</Chip>)}
                        </ScrollView>
                    </View>
                    <View style={{ backgroundColor: Colors.white, paddingHorizontal: 16 }}>

                        <FloatingEditText label={`Product Name ${selectedIndex + 1}`} />
                        <FloatingEditText label={strings.prod_category} />
                        <FloatingEditText onPress={() => {
                            // Utils.showToast("Test")
                            console.log("Print")
                        }} label={strings.prod_group} editable={false} rightIcon={Images.ic_down} />
                        <ChipViewContainer title={strings.level} chips={[{ name: "Dealer price" }, { name: "End Customer price" }, { name: "OEM Price" }, { name: "MOP" }]} />

                        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                            <FloatingEditText style={{ flex: 1, }} label={strings.quantity} />
                            <FloatingEditText style={{ flex: 1, marginStart: 8 }} label={strings.rate} />
                            <FloatingEditText style={{ flex: 1, marginStart: 8 }} label={strings.amount} />

                        </View>
                        <FloatingEditText label={strings.competition_status} />
                        <FloatingEditText label={strings.description} />
                        <TextButton title={`Delete product ${selectedIndex + 1}`} />
                    </View>
                </ViewWithTitle>

                <View style={{ flexDirection: "row", margin: ResponsivePixels.size16, alignItems: "center", justifyContent: "space-evenly" }}>
                    <Button title="Cancel" bordered style={{ width: 100, marginEnd: 8 }} />
                    <Button title={strings.submit} style={{ flex: 1, }} />
                </View>
            </View>
        </ScrollContainer>
    )
}

export default AddOppProductUi

const styles = StyleSheet.create({

    mainView: {
        flex: 1,
        backgroundColor: Colors.secondary50
    }
})
