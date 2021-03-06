import React, { useContext, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Images, Colors, FontName, FontSize } from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import { Checkbox, ChipViewContainer, FloatingEditText, ViewWithTitle, DatePicker, CustomDatePicker, CustomPicker, ImageButton } from '../common';
import { AppoinmentContext } from './StartTrip';
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
            <FloatingEditText value={Location} onChangeText={(text) => onTextChanged("Location", text)} 
            label={'Location'} editable={ActivityID == 0 || isOwner} />
            <View style={{ flexDirection: 'row', width: '100%', }}>
                <CustomDatePicker selectedDate={StartDate} 
                minimumDate={StartDate || new Date()}
                disabled={ActivityID != 0 || !isOwner}
                onDateChanged={(date) => {
                    onTextChanged("StartDate", date)
                }} label={"Start Date"} containerStyle={{ flex: 1, }} />
                <CustomPicker 
                disabled={ActivityID != 0 || !isOwner} selectedItem={{ id: StartHr }} onSelect={(item) => onTextChanged("StartHr", item.id)} list={hours} label={'HH'} inputType="numeric" floaingStyle={{ width: 80, marginHorizontal: 10 }} />
                <CustomPicker 
                disabled={ActivityID != 0 || !isOwner} selectedItem={{ id: StartMin }} onSelect={(item) => onTextChanged("StartMin", item.id)} list={mins} label={'MM'} inputType="numeric" floaingStyle={{ width: 80 }} />
            </View>
            {!endDateEnable ? <Text onPress={() => setEndDateEnable(true)} style={{ fontSize: 14, fontFamily: FontName.regular, color: Colors.blue, marginTop: 15, marginBottom: 15 }}> + Add End Date</Text> : <View style={{ flexDirection: 'row', width: '100%', marginBottom: ResponsivePixels.size16 }}>
                <CustomDatePicker minimumDate={StartDate || new Date()} selectedDate={EndDate} onDateChanged={(date) => {
                    onTextChanged("EndDate", date)
                }} label={"End Date"} containerStyle={{ flex: 1, }} 
                disabled={ActivityID != 0 || !isOwner} />
                <CustomPicker disabled={ActivityID != 0 || !isOwner} selectedItem={{ id: EndHr }} onSelect={(item) => onTextChanged("EndHr", item.id)} list={hours} label={'HH'} inputType="numeric" floaingStyle={{ width: 80, marginHorizontal: 10 }} />
                <CustomPicker disabled={ActivityID != 0 || !isOwner} selectedItem={{ id: EndMin }} onSelect={(item) => onTextChanged("EndMin", item.id)} list={mins} label={'MM'} inputType="numeric" floaingStyle={{ width: 80 }} />
            </View>}
            <Checkbox disabled={ActivityID != 0 || !isOwner} label={'Is fullday event?'} labelColor={Colors.darkGray} checked={IsFullDayEvent == 0 ? false : true} onPress={() => {
                onTextChanged("IsFullDayEvent", IsFullDayEvent == 0 ? 1 : 0)

            }} color={Colors.BlueColor400} style={{ margin: 0 }} />
            <FloatingEditText value={Subject} onChangeText={(text) => onTextChanged("Subject", text)} label={'Subject'} 
            editable={ActivityID == 0 || isOwner} />
        </ViewWithTitle>
    )
}


