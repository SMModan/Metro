import React, { Component } from 'react';
import { FlatList, ScrollView, Text, View,Portal,Button as DialogButton, Dialog,  } from 'react-native';
import { Button, Card, Chip, FAB, Title } from 'react-native-paper';
import { connect } from 'react-redux';
import { Colors, Images } from '../../utils';
import {
  MainContainer
} from '../common';
import styles from './styles/TaskListStyle';

class TaskList extends Component {

  state = {
    selectedIndex: 0,
    listData: [
      {
        index: 0,
        date: "24-5-2021 • 12:32",
        status: "Completed",
        priority:'Low',
        task: "Megha shah",
        opportunity: "Fir extinguishers & Sprinkler",
      },
      {
        index: 1,
        date: "24-5-2021 • 12:32",
        status: "Completed",
        priority:'Medium',
        task: "Megha shah",
        opportunity: "Fir extinguishers & Sprinkler",
      },
      {
        index: 1,
        date: "24-5-2021 • 12:32",
        status: "Completed",
        priority:'Medium',
        task: "Megha shah",
        opportunity: "Fir extinguishers & Sprinkler",
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
            <Text style={{ fontSize: 13, width: '40%', }}>{item.date}</Text>
            <View style={{ width: 80, backgroundColor: item.status.toLowerCase() == 'open' ? Colors.secondary100 : item.status.toLowerCase() == 'completed' ? Colors.Green100 : Colors.Orange100, borderRadius: 5 }}>
              <Text style={{ textAlign: 'center', fontSize: 12, color: item.status.toLowerCase() == 'open' ? Colors.secondary900 : item.status.toLowerCase() == 'completed' ? Colors.Green800 : Colors.Orange900, margin: 3 }}>{item.status}</Text>
            </View>
            <View style={{ width: 80, marginLeft:8, backgroundColor: item.priority.toLowerCase() == 'low' ? Colors.secondary100 : item.priority.toLowerCase() == 'high' ? Colors.Green100 : Colors.Orange100, borderRadius: 5 }}>
              <Text style={{ textAlign: 'center', fontSize: 12, color: item.priority.toLowerCase() == 'low' ? Colors.secondary900 : item.priority.toLowerCase() == 'high' ? Colors.Green800 : Colors.Orange900, margin: 3 }}>{item.priority}</Text>
             
            </View>
            
          </View>
          <Title style={{ fontSize: 16, fontWeight: 'bold',marginTop: 8 }}>General Task</Title>
          <Text style={{ fontSize: 12 }}>{item.task}</Text>
          <Title style={{ fontSize: 12,fontWeight: 'bold', marginTop: 8 }}>Opportunity</Title>
          <Text style={{ fontSize: 12,fontStyle:'' }}>{item.opportunity}</Text>
          <Button labelStyle={{ fontSize: 14, color: '#2262F7', marginTop: 15, textAlign: 'left', width: '100%' }} uppercase={false}> + Add Remarks </Button> 
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
          title: 'Tasks',
          hideUnderLine: true,
          light: true,
          right: [{ image: Images.ic_Search, onPress: () => this.props.navigation.push('Settings'), }],
        }}>
        <View style={styles.MainHeaderView}>
          <View style={styles.headerView}>
            <Text style={{ fontWeight: 'bold', fontSize: 13 }}>Status</Text>
            <View style={{ height: 25, width: 1, backgroundColor: Colors.secondary200, margin: 5 }} />
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {["All", "Open", "In progress", "Completed"].map((item, index) => <Chip key={index} style={{ margin: 2, backgroundColor: this.state.selectedIndex === index ? Colors.Orange500 : Colors.secondary200 }} textStyle={{ fontSize: 13, color: this.state.selectedIndex === index ? Colors.white : Colors.black }} onPress={() => { this.setState({ selectedIndex: index }) }}>{item}</Chip>)}
            </ScrollView>
          </View>






          <View style={styles.MainList}>
          
          
            <FlatList
              horizontal={false}
              scrollEnabled={true}
              data={[0, 1, 2]}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={item => this.renderCell(item)}
              keyExtractor={(item, index) => 'key' + index}
              style={{ flex: 1, margin: 10 }}
            />
          </View>
        </View>
        <FAB
          style={styles.fab}
          icon="plus"
          color={Colors.white}
          onPress={() => {
            this.props.navigation.push('AddTask')
          }}
        />
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
