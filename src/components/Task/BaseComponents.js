import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Images, Colors } from '../../utils';
import { Checkbox, ChipViewContainer, SegmentView, UploadView, FloatingEditText, ViewWithTitle,DatePicker } from '../common';
import { Chip } from 'react-native-paper';



export const TaskInformation = () => {
    return (
        <ViewWithTitle title="Task Information">
            <FloatingEditText label={'Task'} editable={false} rightIcon={Images.ic_down} />
            <SegmentView title={'Priority'} segments={[{ name: "Low" }, { name: "Medium" }, { name: "High" },]} />
            <ChipViewContainer title="Related to" chips={[{ name: "General" }, { name: "Customer" }, { name: "Opportunity" }, { name: "Contact" }, { name: "AMC" },]} />
            <FloatingEditText label={'Related Name'} />
            <FloatingEditText label={'Assign to'} editable={false} rightIcon={Images.ic_down} />
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
                <FloatingEditText label={'Assign to'} />

                <Text style={{ flex: 1, fontSize: 16, fontFamily: FontName.regular, color: Colors.blue, marginTop: 10 }}>{"Remove"}</Text>
            </ViewWithTitle>
          
        </View>
    )
}




export const Reminder = () => {
    return (
        <ViewWithTitle title="Reminder">
               
           <View style={{ flexDirection: 'row', width: '100%' }}>
          
           <DatePicker textColor={Colors.black} defaultDate={new Date()} startDate={new Date()} placeHolderText={"DatePicker Date"} style={{ height: 40, marginTop: 20, marginRight: 10 }}  textStyle={{ fontSize: 20 }}/>

            <FloatingEditText label={'HH'} inputType="numeric" style={{ width: 80, marginRight: 10}}/>
            <FloatingEditText label={'MM'} inputType="numeric" style={{ width: 80}}/>
          </View>

            <ChipViewContainer title="Alert" chips={[{ name: "None" }, { name: "At the time of Event" }, { name: "30m before" }, { name: "1h before" }, { name: "1d before" },{ name: "1w before" }]} />
           
        </ViewWithTitle>
    )
}


export const OwnerRemarks = () => {
    return (
        <ViewWithTitle title="Owner's Remarks">
                <FloatingEditText label={'Writer here'} />
           
        </ViewWithTitle>
    )
}











export const AssignInfo = () => {
    return (
        <ViewWithTitle title="Task Information">
            <FloatingEditText label={'Task'} editable={false} rightIcon={Images.ic_down} />
            <SegmentView title={'Priority'} segments={[{ name: "Low" }, { name: "Medium" }, { name: "High" },]} />
            <ChipViewContainer title="Related to" chips={[{ name: "General" }, { name: "Customer" }, { name: "Opportunity" }, { name: "Contact" }, { name: "AMC" },]} />
            <FloatingEditText label={'Related Name'} />
            <FloatingEditText label={'Assign to'} editable={false} rightIcon={Images.ic_down} />
        </ViewWithTitle>
    )
}





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



export const AddAttachment = () => {
    return (
        <ViewWithTitle title={'Add Attachment'}>
            <UploadView/>
            <FloatingEditText label={"Business Presentation"} editable={false} rightIcon={Images.ic_dot_menu} />
            <FloatingEditText label={"Project Proposal"} editable={false} rightIcon={Images.ic_dot_menu} />
        </ViewWithTitle>
    )
}

