import moment from 'moment'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Button as DialogButton, Dialog, Portal, RadioButton } from 'react-native-paper'
import { strings } from '../../../../language/Language'
import { push } from '../../../../navigation/Navigator'
import { Colors, FontName, Images } from '../../../../utils'
import ResponsivePixels from '../../../../utils/ResponsivePixels'
import Utils from '../../../../utils/Utils'
import { Button, ChipViewContainer, ProgressView, Clickable, CustomDatePicker, FloatingEditText, ScrollContainer, SegmentView, ViewWithTitle } from '../../../common'
import CustomPicker from '../../../common/CustomPicker'

const AddOppCustomerUi = ({ contactDialogVisible,
    selectedContactIndex,
    onContactSelect,
    contactList,
    onSelectContact,
    onSelectCustomer,
    onTextChanged,
    territories, stages, oppCategories, oppCurrencies, oppSalesStages, customers,
    onSave,
    loading,
    opportunity,
    onDismiss }) => {

    const { OpportunityName, ID, TerritoryID, CustomerID, StageID, CloseDate, CurrencyID, Amount, OpportunityDescription, OpportunityCategoryID, CompetitionStatus, OpportunitySalesStageID } = opportunity
    // console.log("StageID", StageID)
    return (
        <ScrollContainer>
            {loading ? <ProgressView /> : <View style={styles.mainView}>
                <ViewWithTitle innerStyle={{
                    backgroundColor: Colors.white, paddingHorizontal: ResponsivePixels.size16,
                }} title="Opportunity Information">
                    <CustomPicker selectedItem={{ id: CustomerID }} onSelect={(item) => {
                        if (onSelectCustomer)
                            onSelectCustomer(item)
                        onTextChanged("CustomerID", item.id)
                    }} list={customers} onPress={() => {
                    }} editable={false} onPressLeftIcon={() => {
                        push("AddOppContact")
                        console.log("Click")
                    }} leftIcon={Images.ic_add_blue} label="Customer Name*" />
                    <FloatingEditText value={OpportunityName} onChangeText={(text) => onTextChanged("OpportunityName", text)} label={strings.opp_name + "*"} />
                    <CustomDatePicker selectedDate={moment(CloseDate).toDate()} onDateChanged={(date) => {

                        onTextChanged("CloseDate", Utils.formatDate(date, "DD-MM-YYYY"))

                    }} label={strings.closing_date + "*"} rightIcon={Images.ic_down} />
                    <CustomPicker selectedItem={{ id: TerritoryID }} onSelect={(item) => onTextChanged("TerritoryID", item.id)} list={territories} label={strings.terriory + "*"} editable={false} rightIcon={Images.ic_down} />
                    <CustomPicker selectedItem={{ id: StageID }} onSelect={(item) => onTextChanged("StageID", item.id)} list={stages} label={strings.stage + "*"} rightIcon={Images.ic_down} />
                </ViewWithTitle>

                <ViewWithTitle title={strings.contact}>
                    <FloatingEditText value={selectedContactIndex > -1 ? contactList[selectedContactIndex].name : ""} editable={false} onPress={onSelectContact} leftIcon={Images.ic_add_blue} label={strings.select_contact} />
                </ViewWithTitle>


                <ViewWithTitle title={strings.revenue}>
                    <FloatingEditText value={Amount?.toString()} onChangeText={(text) => onTextChanged("Amount", text)} inputType="numeric" label={strings.amount} />
                    <ChipViewContainer selectedChip={{ id: CurrencyID }} onSelect={(item) => onTextChanged("CurrencyID", item.id)} title="Currency" chips={oppCurrencies} />
                </ViewWithTitle>


                <ViewWithTitle title={strings.other_info}>
                    <ChipViewContainer selectedChip={{ id: OpportunityCategoryID }} onSelect={(item) => onTextChanged("OpportunityCategoryID", item.id)} title={strings.opp_category} chips={oppCategories} />
                    {/* <ChipViewContainer title={strings.sales_stage} chips={[{ name: "Hot" }, { name: "Warm" }, { name: "Cold" },]} /> */}
                    <SegmentView selectedSegment={{ id: OpportunitySalesStageID }} onSelect={(item) => onTextChanged("OpportunitySalesStageID", item.id)} title={strings.sales_stage} segments={oppSalesStages} />

                    <FloatingEditText value={CompetitionStatus} onChangeText={(text) => onTextChanged("CompetitionStatus", text)} multiline minHeight={80} label={strings.competition_status} />
                    <FloatingEditText value={OpportunityDescription} onChangeText={(text) => onTextChanged("OpportunityDescription", text)} multiline minHeight={80} label={strings.description} />

                </ViewWithTitle>

                <Button title={!ID ? strings.save : strings.editOpportunity} onPress={onSave} style={{ margin: ResponsivePixels.size16 }} />
            </View>}

            <Portal>
                <Dialog visible={contactDialogVisible} onDismiss={onDismiss}>
                    <Dialog.Title>{strings.select_contact}</Dialog.Title>
                    <Dialog.ScrollArea>
                        <FlatList
                            style={{ height: "70%" }}
                            data={contactList}
                            renderItem={({ item, index }) => (
                                <Clickable onPress={() => onStatusSlected(index)} style={{ flexDirection: "row", alignItems: "flex-start", paddingVertical: 16 }}>
                                    <RadioButton onPress={() => onContactSelect(index)} value={item.checked} status={selectedContactIndex == index ? "checked" : "unchecked"} color={Colors.BlueColor500} />
                                    <View style={{ marginStart: 8 }}>
                                        <Text style={styles.contactName}>{item.name}</Text>
                                        <Text style={styles.phoneNumber}>{item.mobileNumber}</Text>
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
