import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { strings } from '../../../../../language/Language'
import { goBack } from '../../../../../navigation/Navigator'
import { Colors, Images, Utils } from '../../../../../utils'
import ResponsivePixels from '../../../../../utils/ResponsivePixels'
import { Button, ChipViewContainer, FloatingEditText, MainContainer, ScrollContainer, ViewWithTitle } from '../../../../common'

const AddOppContactUi = () => {
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
                        <FloatingEditText label="Customer Name" />
                        <ChipViewContainer title={"Customer Category"} chips={[{ name: "Company" }, { name: "Individual" }, { name: "Society" }, { name: "Partner" }]} />
                        <ChipViewContainer title={strings.opp_category} chips={[{ name: "Existing customer" }, { name: "Prospect customer" }, { name: "Existing partner" }, { name: "Prospect partner" }]} />

                        <FloatingEditText onPress={() => {
                            // Utils.showToast("Test")
                            console.log("Print")
                        }} label={strings.terriory} editable={false} rightIcon={Images.ic_down} />
                    </ViewWithTitle>





                    <ViewWithTitle title={strings.other_info}>

                        <FloatingEditText label={strings.phone_number} />
                        <FloatingEditText label={strings.email} />

                    </ViewWithTitle>

                    <Button title={strings.save} style={{ margin: ResponsivePixels.size16 }} />
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
