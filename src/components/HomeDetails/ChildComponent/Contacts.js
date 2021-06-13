import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import {
  MainContainer,
} from '../../common';
import { connect } from 'react-redux';
import styles from '../styles/HelpDesk.style';
import { Images, Colors, FontName } from '../../../utils';
import { Card, Title, FAB, Searchbar } from 'react-native-paper';
import { push } from '../../../navigation/Navigator';
import SectionListContacts from 'react-native-sectionlist-contacts'


class Contacts extends Component {

  state = {
    selectedIndex: 0,
    listData: [
      { name: 'Ankit Kumar', company: "ITC's Group" },
      { name: 'Anshu Singh', company: "Aadhar housing" },
      { name: 'Andy Rob', company: "Laxmi Packaging" },
      { name: 'Benjamin Kumar', company: "ITC's Group" },
      { name: 'Baba Singh', company: "Aadhar housing" },
      { name: 'ITC Group', company: "Ankit Kumar" },
      { name: 'ITC Group', company: "Benjamin Kumar" },
      { name: 'Laxmi Packaging', company: "Andy Rob" },
      { name: 'Aadhar housing', company: "Anshu Singh" },
    ]
  };

  _renderItem = (item, index, section) => {
    return (
      <Card style={{ margin: 7, marginLeft: 15, marginRight: 25 }} key={index}>
        <View style={{ margin: 15, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 40, height: 40, borderRadius: 30, backgroundColor: this._getRandomColor(), justifyContent: 'center', marginRight: 15 }}>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '600' }}>{item.name[0]}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Title style={{ fontSize: 16 }}>{item.name}</Title>
            <Text style={{ fontSize: 12, color: Colors.grayColor, marginTop: 3 }}>{item.company}</Text>
          </View>
          <Image source={Images.ic_Call} style={{ width: 20, height: 20, marginRight: 10 }} resizeMode='center' />
        </View>
      </Card>
    )
  }

  _renderHeader = (params) => {
    return <View><Text style={{ margin: 10, marginLeft: 20, fontSize: 17, fontWeight: '600' }}>{params.key}</Text></View>
  }

  _getRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},0.75)`
  }

  render() {
    return (
      <>
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => this.props.navigation.goBack(),
          },
          title: '',
          hideUnderLine: true,
          light: true,
        }}>
        <View style={styles.MainHeaderView}>
          <SectionListContacts
            ref={s => this.sectionList = s}
            keyExtractor={(item, index) => 'key' + index}
            sectionListData={this.state.listData}
            initialNumToRender={this.state.listData.length}
            showsVerticalScrollIndicator={false}
            SectionListClickCallback={(item, index) => {
              console.log('---SectionListClickCallback--:', item, index)
            }}
            otherAlphabet="#"
            renderHeader={this._renderHeader}
            renderItem={this._renderItem}
            letterViewStyle={{
              marginRight: -5,
            }}
            letterTextStyle={{
              fontFamily: FontName.regular,
              fontSize: 14,
              marginLeft:4,
              fontWeight: '400',
              color: Colors.blue
            }}
          />
        </View>
        <FAB
          style={styles.fab}
          icon="plus"
          color={Colors.white}
          onPress={() => {
            push("AddContacts")
          }}
        />
      </MainContainer>
      <Searchbar placeholder={'Search Contact & Company'} style={{ position: 'absolute', top:10,height:40,width:'80%', marginLeft: 50, marginRight: 20, backgroundColor: 'rgba(0, 0, 0, 0.2)',  shadowColor: 'transparent' }} inputStyle={{ color:'white'}}  placeholderTextColor={'#8F9BB3'} iconColor={'#8F9BB3'}/>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
