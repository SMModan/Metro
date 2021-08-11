import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Images, Colors, FontName, Utils } from '../../utils';
import { Checkbox, ChipViewContainer, SegmentView, UploadView, FloatingEditText, ViewWithTitle, CustomPicker, DatePicker, CustomDatePicker, ImageButton } from '../common';
import { Chip } from 'react-native-paper';
import { HelpDeskContext } from './HelpDeskContext';
import SelectionView from '../common/SelectionView';
import ResponsivePixels from '../../utils/ResponsivePixels';
import PhotoPicker from '../common/PhotoPicker';
import { StyleSheet } from 'react-native';

export const CustomerInfo = () => {

    const { CustomerID, customers, contacts, addresses, CustomerAddressID, ContactID, onTextChanged } = useContext(HelpDeskContext)
    // console.log("ContactID", ContactID)
    return (
        <ViewWithTitle title="Customer Information">
            <CustomPicker list={customers} selectedItem={{ id: CustomerID }} onSelect={(item) => { onTextChanged("CustomerID", item.id) }} label={'Customer Name'} />
            <CustomPicker list={contacts} selectedItem={{ id: ContactID?.id }} onSelect={(item) => { onTextChanged("ContactID", item) }} label={'Contact Name'} editable={false} rightIcon={Images.ic_down} />
            <CustomPicker list={addresses} selectedItem={{ id: CustomerAddressID }} onSelect={(item) => { onTextChanged("CustomerAddressID", item.id) }} label={'Customer Address'} rightIcon={Images.ic_down} />
        </ViewWithTitle>
    )
}

export const ContactInfo = () => {

    const { ContactID } = useContext(HelpDeskContext)
    return (
        <ViewWithTitle title={"Contact Information"}>
            <FloatingEditText editable={false} value={ContactID?.EmailID} label={'Email'} />
            <FloatingEditText editable={false} label={'Mobile Number'} value={ContactID?.MobileNo || ContactID?.phone} />
        </ViewWithTitle>
    )
}

export const AMCInfo = () => {
    const { amcs, AMCID, onTextChanged, IsChargeableService } = useContext(HelpDeskContext)

    return (
        amcs.length ? <ViewWithTitle title={"AMC Information"}>
            <CustomPicker list={amcs} selectedItem={{ id: AMCID }} onSelect={(item) => { onTextChanged("AMCID", item.id) }} label={'AMC'} rightIcon={Images.ic_down} />
            <FloatingEditText label={'Mobile Number'} />

            <Checkbox onPress={() => onTextChanged("IsChargeableService", !IsChargeableService)} label={'Will service chargable?'} checked={IsChargeableService} labelColor={Colors.darkGray} style={{ marginTop: 20 }} />
            <Checkbox label={'Is service under AMC?'} labelColor={Colors.darkGray} checked={true} color={Colors.BlueColor400} />
        </ViewWithTitle> : null
    )
}


export const IssueDescription = () => {
    const { PlanVisitDate, ProductCategoryID, ProductID, products, productCategries, ProductRemarks, SerialNo, serialNos, ProblemDescription, onTextChanged } = useContext(HelpDeskContext)

    return (
        <ViewWithTitle title="Issue Description">
            <CustomDatePicker selectedDate={PlanVisitDate} onDateChanged={(date) => {

                onTextChanged("PlanVisitDate", date)
            }} label={'Plan visit date'} />
            <CustomPicker list={productCategries} selectedItem={{ id: ProductCategoryID }} onSelect={(item) => { onTextChanged("ProductCategoryID", item.id) }} label={'Product Category'} editable={false} rightIcon={Images.ic_down} />
            <CustomPicker list={products} selectedItem={{ id: ProductID }} onSelect={(item) => { onTextChanged("ProductID", item.id) }} label={'Product'} />
            <FloatingEditText onPressLeftIcon={() => {
                SelectionView.show({
                    title: "Serial No.",
                    onSelect: (item) => {

                        console.log("item", item)
                        onTextChanged("ProductSerialNoDetailID", item.id)
                        onTextChanged("SerialNo", item.name.toString())
                    },
                    data: serialNos || []
                })
            }} editable={true} onChangeText={(item) => { onTextChanged("SerialNo", item) }} value={SerialNo} leftIcon={Images.ic_add_blue} label="Serial No." />
            <FloatingEditText onChangeText={(item) => { onTextChanged("ProblemDescription", item) }} label={'Problem description'} value={ProblemDescription} />
            <FloatingEditText value={ProductRemarks} onChangeText={(item) => { onTextChanged("ProductRemarks", item) }} label={'Remarks/Issue description'} />
        </ViewWithTitle>
    )
}

