import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import {
  MainContainer,
} from '../../common';
import { connect } from 'react-redux';
import styles from '../styles/HelpDesk.style';
import { strings } from '../../../language/Language';
import { Images, Colors } from '../../../utils';
import { Card, Title, FAB } from 'react-native-paper';
import { push } from '../../../navigation/Navigator';


class Opportunity extends Component {

  state = {
    selectedIndex: 0,
    listData: [
      {
        index: 0,
        date: "24-5-2021 • 12:32",
        status: "Closed Won",
        header: "HEL052021-11",
        title: "Laxmi Packaging",
        description: "Megha Shah",
      },
      {
        index: 1,
        date: "24-5-2021 • 12:32",
        status: "Prosal & Price Quote",
        header: "HEL052021-12",
        title: "Abaris Health Care Ltd.",
        description: "Rahul Vyas",
      },
      {
        index: 2,
        date: "24-5-2021 • 12:32",
        status: "Closed Won",
        header: "HEL052021-5",
        title: "Skyward Techno Solution",
        description: "Ramesh Jain",
      },
    ]
  };

  renderCell = ({ index }) => {
    const item = this.state.listData[index];
    return (
      <Card style={{ margin: 5 }} key={item.index}>
        <View style={{ margin: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 13, width: '70%', }}>{item.date}</Text>
            <View style={{ width: 80, backgroundColor: Colors.BlueColor50, borderRadius: 5 }}>
              <Text style={{ textAlign: 'center', fontSize: 12, color: Colors.BlueColor500, margin: 3 }}>{item.status}</Text>
            </View>
          </View>
          <Title style={{ fontSize: 16, marginTop: 8 }}>{item.title}</Title>
          <Text style={{ fontSize: 12, color: Colors.darkGray, }}>{item.description}</Text>
          <Text style={{ fontSize: 12, color: Colors.primary, fontWeight: 'bold', marginTop: 16 }}>{item.header}</Text>
          <Text style={{ fontSize: 15, color: Colors.darkGray, marginTop: 4 }}>{"Fingure print & card door controller"}</Text>
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
          title: 'Opportunity',
          hideUnderLine: true,
          light: true,
          right: [{ image: Images.ic_Search, onPress: () => this.props.navigation.push('Settings'), }],
        }}>
        <View style={styles.MainHeaderView}>
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
          </View>
        </View>
        <FAB
          style={styles.fab}
          icon="plus"
          color={Colors.white}
          onPress={() => {
            push("AddOpportunity")
          }}
        />
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Opportunity);
