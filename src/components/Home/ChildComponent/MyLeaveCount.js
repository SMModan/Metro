import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Images } from '../../../utils';
import {
  MainContainer, ProgressDialog
} from '../../common';
import HomeApis from '../apis/HomeApis';
import styles from '../styles/Home.style';

class MyLeaveCount extends Component {


  state = {
    LeaveName: "",
    Balance: 0,
  };



componentDidMount() {
  this.GetLeaveBalanceByEmployeeID()
}


  
GetLeaveBalanceByEmployeeID = () => {
  // const {announcementType} = this.state;

  ProgressDialog.show();
  HomeApis.GetLeaveBalanceByEmployeeID(
    {},
    res => {
      ProgressDialog.hide();
      if (res) {
        const {Table} = res;
        console.log('Table  ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>', Table);


        // {"Balance": 17, "EmployeeName": "Harshil  Thaker", "ID": 1, "LeaveName": "Annual Leaves"}



         if (Table) {
          this.setState({
            Balance:Table?.Balance,
            LeaveName:Table?.LeaveName,
          })
         }
      }
    },
    () => {
      ProgressDialog.hide();
    },
  );
};


  render() {
    const {LeaveName,Balance} = this.state
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_Menu,
            onPress: () => {
              this.props.navigation.openDrawer();
            },
          },
          title: 'My Leave Count',
          hideUnderLine: true,
          light: true,
          isHome:true
        }}>
        <View style={styles.MainHeaderView}>
          <View style={{alignItems:'center', marginTop: '50%'}}>
            {LeaveName ?<Text style={styles.firstTitle}>{LeaveName} : {Balance}</Text>:null}
            
          </View>
        </View>
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyLeaveCount);
