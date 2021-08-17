import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { strings } from '../../../../../language/Language'
import { goBack } from '../../../../../navigation/Navigator'
import { Colors, Images, Utils } from '../../../../../utils'
import ResponsivePixels from '../../../../../utils/ResponsivePixels'
import { Button, ChipViewContainer, CustomPicker, FloatingEditText, MainContainer, ScrollContainer, ViewWithTitle } from '../../../../common'

const AddOppContactUi = (props) => {

    const { CustomerName, TerritoryID, CustomerTypeID, PhoneNo, EmailID, CustomerCategoryID, terrotories, customerCategories, onTextChanged, customerTypes, onSave } = props
    return (
        <MainContainer header={{
            title: strings.contact, left: {
                image: Images.ic_BackWhite,
                onPress: () => goBack(),
            },
        }}>
            <ScrollContainer>
                <View style={styles.mainView}>
                    <ViewWithTitle innerStyle={{
                        backgroundColor: Colors.white, paddingHorizontal: ResponsivePixels.size16,
                    }} title="Customer Information">
                        <FloatingEditText value={CustomerName} onChangeText={(text) => onTextChanged("CustomerName", text)} label="Customer Name" />
                        <ChipViewContainer selectedChip={{ id: CustomerTypeID }} onSelect={(item) => onTextChanged("CustomerTypeID", item.id)} title={"Customer Type"} chips={customerTypes} />
                        <ChipViewContainer selectedChip={{ id: CustomerCategoryID }} onSelect={(item) => onTextChanged("CustomerCategoryID", item.id)} title={"Customer Category"} chips={customerCategories} />

                        <CustomPicker list={terrotories} onSelect={(item) => onTextChanged("TerritoryID", item.id)} selectedItem={{ id: TerritoryID }} label={strings.terriory} editable={false} rightIcon={Images.ic_down} />
                    </ViewWithTitle>

                    <ViewWithTitle title={strings.other_info}>

                        <FloatingEditText inputType="numeric" value={PhoneNo} onChangeText={(text) => onTextChanged("PhoneNo", text)} label={strings.phone_number} />
                        <FloatingEditText inputType="email-address" value={EmailID} onChangeText={(text) => onTextChanged("EmailID", text)} label={strings.email} />

                    </ViewWithTitle>

                    <Button title={strings.save} onPress={onSave} style={{ margin: ResponsivePixels.size16 }} />
                </View>
            </ScrollContainer>
        </MainContainer>
    )
}

export default AddOppContactUi

const styles = StyleSheet.create({

    mainView: {
        flex: 1,
        backgroundColor: Colors.secondary50
    }
})
