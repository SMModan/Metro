import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Images, Colors } from '../../utils';
import { Checkbox, ChipViewContainer, SegmentView, UploadView, FloatingEditText, ViewWithTitle,DatePicker } from '../common';
import { Chip } from 'react-native-paper';



export const CustomerInformation = () => {
    return (
        <ViewWithTitle title="Customer Information">
            <FloatingEditText label={'Name'} />
            <FloatingEditText label={'Customer Category'} editable={false} rightIcon={Images.ic_down} />
            <FloatingEditText label={'Customer Type'} editable={false} rightIcon={Images.ic_down} />
        </ViewWithTitle>
    )
}


export const ContactInformation = () => {
    return (
        <ViewWithTitle title="Contact Information">
            <FloatingEditText label={'Owner Name'} />
            <FloatingEditText label={'Phone Number'} />
            <FloatingEditText label={'Email'} />
        </ViewWithTitle>
    )
}



export const AddressInformation = () => {
    return (
        <ViewWithTitle title="Contact Information">
            <FloatingEditText label={'Location'} />
            <FloatingEditText label={'Street'} />
            <FloatingEditText label={'Country'} editable={false} rightIcon={Images.ic_down} />
            <FloatingEditText label={'State'} editable={false} rightIcon={Images.ic_down} />
            <FloatingEditText label={'City'} editable={false} rightIcon={Images.ic_down} />
            <FloatingEditText label={'ZipCode'} editable={false} rightIcon={Images.ic_down} />
        </ViewWithTitle>
    )
}















// Contact information 


export const CustomerInfo = () => {
    return (
        <ViewWithTitle title="Customer Information">
            <FloatingEditText label={'First Name'} />
            <FloatingEditText label={'Last Name'} />
            <FloatingEditText label={'Customer Name'} />
        </ViewWithTitle>
    )
}

export const ContactInfo = () => {
    return (
        <ViewWithTitle title="Contact Information">
            <FloatingEditText label={'Mobile Number'} />
            <FloatingEditText label={'Email'} />
        </ViewWithTitle>
    )
}

