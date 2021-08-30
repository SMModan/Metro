import React, { Component } from 'react';
import { View, Image } from 'react-native';
import {
  FloatingEditText,
  MainContainer,
} from '../common';
import { connect } from 'react-redux';
import styles from '../HomeDetails/styles/HelpDesk.style';
import { strings } from '../../language/Language';
import { Colors, Images, Utils } from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import { Button, ScrollContainer, ProgressDialog } from '../common'
import {
  CustomerInfo,
  ContactInfo,
  AMCInfo,
  IssueDescription,
  OtherInfo,
  AssignTo,
  AddAttachment
} from './BaseComponents';
import { DROPDWON_GET_OPPORTUNITY_CURRENCY } from '../../utils/AppConstants';
import HelpDeskApi from './Api/HelpDeskApi';
import { goBack } from '../../navigation/Navigator';
import { Button as DialogButton, Dialog, Portal, RadioButton, TextInput } from 'react-native-paper'


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { HelpDeskContext } from './HelpDeskContext';
import Solution from './Solution';
import SignatureCapture from 'react-native-signature-capture';
import { AirbnbRating } from 'react-native-ratings';

const Tab = createMaterialTopTabNavigator();
export const ChildViews = ({ isAddNew, onSave, title }) => {
  return (
    <ScrollContainer>
      <View style={styles.mainView}>
        <CustomerInfo />
        <ContactInfo />
        {isAddNew ? <AMCInfo /> : null}
        <IssueDescription />
        <OtherInfo />
        <AssignTo />
        <AddAttachment />

        <Button title={title || strings.save} onPress={onSave} style={{ margin: ResponsivePixels.size16 }} />
      </View>
    </ScrollContainer>
  )
}
class AddHelpDesk extends Component {

  item = this.props.route.params?.item
  sign = React.createRef()
  state = {
    selectedIndex: 0,
    CustomerID: 0,
    StatusID: 1,
    ContactID: { id: 0 },
    SeverityID: 0,
    TypeOfCallID: 0,
    CurrencyID: 0,
    HelpdeskCharges: "0",
    RootCauseAnalysisID: 0,
    ProblemDescription: "",
    ProductID: 0,
    sendMailToCustomer: false,
    AMCID: 0,
    CustomerAddressID: 0,
    IsChargeableService: false,
    TotalFreePending: 0,
    TotalServiceTaken: 0,
    FileName: "",
    FilePath: "",
    ContentType: "",
    CustomerAdditionalEmail: "",
    ProductSerialNoDetailID: 0,
    SerialNo: "",
    ProductRemarks: "",
    ProductCategoryID: 0,
    AssignUserDetails: [],
    PlanVisitDate: undefined,
    users: [],
    currencies: this.props.session[DROPDWON_GET_OPPORTUNITY_CURRENCY],
    severities: this.props.session["GetHelpdeskSeverity"],
    typeOfCalls: this.props.session["GetHelpdeskTypeOfCall"],
    helpDeskStatus: this.props.session["GetHelpdeskStatus"],
    customers: [],
    contacts: [],
    addresses: [],
    productCategries: [],
    products: [],
    serialNos: [],
    amcs: [],
    file: {},
    isAdmin: true,
    user: this.props.session.user,
    solutions: [],
    showRatingDialog: false,
    showSignatureDialog: false,
    rating: 0,
    signature: ""
  }

  componentDidMount = () => {
    this.getDropDowns()


  }

  getHelpDeskDetails = async (id) => {
    ProgressDialog.show()

    HelpDeskApi.getHelpDeskDetails(id, (res) => {

      console.log("res", res)

      this.setState({ ...res })

      this.onTextChanged("CustomerID", res.CustomerID, true)
      this.onTextChanged("ProductCategoryID", res.ProductCategoryID, true)
      if (res.ProductID)
        this.onTextChanged("ProductID", res.ProductID, true)
      ProgressDialog.hide()

    }, (error) => {
      ProgressDialog.hide()
      Utils.showDangerToast(error)
    })
  }

