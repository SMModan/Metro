import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView,Image} from 'react-native';
import { Button as DialogButton, Dialog, Portal, RadioButton } from 'react-native-paper'

import {
  MainContainer,
} from '../../common';
import { connect } from 'react-redux';
import styles from '../styles/HelpDesk.style';
import { strings } from '../../../language/Language';
import { Images, Colors } from '../../../utils';
import { Chip, Card, Title, Button, FAB } from 'react-native-paper';
import {  AirbnbRating } from 'react-native-ratings';
import ResponsivePixels from '../../../utils/ResponsivePixels';

class HelpDesk extends Component {


  state = {
    selectedIndex: 0,
    contactDialogVisible:false,
    listData: [
      {
        index: 0,
        date: "24-5-2021 • 12:32",
        status: "Open",
        header: "HEL052021-11",
        title: "Laxmi Packaging",
        description: "Megha Shah",
      },
      {
        index: 1,
        date: "24-5-2021 • 12:32",
        status: "Completed",
        header: "HEL052021-12",
        title: "Abaris Health Care Ltd.",
        description: "Rahul Vyas",
      },
      {
        index: 2,
        date: "24-5-2021 • 12:32",
        status: "On hold",
        header: "HEL052021-5",
        title: "Skyward Techno Solution",
        description: "Ramesh Jain",
      },
    ]
  };

  renderCell = ({ index }) => {
    console.log(index);
    const item = this.state.listData[index];
  
    return (
      <Card style={{ margin: 5 }} key={item.index} onPress={() => {
        this.props.navigation.push('UpdateHelpDesk')
      }}>
        <View style={{ margin: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 13, width: '70%', }}>{item.date}</Text>
            <View style={{ width: 80, backgroundColor: item.status.toLowerCase() == 'open' ? Colors.secondary100 : item.status.toLowerCase() == 'completed' ? Colors.Green100 : Colors.Orange100, borderRadius: 5 }}>
              <Text style={{ textAlign: 'center', fontSize: 12, color: item.status.toLowerCase() == 'open' ? Colors.secondary900 : item.status.toLowerCase() == 'completed' ? Colors.Green800 : Colors.Orange900, margin: 3 }}>{item.status}</Text>
            </View>
          </View>
          <Text style={{ fontSize: 12, color: Colors.primary, fontWeight: 'bold', marginTop: 8 }}>{item.header}</Text>
          <Title style={{ fontSize: 16, marginTop: 8 }}>{item.title}</Title>
          <Text style={{ fontSize: 12, color: Colors.darkGray, marginTop: 8 }}>{item.description}</Text>
          {
            item.status === 'Open' ?
              <Button labelStyle={{ fontSize: 12, color: Colors.primary, marginTop: 15, textAlign: 'left', width: '100%' }} 
              onPress={()=>{ this.setState({contactDialogVisible:true})}}
              uppercase={false}> View ratings & digital signature </Button> : null
          }
        </View>

        
       
      </Card>
    );
  };

  render() {
    const {contactDialogVisible} = this.state
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => this.props.navigation.goBack(),
          },
          title: 'Help Desk',
          hideUnderLine: true,
          light: true,
          right: [{ image: Images.ic_Search, onPress: () => this.props.navigation.push('Settings'), }],
        }}>
        <View style={styles.MainHeaderView}>
          <View style={styles.headerView}>
            <Text style={{ fontWeight: 'bold', fontSize: 13 }}>Status</Text>
            <View style={{ height: 25, width: 1, backgroundColor: Colors.secondary200, margin: 5 }} />
            <ScrollView horizontal={true}>
              {["All", "Open", "On hold", "Completed"].map((item, index) => <Chip key={index} style={{ margin: 5, backgroundColor: this.state.selectedIndex === index ? Colors.Orange500 : Colors.secondary200 }} textStyle={{ fontSize: 13, color: this.state.selectedIndex === index ? Colors.white : Colors.black }} onPress={() => { this.setState({ selectedIndex: index }) }}>{item}</Chip>)}
            </ScrollView>
          </View>
          <View style={styles.MainList}>
            <FlatList
              horizontal={false}
              scrollEnabled={true}
              data={[0, 1, 2]}
              showsHorizontalScrollIndicator={false}
              renderItem={item => this.renderCell(item)}
              keyExtractor={(item, index) => 'key' + index}
              style={{ flex: 1, margin: 10 }}
            />


<Portal>
                <Dialog visible={contactDialogVisible} onDismiss={()=>{this.setState({contactDialogVisible:false})}}>
                    <Dialog.Title> Ratting & Digital signature </Dialog.Title>
                    <Dialog.ScrollArea>
                      <Image source={Images.ic_signature} style={{width:'100%',height:'30%',resizeMode:'stretch',alignItems:'flex-start',marginTop:25}} />
                    <AirbnbRating
                      count={5}
                      defaultRating={11}
                      size={30}
                      style={{height:'30%'}}
                    />

<View style={{ width: '100%', backgroundColor: Colors.BlueColor50, borderRadius: 5 ,marginTop:20}}>
              <Text style={{ textAlign: 'center', fontSize: ResponsivePixels.size16, color: Colors.BlueColor500, margin: 3 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </Text>
            </View>
                     
                    </Dialog.ScrollArea>
                    <Dialog.Actions>
                        <DialogButton color={Colors.blueGray600} style={{}} onPress={()=>{this.setState({contactDialogVisible:false})}}>Close</DialogButton>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
          </View>
        </View>
        <FAB
          style={styles.fab}
          icon="plus"
          color={Colors.white}
          onPress={() => {
            this.props.navigation.push('AddHelpDesk')
          }}
        />
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HelpDesk);
