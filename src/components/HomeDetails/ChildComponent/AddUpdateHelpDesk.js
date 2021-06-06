import React, {Component} from 'react';
import {View, Text, FlatList, ScrollView} from 'react-native';
import {
  MainContainer,
} from '../../common';
import {connect} from 'react-redux';
import styles from '../styles/HelpDesk.style';
import {strings} from '../../../language/Language';
import {Images, Colors} from '../../../utils';
import { Chip, Card, Title, Button, FAB } from 'react-native-paper';


class AddUpdateHelpDesk extends Component {

  state = {
    selectedIndex: 0,
    listData : [
      {
        index:0,
        date: "24-5-2021 • 12:32",
        status: "Open",
        header: "HEL052021-11",
        title: "Laxmi Packaging",
        description: "Megha Shah",
      },
      {
        index:1,
        date: "24-5-2021 • 12:32",
        status: "Completed",
        header: "HEL052021-12",
        title: "Abaris Health Care Ltd.",
        description: "Rahul Vyas",
      },
      {
        index:2,
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
      <Card style={{margin: 5}} key={item.index}>
        <View style={{margin: 15}}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize:13, width: '70%',}}>{item.date}</Text>
            <View style={{ width: 80, backgroundColor: item.status.toLowerCase() == 'open' ? Colors.secondary100 : item.status.toLowerCase() == 'completed' ? Colors.Green100 : Colors.Orange100, borderRadius: 5}}>
              <Text style={{  textAlign: 'center', fontSize: 12, color: item.status.toLowerCase() == 'open' ? Colors.secondary900 : item.status.toLowerCase() == 'completed' ? Colors.Green800 : Colors.Orange900, margin: 3}}>{item.status}</Text>
            </View>
          </View>
          <Text style={{ fontSize: 12, color: Colors.primary, fontWeight: 'bold', marginTop: 8}}>{item.header}</Text>
          <Title style={{ fontSize: 16, marginTop: 8 }}>{item.title}</Title>
          <Text style={{ fontSize: 12, color: Colors.darkGray, marginTop: 8}}>{item.description}</Text>
          {
            item.status === 'Open' ?
            <Button labelStyle={{ fontSize: 12, color: Colors.primary, marginTop: 15, textAlign: 'left', width:'100%'}} uppercase={false}> View ratings & digital signature </Button> : null
          }
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
          title: 'Add Issue',
          hideUnderLine: true,
          light: true,
        }}>
        <View style={styles.MainHeaderView}>
          <View style={styles.headerView}>
            <Text style={{ fontWeight: 'bold', fontSize: 13 }}>Status</Text>
            <View style={{ height: 25, width: 1, backgroundColor: Colors.secondary200, margin: 5}}/>
            <ScrollView horizontal={true}>
              {["All", "Open", "On hold", "Completed"].map((item, index) => <Chip key={index} style={{margin: 5, backgroundColor: this.state.selectedIndex === index ? Colors.Orange500 : Colors.secondary200}} textStyle={{ fontSize: 13, color: this.state.selectedIndex === index ? Colors.white : Colors.black}} onPress={() => {this.setState({selectedIndex: index})}}>{item}</Chip>)}
            </ScrollView>
          </View>
          <View style={styles.MainList}>
            <FlatList
              horizontal={false}
              scrollEnabled={true}
              data={[0,1,2]}
              showsHorizontalScrollIndicator={false}
              renderItem={item => this.renderCell(item)}
              keyExtractor={(item, index) => 'key' + index}
              style={{ flex: 1, margin: 10}}
            />
          </View>
        </View>
        <FAB
          style={styles.fab}
          icon="plus"
          color={Colors.white}
          onPress={() => {

          }}
        />
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddUpdateHelpDesk);