  getDropDowns = async () => {
    ProgressDialog.show()
    const customers = await HelpDeskApi.getCustomerForHelpDesk()
    const users = await HelpDeskApi.getAssignToUser()
    const productCategries = await HelpDeskApi.getProductCategories()
    const isAdmin = this.item ? await HelpDeskApi.getIsAdmin(this.state.user.ID) : true
    console.log()
    this.setState({ customers, users, isAdmin, productCategries }, () => {

      if (this.item) {
        this.getHelpDeskDetails(this.item.ID)
      } else
        ProgressDialog.hide()

    })

  }
  onAddUser = () => {
    // const selectedUser = this.state.selectedUser
    const { AssignUserDetails } = this.state

    AssignUserDetails.push({
      recordId: 0,
      Priority: 1,
      OnHoldReason: "",
      state: 2,
      CompletionDateTime: undefined,
    })


    this.setState({ AssignUserDetails: [...AssignUserDetails] })

  }

  onSelectUser = (index, item) => {
    const { AssignUserDetails } = this.state
    const value = AssignUserDetails.length ? AssignUserDetails[index] : {}
    AssignUserDetails.splice(index, 1, { ...value, ...item })
    this.setState({ AssignUserDetails: [...AssignUserDetails], selectedIndex: index })

  }
  onRemoveUser = (index) => {
    const { AssignUserDetails } = this.state

    if (AssignUserDetails[index]["state"] == 2) {
      AssignUserDetails.splice(index, 1)

    } else
      AssignUserDetails[index]["state"] = 3

    this.setState({ AssignUserDetails: [...AssignUserDetails] })

  }

  onSolutionSaved = () => {

  }

  // onSelectSerialNo = (item) => {
  //   // const selectedUser = this.state.selectedUser
  //   const { SerialNo } = this.state

  //   SerialNo.push(item)


  //   this.setState({ SerialNo: [...SerialNo] })

  // }
  // onRemoveSerialNo = (index) => {
  //   const { SerialNo } = this.state
  //   SerialNo.splice(index, 1)
  //   this.setState({ SerialNo: [...SerialNo] })

  // }
  insertHelpDesk = async () => {
    const { CustomerID, ContactID, file, ProductCategoryID, ProductID, ProductRemarks, ProblemDescription,
      SeverityID, HelpdeskCharges, RootCauseAnalysisID, sendMailToCustomer, AMCID, CustomerAddressID, IsChargeableService, TotalFreePending, StatusID, TotalServiceTaken, FileName, FilePath, ContentType, CustomerAdditionalEmail, ProductSerialNoDetailID, TypeOfCallID, SerialNo, AssignUserDetails, CurrencyID, PlanVisitDate, } = this.state

    if (this.verifyHelpDesk()) {



      let assignUser = AssignUserDetails.map((p) => {

        // console.log("amount", p.amount)
        return `${p.recordId}$${p.id}$${p.name}$${p.Priority}$${p.OnHoldReason}$${p.CompletionDateTime ? Utils.formatDate(p.CompletionDateTime, "DD-MM-YYYY") : ""}$${p.state}`
      })

      assignUser = assignUser.join("#")
      let uploadedFile = {}
      console.log("file", file.uri)
      ProgressDialog.show()

      if (file.uri) {
        try {

          uploadedFile = await HelpDeskApi.uploadHelpDeskAttachment({
            f: file.base64,
            fileName: file.fileName,
            contentType: file.type
          })
        } catch (error) {
          console.log("Error", error)
        }
      }
      console.log("uploadedFile", uploadedFile)
      const params = {
        CustomerID, ContactID: ContactID.id, ProductCategoryID, ProductID, ProductRemarks, ProblemDescription,
        SeverityID, HelpdeskCharges, RootCauseAnalysisID, sendMailToCustomer, AMCID, CustomerAddressID, IsChargeableService, TotalFreePending, TotalServiceTaken, FileName: uploadedFile.FileName || "", FilePath: uploadedFile.FilePath || "", ContentType: uploadedFile.FileContentType || "", CustomerAdditionalEmail, ProductSerialNoDetailID: ProductSerialNoDetailID || 0, TypeOfCallID,
        SerialNo, StatusID,
        AssignUserDetails: assignUser || "",
        CurrencyID, PlanVisitDate: Utils.formatDate(PlanVisitDate, "DD-MM-YYYY"),
      }

      console.log("params", params)
      HelpDeskApi.insertHelpDesk(params, () => {
        ProgressDialog.hide()

        goBack()
      }, (error) => {
        ProgressDialog.hide()
        Utils.showDangerToast(error)
      })



    }
  }


