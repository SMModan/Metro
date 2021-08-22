import React, {Component} from 'react';
import {View, Text, FlatList, ScrollView, DatePicker} from 'react-native';
import {
  CustomPicker,
  FloatingEditText,
  ImageButton,
  MainContainer,
  MyFlatList,
  ViewWithTitle,
} from '../common';
import {connect} from 'react-redux';
import styles from '../HomeDetails/styles/HelpDesk.style';
import addStyles from '../Customer/Style/AddCustomer.style';

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
import {goBack} from '../../navigation/Navigator';

//  JCAAGF00U916CCN


class AddCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stateList: [],
      countryList: [],
      customerCategory: [],
      otherInformation: [],
      customerType: [],
      isAddNewCustomer: false,
      owenerName: '',
      phoneNumber: '',
      email: '',
      Name: '',
      isFromEdit:false
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
  onStateTextChanged = (key, value, StateName) => {
    this.setState({
      [key]: value,
      StateName,
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
    } = this.state;
    let param = {
      CustomerID: 0,
      CustomerName: Name,
      TerritoryID: 0,
      CustomerTypeID: customerTypeId,
      IndustryID: 0,
      SourceID: 0,
      PartnerID: 0,
      CustomerDescription: '',
      PhoneNo: phoneNumber,
      EmailID: email,
      CustomerCategoryID: categoryId,
      addressList: JSON.stringify(otherInformation),
    };

    CustomerApi.AddCustomer(
      param,
      res => {
        const {IsSucceed} = res;

        if (IsSucceed) {
          Utils.showToast('Customer Added Successfully');
          goBack();
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
    this.getAllCountries();
    this.getCustomerCategory();
    this.getCustomerType();
  }

  saveOtherInformation = () => {
    const {Location, Street, countryId,countryName,StateName, stateId, CityName, Pincode,isFromEdit,otherInformation,_ID} =
      this.state;
      let _otherInformation = otherInformation;
    if(isFromEdit){
      var index = otherInformation.findIndex(
        function (o) {
          return o._ID === _ID;
        },
      );
      if (index !== -1){
     
        let objOtherInfo = {
          ID: 0,
          CustomerID: 0,
          _ID: _ID,
          Location,
          Street,
          CountryID: countryId,
          countryName:countryName,
          StateID: stateId,
          StateName: StateName,
          CityName,
          Pincode,
          AddressRowState: 2,
        };

        _otherInformation[index]=objOtherInfo

        this.setState(
          {
            otherInformation: _otherInformation,
            isAddNewCustomer: false,
          },
          () => {
            console.log('otherInformation', this.state.otherInformation);
          },
        );
      }

    }else{
      let objOtherInfo = {
        ID: 0,
        CustomerID: 0,
        _ID: _otherInformation.length + 1,
        Location,
        Street,
        CountryID: countryId,
        countryName:countryName,
        StateID: stateId,
        StateName: StateName,
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
    }
  };

  getAllState = countryId => {
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
      CityName,
      Pincode,
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
      Name,
      isFromEdit
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
                value={Location}
              />

              <FloatingEditText
                label={'Street'}
                style={addStyles.floatEditText}
                onChangeText={text =>
                  this.onFloatingEditTextChange('Street', text)
                }
                value={Street}
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
                  this.onFloatingEditTextChange('CityName', text)
                }
                value={CityName}

              />
              <FloatingEditText
                label={'ZipCode'}
                style={addStyles.floatEditText}
                onChangeText={text =>
                  this.onFloatingEditTextChange('Pincode', text)
                }
                value={Pincode}

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
                    this.handleAddNewCustomerClose();
                  }}
                  title="Cancel"
                  bordered
                  style={{width: 100, marginEnd: 8}}
                />
                <Button
                  onPress={() => {
                    this.saveOtherInformation();
                  }}
                  title={isFromEdit?(strings.update):(strings.submit)}
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
                <FloatingEditText
                  label={'Owner Name'}
                  onChangeText={text =>
                    this.onFloatingEditTextChange('owenerName', text)
                  }
                  value={owenerName}
                />
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

         

              <View style={{flex: 1, margin: 10, marginTop: 20}}>
                {otherInformation.length != 0 &&
                  otherInformation.map((item, index) => {
                    console.log("item ==>",item)

                    return (
                      <Card style={{margin: ResponsivePixels.size5,padding:ResponsivePixels.size5}} key={index}>
                        <View >
                          <View
                            style={{
                              flex: 1,
                            }}>
                            <Title style={{fontSize: 16, marginTop: 8}}>
                              {item.Location}
                            </Title>
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
                              }}>{`${item.StateName} , ${item.countryName}`}</Text>

                            {/* <Image source={Images.ic_close} style={{width:25,height:25,resizeMode:'contain'}} /> */}
                          </View>
                          <View
                            style={{
                              position: 'absolute',
                              right: 5,
                              top: 5,
                              flexDirection:"row",
                              flex:2,
                              width:ResponsivePixels.size60,
                              backgroundColor: 'transparent',
                            }}>
                     

                            <ImageButton
                              source={Images.edit_icon}
                              imageStyle={{
                                width: ResponsivePixels.size30,
                                marginEnd:ResponsivePixels.size15,
                                height: ResponsivePixels.size30,
                              }}
                              onPress={() => {
                                let otherInformation =
                                  this.state.otherInformation;
                                var index = otherInformation.findIndex(
                                  function (o) {
                                    return o._ID === item._ID;
                                  },
                                );
                                if (index !== -1){
                                   const item = otherInformation[index] 
                                  this.setState({
                                   isFromEdit:true,
                                   isAddNewCustomer:true,
                                   ID:item.ID,
                                   _ID:item._ID,
                                   CustomerID:item.CustomerID,
                                   Location:item.Location,
                                   Street:item.Street,
                                   countryId:item.CountryID,
                                   stateId:item.StateID,
                                   CityName:item.CityName,
                                   Pincode:item.Pincode,
                                   AddressRowState: 2,
                                  });
                                }
                              }}
                            />

<ImageButton
                              source={Images.ic_close}
                              imageStyle={{
                                width: ResponsivePixels.size15,
                                height: ResponsivePixels.size15,
                                flex:1,
                                justifyContent:"flex-end",
                                alignItems:"center",
                                
                              }}
                              onPress={() => {
                                let otherInformation =
                                  this.state.otherInformation;
                                var index = otherInformation.findIndex(
                                  function (o) {
                                    return o._ID === item._ID;
                                  },
                                );
                                if (index !== -1)
                                  otherInformation.splice(index, 1);

                                this.setState({
                                  otherInformation: otherInformation,
                                });
                              }}
                            />

                          </View>
                        </View>
                      </Card>
                    );
                  })}
              </View>
              <Button
                title={strings.save}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);
