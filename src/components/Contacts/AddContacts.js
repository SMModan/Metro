import React, {Component} from 'react';
import {View, Text, FlatList, ScrollView} from 'react-native';
import {MainContainer, ProgressDialog} from '../common';
import {connect} from 'react-redux';
import styles from '../HomeDetails/styles/HelpDesk.style';
import {strings} from '../../language/Language';
import {Images, Utils} from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import {Button, ScrollContainer} from '../common';
import {CustomerInfo, ContactInfo} from './BaseComponents';
import contactApi from './Apis/ContactApi';
import { goBack } from '../../navigation/Navigator';
import { withRouter } from "react-router";

class AddContacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerList: [],
      customerId: '',
      customerName: '',
      contactId: this.props?.route?.params?.contactID || 0,
      firstName:'',
      lastName:'',
      email:'',
      mobileNumbers:''
    };
  }

  componentDidMount() {
    this.getAllCustomer();

    console.log("<============ ID ========>",this.state.contactId)

  }

  onTextChanged = (key, value, customerName) => {
    this.setState({
      [key]: value,
      customerName: customerName,
    });
  };

  onFloatingEditTextChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  getContactByID = () => {
    ProgressDialog.show("please wait")
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++Insdie get+++++++++++++++++++++++++")
    const params = { ContactID:this.state.contactId}
    contactApi.getContactByID(params, (res) => {
      ProgressDialog.hide()

        const { Table } = res
        const { FirstName, LastName, MobileNo, EmailID, CustomerName, CustomerID } = Table
        console.log("MobileNo",MobileNo)
        this.setState({
          firstName:FirstName,
          lastName:LastName,
          email:EmailID,
          customerName:CustomerName,
          customerId:CustomerID,
          mobileNumbers:MobileNo,

        })
        console.log("this.context", Table)
        
    }, (error) => {
       ProgressDialog.hide()
        Utils.showToast(error)
        goBack()
    })
}


  getAllCustomer = () => {
    ProgressDialog.show("please wait")
    contactApi.getCustomers(
      {MaxCustomerID: 1},
      res => {
        ProgressDialog.hide()
        const {Table} = res;
        let customerList = [];
        console.log('Table', Table);
        if (Table) {
          for (let index = 0; index < Table.length; index++) {
            const customer = Table[index];

            let objCountry = {
              id: customer.ID,
              name: customer.CustomerName,
            };
            customerList.push(objCountry);
          }

          this.setState(
            {
              customerList,
            },
            () => {
              if(this.state.contactId!=0){
                this.getContactByID()
              }

            },
          );
        }
      },
      error => {
        ProgressDialog.hide()
        Utils.showToast(error);
      },
    );
  };

  saveContact = () => {

    const { firstName,lastName,email,mobileNumbers,customerId,customerName,contactId} = this.state

    if (Utils.isEmpty(customerId)) {
        Utils.showToast("Please select Customer")
    }
    else if (Utils.isEmpty(firstName)) {
        Utils.showToast("Please enter First Name")
    }
    else if (Utils.isEmpty(lastName)) {
        Utils.showToast("Please enter Last Name")

    }
    else if (Utils.isEmpty(email)) {
        Utils.showToast("Please enter Email")
    }
    else if (Utils.isEmpty(mobileNumbers)) {
        Utils.showToast("Please enter Mobile Number")
    } else {

        ProgressDialog.show("please wait")
        const params = {
         ContactID:contactId,
          Territory:1,
          CustomerID:customerId,
          CustomerName:customerName,
          Prefix:0,
          FirstName:firstName,
          LastName:lastName,
          EmailID:email,
          MobileNo:mobileNumbers,
          EmailID2:"",
          MobileNo2:"",
          JobTitle:0,
          Department:0,
          SkypeID:""

           }
        contactApi.addOrUpdateContact(params, (res) => {
            ProgressDialog.hide()

            if (res.IsSucceed) {
              Utils.showToast("Contact Added sucessfully")
            }
            goBack()
        }, (error) => {

            Utils.showToast("errror from api  "+error)
            ProgressDialog.hide()
        })
    }
  }


  render() {
    const {
      customerList,
      customerId,
      customerName,
      firstName,
      lastName,
      mobileNumbers,
      email,
    } = this.state;
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => this.props.navigation.goBack(),
          },
          title: 'Contact',
          hideUnderLine: true,
          light: true,
        }}>
        <ScrollContainer>
          <View style={styles.mainView}>
            <CustomerInfo
              customerList={customerList}
              customerId={customerId}
              customerName={customerName}
              onTextChanged={(key, value, customerName) =>
                this.onTextChanged(key, value, customerName)
              }
              onFloatingEditTextChange={(key, text) =>
                this.onFloatingEditTextChange(key, text)
              }
              firstName={firstName}
              lastName={lastName}
            />
            <ContactInfo
              onFloatingEditTextChange={(key, text) =>
                this.onFloatingEditTextChange(key, text)
              }

              mobileNumbers={mobileNumbers}
              email={email}
            />
            <Button
              title={strings.save}
              style={{margin: ResponsivePixels.size16}}
              onPress={()=>{
                this.saveContact()
              }}
            />
          </View>
        </ScrollContainer>
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddContacts)
