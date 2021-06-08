import React from 'react';
import { View, Text } from 'react-native';
import { Images, Colors } from '../../utils';
import { Checkbox, ChipViewContainer, FloatingEditText, ViewWithTitle, DatePicker } from '../common';

export const EventInfo = () => {
    return (
        <ViewWithTitle title="Event Information">
            <FloatingEditText label={'Location'} />
            <View style={{ flexDirection: 'row', width: '100%' }}>
            <DatePicker textColor={Colors.black} defaultDate={new Date()} startDate={new Date()} placeHolderText={"DatePicker Date"} style={{ height: 40, marginTop: 20, marginRight: 10 }}  textStyle={{ fontSize: 20 }}/>
                <FloatingEditText label={'HH'} inputType="numeric" style={{ width: 80, marginRight: 10}}/>
                <FloatingEditText label={'MM'} inputType="numeric" style={{ width: 80}}/>
            </View>
            <Text style={{ fontSize: 14, fontFamily: FontName.regular, color: Colors.blue, marginTop: 15, marginBottom: 15 }}> + Add End Date</Text>
            <Checkbox label={'Is fullday event?'} labelColor={Colors.darkGray} checked={true} color={Colors.BlueColor400} style={{ margin:0}}/>
            <FloatingEditText label={'Subject'} />
        </ViewWithTitle>
    )
}


export const AppointmentInfo = () => {
    return (
        <ViewWithTitle title="Appointment Information">
            <ChipViewContainer title="Related to" chips={[{ name: "General" }, { name: "Customer" }, { name: "Opportunity" }, { name: "Contact" }, { name: "AMC" },]} />
            <FloatingEditText label={'Related Name'} />
            <FloatingEditText label={'Invites to'} editable={false} rightIcon={Images.ic_down} />
            <ChipViewContainer title="Alert" chips={[{ name: "None" }, { name: "At the time of Event" }, { name: " 30m before" }, { name: "1h before" }, { name: "1d before" }, { name: "1w before" },]} />
            <FloatingEditText inputType="numeric" label={'Charges'} />
        </ViewWithTitle>
    )
}


export const Remarks = () => {
    return (
        <ViewWithTitle title={'Remarks'}>
            <FloatingEditText label={"Write here"} />
        </ViewWithTitle>
    )
}