  onTextChanged = async (key, value, forEdit) => {
    console.log("key", key, value)

    this.setState({
      [key]: value
    })

    switch (key) {

      case "CustomerID": {
        if (!forEdit)
          this.setState({ ContactID: {}, CustomerAddressID: 0, AMCID: 0 })
        const contacts = await HelpDeskApi.getContactByCustomerId(value)
        const addresses = await HelpDeskApi.getCustomerAddressFromCustomerId(value)
        const amcs = await HelpDeskApi.getAMCByCustomerID(value)

        this.setState({ contacts, addresses, CustomerAddressID: !forEdit ? addresses.length ? addresses[0].id : 0 : this.state.CustomerAddressID, amcs })
      }
        break
      case "ProductCategoryID": {
        if (!forEdit)
          this.setState({ ProductID: 0 })
        const products = await HelpDeskApi.getProducts(value)
        // const addresses = await HelpDeskApi.getCustomerAddressFromCustomerId(value)

        this.setState({ products, })//ProductID: products.length ? products[0].id : 0, 

      }
        break
      case "ProductID": {
        if (!forEdit)
          this.setState({ SerialNo: "" })
        const serialNos = await HelpDeskApi.getProductSerialNoByProductIDAndAMCID(value)
        this.setState({ serialNos, })

      }
    }

  }

