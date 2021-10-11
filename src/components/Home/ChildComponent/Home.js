import React, { Component } from 'react';
import { View, Text, FlatList, Image, Platform } from 'react-native';
import {
  MainContainer,
  ScrollContainer,
  Clickable,
  Button,
  EditText,
  ProgressDialog,
  ProgressView,
} from '../../common';
import { connect } from 'react-redux';
import styles from '../styles/Home.style';
import { strings } from '../../../language/Language';
import { Images, Colors, Utils } from '../../../utils';
import { syncAllData } from '../../../utils/SyncDataManager';
import { reset } from '../../../navigation/Navigator';
import { Alert } from 'react-native';
import { store } from '../../../App';
import { setSessionField } from '../../../reducers/SessionReducer';
import loginApi from '../../Login/apis/LoginApis';


const data = [
  {
    icon: Images.ic_Person,
    title: "Customer"
  },
  {
    icon: Images.ic_Contacts,
    title: "Contacts"
  },
  {
    icon: Images.ic_Opportunities,
    title: "Opportunities"
  },
  {
    icon: Images.ic_Tasks,
    title: "Tasks"
  },
  {
    icon: Images.ic_Appointment,
    title: "Appointment"
  },
  {
    icon: Images.ic_HelpDesk,
    title: "Help Desk"
  },
  {
    icon: Images.ic_Quotation,
    title: "Quotation"
  },
];

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      checkinout: true,
      customer: true,
      contact: true,
      opportunity: true,
      task: true,
      helpDesk: true,
      quotation: true,
      data: [],
      loading: true
    }
  }




  permissionApi = (userId) => {
    const params = {
      UserID: userId,
    };
    // ProgressDialog.show();

    loginApi.PermissionApi(
      params,
      res => {
        if (res) {

          const table = res.Table
          for (let index = 0; index < table.length; index++) {
            const permission = table[index];
            const programName = permission.ProgramName
            const showIcon = permission.ShowIcon

            console.log("<============================ programName ============================>", programName)

            if (programName == "Check In/Out") {
              console.log("<============================ Res ============================>", showIcon)

              store.dispatch(setSessionField("checkinout", showIcon));
            } else if (programName == "Mark In - Out") {
              console.log("<============================ Res ============================>", showIcon)

              store.dispatch(setSessionField("markinout", showIcon));
            } else if (programName == "Trip In - Out") {
              console.log("<============================ Res ============================>", showIcon)

              store.dispatch(setSessionField("tripinout", showIcon));
            } else if (programName == "Customer") {
              console.log("<============================ Res ============================>", showIcon)
              // customer = showIcon
              store.dispatch(setSessionField("customer", showIcon));
            } else if (programName == "Contact") {
              console.log("<============================ Res ============================>", showIcon)
              // contact = showIcon
              store.dispatch(setSessionField("contact", showIcon));
            } else if (programName == "Opportunity") {
              console.log("<============================ Res ============================>", showIcon)
              // opportunity=showIcon
              store.dispatch(setSessionField("opportunity", showIcon));
            } else if (programName == "Task Activity") {
              console.log("<============================ Res ============================>", showIcon)
              //  task = showIcon
              store.dispatch(setSessionField("task", showIcon));
            } else if (programName == "Appointment Activity") {
              console.log("<============================ Res ============================>", showIcon)
              // appointment=showIcon
              store.dispatch(setSessionField("appointment", showIcon));
            } else if (programName == "HelpDesk") {
              console.log("<============================ Res ============================>", showIcon)
              // helpDesk=showIcon
              store.dispatch(setSessionField("helpDesk", showIcon));
            } else if (programName == "Quotation") {
              console.log("<============================ Res ============================>", showIcon)
              const canExport = permission.CanExport
              // quotation=showIcon
              store.dispatch(setSessionField("quotation", showIcon));
              store.dispatch(setSessionField("quotationCanExport", canExport));
            }
          }
          store.dispatch(setSessionField("isPermissionSet", true));


          let checkinout = this.props.session.checkinout
          let customer = this.props.session.customer
          let contact = this.props.session.contact
          let opportunity = this.props.session.opportunity
          let task = this.props.session.task
          let appointment = this.props.session.appointment
          let helpDesk = this.props.session.helpDesk
          let quotation = this.props.session.quotation

          const data = [
            {
              icon: Images.ic_Person,
              title: "Customer",
              isVisible: customer
            },
            {
              icon: Images.ic_Contacts,
              title: "Contacts",
              isVisible: contact
            },
            {
              icon: Images.ic_Opportunities,
              title: "Opportunities",
              isVisible: opportunity
            },
            {
              icon: Images.ic_Tasks,
              title: "Tasks",
              isVisible: task
            },
            {
              icon: Images.ic_Appointment,
              title: "Appointment",
              isVisible: appointment
            },
            {
              icon: Images.ic_HelpDesk,
              title: "Help Desk",
              isVisible: helpDesk
            },
            {
              icon: Images.ic_Quotation,
              title: "Quotation",
              isVisible: quotation
            },
          ];


          this.setState({
            data
          })
          // ProgressDialog.hide();

        }

        this.setState({
          loading: false
        })

      },
      error => {
        // ProgressDialog.hide();
        this.setState({
          loading: false
        })
        Utils.showToast(error);
      },
    );
  }






  componentDidMount = () => {

    setTimeout(() => this.loadPermissions(), 300)
  }

  loadPermissions = () => {
    const user = this.props.session.user
    const userId = user.ID

    const deviceTokenFCM = store.getState().session.deviceToken;


    const isDeviceIdSet = this.props.session.isDeviceIdSet

    if (!isDeviceIdSet) {
      loginApi.setDeviceToken(
        { DeviceToken: deviceTokenFCM, DeviceType: Platform.select({ android: "A", ios: "I" }) },
        res => {
          if (res) {
            store.dispatch(setSessionField('isDeviceIdSet', true));

            ProgressDialog.hide();

          } else
            ProgressDialog.hide();

        },
        error => {
          ProgressDialog.hide();
          Utils.showToast(error);
        },
      );

    }

    const isPermissionSet = this.props.session.isPermissionSet

    if (!isPermissionSet) {
      this.permissionApi(userId)
    } else {
      let checkinout = this.props.session.checkinout
      let customer = this.props.session.customer
      let contact = this.props.session.contact
      let opportunity = this.props.session.opportunity
      let task = this.props.session.task
      let appointment = this.props.session.appointment
      let helpDesk = this.props.session.helpDesk
      let quotation = this.props.session.quotation

      const data = [
        {
          icon: Images.ic_Person,
          title: "Customer",
          isVisible: customer
        },
        {
          icon: Images.ic_Contacts,
          title: "Contacts",
          isVisible: contact
        },
        {
          icon: Images.ic_Opportunities,
          title: "Opportunities",
          isVisible: opportunity
        },
        {
          icon: Images.ic_Tasks,
          title: "Tasks",
          isVisible: task
        },
        {
          icon: Images.ic_Appointment,
          title: "Appointment",
          isVisible: appointment
        },
        {
          icon: Images.ic_HelpDesk,
          title: "Help Desk",
          isVisible: helpDesk
        },
        {
          icon: Images.ic_Quotation,
          title: "Quotation",
          isVisible: quotation
        },
      ];


      this.setState({
        data, loading: false
      })
    }
  }

  renderHomeList = ({ index }) => {
    return (
      <View style={styles.listMain}>
        <Clickable onPress={() => this.props.navigation.push('HomeDetail')} style={styles.btnMain}>
          <View style={styles.ContainView}>
            <View style={styles.ImageView}>
              <Image style={{ resizeMode: 'contain', width: "100%" }} source={Images.ListImage} />
            </View>
            <View style={styles.infoView}>
              <View style={styles.dateView}>
                <Text style={styles.dateValue}>{strings.DateText}</Text>
                <Text style={styles.monthValue}>{strings.DateMonth}</Text>
              </View>
              <View style={styles.titleView}>
                <Text style={styles.mainText}>{strings.MainListTitle}</Text>
                <Text style={styles.AddressTextValue}>
                  {strings.AddressText}
                </Text>
              </View>
            </View>
            <View style={styles.btnView}>
              <Clickable style={styles.btnLeft}>
                <Image source={Images.ic_MapPInBlackIcon} />
                <Text style={styles.leftText}>{strings.ChechIn}</Text>
              </Clickable>
              <Clickable onPress={() => this.props.navigation.push('TeamList')} style={styles.btnRight}>
                <Image source={Images.ic_GroupBlackIcon} />
                <Text style={styles.leftText}>{strings.TeamText}</Text>
              </Clickable>
            </View>
          </View>
        </Clickable>
      </View>
    );
  };



  renderHomeCell = ({ index }) => {
    const { data } = this.state
    // console.log("data ======>", data)
    let isVisible
    if (index != 0) {
      isVisible = data[index - 1].isVisible
    }
    return (
      index === 0 ? <View style={styles.cellStyle} key={index} /> : isVisible ?
        <View style={styles.cellStyle} key={index}>
          <Clickable onPress={() => {
            switch (index) {
              case 1:
                this.props.navigation.push('Customer')
                break;
              case 2:
                this.props.navigation.push('Contacts')
                break;

              case 3:
                this.props.navigation.push('Opportunity')
                break;
              case 4:
                this.props.navigation.push('Tasks')
                break;
              case 5:
                this.props.navigation.push('Appointments')
                break;

              case 6:
                this.props.navigation.push('HelpDesk')
                break;
              case 7:
                this.props.navigation.push('Quotation')
                break;
              default:
                break;
            }
          }} style={styles.btnMain}>
            <Image source={data[index - 1].icon} style={{ marginTop: 30 }} />
            <Text style={styles.leftText}>{data[index - 1].title}</Text>
          </Clickable>
        </View> : null
    );
  };

  handleSignOut = () => {
    Alert.alert(
      'Skyward CRM',
      'Are you sure you want to logout?', [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'Yes',
        onPress: () => {
          this.logoutApiCall()
        }
      },], {
      cancelable: false
    }
    )
    return true;
  }


  logoutApiCall = () => {

    // store.dispatch(setSessionField('user', {}));
    // store.dispatch(setSessionField('is_logged_in', false));
    // store.dispatch(setSessionField('isDeviceIdSet', false));
    // store.dispatch(setSessionField('isPermissionSet', false));
    // reset("SignIn")

    const params = {
      DeviceToken: this.props.session.deviceToken, DeviceType: Platform.select({ android: "A", ios: "I" })
    };
    ProgressDialog.show();
    loginApi.LogoutApi(
      params,
      res => {
        ProgressDialog.hide();
        if (res) {
          store.dispatch(setSessionField('user', {}));
          store.dispatch(setSessionField('is_logged_in', false));
          store.dispatch(setSessionField('isDeviceIdSet', false));
          store.dispatch(setSessionField('isPermissionSet', false));
          store.dispatch(setSessionField('connectionString', ""));
          store.dispatch(setSessionField('token', ""));
          reset("SignIn")
        }
      },
      error => {
        ProgressDialog.hide();
        Utils.showToast(error);
      },
    );
  }
  render() {
    const { data, loading } = this.state
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_Menu,
            onPress: () => {
              // this.handleSignOut()
              this.props.navigation.openDrawer()
            },
          },
          title: '',
          hideUnderLine: true,
          light: true,
          isHome: true,
          right: [{
            image: Images.ic_Refresh, onPress: () => syncAllData(false)
            ,
          }],
        }}>
        <View style={styles.MainHeaderView}>
          <View style={styles.headerView}>
            <Text style={styles.firstTitle}>Hi {this.props.session.user.FirstName || ""}</Text>
          </View>
          <View style={styles.MainList}>
            {loading ? <ProgressView /> : data.length != 0 && <FlatList
              horizontal={false}
              scrollEnabled={true}
              numColumns={3}
              data={[1, 2, 3, 4, 5, 6, 7, 8]}
              showsHorizontalScrollIndicator={false}
              renderItem={(item) => this.renderHomeCell(item)}
              keyExtractor={(item, index) => 'key' + index}
              style={{ flex: 1, margin: 10 }}
              contentContainerStyle={{ paddingVertical: 30 }}
            />}

          </View>
        </View>
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.session
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
