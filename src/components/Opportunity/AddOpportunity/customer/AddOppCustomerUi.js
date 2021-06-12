import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Button as DialogButton, Dialog, Portal, RadioButton } from 'react-native-paper'
import { strings } from '../../../../language/Language'
import { push } from '../../../../navigation/Navigator'
import { Colors, FontName, Images } from '../../../../utils'
import ResponsivePixels from '../../../../utils/ResponsivePixels'
import { Button, ChipViewContainer, Clickable, FloatingEditText, ScrollContainer, SegmentView, ViewWithTitle } from '../../../common'

const AddOppCustomerUi = ({ contactDialogVisible, selectedContactIndex, onContactSelect, contactList, onSelectContact, onDismiss }) => {
    return (
        <ScrollContainer>
            <View style={styles.mainView}>
                <ViewWithTitle innerStyle={{
                    backgroundColor: Colors.white, paddingHorizontal: ResponsivePixels.size16,
                }} title="Opportunity Information">
                    <FloatingEditText onPress={() => {
                        push("AddOppContact")
                    }} editable={false} leftIcon={Images.ic_add_blue} label="Customer Name" />
                    <FloatingEditText label={strings.opp_name} />
                    <FloatingEditText label={strings.closing_date} />
                    <FloatingEditText onPress={() => {
                        // Utils.showToast("Test")
                        console.log("Print")
                    }} label={strings.terriory} editable={false} rightIcon={Images.ic_down} />
                   
                   
                   
                </ViewWithTitle>

                <ViewWithTitle title={strings.contact}>
                    <FloatingEditText value={selectedContactIndex > -1 ? contactList[selectedContactIndex].name : ""} editable={false} onPress={onSelectContact} leftIcon={Images.ic_add_blue} label={strings.select_contact} />

                </ViewWithTitle>


                <ViewWithTitle title={strings.revenue}>
                    <FloatingEditText inputType="numeric" label={strings.amount} />
                    <ChipViewContainer title="Currency" chips={[{ name: "GBP" }, { name: "INR" }, { name: "AED" }, { name: "USD" },]} />
                </ViewWithTitle>


                <ViewWithTitle title={strings.other_info}>
                    <ChipViewContainer title={strings.opp_category} chips={[{ name: "Small business" }, { name: "Medium business" }, { name: "Large business" }, { name: "Stratagic business" }, { name: "Renewal" }]} />
                    {/* <ChipViewContainer title={strings.sales_stage} chips={[{ name: "Hot" }, { name: "Warm" }, { name: "Cold" },]} /> */}
                    <SegmentView title={strings.sales_stage} segments={[{ name: "Hot" }, { name: "Warm" }, { name: "Cold" },]} />

                    <FloatingEditText label={strings.competition_status} />
                    <FloatingEditText label={strings.description} />

                </ViewWithTitle>

                <Button title={strings.save} style={{ margin: ResponsivePixels.size16 }} />
            </View>

            <Portal>
                <Dialog visible={contactDialogVisible} onDismiss={onDismiss}>
                    <Dialog.Title>{strings.select_contact}</Dialog.Title>
                    <Dialog.ScrollArea>
                        <FlatList
                            style={{ height: "70%" }}
                            data={contactList}
                            renderItem={({ item, index }) => (
                                <Clickable onPress={() => onContactSelect(index)} style={{ flexDirection: "row", alignItems: "flex-start", paddingVertical: 16 }}>
                                    <RadioButton onPress={() => onContactSelect(index)} value={item.checked} status={selectedContactIndex == index ? "checked" : "unchecked"} color={Colors.BlueColor500} />
                                    <View style={{ marginStart: 8 }}>
                                        <Text style={styles.contactName}>{item.name}</Text>
                                        <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
                                        <Text style={styles.email}>{item.email}</Text>

                                    </View>
                                </Clickable>)}
                        />
                    </Dialog.ScrollArea>
                    <Dialog.Actions>
                        <DialogButton color={Colors.blueGray600} style={{}} onPress={onDismiss}>Cancel</DialogButton>
                        <DialogButton color={Colors.primaryColor500} onPress={onDismiss}>Done</DialogButton>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </ScrollContainer>
    )
}

export default AddOppCustomerUi

const styles = StyleSheet.create({

    mainView: {
        flex: 1,
        backgroundColor: Colors.secondary50
    },
    contactName: {
        color: Colors.blueGray900,
        fontSize: ResponsivePixels.size17,
        lineHeight: ResponsivePixels.size24,
        fontWeight: "600",
        marginBottom: 8,
        fontFamily: FontName.bold,

    },
    phoneNumber: {
        color: Colors.blueGray700,
        fontSize: ResponsivePixels.size15,
        lineHeight: ResponsivePixels.size24,
        fontWeight: "600",
        fontFamily: FontName.regular,

    }
})