  verifyHelpDesk = () => {
    const { CustomerID, ContactID, ProductCategoryID, ProblemDescription, solutions } = this.state

    // console.log("solutions", solutions)
    if (Utils.isEmpty(CustomerID)) {
      Utils.showToast("Please select customer")
      return false
    }
    else if (Utils.isEmpty(ContactID)) {
      Utils.showToast("Please select Contact")
      return false
    }
    else if (Utils.isEmpty(ProductCategoryID)) {
      Utils.showToast("Please select product category")
      return false
    }
    else if (Utils.isEmpty(ProblemDescription)) {
      Utils.showToast("Please enter Problem description")
      return false
    } else if (this.item && !solutions.length) {
      Utils.showToast("Please add atleast one solution")
      return false
    }
    const AssignUserDetails = this.state.AssignUserDetails
    for (let index = 0; index < AssignUserDetails.length; index++) {
      const element = AssignUserDetails[index];

      if (element.Priority == 3 && Utils.isEmpty(element.OnHoldReason)) {
        Utils.showDangerToast(`Please enter on hold reason for ${element.name}`)
        this.setState({ selectedIndex: index })
        return false
      }
    }


    return true

  }
  updateHelpDesk = async () => {

    const { CustomerID, ContactID, file, ProductCategoryID, ProductID, ProductRemarks, ProblemDescription,
      SeverityID, HelpdeskCharges, RootCauseAnalysisID, sendMailToCustomer, AMCID, CustomerAddressID, IsChargeableService, TotalFreePending, StatusID, TotalServiceTaken, FileName, FilePath, ContentType, CustomerAdditionalEmail, ProductSerialNoDetailID, TypeOfCallID, SerialNo, AssignUserDetails, CurrencyID, PlanVisitDate, rating, ratingRemarks, completedIndex, signature } = this.state


    ProgressDialog.show()
    let uploadedFile = {}
    let signatureFile = {}
    if (file.uri) {
      try {

        uploadedFile = await HelpDeskApi.uploadHelpDeskAttachment({
          f: file.base64,
          fileName: file.fileName,
          contentType: file.type
        })
      } catch (error) {
        console.log("Error", error)
      }
    }

    if (signature.encoded) {
      try {

        signatureFile = await HelpDeskApi.uploadHelpDeskSignature({
          f: signature.encoded,
          fileName: `signature${new Date().getTime()}.jpg`,
          contentType: "image/jpg"
        })
      } catch (error) {
        console.log("Error", error)
      }
    }

    let assignUser = AssignUserDetails.map((p, index) => {

      // console.log("amount", p.amount)
      let finalSignature = {}
      if (index == completedIndex)
        finalSignature = signatureFile
      return {
        ID: p.recordId,
        UserID: p.id,
        UserName: p.name,
        UserStatusID: p.Priority,
        OnHoldReason: p.OnHoldReason,
        CompletionDateTime0: p.CompletionDateTime ? Utils.formatDate(p.CompletionDateTime, "DD-MM-YYYY") : "",
        RowStateID: p.state,
        DigiSignFileName: finalSignature?.FileName || p.DigiSignFileName || "",
        DigiSignFilePath: finalSignature?.FilePath || p.DigiSignFilePath || "",
        DigiSignContentType: finalSignature?.FileContentType || p.DigiSignContentType || "",
        DigiSignRemarks: finalSignature?.FileName ? ratingRemarks : p.DigiSignRemarks || "",
        DigiSignRating: finalSignature?.FileName ? rating : p.DigiSignRating || 0,
      }
    })

    const params = {
      helpdeskID: this.item.ID,
      CustomerID, ContactID: ContactID.id, ProductCategoryID, ProductID: ProductID || 0, ProductRemarks, ProblemDescription,
      SeverityID, HelpdeskCharges, RootCauseAnalysisID, sendMailToCustomer, AMCID, CustomerAddressID, IsChargeableService, TotalFreePending, TotalServiceTaken, FileName: uploadedFile.FileName || "", FilePath: uploadedFile.FilePath || "", ContentType: uploadedFile.FileContentType || "", CustomerAdditionalEmail, ProductSerialNoDetailID: ProductSerialNoDetailID || 0
      , TypeOfCallID,
      SerialNo, StatusID, OnHoldReason: "",
      AssignUserDetails: JSON.stringify(assignUser) || "", HelpDeskProductDetailID: 0,
      CurrencyID, PlanVisitDate: Utils.formatDate(PlanVisitDate, "DD-MM-YYYY"),
    }

    console.log("params", params)
    HelpDeskApi.updateHelpDesk(params, () => {
      ProgressDialog.hide()

      goBack()
    }, (error) => {
      ProgressDialog.hide()
      Utils.showDangerToast(error)
    })

  }
  saveSign = () => {
    this.sign?.current?.saveImage();
  }

  resetSign = () => {
    // console.log("this.sign", this.sign)
    this.sign?.current?.resetImage();
  }

  _onSaveEvent = (result) => {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    console.log(result);
    this.setState({ signature: result, showSignatureDialog: false }, () => {

      this.updateHelpDesk()
    })
  }
  _onDragEvent = () => {
    // This callback will be called when the user enters signature
    // console.log("dragged");
  }



