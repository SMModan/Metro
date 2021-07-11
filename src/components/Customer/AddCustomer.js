import React, {Component} from 'react';
import {View, Text, FlatList, ScrollView, DatePicker} from 'react-native';
import {MainContainer, MyFlatList, ViewWithTitle} from '../common';
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
import {Icon} from 'native-base';
import CustomerApi from './Api/CustomerApi';

//  JCAAGF00U916CCN

export const ChildViews = props => {
  const {
    isVisible,
    onDialogueOpen,
    onDialogueDismiss,
    countryList,
    countryId,
    stateId,
    onTextChanged,
    onStateTextChanged,
    stateList,
    renderCell,
    otherInformation,
    onFloatingEditTextChange,
    Location,City,ZipCode,Street
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
              onDialogueOpen();
            }}
          />
        </ViewWithTitle>
      

<MyFlatList
              data={otherInformation||[]}
              renderItem={item => renderCell(item)}
              style={{ flex: 1, margin: 10 }}
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
      isVisible: true,
      countryList: [],
      otherInformation:[]
    };
  }
  onDialogueDismiss = () => {
    this.setState({isVisible: false});
  };
  onDialogueOpen = () => {
    this.setState({
      isVisible: true,
    });
  };
  onTextChanged = (key, value,countryName) => {
    this.setState(
      {
        [key]: value,
        stateList: [],
        countryName
      },
      () => {
        this.getAllState(value);
      },
    );
  };
  onStateTextChanged = (key, value,stateName) => {
    this.setState({
      [key]: value,
      stateName
    });
  };

  onFloatingEditTextChange=(key, value)=>{
    this.setState({
      [key]: value,
    });
  }
  componentDidMount() {
    this.getAllCountries();
  }


  saveOtherInformation=()=>{
    alert("testing...")
    const {Location,Street,CountryID,StateID,CityName,Pincode} = this.state
    let _otherInformation= this.state.otherInformation
  let objOtherInfo =  {"ID":0,"CustomerID":0,Location,Street,CountryID,StateID,StateName:this.state.stateName,CityName,Pincode,"AddressRowState":2}
  _otherInformation.push(objOtherInfo)

  this.setState({
    otherInformation:_otherInformation,
    isVisible: false
  },()=>{
    console.log("otherInformation",this.state.otherInformation)
  })
  }

  getAllState = countryId => {
    console.log('<><><>countryId<><><>', countryId);
    CustomerApi.getAllStateList(
      {
        CountryID: 99,
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

  renderCell = ({ index }) => {
    // console.log(index);

    const item = this.state.otherInformation[index];

    return (
      <Card  style={{ margin: 5 }} key={index}>
        <View style={{ margin: 15 }}>
          {/* <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 13, width: '70%', }}>{item.CloseDate}</Text>
            <View style={{ width: 80, backgroundColor: Colors.BlueColor50, borderRadius: 5 }}>
              <Text style={{ textAlign: 'center', fontSize: 12, color: Colors.BlueColor500, margin: 3 }}>{item.OpportunityStage}</Text>
            </View>
          </View> */}

  {/* let objOtherInfo =  {"ID":0,"CustomerID":0,Location,Street,CountryID,StateID,StateName,CityName,Pincode,"AddressRowState":2} */}

          <Title style={{ fontSize: 16, marginTop: 8 }}>{item.Location}</Title>
          <Text style={{ fontSize: 12, color: Colors.darkGray, }}>{`${item.Street}, ${item.CityName}, ${item.Pincode} `}</Text>
          {/* <Text style={{ fontSize: 12, color: Colors.primary, fontWeight: 'bold', marginTop: 16 }}>{"item.header"}</Text> */}
          <Text style={{ fontSize: 15, color: Colors.darkGray, marginTop: 4 }}>{`${this.state.stateName} , ${this.state.countryName}`}</Text>
        </View>
      </Card>
    );
  };

  render() {
    const {isVisible, countryList, stateList, countryId, stateId,otherInformation
    ,countryName,stateName,Location,City,ZipCode,Street} = this.state;
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

<AddmoreInfoDialogue
          isVisible={isVisible}
          stateList={stateList}
          countryList={countryList}
          countryId={countryId}
          onTextChanged={(key, value,countryName) => this.onTextChanged(key, value,countryName)}
          onStateTextChanged={(key, value,stateName) => this.onStateTextChanged(key, value,stateName)}
          onFloatingEditTextChange={(key, value) => this.onFloatingEditTextChange(key, value)}
          stateId={stateId}
          Location={Location}
          City={City}
          ZipCode={ZipCode}
          Street={Street}
        />

        <ChildViews
          isAddNew={true}
          {...this.props}
          countryList={countryList}
          stateList={stateList}
          isVisible={isVisible}
          onTextChanged={(key, value) => this.onTextChanged(key, value)}
          onStateTextChanged={(key, value) =>
            this.onStateTextChanged(key, value)
          }
          onFloatingEditTextChange={(key, value) =>
            this.onFloatingEditTextChange(key, value)
          }
          otherInformation={otherInformation}
          onDialogueDismiss={() => {
            this.onDialogueDismiss();
          }}
          renderCell={(index)=>this.renderCell(index)}
          onDialogueOpen={() => this.onDialogueOpen()}
          countryId={countryId}
          stateId={stateId}
          saveOtherInformation={()=>{this.saveOtherInformation()}}
          Location={Location}
          City={City}
          ZipCode={ZipCode}
          Street={Street}
        />
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);
