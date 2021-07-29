import React from 'react';
import {strings} from '../../language/Language';
import {Images} from '../../utils';
import {FloatingEditText, ViewWithTitle, CustomPicker} from '../common';
import addStyles from '../Customer/Style/AddCustomer.style';

export const CustomerInfo = ({
  customerId,
  onTextChanged,
  customerList,
  onFloatingEditTextChange,
  firstName,
  lastName,
}) => {
  return (
    <ViewWithTitle title="Customer Information">
      <FloatingEditText
        label={'First Name'}
        value={firstName}
        onChangeText={text => onFloatingEditTextChange('firstName', text)}
      />
      <FloatingEditText
        label={'Last Name'}
        value={lastName}
        onChangeText={text => onFloatingEditTextChange('lastName', text)}
      />
      <CustomPicker
        selectedItem={{id: customerId}}
        floaingStyle={addStyles.customEditText}
        onSelect={item => onTextChanged('customerId', item.id, item.name)}
        list={customerList || []}
        label={strings.customerName + '*'}
        editable={false}
        rightIcon={Images.ic_down}
      />
    </ViewWithTitle>
  );
};

export const ContactInfo = ({
  onFloatingEditTextChange,
  mobileNumbers,
  email,
}) => {
  console.log('mobileNumber====>', mobileNumbers);
  return (
    <ViewWithTitle title={'Contact Information'}>
     
      <FloatingEditText
        label={'Email'}
        value={email}
        onChangeText={text => onFloatingEditTextChange('email', text)}
      />
       <FloatingEditText
        label={'Mobile Number'}
        value={mobileNumbers}
        onChangeText={text => onFloatingEditTextChange('mobileNumbers', text)}
      />
    </ViewWithTitle>
  );
};
