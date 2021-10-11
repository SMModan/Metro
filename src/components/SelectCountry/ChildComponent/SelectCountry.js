import _ from 'lodash';
import React, { Component } from 'react';
import { Image, Platform, Text, View } from 'react-native';
import { connect } from 'react-redux';
import session from 'redux-persist/lib/storage/session';
import { store } from '../../../App';
import { strings } from '../../../language/Language';
import { push, reset } from '../../../navigation/Navigator';
import { setSessionField } from '../../../reducers/SessionReducer';
import { Colors, Images } from '../../../utils';
import Utils from '../../../utils/Utils';
import {
  Button,
  ChipViewContainer,
  CustomPicker,
  FloatingEditText,
  MainContainer,
  ProgressDialog,
  ScrollContainer
} from '../../common';
import styles from '../styles/SelectCountry.style';

//Meghait22@gmail.com
// skyw@rd

// ","","",""
class SelectCountry extends Component {
  state = {
    couontryList: [
      {
        id:1,
        name:"India"
      },
      {
        id:2,
        name:"Philippines"
      },
      {
        id:3,
        name:"South Africa"
      }, {
        id:4,
        name:"Thailand"
      }
    ],
    companyId: '',
  };

  async componentDidMount() {
    // createDefaultTables();
  }




  render() {
    const {couontryList,countryId} = this.state
    return (
      <MainContainer
        header={{ hideUnderLine: true,
          isHome: true,
           backgroundColor: Colors.white }}
        >
       <ScrollContainer>
          {/* <ProgressDialog visible={true} /> */}
          <View style={styles.ContainerView}>
            <Image source={Images.ic_Logo} style={styles.logo}/>
            <View style={styles.ContainView}>

              <View style={styles.topView}>
                <Text style={styles.loginTitle}>{strings.countryTitle}</Text>
                <Text style={styles.loginDesc}>{strings.countryDescription}</Text>

              <View style={styles.countryRegion}>
                 
              <ChipViewContainer 
                selectedChip={{ id: countryId }} onSelect={(item) => {
                  push("SignIn")
                 this.setState({
                  countryId: item.id
                 })
                }} title="Choose Region" chips={couontryList||[]} />

              </View>
              </View>
           

              
            </View>
          </View>
        </ScrollContainer>
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SelectCountry);