export const OtherInfo = () => {
    const { severities, typeOfCalls, onTextChanged, currencies, SeverityID, TypeOfCallID, CurrencyID, HelpdeskCharges } = useContext(HelpDeskContext)

    return (
        <ViewWithTitle title="Other Information">
            <ChipViewContainer selectedChip={{ id: SeverityID }} onSelect={(item) => { onTextChanged("SeverityID", item.id) }} title="Severity" chips={severities} />
            <CustomPicker list={typeOfCalls} selectedItem={{ id: TypeOfCallID }} onSelect={(item) => { onTextChanged("TypeOfCallID", item.id) }} label={'Type of call'} editable={false} rightIcon={Images.ic_down} />
            <ChipViewContainer selectedChip={{ id: CurrencyID }} onSelect={(item) => { onTextChanged("CurrencyID", item.id) }} title="Currency" chips={currencies} />
            <FloatingEditText value={HelpdeskCharges} onChangeText={(item) => { onTextChanged("HelpdeskCharges", item) }} inputType="numeric" label={'Charges'} />
        </ViewWithTitle>
    )
}


export const AssignTo = ({ }) => {
    const { onTextChanged, isAdmin, user, helpDeskStatus, users, sendMailToCustomer, CustomerAdditionalEmail, onSelectUser, onRemoveUser, onAddUser, AssignUserDetails, selectedIndex } = useContext(HelpDeskContext)
    const selectedUser = AssignUserDetails.length ? AssignUserDetails[selectedIndex] : undefined
    return (
        <View style={{ backgroundColor: Colors.white, }}>
            <ViewWithTitle innerStyle={{ paddingHorizontal: 0 }} title={'Assign To'}>
                <View style={{ flexDirection: "row", paddingHorizontal: 16, alignItems: "center" }}>
                    <ImageButton source={Images.ic_add_blue} onPress={() => {


                        onAddUser()
                    }} />
                    <ScrollView horizontal={true} style={{ borderColor: Colors.white, borderBottomColor: Colors.secondary50, borderWidth: 1 }}>
                        {AssignUserDetails?.filter((item) => item.state != 3).map((item, index) =>
                            <View>
                                <Chip onClose={() => {
                                    onRemoveUser(index)
                                }} key={index} style={{ backgroundColor: Colors.white }} textStyle={{ fontSize: 13, color: Colors.black }} onPress={() => { onTextChanged("selectedIndex", index) }}>{`User ${index + 1}`}</Chip>
                                {
                                    selectedIndex === index ? <View style={{ height: 3, backgroundColor: Colors.blue }} /> : null
                                }
                            </View>
                        )}
                    </ScrollView>
                </View>
                {selectedUser ?
                    <View>
                        <View style={{ paddingHorizontal: 16 }}>
                            <CustomPicker list={users} selectedItem={{ id: selectedUser?.id }} onSelect={(item) => onSelectUser(selectedIndex, item)} label={'User Name'} />
                            <SegmentView title={'Priority'} onSelect={(item) => {
                                onSelectUser(selectedIndex, { Priority: item.id, OnHoldReason: "", CompletionDateTime: selectedUser.state == 4 ? new Date() : undefined })


                            }} selectedSegment={{ id: selectedUser.Priority }} segments={helpDeskStatus} />
                            <FloatingEditText editable={selectedUser.Priority == 3} value={selectedUser.OnHoldReason} onChangeText={(text) => {
                                onSelectUser(selectedIndex, { OnHoldReason: text })
                            }} label={'On hold reason'} />
                            <FloatingEditText value={selectedUser.CompletionDateTime ? Utils.formatDate(selectedUser.CompletionDateTime) : ""} label={'Completion Date Time'} editable={false} rightIcon={Images.ic_down} />
                        </View>
                        {!isAdmin && selectedUser.id != user.ID ? <View style={[StyleSheet.absoluteFill, { backgroundColor: "#00000030" }]} /> : null}

                    </View> : null}
            </ViewWithTitle>
            <View style={{ height: 10, marginBottom: 15, backgroundColor: Colors.secondary50, }} />
            <Checkbox label={'Want to send email to customer?'}
                labelColor={Colors.darkGray} checked={sendMailToCustomer} onPress={() => {
                    onTextChanged("sendMailToCustomer", !sendMailToCustomer)
                }} color={Colors.BlueColor400} />
            <View style={{ margin: 15 }}>
                <FloatingEditText value={CustomerAdditionalEmail} onChangeText={(text) => {
                    onTextChanged("CustomerAdditionalEmail", text)
                }} label={'Customer email'} />
                <Text style={{ flex: 1, fontSize: 12, fontFamily: FontName.regular, color: Colors.secondary300, marginTop: 5 }}>{"Additional email saperated by comma"}</Text>
            </View>
        </View>
    )
}

export const AddAttachment = () => {
    const { file, onTextChanged } = useContext(HelpDeskContext)
    return (
        <ViewWithTitle title={'Add Attachment'}>
            <UploadView image={file.source} onPress={() => {
                PhotoPicker({
                    onFileSelect: (res) => {
                        onTextChanged("file", res)
                    }
                })
            }} />
            {/* <FloatingEditText label={"Business Presentation"} editable={false} rightIcon={Images.ic_dot_menu} />
            <FloatingEditText label={"Project Proposal"} editable={false} rightIcon={Images.ic_dot_menu} /> */}
        </ViewWithTitle>
    )
}