export const AppointmentInfo = () => {
    const session = useSelector(state => state.session)

    const { AssignUserName, onTextChanged,ActivityID,ActivityOwnerID, EntityID,user, onSelectUser, onRemoveUser,
         RelatedList, ReminderAlertID, EntityFieldID, EntityFieldName, } = useContext(AppoinmentContext)
    const isOwner = ActivityID == 0 || ActivityOwnerID == user.ID

    console.log("EntityFieldID", EntityFieldID)
    return (
        <ViewWithTitle title="Appointment Information">
            <ChipViewContainer selectedChip={{ id: EntityID }} onSelect={(item) => {
                onTextChanged("EntityID", item.id)
                onTextChanged("EntityName", item.name)
                onTextChanged("EntityFieldID", 0)
                }} disabled={ActivityID != 0 || !isOwner} title="Related to" chips={[{ id: 0, name: "General" }, ...session.GetRelatedTo]} />
            {EntityID == 0 ? 
            <FloatingEditText onChangeText={(text) => onTextChanged("EntityFieldName", text)} value={EntityFieldName} label={'Related Name'} 
            editable={ActivityID == 0 || isOwner} />
                : RelatedList.length ? 
                <CustomPicker list={RelatedList} disabled={ActivityID != 0 || !isOwner} selectedItem={{ id: EntityFieldID }} label={'Related Name'} onSelect={(item) => onTextChanged("EntityFieldID", item.id)} /> : null}

            <View style={{ flexDirection: "row", marginVertical: 16, alignItems: "flex-start" }}>
                <ImageButton
                    disabled={ActivityID != 0 || !isOwner}
                source={Images.ic_add_blue} onPress={() => {
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
                            {AssignUserName.map((item, index) => <Chip 
                              disabled={ActivityID != 0 || !isOwner}
                            key={index} style={{ margin: 5, backgroundColor: Colors.blueGray200 }}
                                textStyle={{ fontSize: 13, color: Colors.black }}
                                onClose={() => {
                                    if(ActivityID == 0 || isOwner){
                                        onRemoveUser(index)
                                    }
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
            <ChipViewContainer 
                            disabled={ActivityID != 0 || !isOwner}
            selectedChip={{ id: ReminderAlertID }} onSelect={(item) => {
                onTextChanged("ReminderAlertID", item.id)
            }} title="Alert" chips={session.GetReminderAlert} />
            {/* <FloatingEditText inputType="numeric" label={'Charges'} /> */}
        </ViewWithTitle>
    )
}


export const Remarks = () => {

    const { OwnerRemarks, ActivityOwnerID, user, ActivityID, AssignUserRemarks, AssigneeRemarks, AssignUserID, onTextChanged, } = useContext(AppoinmentContext)
    const isOwner = ActivityOwnerID == user.ID
    console.log("ActivityID", ActivityID)
    const isAssignedToMe = AssignUserID.find((item) => item == user.ID)
    return (
        <ViewWithTitle title={'Remarks'}>
            <FloatingEditText editable={ActivityID == 0 || isOwner} 
 value={OwnerRemarks} onChangeText={(text) => onTextChanged("OwnerRemarks", text)} label={ActivityID == 0 || isOwner ? "Write here" : "Owner's Remark"} />
            {isAssignedToMe ? <FloatingEditText value={AssigneeRemarks} 
            onChangeText={(text) => onTextChanged("AssigneeRemarks", text)} label={"Your Remarks"} /> : null}
            {isOwner && AssignUserRemarks.length ? <FlatList style={{ marginTop: 16 }} data={AssignUserRemarks}
                ListHeaderComponent={() => (<View style={{ flexDirection: "row", alignItems: "center", }}>
                    <View style={{ borderWidth: 1, flex: 1, padding: 8 }}>
                        <Text style={{ color: Colors.black, fontSize: FontSize.fontSize16 }}>{"UserName"}</Text>
                    </View>
                    <View style={{ borderWidth: 1, flex: 1, padding: 8 }}>
                        <Text style={{ color: Colors.black, fontSize: FontSize.fontSize16 }}>{"Remarks"}</Text>
                    </View>
                </View>)}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                        <View style={{ borderWidth: 1, flex: 1, padding: 8 }}>
                            <Text style={{ color: Colors.blueGray900 }}>{item.name}</Text>
                        </View>
                        <View style={{ borderWidth: 1, flex: 1, padding: 8 }}>
                            <Text numberOfLines={3} style={{ color: Colors.blueGray900 }}>{item.response}</Text>
                        </View>
                    </View>
                )}
            /> : null}
        </ViewWithTitle>
    )
}

