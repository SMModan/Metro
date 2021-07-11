import React, {Component} from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Button, Card, Chip, FAB, Title} from 'react-native-paper';
import {
  Button as DialogButton,
  Dialog,
  Portal,
  RadioButton,
} from 'react-native-paper';

import {connect} from 'react-redux';
import {Colors, Images} from '../../../utils';
import {Clickable, MainContainer, MyFlatList} from '../../common';
import styles from '../styles/TaskListStyle';

import TaskApi from '../apis/TaskApi';
import {strings} from '../../../language/Language';
import _ from "lodash"


class TaskList extends Component {
  // state = {
  //   selectedIndex: 0,
  //   listData: [
  //     {
  //       index: 0,
  //       date: "24-5-2021 • 12:32",
  //       status: "Completed",
  //       priority:'Low',
  //       task: "Megha shah",
  //       opportunity: "Fir extinguishers & Sprinkler",
  //     },
  //     {
  //       index: 1,
  //       date: "24-5-2021 • 12:32",
  //       status: "Completed",
  //       priority:'Medium',
  //       task: "Megha shah",
  //       opportunity: "Fir extinguishers & Sprinkler",
  //     },
  //     {
  //       index: 1,
  //       date: "24-5-2021 • 12:32",
  //       status: "Completed",
  //       priority:'Medium',
  //       task: "Megha shah",
  //       opportunity: "Fir extinguishers & Sprinkler",
  //     },
  //   ]
  // };

  state = {
    selectedIndex: 0,
    page: 0,
    totalPage: 0,
    refreshing: false,
    loading: true,
    loadMore: false,
    isLast: false,
    listData: [],
    isStatusDialoguOpen: false,
    statusList: ['inProgress,completed,open'],
    selectedStuasIndex: 0,
    showSearch: false,
    searchQuery: false,
  };


  handleRemarkPage = () => {};

