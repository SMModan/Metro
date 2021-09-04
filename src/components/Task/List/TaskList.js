import React, { Component } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Button, Card, Chip, FAB, Title } from 'react-native-paper';
import {
  Button as DialogButton,
  Dialog,
  Portal,
  RadioButton,
} from 'react-native-paper';

import { connect } from 'react-redux';
import { Colors, Images, Utils } from '../../../utils';
import { Clickable, MainContainer, MyFlatList, ProgressDialog } from '../../common';
import styles from '../styles/TaskListStyle';

import TaskApi from '../apis/TaskApi';
import { strings } from '../../../language/Language';
import _ from "lodash"
import ResponsivePixels from '../../../utils/ResponsivePixels';


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
    selectedIndex: 1,
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
    status:1
  };


  handleRemarkPage = () => { };

  
  createdDate = (strDate)=>{
    let date = ""
    if(strDate){
      const TStartSplit =  strDate.split('T');
      const sDate =  TStartSplit[0]
      date =`${sDate}`
    }
    return date
  }



  handleCompleteTaskApi =(item)=>{

    const {TaskActivityID,ActivityID,ActivityOwnerID,TaskStatusID} = item
    ProgressDialog.show()
  
    // completed status == 2
    const params = {
      TaskStatusID:TaskStatusID,
      TaskID:TaskActivityID,
      AssignTaskActivityID:ActivityID,
      ActivityOwnerID,ActivityOwnerID
    };
    
    TaskApi.updateTaskStatus(
      params,
      res => {
        ProgressDialog.hide()


        let _listData =
        this.state.listData;
      var index = _listData.findIndex(
        function (o) {
          return o.ActivityID === item.ActivityID;
        },
      );
      if (index !== -1)
      _listData.splice(index, 1);

      this.setState({
        listData: _listData,
      });


       Utils.showToast("Task completed successfully.")
      },
      () => {
    ProgressDialog.hide()
      },
    );
  }

  renderCell = ({ index }) => {
    const item = this.state.listData[index];
    var date = item.CreatedDate;
    console.log("item ======>",item)
    return (
      <Card
        style={{ margin: 5 }}
        key={item.index}
      >
        <View style={{ margin: 15 }}>
          <Clickable 
            onPress={() => {
              this.props.navigation.push('MainAddTask', { item: item });
            }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 13, width: '40%' }}>{this.createdDate(date)}</Text>
          
            <TouchableOpacity
              onPress={() => {
                this.setState({ isStatusDialoguOpen: false });
              }}>
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
            </TouchableOpacity>
          
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
          </View>
          <Title style={{ fontSize: 16, fontWeight: 'bold', marginTop: 8 }}>
            {item.TaskName}
          </Title>
          <Text style={{ fontSize: 12 }}>{item.AssignUser}</Text>
          <Title style={{ fontSize: 12, fontWeight: 'bold', marginTop: 8 }}>
            {item.Regarding}
          </Title>
          <Text style={{ fontSize: 12, fontStyle: '' }}>
            {item.RegardingName}
          </Text>
         </Clickable>
        </View>
        <View style={{flexDirection:"row",width:'100%',
        marginBottom:ResponsivePixels.size5,
              textAlign: 'left',
            }}>
          <Button
            labelStyle={{
              fontSize: ResponsivePixels.size18,
              color: '#2262F7',
              textAlign: 'left',
            }}
            style={{alignItems:"flex-start",
            width: '50%',
          }}
            uppercase={false}
            onPress={() => {
          this.props.navigation.push('AddRemarks', {TaskActivityID: item.TaskActivityID})
            }}>
            + Add Remarks
          </Button>

          <Button
            labelStyle={{
              fontSize: ResponsivePixels.size18,
              color: '#2262F7',
              textAlign: 'left',
            }}
            style={{alignItems:"flex-start",
            width: '50%',
          }}
            uppercase={false}
            onPress={() => {

              console.log("item ====> ",item);
                this.handleCompleteTaskApi(item)
            }}>
            Complete Task
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
    const { searchQuery, status,selectedIndex } = this.state
    console.log("selectedIndexselectedIndex ===========>",selectedIndex)
    console.log("statusstatusstatusstatus ===========>",status)
    ProgressDialog.show()
    const params = {
      PageIndex: this.state.page,
      PageSize: 10,
      Filter: searchQuery || "",
      TaskStatusID: status,
    };
    this.setState({
      loading: !this.state.refreshing && !this.state.loadMore,
    });
    TaskApi.getAllTaskList(
      params,
      res => {
        ProgressDialog.hide()
        const { Table } = res;
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
        ProgressDialog.hide()
        this.setState({
          loading: !this.state.refreshing && !this.state.loadMore,
        });
      },
    );
  };


  searchOpp = async () => {

    this.setState({
      listData: [],
      page: 0
    }, () => {
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
            <Text style={{ fontWeight: 'bold', fontSize: 13 }}>Status</Text>
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
              {[{ name: "All", id: 0, }, { name: "Open", id: 1 }, { name: "In Progress", id: 3 }, { name: "Completed", id: 2}].map(
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
                      this.setState({ selectedIndex: index, status: item.id }, () => this.getAllTaskList());
                    }}>
                    {item.name}
                  </Chip>
                ),
              )}
            </ScrollView>
          </View>
          <View style={styles.MainList}>


            <MyFlatList
              data={listData}
              renderItem={item => this.renderCell(item)}
              style={{ flex: 1, margin: 10 }}
              refreshing={refreshing}
              onRefresh={() => {
                this.setState(
                  {
                    page: 0,
                    refreshing: true,
                    listData:[],
                    loadMore: true,

                  },
                  () => {
                    this.getAllTaskList();
                  },
                );
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
                  this.setState({ isStatusDialoguOpen: false });
                }}>
                <Dialog.Title>Update Status</Dialog.Title>
                <Dialog.ScrollArea>
                  <FlatList
                    style={{ height: '30%' }}
                    data={statusList || []}
                    renderItem={({ item, index }) => (
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
                          <View style={{ flex: 1 }}>
          <Button
            labelStyle={{
              fontSize: ResponsivePixels.size20,
              textAlign: 'left',
              backgroundColor:Colors.TaskStatus
            }}
            uppercase={false}
           >
           Open
          </Button>
       
          <Button
            labelStyle={{
              fontSize: ResponsivePixels.size20,
              textAlign: 'left',
              backgroundColor:Colors.TaskStatus
            }}
            uppercase={false}
           >
           In Progress
          </Button>

          <Button
            labelStyle={{
              fontSize: ResponsivePixels.size20,
              textAlign: 'left',
              backgroundColor:Colors.TaskStatus
            }}
            uppercase={false}
           >
           Completed
          </Button>
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
            this.props.navigation.push('AddNewTask');
          }}
        />
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
