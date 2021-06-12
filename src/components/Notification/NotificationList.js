import React, { Component } from 'react';
import { FlatList, Text, View,Image } from 'react-native';
import { Button, Card, Title } from 'react-native-paper';
import { connect } from 'react-redux';
import { Colors, Images } from '../../utils';
import {
  MainContainer
} from '../common';
import styles from './styles/NotificationStyle';

class NotificationList extends Component {

  state = {
    selectedIndex: 0,
    listData: [
      {
        index: 0,
        date: "24-5-2021 • 12:32",
        color:'#FEE5FF',
        description:'Helpdesk - HEL052021-3 of customer named Skyward techno solutions - 9016444210 regarding assigend to you by Megha shah. Helpdesk - HEL052021-3 of customer named Skyward techno solutions - 9016444210 regarding assigend to you by Megha shah.'
      },
      {
        index: 1,
        date: "24-5-2021 • 12:32",
        color:'#D2E5FE',
        description:' Customer related notification goes here Customer related notification goes here'
      },
      {
        index: 2,
        date: "24-5-2021 • 12:32",
        color:'#FFF4EE',
        description:'Appointment related notification goes here Appointment related notification goes here'
      },  {
        index: 3,
        date: "24-5-2021 • 12:32",
        color:'#FEE5FF',
        description:'Helpdesk - HEL052021-3 of customer named Skyward techno solutions - 9016444210 regarding assigend to you by Megha shah. Helpdesk - HEL052021-3 of customer named Skyward techno solutions - 9016444210 regarding assigend to you by Megha shah.'
      },
      {
        index: 4,
        date: "24-5-2021 • 12:32",
        color:'#D2E5FE',
        description:' Customer related notification goes here Customer related notification goes here'
      },
      {
        index: 5,
        date: "24-5-2021 • 12:32",
        color:'#FFF4EE',
        description:'Appointment related notification goes here Appointment related notification goes here'
      },  {
        index: 6,
        date: "24-5-2021 • 12:32",
        color:'#FEE5FF',
        description:'Helpdesk - HEL052021-3 of customer named Skyward techno solutions - 9016444210 regarding assigend to you by Megha shah. Helpdesk - HEL052021-3 of customer named Skyward techno solutions - 9016444210 regarding assigend to you by Megha shah.'
      },
      {
        index: 7,
        date: "24-5-2021 • 12:32",
        color:'#D2E5FE',
        description:' Customer related notification goes here Customer related notification goes here'
      },
      {
        index: 8,
        date: "24-5-2021 • 12:32",
        color:'#FFF4EE',
        description:'Appointment related notification goes here Appointment related notification goes here'
      },  {
        index: 9,
        date: "24-5-2021 • 12:32",
        color:'#FEE5FF',
        description:'Helpdesk - HEL052021-3 of customer named Skyward techno solutions - 9016444210 regarding assigend to you by Megha shah. Helpdesk - HEL052021-3 of customer named Skyward techno solutions - 9016444210 regarding assigend to you by Megha shah.'
      },
      {
        index: 10,
        date: "24-5-2021 • 12:32",
        color:'#D2E5FE',
        description:' Customer related notification goes here Customer related notification goes here'
      },
      {
        index: 11,
        date: "24-5-2021 • 12:32",
        color:'#FFF4EE',
        description:'Appointment related notification goes here Appointment related notification goes here'
      },  {
        index: 12,
        date: "24-5-2021 • 12:32",
        color:'#FEE5FF',
        description:'Helpdesk - HEL052021-3 of customer named Skyward techno solutions - 9016444210 regarding assigend to you by Megha shah. Helpdesk - HEL052021-3 of customer named Skyward techno solutions - 9016444210 regarding assigend to you by Megha shah.'
      },
      {
        index: 13,
        date: "24-5-2021 • 12:32",
        color:'#D2E5FE',
        description:' Customer related notification goes here Customer related notification goes here'
      },
      {
        index: 14,
        date: "24-5-2021 • 12:32",
        color:'#FFF4EE',
        description:'Appointment related notification goes here Appointment related notification goes here'
      },  {
        index: 15,
        date: "24-5-2021 • 12:32",
        color:'#FEE5FF',
        description:'Helpdesk - HEL052021-3 of customer named Skyward techno solutions - 9016444210 regarding assigend to you by Megha shah. Helpdesk - HEL052021-3 of customer named Skyward techno solutions - 9016444210 regarding assigend to you by Megha shah.'
      },
      {
        index: 16,
        date: "24-5-2021 • 12:32",
        color:'#D2E5FE',
        description:' Customer related notification goes here Customer related notification goes here'
      },
      {
        index: 17,
        date: "24-5-2021 • 12:32",
        color:'#FFF4EE',
        description:'Appointment related notification goes here Appointment related notification goes here'
      },
    ]
  };

  renderCell = ({ index }) => {
    console.log(index);
    const item = this.state.listData[index];
    return (
      <Card style={{ margin: 5 }} key={item.index} onPress={() => {
      }}>
        <View style={{ margin: 15,flexDirection: 'row' }}>

          <View style={{width:'20%'}}>
            <View style={{
              borderRadius:30,
              backgroundColor:item.color,
              width:40,
              height:40,
              alignItems:'center',
              justifyContent: 'center',              
            }}>

            <Image 
            source={Images.ic_Appointment}/>
            </View>
          </View>

          <View style={{ flexDirection: 'column',width:'80%',color:'#485780'}}>
            <Text style={{ fontSize: 12 }}>{item.date}</Text>
            <Text style={{ fontSize: 15,color:"#1B2655" }}>{item.description}</Text>
            
          </View>
       
        </View>
      </Card>
    );
  };

  render() {
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => this.props.navigation.goBack(),
          },
          title: 'Notification',
          hideUnderLine: true,
          light: true,
        }}>
          
          <View style={styles.MainList}>
            <FlatList
              horizontal={false}
              scrollEnabled={true}
              data={[0, 1, 2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={item => this.renderCell(item)}
              keyExtractor={(item, index) => 'key' + index}
              style={{ flex: 1, margin: 10 }}
            />
          </View>
      
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList);
