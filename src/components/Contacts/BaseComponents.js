import React from 'react';
import { FloatingEditText, ViewWithTitle } from '../common';

export const CustomerInfo = () => {
    return (
        <ViewWithTitle title="Customer Information">
            <FloatingEditText label={'First Name'} />
            <FloatingEditText label={'Last Name'}/>
            <FloatingEditText label={'Customer Name'} />
        </ViewWithTitle>
    )
}

export const ContactInfo = () => {
    return (
        <ViewWithTitle title={"Contact Information"}>
            <FloatingEditText label={'Mobile Number'} inputType="numeric" />
            <FloatingEditText label={'Email'} />
        </ViewWithTitle>
    )
}
