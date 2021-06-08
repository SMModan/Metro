import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import {
  MainContainer,
} from '../../common';
import { connect } from 'react-redux';
import styles from '../styles/HelpDesk.style';
import { strings } from '../../../language/Language';
import { Images, Colors, FontName } from '../../../utils';
import { Chip, Card, Title, Button, FAB } from 'react-native-paper';


class Appointments extends Component {

  state = {
    selectedIndex: 0,
    listData: [
      {
        index: 0,
        date: "24-5-2021 • 12:32",
        header: "Business event 2021",
        title: "Megha Shah",
        description: "Madhav Kumar",
      },
      {
        index: 1,
        date: "24-5-2021 • 12:32",
        header: "Business event 2021",
        title: "Megha Shah",
        description: "Madhav Kumar",
      }
    ]
  };

  renderCell = ({ index }) => {
    console.log(index);
    const item = this.state.listData[index];
    return (
      <Card style={{ margin: 5 }} key={item.index} onPress={() => {
        this.props.navigation.push('AddAppointments')
      }}>
        <View style={{ margin: 15 }}>
          <Text style={{ fontSize: 12 }}>{item.date}</Text>
          <Text style={{ fontSize: 18, fontFamily: FontName.medium, marginTop: 8 }}>{item.header}</Text>
          <Title style={{ fontSize: 13, fontFamily: FontName.regular }}>{item.title}</Title>

          <Text style={{ fontSize: 13, fontFamily: FontName.medium, marginTop: 8 }}>{"GENERAL"}</Text>
          <Text style={{ fontSize: 12, fontFamily: FontName.regular, color: Colors.darkGray, marginTop: 5 }}>{item.description}</Text>
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
          title: 'Appointments',
          hideUnderLine: true,
          light: true,
          right: [{ image: Images.ic_Search, onPress: () => this.props.navigation.push('Settings'), }],
        }}>
        <View style={styles.MainHeaderView}>
          <View style={styles.MainList}>
            <FlatList
              horizontal={false}
              scrollEnabled={true}
              data={[0, 1]}
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
            this.props.navigation.push('AddAppointments')
          }}
        />
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
