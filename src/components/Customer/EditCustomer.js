import React, {Component} from 'react';
import {View, Text, FlatList, ScrollView, DatePicker} from 'react-native';
import {
  CustomPicker,
  FloatingEditText,
  ImageButton,
  MainContainer,
  MyFlatList,
  ProgressDialog,
  ViewWithTitle,
} from '../common';
import {connect} from 'react-redux';
import styles from '../HomeDetails/styles/HelpDesk.style';
import addStyles from './Style/AddCustomer.style';

import {strings} from '../../language/Language';
import {Images, Utils} from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import {Button, ScrollContainer} from '../common';
import {
  CustomerInformation,
  ContactInformation,
  AddressInformation,
  AddmoreInfoDialogue,
} from './BaseComponents';
import {Icon, Image} from 'native-base';
import CustomerApi from './Api/CustomerApi';
import {Card, Title, FAB} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { goBack } from '../../navigation/Navigator';

//  JCAAGF00U916CCN

export const ChildViews = props => {
  const {
    handleAddNewCustomerOpen,
    countryList,
    countryId,
    stateId,
    onTextChanged,
    onStateTextChanged,
    stateList,
    renderCell,
    otherInformation,
    onFloatingEditTextChange,
    Location,
    City,
    ZipCode,
    Street,
    saveCustomer,
  } = props;
  return (
    <ScrollContainer>
      <View style={styles.mainView}>
        <CustomerInformation />
        <ContactInformation />
        {/* <AddressInformation onDialogueOpen={()=>onDialogueOpen}/>
         */}

        <ViewWithTitle title={strings.other_info}>
          <Button
            title="Add"
            style={addStyles.addMoreButton}
            onPress={() => {
              handleAddNewCustomerOpen();
            }}
          />
        </ViewWithTitle>

        <MyFlatList
          data={otherInformation || []}
          renderItem={item => renderCell(item)}
          style={{flex: 1, margin: 10, marginTop: 20}}
        />
        <Button
          title={strings.save}
          style={{
            margin: ResponsivePixels.size16,
            marginTop: ResponsivePixels.size70,
          }}
          onPress={saveCustomer}
        />
      </View>
    </ScrollContainer>
  );
};
class EditCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stateList: [],
      countryList: [],
      customerCategory: [],
      otherInformation: [],
      customerType: [],
      isAddNewCustomer: false,
      owenerName:'',
      phoneNumber:'',
      email:'',
      Name:'',
      customerId:0,
      TerritoryID:0,
      
    };
  }

  onTextChanged = (key, value, countryName) => {
    this.setState(
      {
        [key]: value,
        stateList: [],
        countryName,
      },
      () => {
        this.getAllState(value);
      },
    );
  };

  onTextSelection = (key, value) => {
    this.setState({
      [key]: value,
    });
  };
  onStateTextChanged = (key, value, stateName) => {
    this.setState({
      [key]: value,
      stateName,
    });
  };

  saveCustomer = () => {
    const {
      stateId,
      Name,
      owenerName,
      phoneNumber,
      email,
      customerTypeId,
      categoryId,
      otherInformation,
      TerritoryID,
      customerId
    } = this.state;
    console.log('otherInformation', otherInformation);
    let param = {
      ID: customerId,
      CustomerID: customerId,
      CustomerName: Name,
      TerritoryID: TerritoryID,
      CustomerTypeID: customerTypeId,
      IndustryID: 0,
      SourceID: 0,
      PartnerID: 0,
      CustomerDescription: '',
      PhoneNo: phoneNumber,
      EmailID: email,
      CustomerCategoryID: categoryId,
      addressList:JSON.stringify(otherInformation),
    };

    CustomerApi.AddCustomer(
      param,
      res => {
        const {IsSucceed} = res;
        if (IsSucceed) {
          Utils.showToast("Customer Updated Successfully");
          goBack()
        }
      },
      error => {
        Utils.showToast(error);
      },
    );
  };

  onFloatingEditTextChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  componentDidMount() {
    this.setState({
      customerId:this.props.route.params.item.ID
    },()=>{
      this.getCustomerBaseonId()
    })
  }


  
  getAllState = countryId => {
    console.log('<><><>countryId<><><>', countryId);
    CustomerApi.getAllStateList(
      {
        CountryID: countryId,
        StateName: '',
      },
      res => {
        const {Table} = res;
        let statebycountries = [];
        console.log('Table', Table);
        if (Table) {
          for (let index = 0; index < Table.length; index++) {
            const states = Table[index];
            let objState = {
              id: states.ID,
              name: states.StateName,
            };
            statebycountries.push(objState);
          }
          this.setState(
            {
              stateList: statebycountries,
            },
            () => {
              console.log(
                '<------------------> State list <------------------>',
                this.state.stateList,
              );
            },
          );
        }
      },
      error => {
        Utils.showToast(error);
      },
    );
  };

  saveOtherInformation = () => {
    const {Location, Street, countryId, stateId, CityName, Pincode} =
      this.state;
    let _otherInformation = this.state.otherInformation;
    let objOtherInfo = {
      ID: _otherInformation.length+1,
      CustomerID: 0,
      Location,
      Street,
      CountryID:countryId,
      StateID:stateId,
      StateName: this.state.stateName,
      CityName,
      Pincode,
      AddressRowState: 2,
    };
    _otherInformation.push(objOtherInfo);

    this.setState(
      {
        otherInformation: _otherInformation,
        isAddNewCustomer: false,
      },
      () => {
        console.log('otherInformation', this.state.otherInformation);
      },
    );
  };

  getAllState = countryId => {
    console.log('<><><>countryId<><><>', countryId);
    CustomerApi.getAllStateList(
      {
        CountryID: countryId,
        StateName: '',
      },
      res => {
        const {Table} = res;
        let statebycountries = [];
        console.log('Table', Table);
        if (Table) {
          for (let index = 0; index < Table.length; index++) {
            const states = Table[index];
            let objState = {
              id: states.ID,
              name: states.StateName,
            };
            statebycountries.push(objState);
          }
          this.setState(
            {
              stateList: statebycountries,
            },
            () => {
              console.log(
                '<------------------> State list <------------------>',
                this.state.stateList,
              );
            },
          );
        }
      },
      error => {
        Utils.showToast(error);
      },
    );
  };

  getCustomerCategory = () => {
    CustomerApi.getCustomerCategory(
      {},
      res => {
        const {Table} = res;
        let customerCategory = [];
        console.log('Table', Table);
        if (Table) {
          for (let index = 0; index < Table.length; index++) {
            const cat = Table[index];
            console.log('cat', cat);
            let objCat = {
              id: cat.ID,
              name: cat.Name,
            };
            customerCategory.push(objCat);
          }
          this.setState(
            {
              customerCategory: customerCategory,
            },
            () => {
              console.log(
                '<------------------> State list <------------------>',
                this.state.customerCategory,
              );
            },
          );
        }
      },
      error => {
        Utils.showToast(error);
      },
    );
  };

  getCustomerType = () => {
    CustomerApi.getCustomerType(
      {},
      res => {
        const {Table} = res;
        let customerType = [];
        console.log('Table', Table);
        if (Table) {
          for (let index = 0; index < Table.length; index++) {
            const _customerType = Table[index];
            let objCustomerType = {
              id: _customerType.ID,
              name: _customerType.Name,
            };
            customerType.push(objCustomerType);
          }
          this.setState(
            {
              customerType: customerType,
            },
            () => {
              console.log(
                '<------------------> State list <------------------>',
                this.state.customerType,
              );
            },
          );
        }
      },
      error => {
        Utils.showToast(error);
      },
    );
  };

  getAllCountries = () => {
    CustomerApi.getAllContriesrList(
      {},
      res => {
        const {Table} = res;
        let countries = [];
        console.log('Table', Table);
        if (Table) {
          for (let index = 0; index < Table.length; index++) {
            const country = Table[index];

            let objCountry = {
              id: country.ID,
              name: country.CountryName,
            };
            countries.push(objCountry);
          }

          this.setState(
            {
              countryList: countries,
            },
            () => {
              console.log(
                '<------------------> countryList <------------------>',
                this.state.countryList,
              );
            },
          );
        }
      },
      error => {
        Utils.showToast(error);
      },
    );
  };

  getCustomerBaseonId = () => {
    ProgressDialog.show()
    CustomerApi.getCustomerById(
      {CustomerID:this.state.customerId},
      res => {
    ProgressDialog.hide()

        const {Table,Table5} = res;
        console.log('Table =================================>>>>>>>>>>>>>>>>>>>>>>>', Table5);
        if (Table) {
         
          this.setState({
            phoneNumber:Table?.Phone,
            email:Table?.EmailID,
            Name:Table?.CustomerName,
            TerritoryID:Table?.TerritoryID,
            customerTypeId:Table?.CustomerTypeID,
            categoryId:Table?.CustomerCategoryID,
          })

          if(Table5){
            let _otherInformation =[]
            for (let index = 0; index < Table5.length; index++) {
              const otherInfo = Table5[index];
              let objOtherInfo = {
                ID: otherInfo?.ID,
                CustomerID: otherInfo?.CustomerID,
                Location:otherInfo?.Location,
                Street:otherInfo?.Street,
                CountryID:otherInfo?.CountryID,
                StateID:otherInfo?.StateID,
                StateName: otherInfo?.StateName,
                CountryName: otherInfo?.CountryName,
                CityName: "",
                Pincode:"",
                AddressRowState: 2,
              };
              _otherInformation.push(objOtherInfo)
            }
            
            this.setState({
              otherInformation:_otherInformation
            })
          }

           this.getAllCountries();
           this.getCustomerCategory();
           this.getCustomerType();
        }
      },
      error => {
    ProgressDialog.hide()
        Utils.showToast(error);
      },
    );
  };

  renderCell = ({index}) => {
    // console.log(index);
    const item = this.state.otherInformation[index];

    return (
      <Card style={{margin: 5}} key={index}>
        <View style={{margin: 15}}>
          <Title style={{fontSize: 16, marginTop: 8}}>{item.Location}</Title>
          <Text
            style={{
              fontSize: 12,
              color: Colors.darkGray,
            }}>{`${item.Street}, ${item.CityName}, ${item.Pincode} `}</Text>
          <Text
            style={{
              fontSize: 15,
              color: Colors.darkGray,
              marginTop: 4,
            }}>{`${this.state.stateName} , ${this.state.countryName}`}</Text>

          <Image
            source={Images.ic_close}
            style={{width: 25, height: 25, resizeMode: 'contain'}}
          />
        </View>
      </Card>
    );
  };

  handleAddNewCustomerOpen = () => {
    this.setState({
      isAddNewCustomer: true,
    });
  };
  handleAddNewCustomerClose = () => {
    this.setState({
      isAddNewCustomer: false,
    });
  };
  render() {
    const {
      countryList,
      stateList,
      countryId,
      stateId,
      otherInformation,
      countryName,
      stateName,
      Location,
      City,
      ZipCode,
      Street,
      isAddNewCustomer,
      qty,
      customerCategory,
      customerType,
      customerTypeId,
      categoryId,
      owenerName,
      phoneNumber,
      email,
      Name
    } = this.state;
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => this.props.navigation.goBack(),
          },
          title: 'Add Customer',
          hideUnderLine: true,
          light: true,
        }}>
        <ScrollContainer>
          {isAddNewCustomer ? (
            <View
              style={{backgroundColor: Colors.white, paddingHorizontal: 16}}>
              <FloatingEditText
                label={'Location'}
                onChangeText={text =>
                  this.onFloatingEditTextChange('Location', text)
                }
              />

              <FloatingEditText
                label={'Street'}
                style={addStyles.floatEditText}
                onChangeText={text =>
                  this.onFloatingEditTextChange('Street', text)
                }
              />
              <CustomPicker
                selectedItem={{id: countryId}}
                floaingStyle={addStyles.customEditText}
                onSelect={item =>
                  this.onTextChanged('countryId', item.id, item.name)
                }
                list={countryList}
                label={strings.countries + '*'}
                editable={false}
                rightIcon={Images.ic_down}
              />

              <CustomPicker
                selectedItem={{id: stateId}}
                floaingStyle={addStyles.customEditText}
                onSelect={item =>
                  this.onStateTextChanged('stateId', item.id, item.name)
                }
                list={stateList}
                label={strings.state}
                editable={false}
                rightIcon={Images.ic_down}
              />

              <FloatingEditText
                label={'City'}
                style={addStyles.floatEditText}
                onChangeText={text =>
                  this.onFloatingEditTextChange('City', text)
                }
              />
              <FloatingEditText
                label={'ZipCode'}
                style={addStyles.floatEditText}
                onChangeText={text =>
                  this.onFloatingEditTextChange('ZipCode', text)
                }
              />
              <View
                style={{
                  flexDirection: 'row',
                  margin: ResponsivePixels.size16,
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <Button
                  onPress={() => {
                    this.handleAddNewCustomerOpen();
                  }}
                  title="Cancel"
                  bordered
                  style={{width: 100, marginEnd: 8}}
                />
                <Button
                  onPress={() => {
                    this.saveOtherInformation();
                  }}
                  title={strings.submit}
                  style={{flex: 1}}
                />
              </View>
            </View>
          ) : (
       
            <View style={styles.mainView}>
              <ViewWithTitle title="Customer Information">
                <FloatingEditText
                  label={'Name'}
                  onChangeText={text =>
                    this.onFloatingEditTextChange('Name', text)
                  }
                value={Name}
                />

                <CustomPicker
                  selectedItem={{id: categoryId}}
                  floaingStyle={addStyles.customEditText}
                  onSelect={item => {
                    this.onTextSelection('categoryId', item.id);
                    this.onTextSelection('categoryName', item.name);
                  }}
                  list={customerCategory}
                  label="Customer Category"
                  editable={false}
                  rightIcon={Images.ic_down}
                />

                <CustomPicker
                  selectedItem={{id: customerTypeId}}
                  floaingStyle={addStyles.customEditText}
                  onSelect={item => {
                    this.onTextSelection('customerTypeId', item.id);
                    this.onTextSelection('customerTypeName', item.name);
                  }}
                  list={customerType}
                  label="Customer Type"
                  editable={false}
                  rightIcon={Images.ic_down}
                />
              </ViewWithTitle>

              <ViewWithTitle title="Contact Information">
                {/* <FloatingEditText
                  label={'Owner Name'}
                  onChangeText={text =>
                    this.onFloatingEditTextChange('owenerName', text)
                  }
                value={owenerName}
                /> */}
                <FloatingEditText
                  label={'Phone Number'}
                  onChangeText={text =>
                    this.onFloatingEditTextChange('phoneNumber', text)
                  }
                value={phoneNumber}

                />
                <FloatingEditText
                  label={'Email'}
                  onChangeText={text =>
                    this.onFloatingEditTextChange('email', text)
                  }
                value={email}

                />
              </ViewWithTitle>

              <ViewWithTitle title={strings.other_info}>
                <Button
                  title="Add"
                  style={addStyles.addMoreButton}
                  onPress={() => {
                    this.handleAddNewCustomerOpen();
                  }}
                />
              </ViewWithTitle>

              {/* <MyFlatList
              data={otherInformation || []}
              renderItem={item => this.renderCell(item)}
              style={{flex: 1, margin: 10, marginTop:20}}
            /> */}

              <View style={{flex: 1, margin: 10, marginTop: 20}}>
                {otherInformation.length != 0 &&
                  otherInformation.map((item, index) => {
                    return (
                      <Card style={{margin: 5}} key={index}>

                        <View style={{margin: 15}}>
                        <View
                          style={{
                            flex: 1,
                          }}
                        >
                          <Title style={{fontSize: 16, marginTop: 8}}>
                            {item?.Location}
                          </Title>
                          <Text
                            style={{
                              fontSize: 12,
                              color: Colors.darkGray,
                            }}>{`${item?.Street}, ${item?.CityName}, ${item?.Pincode} `}</Text>
                          <Text
                            style={{
                              fontSize: 15,
                              color: Colors.darkGray,
                              marginTop: 4,
                            }}>{`${item?.StateName} , ${item?.CountryName}`}</Text>

                          {/* <Image source={Images.ic_close} style={{width:25,height:25,resizeMode:'contain'}} /> */}
                        </View>
                        <View
        style={{
          position: 'absolute',
          right: 5,
          top: 5,
          backgroundColor: 'transparent',
        }}
      >
                        <ImageButton
                            source={Images.ic_close}
                            imageStyle={{width:ResponsivePixels.size20,
                            height:ResponsivePixels.size20}}
                            onPress={() => {

                              let otherInformation = this.state.otherInformation 
                              // console.log('NewArray ',newArray);
                              // otherInformation=  otherInformation.splice(_.indexOf(otherInformation, _.findWhere(otherInformation, { CustomerID : item.CustomerID})), 1);

                              var index = otherInformation.findIndex(function(o){
                                return o.ID === item.ID;
                              })
                              if (index !== -1) otherInformation.splice(index, 1);

                              this.setState({
                                otherInformation:otherInformation
                              })
                            }}
                          />
                          </View>
                        </View>
                      
                      </Card>
                    );
                  })}
              </View>
              <Button
                title={strings.update}
                style={{
                  margin: ResponsivePixels.size16,
                  marginTop: ResponsivePixels.size70,
                }}
                onPress={() => this.saveCustomer()}
              />
            </View>
          )}
        </ScrollContainer>
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomer);