  renderCell = ({index}) => {
    const item = this.state.listData[index];
    console.log('item', item);
    var date = new Date(item.CreatedDate);
    date.toISOString().substring(0, 10);

    let myDate = `${date.getDay()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    return (
      <Card
        style={{margin: 5}}
        key={item.index}
        onPress={() => {
          this.props.navigation.push('UpdateHelpDesk');
        }}>
        <View style={{margin: 15}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 13, width: '40%'}}>{myDate}</Text>
            <View
              style={{
                width: 80,
                backgroundColor:
                  item.TaskStatus.toLowerCase() == 'open'
                    ? Colors.secondary100
                    : item.TaskStatus.toLowerCase() == 'completed'
                    ? Colors.Green100
                    : Colors.Orange100,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  color:
                    item.TaskStatus.toLowerCase() == 'open'
                      ? Colors.secondary900
                      : item.TaskStatus.toLowerCase() == 'completed'
                      ? Colors.Green800
                      : Colors.Orange900,
                  margin: 3,
                }}>
                {item.TaskStatus}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.setState({isStatusDialoguOpen: false});
              }}>
              <View
                style={{
                  width: 80,
                  marginLeft: 8,
                  backgroundColor:
                    item.PriorityName.toLowerCase() == 'low'
                      ? Colors.secondary100
                      : item.PriorityName.toLowerCase() == 'high'
                      ? Colors.Green100
                      : Colors.Orange100,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    color:
                      item.PriorityName.toLowerCase() == 'low'
                        ? Colors.secondary900
                        : item.PriorityName.toLowerCase() == 'high'
                        ? Colors.Green800
                        : Colors.Orange900,
                    margin: 3,
                  }}>
                  {item.PriorityName}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Title style={{fontSize: 16, fontWeight: 'bold', marginTop: 8}}>
            {item.TaskName}
          </Title>
          <Text style={{fontSize: 12}}>{item.AssignUser}</Text>
          <Title style={{fontSize: 12, fontWeight: 'bold', marginTop: 8}}>
            {item.Regarding}
          </Title>
          <Text style={{fontSize: 12, fontStyle: ''}}>
            {item.RegardingName}
          </Text>
          <Button
            labelStyle={{
              fontSize: 14,
              color: '#2262F7',
              marginTop: 15,
              textAlign: 'left',
              width: '100%',
            }}
            uppercase={false}
            onClick={() => {
              this.props.navigation.push('UpdateHelpDesk');
            }}>
            {' '}
            + Add Remarks{' '}
          </Button>
        </View>
      </Card>
    );
  };

  componentDidMount = () => {
    this.getAllTaskList();
  };

  onStatusSlected = index => {
    this.setState({
      selectedStuasIndex: index,
    });
  };

  getAllTaskList = () => {
    const { searchQuery } = this.state

    const params = {
      PageIndex: this.state.page,
      PageSize: 10,
      Filter: searchQuery || "",
      TaskStatusID: 0,
    };
    this.setState({
      loading: !this.state.refreshing && !this.state.loadMore,
    });
    TaskApi.getAllTaskList(
      params,
      res => {
        const {Table} = res;
        console.log('Table', Table);
        let isLast = true;
        if (Table) {
          let totalPage = Table[0].Count / 10;
          isLast = this.state.page == totalPage;
          this.setState({
            listData:
              this.state.page > 0 ? [...this.state.listData, ...Table] : Table,
            loading: false,
            refreshing: false,
            loadMore: false,
            isLast,
          });
        }
      },
      () => {
        this.setState({
          loading: !this.state.refreshing && !this.state.loadMore,
        });
      },
    );
  };

  
  searchOpp = async () => {

    this.setState({
      listData:[],
      page: 0
    },()=>{
      this.getAllTaskList()
    })
  }

  searchOppDelayed = _.debounce(this.searchOpp, 1000)

  render() {
    const {
      listData,
      refreshing,
      loading,
      loadMore,
      isLast,
      isStatusDialoguOpen,
      statusList,
      selectedStuasIndex,
      showSearch
    } = this.state;
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
          onClickSearch: () => {
            this.searchOpp()
          },
          onChangeSearch: (text) => {
            this.setState({ searchQuery: text })
          },
          onCloseSearch: () => {
            this.setState({ showSearch: false, searchQuery: "", page: 0, refreshing: true, }, () => {
              this.getAllTaskList()
            })
          },
          showSearch,
          right: [{ image: Images.ic_Search, onPress: () => this.setState({ showSearch: true }), }],
        }}>
        <View style={styles.MainHeaderView}>
          <View style={styles.headerView}>
            <Text style={{fontWeight: 'bold', fontSize: 13}}>Status</Text>
            <View
              style={{
                height: 25,
                width: 1,
                backgroundColor: Colors.secondary200,
                margin: 5,
              }}
            />
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {['All', 'Open', 'In progress', 'Completed'].map(
                (item, index) => (
                  <Chip
                    key={index}
                    style={{
                      margin: 2,
                      backgroundColor:
                        this.state.selectedIndex === index
                          ? Colors.Orange500
                          : Colors.secondary200,
                    }}
                    textStyle={{
                      fontSize: 13,
                      color:
                        this.state.selectedIndex === index
                          ? Colors.white
                          : Colors.black,
                    }}
                    onPress={() => {
                      this.setState({selectedIndex: index});
                    }}>
                    {item}
                  </Chip>
                ),
              )}
            </ScrollView>
          </View>
          <View style={styles.MainList}>

          {/* {loading && <ActivityIndicator size={"large"} color={Colors.blueGray900} style={{ margin: 8 }} />} */}

            <MyFlatList
              data={listData}
              renderItem={item => this.renderCell(item)}
              style={{flex: 1, margin: 10}}
              refreshing={refreshing}
              loading={loading}
              onRefresh={() => {
                this.setState(
                  {
                    page: 0,
                    refreshing: true,
                  },
                  () => {
                    this.getAllTaskList();
                  },
                );
              }}
              footerComponent={() => {
                return loadMore ? (
                  <ActivityIndicator
                    size={'large'}
                    color={Colors.blueGray900}
                    style={{margin: 8}}
                  />
                ) : null;
              }}
              onEndReached={() => {
                console.log('End');

                if (!loadMore && !isLast) {
                  this.setState(
                    {
                      page: this.state.page + 1,
                      loadMore: true,
                    },
                    () => {
                      this.getAllTaskList();
                    },
                  );
                }
              }}
            />
            <Portal>
              <Dialog
                visible={isStatusDialoguOpen}
                onDismiss={() => {
                  this.setState({isStatusDialoguOpen: false});
                }}>
                <Dialog.Title>{strings.select_contact}</Dialog.Title>
                <Dialog.ScrollArea>
                  <FlatList
                    style={{height: '30%'}}
                    data={statusList || []}
                    renderItem={({item, index}) => (
                      <Clickable
                        onPress={() => this.onStatusSlected(index)}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          paddingVertical: 16,
                        }}>
                        {/* <RadioButton onPress={() => this.onStatusSlected(index)} value={"Testing"} 
                              status={selectedStuasIndex == index ? "checked" : "unchecked"} color={Colors.BlueColor500} /> */}
                        <View
                          style={{
                            flexDirection: 'column-reverse',
                            alignContent: 'center',
                          }}>
                          <View style={{flex: 1}}>
                            <RadioButton.Group>
                              <RadioButton.Item
                                label="First item"
                                value="first"
                              />
                              <RadioButton.Item
                                label="Second item"
                                value="second"
                              />
                            </RadioButton.Group>
                          </View>
                        </View>
                      </Clickable>
                    )}
                  />
                </Dialog.ScrollArea>
              </Dialog>
            </Portal>
          </View>
        </View>
        <FAB
          style={styles.fab}
          icon="plus"
          color={Colors.white}
          onPress={() => {
            this.props.navigation.push('AddTask');
          }}
        />
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
