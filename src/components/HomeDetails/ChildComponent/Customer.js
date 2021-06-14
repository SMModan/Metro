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


class Customer extends Component {

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
      <Card style={{ margin: 7, marginLeft: 15, marginRight: 25 ,padding:10}} key={index}>
         <View style={{flexDirection:'row'}}>
         <Title style={{ fontSize: 16 ,width:'50%'}}>{item.company}</Title>
         <View style={{backgroundColor:'#F1F5FB',borderRadius:5, width:'50%',textAlign:'center',justifyContent:'center',paddingLeft:5}}>
        <Text style={{ textAlign: 'left', fontSize: 15,color:'$687799',margin:2}}>Customer Category</Text>
        </View>
         </View>
         <Title style={{ fontSize: 12,color:'#485780' }}>Megha Shah</Title>
         <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop:5
        }}>
                <Image source={Images.ic_Call} style={{width:15,height:15,resizeMode:'contain',}} />

            <Text style={{
                    fontSize: 15,
                    color: "black",
                    marginLeft:10,
                    color:'#485780'
                }}>9725499721</Text>
        </View>

        <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop:10
        }}>
                <Image source={Images.ic_Email} style={{width:15,height:15,resizeMode:'contain',}} />

            <Text style={{
                    fontSize: 15,
                    color: "black",
                    marginLeft:10,
                    color:'#485780'
                }}>shahilce@gmail.com</Text>
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
            push("AddCustomer")
          }}
        />
      </MainContainer>
      <Searchbar placeholder={'Search Customer'} style={{ position: 'absolute', top:10,height:40,width:'80%', marginLeft: 50, marginRight: 20, backgroundColor: 'rgba(0, 0, 0, 0.2)',  shadowColor: 'transparent' }} inputStyle={{ color:'white'}}  placeholderTextColor={'#8F9BB3'} iconColor={'#8F9BB3'}/>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
