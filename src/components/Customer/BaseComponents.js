import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Images, Colors} from '../../utils';
import {
  Checkbox,
  ChipViewContainer,
  SegmentView,
  UploadView,
  FloatingEditText,
  ViewWithTitle,
  DatePicker,
  CustomPicker,
} from '../common';
import {Chip, FAB} from 'react-native-paper';
import addStyles from '../Customer/Style/AddCustomer.style';
import {
  Button as DialogButton,
  Dialog,
  Portal,
  RadioButton,
} from 'react-native-paper';
import {strings} from '../../language/Language';
import {KeyboardAvoidingView} from 'react-native';

export const CustomerInformation = () => {
  return (
    <ViewWithTitle title="Customer Information">
      <FloatingEditText label={'Name'} />
      <FloatingEditText
        label={'Customer Category'}
        editable={false}
        rightIcon={Images.ic_down}
      />
      <FloatingEditText
        label={'Customer Type'}
        editable={false}
        rightIcon={Images.ic_down}
      />
    </ViewWithTitle>
  );
};

export const ContactInformation = () => {
  return (
    <ViewWithTitle title="Contact Information">
      <FloatingEditText label={'Owner Name'} />
      <FloatingEditText label={'Phone Number'} />
      <FloatingEditText label={'Email'} />
    </ViewWithTitle>
  );
};

export const AddmoreInfoDialogue = ({
  isVisible,
  onDialogueDismiss,
  countryList,
  countryId,
  stateId,
  onTextChanged,
  stateList,
  onStateTextChanged,
  Location,
  City,
  ZipCode,
  Street,
  onFloatingEditTextChange
}) => {
  // console.log('Location --->< ----->?', countryId);
  // console.log('ZipCode --->< ----->?', ZipCode);
  // console.log('Location --->< ----->?', Location);
  // console.log('Street --->< ----->?', Street);
  // console.log('City --->< ----->?', City);
  return (
      <>
            <FloatingEditText
              label={'Location'}
              value={Location}
              onChangeText={text => onFloatingEditTextChange('Location', text)}
              style={addStyles.floatEditText}
            />
            <FloatingEditText
              label={'Street'}
              style={addStyles.floatEditText}
              value={Street}
              onChangeText={text => onFloatingEditTextChange('Street', text)}
            />
            <CustomPicker
              selectedItem={{id: countryId}}
              floaingStyle={addStyles.customEditText}
              onSelect={item => onTextChanged('countryId', item.id, item.name)}
              list={countryList || []}
              label={strings.countries + '*'}
              editable={false}
              rightIcon={Images.ic_down}
            />

            <CustomPicker
              selectedItem={{id: stateId}}
              floaingStyle={addStyles.customEditText}
              onSelect={item =>
                onStateTextChanged('stateId', item.id, item.name)
              }
              list={stateList || []}
              label={strings.state}
              editable={false}
              rightIcon={Images.ic_down}
            />

            <FloatingEditText
              label={'City'}
              style={addStyles.floatEditText}
              value={City}
              onChangeText={text => onFloatingEditTextChange('City', text)}
            />
            <FloatingEditText
              label={'ZipCode'}
              style={addStyles.floatEditText}
              value={ZipCode}
              onChangeText={text => onFloatingEditTextChange('ZipCode', text)}
            />
          </>
  );
};

// Contact information

export const CustomerInfo = () => {
  return (
    <ViewWithTitle title="Customer Information">
      <FloatingEditText label={'First Name'} />
      <FloatingEditText label={'Last Name'} />
      <FloatingEditText label={'Customer Name'} />
    </ViewWithTitle>
  );
};

export const ContactInfo = () => {
  return (
    <ViewWithTitle title="Contact Information">
      <FloatingEditText label={'Mobile Number'} />
      <FloatingEditText label={'Email'} />
    </ViewWithTitle>
  );
};