  render() {
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => this.props.navigation.goBack(),
          },
          title: this.item ? "Update Issue" : 'Add Issue',
          hideUnderLine: true,
          light: true,
        }}>
        <HelpDeskContext.Provider value={{ ...this.state, onTextChanged: this.onTextChanged, onAddUser: this.onAddUser, onRemoveUser: this.onRemoveUser, onSelectUser: this.onSelectUser, onSolutionSaved: this.onSolutionSaved }}>

          {this.item ? <Tab.Navigator
            initialRouteName="Issue"
            backBehavior="initialRoute"
            keyboardDismissMode="auto"
            lazy
            tabBarOptions={{
              activeTintColor: 'white',
              labelStyle: { textTransform: 'none', fontSize: 15, fontFamily: FontName.regular, },
              scrollEnabled: false,
              style: { backgroundColor: Colors.secondary500 },
              showIcon: true,
              indicatorStyle: { backgroundColor: Colors.primaryColor500 },

            }}
          >
            <Tab.Screen
              name="Issue"


              options={{ title: 'Issue', tabBarIcon: ({ color }) => <Image style={{ tintColor: color, width: 16, height: 16, resizeMode: "contain" }} source={Images.ic_issue} /> }}
            >{() => <ChildViews title={"Update"} onSave={() => {

              if (this.verifyHelpDesk()) {

                const completd = this.state.isAdmin ? this.state.AssignUserDetails.findIndex((item) => item.Priority == 2 && item.state == 4 && (!item.DigiSignRating || !item.DigiSignDigiSignFileName)) : this.state.AssignUserDetails.findIndex((item) => item.id == this.props.session.user.ID && item.state == 2 && item.Priority == 4 && (!item.DigiSignRating || !item.DigiSignDigiSignFileName))

                console.log("completed", completd)
                if (completd >= 0) {
                  this.setState({
                    completedIndex: completd,
                    showRatingDialog: true
                  })
                } else {
                  this.updateHelpDesk()
                }
              }
              //  this.setState({ showSignatureDialog: true })
            }} />}</Tab.Screen>
            <Tab.Screen
              name="Solution"
              options={{ tabBarLabel: 'Solution', tabBarIcon: ({ color }) => <Image style={{ tintColor: color, width: 16, height: 16, resizeMode: "contain" }} source={Images.ic_solution} /> }}
            >{() => <Solution solutuons={this.state.solutions} item={this.item} onSolutionSaved={this.onSolutionSaved} />}</Tab.Screen>
          </Tab.Navigator> : <ChildViews onSave={this.insertHelpDesk} isAddNew={true} selectedIndex={this.state.selectedIndex} userChanged={(index) => {
            this.setState({
              selectedIndex: index
            })
          }} />}


          <Portal>
            <Dialog visible={this.state.showRatingDialog} onDismiss={() => { this.setState({ showRatingDialog: false }) }}>
              <Dialog.Title>Rating</Dialog.Title>
              <Dialog.Content>
                <View>
                  <AirbnbRating
                    count={5}
                    onFinishRating={(rating) => this.setState({ rating })}
                    showRating={false}
                    selectedColor={Colors.Orange300}
                    defaultRating={this.state.rating}
                    size={30}
                  />

                  <TextInput multiline theme={{ colors: { background: "white", primary: Colors.black } }} style={{ minHeight: 100, marginTop: 16 }} placeholder={"Enter Remarks"} onChangeText={(text) => {

                    this.onTextChanged("ratingRemarks", text)
                  }} />
                </View>
              </Dialog.Content>
              <Dialog.Actions>
                <DialogButton color={Colors.blueGray600} style={{}} onPress={() => { this.setState({ showRatingDialog: false, showSignatureDialog: true }) }}>Next</DialogButton>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog style={{ flex: 1 }} visible={this.state.showSignatureDialog} onDismiss={() => { this.setState({ showSignatureDialog: false }) }}>
              <Dialog.Title>Digital signature</Dialog.Title>
              <Dialog.Content style={{ flex: 1 }}>
                <SignatureCapture
                  style={{ flex: 1 }}
                  ref={this.sign}
                  onSaveEvent={this._onSaveEvent}
                  onDragEvent={this._onDragEvent}
                  saveImageFileInExtStorage={false}
                  showNativeButtons={false}
                  showTitleLabel={false}
                  backgroundColor="#00000010"
                  strokeColor="#000000"
                  minStrokeWidth={4}
                  maxStrokeWidth={4}
                  viewMode={"portrait"} />
              </Dialog.Content>

              <Dialog.Actions>
                <DialogButton color={Colors.blueGray600} style={{}} onPress={this.resetSign}>Reset</DialogButton>
                <DialogButton color={Colors.blueGray600} style={{}} onPress={this.saveSign}>Update</DialogButton>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </HelpDeskContext.Provider>
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.session
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddHelpDesk);
