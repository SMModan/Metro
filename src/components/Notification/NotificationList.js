import React, {Component} from 'react';
import {FlatList, Text, View, Image} from 'react-native';
import {Button, Card, Title} from 'react-native-paper';
import {connect} from 'react-redux';
import {Colors, Images} from '../../utils';
import {MainContainer} from '../common';
import styles from './styles/NotificationStyle';
import NotificationApi from './Api/NotificationApi';
import ResponsivePixels from '../../utils/ResponsivePixels';

class NotificationList extends Component {
  state = {
    selectedIndex: 0,
    refreshing: false,
    loading: true,
    listData: [],
  };

  renderCell = ({index}) => {
    console.log(index);
    const item = this.state.listData[index];

    var date = new Date(item.CreatedDate);
    date.toISOString().substring(0, 10);

    let myDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    return (
      <Card style={{margin: 5}} key={item.index} onPress={() => {}}>
        <View style={{margin: 15, flexDirection: 'row'}}>
          {/* <View style={{width: '20%'}}>
            <View
              style={{
                borderRadius: 30,
                backgroundColor: item.color,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image source={Images.ic_Appointment} />
            </View>
          </View> */}

          <View
            style={{flexDirection: 'column', width: '100%', color: '#485780'}}>
            <Text style={{fontSize: 12,fontWeight: "bold",marginBottom:ResponsivePixels.size10}}>{myDate}</Text>
            <Text style={{fontSize: 15, color: '#1B2655'}}>
              {item.Message}
            </Text>
          </View>
        </View>
      </Card>
    );
  };

  componentDidMount = () => {
    this.getAllNotification();
  };

  getAllNotification = () => {
    this.setState({
      loading: !this.state.refreshing,
    });
    NotificationApi.getAllNotificaiton(
      {},
      res => {
        const {Table} = res;
        console.log('Table', Table);
        if (Table) {
          this.setState({
            listData: [...this.state.listData, ...Table],
            loading: false,
            refreshing: false,
          });
        }
      },
      () => {
        this.setState({
          loading: !this.state.refreshing,
        });
      },
    );
  };

  render() {
    const {listData, refreshing, loading} = this.state;

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
            data={listData || []}
            renderItem={item => this.renderCell(item)}
            style={{flex: 1, margin: 10}}
            refreshing={refreshing}
            loading={loading}
            onRefresh={() => {
              this.setState(
                {
                  refreshing: true,
                },
                () => {
                  this.getAllNotification();
                },
              );
            }}
            horizontal={false}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => 'key' + index}
          />
        </View>
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList);
