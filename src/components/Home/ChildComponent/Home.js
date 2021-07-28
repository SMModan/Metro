import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import {
  MainContainer,
  ScrollContainer,
  Clickable,
  Button,
  EditText,
} from '../../common';
import { connect } from 'react-redux';
import styles from '../styles/Home.style';
import { strings } from '../../../language/Language';
import { Images, Colors } from '../../../utils';
import { syncAllData } from '../../../utils/SyncDataManager';
import { reset } from '../../../navigation/Navigator';


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


  componentDidMount = () => {

    console.log("this.props.session.user", this.props.session.user)
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
    return (
      index === 0 ? <View style={styles.cellStyle} key={index} /> :
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
              default:
                break;
            }
          }} style={styles.btnMain}>
            <Image source={data[index - 1].icon} style={{ marginTop: 30 }} />
            <Text style={styles.leftText}>{data[index - 1].title}</Text>
          </Clickable>
        </View>
    );
  };

  render() {
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_Menu,
            onPress: () => reset("SignIn"),
          },
          title: '',
          hideUnderLine: true,
          light: true,
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
            <FlatList
              horizontal={false}
              scrollEnabled={true}
              numColumns={3}
              data={[1, 2, 3, 4, 5, 6, 7, 8]}
              showsHorizontalScrollIndicator={false}
              renderItem={(item) => this.renderHomeCell(item)}
              keyExtractor={(item, index) => 'key' + index}
              style={{ flex: 1, margin: 10 }}
              contentContainerStyle={{ paddingVertical: 30 }}
            />
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
