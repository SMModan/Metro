import React, {Component} from 'react';
import {View, Text, FlatList, ScrollView, DatePicker} from 'react-native';
import {CustomPicker, FloatingEditText, MainContainer, MyFlatList, ViewWithTitle} from '../common';
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
import {Icon,Image} from 'native-base';
import CustomerApi from './Api/CustomerApi';
import { Card, Title, FAB } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';


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
          style={{flex: 1, margin: 10, marginTop:20}}
        />
        <Button
          title={strings.save}
          style={{
            margin: ResponsivePixels.size16,
            marginTop: ResponsivePixels.size70,
          }}
        />
      </View>
    </ScrollContainer>
  );
};
class AddCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
      countryList: [],
      otherInformation: [],
      isAddNewCustomer: false,
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
  onStateTextChanged = (key, value, stateName) => {
    this.setState({
      [key]: value,
      stateName,
    });
  };

  onFloatingEditTextChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };
  componentDidMount() {
    this.getAllCountries();
  }

  saveOtherInformation = () => {
    const {Location, Street, CountryID, StateID, CityName, Pincode} =
      this.state;
    let _otherInformation = this.state.otherInformation;
    let objOtherInfo = {
      ID: 0,
      CustomerID: 0,
      Location,
      Street,
      CountryID,
      StateID,
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
          {/* <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 13, width: '70%', }}>{item.CloseDate}</Text>
            <View style={{ width: 80, backgroundColor: Colors.BlueColor50, borderRadius: 5 }}>
              <Text style={{ textAlign: 'center', fontSize: 12, color: Colors.BlueColor500, margin: 3 }}>{item.OpportunityStage}</Text>
            </View>
          </View> */}

          {/* let objOtherInfo =  {"ID":0,"CustomerID":0,Location,Street,CountryID,StateID,StateName,CityName,Pincode,"AddressRowState":2} */}
          {/* <image src={require("ic_close")}/> */}
          <Title style={{fontSize: 16, marginTop: 8}}>{item.Location}</Title>
          <Text
            style={{
              fontSize: 12,
              color: Colors.darkGray,
            }}>{`${item.Street}, ${item.CityName}, ${item.Pincode} `}</Text>
          {/* <Text style={{ fontSize: 12, color: Colors.primary, fontWeight: 'bold', marginTop: 16 }}>{"item.header"}</Text> */}
          <Text
            style={{
              fontSize: 15,
              color: Colors.darkGray,
              marginTop: 4,
            }}>{`${this.state.stateName} , ${this.state.countryName}`}</Text>


        <Image source={Images.ic_close} style={{width:25,height:25,resizeMode:'contain',}} />

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
      qty
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
        {isAddNewCustomer ? (
              <ScrollContainer>
          <View style={{ backgroundColor: Colors.white, paddingHorizontal: 16 }}>
          <FloatingEditText
              label={'Location'}
              onChangeText={text => this.onFloatingEditTextChange("Location", text)}
            />
           
            <FloatingEditText
              label={'Street'}
              style={addStyles.floatEditText}
              value={Street}
              onChangeText={text => this.onFloatingEditTextChange('Street', text)}
            />
            <CustomPicker
              selectedItem={{id: countryId}}
              floaingStyle={addStyles.customEditText}
              onSelect={item => this.onTextChanged('countryId', item.id, item.name)}
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
              value={City}
              onChangeText={text => this.onFloatingEditTextChange('City', text)}
            />
            <FloatingEditText
              label={'ZipCode'}
              style={addStyles.floatEditText}
              value={ZipCode}
              onChangeText={text => this.onFloatingEditTextChange('ZipCode', text)}
            />
             <View style={{ flexDirection: "row", margin: ResponsivePixels.size16, alignItems: "center", justifyContent: "space-evenly" }}>
                    <Button onPress={()=>{this.handleAddNewCustomerOpen()}} title="Cancel" bordered style={{ width: 100, marginEnd: 8 }} />
                    <Button onPress={()=>{this.saveOtherInformation()}} title={strings.submit} style={{ flex: 1, }} />
                </View>
          </View>
          </ScrollContainer>
        ) : (
          <ChildViews
            isAddNew={true}
            {...this.props}
            countryList={countryList}
            stateList={stateList}
            handleAddNewCustomerOpen={() => {
              this.handleAddNewCustomerOpen();
            }}
            onTextChanged={(key, value) => this.onTextChanged(key, value)}
            onStateTextChanged={(key, value) =>
              this.onStateTextChanged(key, value)
            }
            onFloatingEditTextChange={(key, value) =>
              this.onFloatingEditTextChange(key, value)
            }
            otherInformation={otherInformation}
            renderCell={index => this.renderCell(index)}
            countryId={countryId}
            stateId={stateId}
            saveOtherInformation={() => {
              this.saveOtherInformation();
            }}
            Location={Location}
            City={City}
            ZipCode={ZipCode}
            Street={Street}
          />
        )}
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);
