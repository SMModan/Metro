import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Images, Colors } from '../../utils';
import { Checkbox, ChipViewContainer, SegmentView, UploadView, FloatingEditText, ViewWithTitle } from '../common';
import { Chip } from 'react-native-paper';

export const CustomerInfo = () => {
    return (
        <ViewWithTitle title="Customer Information">
            <FloatingEditText label={'Customer Name'} />
            <FloatingEditText label={'Contact Name'} editable={false} rightIcon={Images.ic_down} />
            <FloatingEditText label={'Customer Address'} rightIcon={Images.ic_down} />
        </ViewWithTitle>
    )
}

export const ContactInfo = () => {
    return (
        <ViewWithTitle title={"Contact Information"}>
            <FloatingEditText label={'Email'} />
            <FloatingEditText label={'Mobile Number'} />
        </ViewWithTitle>
    )
}

export const AMCInfo = () => {
    return (
        <ViewWithTitle title={"AMC Information"}>
            <FloatingEditText label={'AMC'} rightIcon={Images.ic_down} />
            <FloatingEditText label={'Mobile Number'} />

            <Checkbox label={'Will service chargable?'} labelColor={Colors.darkGray} style={{marginTop: 20}}/>
            <Checkbox label={'Is service under AMC?'} labelColor={Colors.darkGray} checked={true} color={Colors.BlueColor400}/>
        </ViewWithTitle>
    )
}


export const IssueDescription = () => {
    return (
        <ViewWithTitle title="Issue Description">
            <FloatingEditText label={'Plan visit date'} />
            <FloatingEditText label={'Product Category'} editable={false} rightIcon={Images.ic_down} />
            <FloatingEditText label={'Product'} />
            <FloatingEditText editable={false} leftIcon={Images.ic_add_blue} label="Serial No." />
            <FloatingEditText label={'Problem description'} editable={false} rightIcon={Images.ic_down} />
            <FloatingEditText label={'Remarks/Issue description'} />
        </ViewWithTitle>
    )
}

export const OtherInfo = () => {
    return (
        <ViewWithTitle title="Other Information">
            <ChipViewContainer title="Severity" chips={[{ name: "Trivial" }, { name: "Normal" }, { name: "Critical" }, { name: "Blocker" }, { name: "Critical-Red Flag" },]} />
            <FloatingEditText label={'Type of call'} editable={false} rightIcon={Images.ic_down} />
            <ChipViewContainer title="Currency" chips={[{ name: "GBP" }, { name: "INR" }, { name: "AED" }, { name: "USD" },]} />
            <FloatingEditText inputType="numeric" label={'Charges'} />
        </ViewWithTitle>
    )
}


export const AssignTo = ({selectedIndex, userChanged}) => {
    return (
        <View style={{ margin: 5, backgroundColor: Colors.white,}}>
            <ViewWithTitle title={'Assign To'}>
                <ScrollView horizontal={true} style={{ borderColor: Colors.white, borderBottomColor: Colors.secondary50, borderWidth: 1}}>
                    {["User1", "User2", "User3"].map((item, index) => 
                    <View>
                        <Chip key={index} style={{ backgroundColor: Colors.white }} textStyle={{ fontSize: 13, color: Colors.black }} onPress={() => { userChanged(index) }}>{item}</Chip>
                        {
                            selectedIndex === index ? <View style={{ height: 3, backgroundColor: Colors.blue }}/> : null
                        }
                    </View>
                    )}
                </ScrollView>
                <FloatingEditText label={'User Name'} />
                <SegmentView title={'Priority'} segments={[{ name: "Open" }, { name: "On hold" }, { name: "Completed" },]} />
                <FloatingEditText label={'On hold reason'} />
                <FloatingEditText label={'Completion Date Time'} editable={false} rightIcon={Images.ic_down} />
            </ViewWithTitle>
            <View style={{ height: 10, marginBottom: 15, backgroundColor: Colors.secondary50,}}/>
            <Checkbox label={'Want to send email to customer?'} labelColor={Colors.darkGray} checked={true} color={Colors.BlueColor400}/>
            <View style={{margin: 15 }}>
                <FloatingEditText label={'Customer email'} />
                <Text style={{ flex: 1, fontSize: 12, fontFamily: FontName.regular, color: Colors.secondary300, marginTop: 5 }}>{"Additional email saperated by comma"}</Text>
            </View>
        </View>
    )
}

export const AddAttachment = () => {
    return (
        <ViewWithTitle title={'Add Attachment'}>
            <UploadView/>
            <FloatingEditText label={"Business Presentation"} editable={false} rightIcon={Images.ic_dot_menu} />
            <FloatingEditText label={"Project Proposal"} editable={false} rightIcon={Images.ic_dot_menu} />
        </ViewWithTitle>
    )
}

