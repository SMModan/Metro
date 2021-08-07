import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { Images, Colors, FontName } from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import { Checkbox, ChipViewContainer, FloatingEditText, ViewWithTitle, DatePicker, CustomDatePicker, CustomPicker, ImageButton } from '../common';
import { AppoinmentContext } from './AddAppointments';
import _ from "lodash"
import { useSelector } from 'react-redux';
import SelectionView from '../common/SelectionView';
import { Chip } from 'react-native-paper';
export const EventInfo = () => {

    const { Location, onTextChanged, ActivityOwnerID, ActivityID, user, IsFullDayEvent, StartDate, StartHr, StartMin, EndDate, EndHr, EndMin, Subject } = useContext(AppoinmentContext)

    const [endDateEnable, setEndDateEnable] = useState(true)
    const [mins] = useState(["00", "15", "30", "45"].map((item, index) => {


        return { id: item, name: item.toString() }
    }))
    const [hours] = useState(_.range(0, 26).map((item, index) => {

        const value = index.toString().length > 1 ? index.toString() : `0${index}`

        return { id: value, name: value }
    }))

    const isOwner = ActivityID == 0 || ActivityOwnerID == user.ID

    return (
        <ViewWithTitle title="Event Information">
            <FloatingEditText value={Location} onChangeText={(text) => onTextChanged("Location", text)} label={'Location'} />
            <View style={{ flexDirection: 'row', width: '100%', }}>
                <CustomDatePicker selectedDate={StartDate} onDateChanged={(date) => {

                    onTextChanged("StartDate", date)
                }} label={"Start Date"} containerStyle={{ flex: 1, }} />
                <CustomPicker selectedItem={{ id: StartHr }} onSelect={(item) => onTextChanged("StartHr", item.id)} list={hours} label={'HH'} inputType="numeric" floaingStyle={{ width: 80, marginHorizontal: 10 }} />
                <CustomPicker selectedItem={{ id: StartMin }} onSelect={(item) => onTextChanged("StartMin", item.id)} list={mins} label={'MM'} inputType="numeric" floaingStyle={{ width: 80 }} />
            </View>
            {!endDateEnable ? <Text onPress={() => setEndDateEnable(true)} style={{ fontSize: 14, fontFamily: FontName.regular, color: Colors.blue, marginTop: 15, marginBottom: 15 }}> + Add End Date</Text> : <View style={{ flexDirection: 'row', width: '100%', marginBottom: ResponsivePixels.size16 }}>
                <CustomDatePicker minimumDate={StartDate || new Date()} selectedDate={EndDate} onDateChanged={(date) => {

                    onTextChanged("EndDate", date)
                }} label={"End Date"} containerStyle={{ flex: 1, }} />
                <CustomPicker selectedItem={{ id: EndHr }} onSelect={(item) => onTextChanged("EndHr", item.id)} list={hours} label={'HH'} inputType="numeric" floaingStyle={{ width: 80, marginHorizontal: 10 }} />
                <CustomPicker selectedItem={{ id: EndMin }} onSelect={(item) => onTextChanged("EndMin", item.id)} list={mins} label={'MM'} inputType="numeric" floaingStyle={{ width: 80 }} />
            </View>}
            <Checkbox disabled={!isOwner} label={'Is fullday event?'} labelColor={Colors.darkGray} checked={IsFullDayEvent == 0 ? false : true} onPress={() => {
                onTextChanged("IsFullDayEvent", IsFullDayEvent == 0 ? 1 : 0)

            }} color={Colors.BlueColor400} style={{ margin: 0 }} />
            <FloatingEditText value={Subject} onChangeText={(text) => onTextChanged("Subject", text)} label={'Subject'} />
        </ViewWithTitle>
    )
}


export const AppointmentInfo = () => {
    const session = useSelector(state => state.session)

    const { AssignUserName, onTextChanged, EntityID, onSelectUser, onRemoveUser, RelatedList, ReminderAlertID, EntityFieldID, EntityFieldName, } = useContext(AppoinmentContext)

    console.log("EntityFieldID", EntityFieldID)
    return (
        <ViewWithTitle title="Appointment Information">
            <ChipViewContainer selectedChip={{ id: EntityID }} onSelect={(item) => {
                onTextChanged("EntityID", item.id)
                onTextChanged("EntityName", item.name)
            }} title="Related to" chips={[{ id: 0, name: "General" }, ...session.GetRelatedTo]} />
            {EntityID == 0 ? <FloatingEditText onChangeText={(text) => onTextChanged("EntityFieldName", text)} value={EntityFieldName} label={'Related Name'} />
                : RelatedList.length ? <CustomPicker list={RelatedList} selectedItem={{ id: EntityFieldID }} label={'Related Name'} onSelect={(item) => onTextChanged("EntityFieldID", item.id)} /> : null}

            <View style={{ flexDirection: "row", marginVertical: 16, alignItems: "flex-start" }}>
                <ImageButton source={Images.ic_add_blue} onPress={() => {

                    SelectionView.show({
                        title: "Invites to",
                        onSelect: onSelectUser,
                        data: session.GetUserForAssignActivity || []
                    })

                }} />
                <View>
                    <Text style={[{
                        color: Colors.blueGray700,
                        fontSize: ResponsivePixels.size18,
                        lineHeight: ResponsivePixels.size24,
                        fontWeight: "600",
                        fontFamily: FontName.regular,

                    }, { marginStart: 8 }]}>{"Invites to"}</Text>

                    {AssignUserName?.length ?
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {AssignUserName.map((item, index) => <Chip key={index} style={{ margin: 5, backgroundColor: Colors.blueGray200 }}
                                textStyle={{ fontSize: 13, color: Colors.black }}
                                onClose={() => {
                                    onRemoveUser(index)
                                }}
                                icon="account">{item.name}</Chip>)}
                        </View> : null}
                </View>
                {/* <View style={{ flexDirection: "row", flexWrap: "wrap" }}>                    {selectedUsers?.map((item, index) => <Chip key={index} style={{ margin: 5, backgroundColor: Colors.white }}
                            textStyle={{ fontSize: 13, color: Colors.blueGray900 }}
                            icon="close">{item.name}</Chip>)}
                        </View> */}
            </View>
            {/* <FloatingEditText label={'Invites to'} editable={false} rightIcon={Images.ic_down} /> */}
            <ChipViewContainer selectedChip={{ id: ReminderAlertID }} onSelect={(item) => {
                onTextChanged("ReminderAlertID", item.id)
            }} title="Alert" chips={session.GetReminderAlert} />
            {/* <FloatingEditText inputType="numeric" label={'Charges'} /> */}
        </ViewWithTitle>
    )
}


export const Remarks = () => {

    const { OwnerRemarks, ActivityOwnerID, user, ActivityID, AssigneeRemarks, AssignUserID, onTextChanged, } = useContext(AppoinmentContext)
    const isOwner = ActivityOwnerID == user.ID
    return (
        <ViewWithTitle title={'Remarks'}>
            <FloatingEditText editable={ActivityID == 0 || isOwner} value={OwnerRemarks} onChangeText={(text) => onTextChanged("OwnerRemarks", text)} label={ActivityID == 0 || isOwner ? "Write here" : "Owner's Remark"} />
            {!isOwner ? <FloatingEditText value={AssigneeRemarks} onChangeText={(text) => onTextChanged("AssigneeRemarks", text)} label={"Your Remarks"} /> : null}
        </ViewWithTitle>
    )
}

