import React, {Component} from 'react';
import {View, Text, FlatList, Image, Platform} from 'react-native';
import {
  MainContainer,
  ScrollContainer,
  Clickable,
  Button,
  EditText,
  ProgressDialog,
  ProgressView,
  MyFlatList,
} from '../../common';
import {connect} from 'react-redux';
import styles from '../styles/Home.style';
import {strings} from '../../../language/Language';
import {Images, Colors, Utils} from '../../../utils';
import {syncAllData} from '../../../utils/SyncDataManager';
import {push, reset} from '../../../navigation/Navigator';
import {Alert} from 'react-native';
import {store} from '../../../App';
import {setSessionField} from '../../../reducers/SessionReducer';
import loginApi from '../../Login/apis/LoginApis';

import {TouchableOpacity, Animated, ScrollView, Dimensions} from 'react-native';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import {Card} from 'react-native-paper';
import HomeApis from '../apis/HomeApis';

const {width} = Dimensions.get('window');

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 1,
      xTabOne: 0,
      xTabTwo: 0,
      xTabThree: 0,
      animatedWidth: '50%',
      announcementType: 1,
      translateX: new Animated.Value(80),
      translateXTabOne: new Animated.Value(width),
      translateXTabTwo: new Animated.Value(0),
      translateXTabThree: new Animated.Value(width),
      translateY: -1000,
      data: [],
      refreshing: false,
      loading: false,
      listData: [],
      holidayList: [],
    };
  }

  handleSlide = type => {
    let {
      active,
      xTabOne,
      xTabTwo,
      xTabThree,
      translateX,
      translateXTabOne,
      translateXTabTwo,
      translateXTabThree,
    } = this.state;
    Animated.spring(translateX, {
      toValue: type,
      duration: 20,
    }).start();
    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 20,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 20,
        }).start(),
        Animated.spring(translateXTabThree, {
          toValue: width,
          duration: 20,
        }).start(),
      ]);
    } else if (active === 1) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: width,
          duration: 20,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          duration: 20,
        }).start(),
        Animated.spring(translateXTabThree, {
          toValue: width,
          duration: 20,
        }).start(),
      ]);
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: width,
          duration: 20,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 20,
        }).start(),
        Animated.spring(translateXTabThree, {
          toValue: 0,
          duration: 20,
        }).start(),
      ]);
    }
  };

  componentDidMount = () => {
    //console.log("this.props.session.user.EmployeeName",this.props.session.user)
    // setTimeout(() => this.loadPermissions(), 300)

    const CountryName= store.getState().session.country_name
    this.setState({
        CountryName
    })
    this.getAllAnnouncement();
    this.getAllNews();
    this.getHolidayDetailsByToken();
  };

  getAllAnnouncement = () => {
    

    const params = {
      AnnouncementType: 1,
    };

    ProgressDialog.show();
    HomeApis.GetAnnouncement(
      params,
      res => {
        ProgressDialog.hide();
        if (res) {
          const {Table} = res;
          console.log('Table', Table);

          if (Table) {
            if (Array.isArray(Table)) {
              this.setState({
                listDataAnnouncement: [...Table],
                loading: false,
                refreshing: false,
              });
            } else {
              //console.log("table name name",Table.CustomerName)
              let results = [{...Table}];

              this.setState({
                listDataAnnouncement: results,
                loading: false,
                refreshing: false,
              });
            }
          }
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };


  
  getAllNews = () => {
    // const {announcementType} = this.state;

    const params = {
      AnnouncementType: 2,
    };

    ProgressDialog.show();
    HomeApis.GetAnnouncement(
      params,
      res => {
        ProgressDialog.hide();
        if (res) {
          const {Table} = res;
          console.log('Table', Table);

          if (Table) {
            if (Array.isArray(Table)) {
              this.setState({
                listDataNews: [...Table],
                loading: false,
                refreshing: false,
              });
            } else {
              //console.log("table name name",Table.CustomerName)
              let results = [{...Table}];

              this.setState({
                listDataNews: results,
                loading: false,
                refreshing: false,
              });
            }
          }
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };

  getHolidayDetailsByToken = () => {
    const params = {};

    ProgressDialog.show();
    HomeApis.GetHolidayDetailsByToken(
      params,
      res => {
        ProgressDialog.hide();
        if (res) {
          const {Table} = res;
          console.log('Table', Table);

          if (Table) {
            if (Array.isArray(Table)) {
              this.setState({
                holidayList: [...Table],
                loading: false,
                refreshing: false,
              });
            } else {
              //console.log("table name name",Table.CustomerName)
              let results = [{...Table}];

              this.setState({
                holidayList: results,
                loading: false,
                refreshing: false,
              });
            }
          }
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };

  splitDate = strDate => {
    let date = '';
    if (strDate) {
      const TStartSplit = strDate.split('T');
      const sDate = TStartSplit[0];
      date = `${sDate}`;
    }
    return date;
  };

  renderHolidayCell = ({index}) => {
    const item = this.state.holidayList[index];

    // var date = new Date(item.CreatedDate);
    // date.toISOString().substring(0, 10);

    // let myDate = `${date.getDate()}-${date.getMonth() + 1
    //   }-${date.getFullYear()}`;
    const myDate = this.splitDate(item?.Date);
    return (
      <Card
        style={{margin: ResponsivePixels.size5}}
        key={item?.index}
        onPress={() => {}}>
        <View style={{margin: ResponsivePixels.size5, flexDirection: 'row'}}>
          <View
            style={{flexDirection: 'row', width: '100%', color: '#485780',alignSelf:"center",padding:ResponsivePixels.size10}}>
            <Text
              style={{
                fontSize: ResponsivePixels.size17,
                fontWeight: 'bold',
                width:"50%",
              }}>
              {myDate}
            </Text>
            <Text style={{fontSize: ResponsivePixels.size17,
                width:"50%", color: '#1B2655'}}>
              {item?.Description}
            </Text>
          </View>
        </View>
      </Card>
    );
  };

  renderCellAnnouncement = ({index}) => {
    const item = this.state.listDataAnnouncement[index];

    // var date = new Date(item.CreatedDate);
    // date.toISOString().substring(0, 10);

    // let myDate = `${date.getDate()}-${date.getMonth() + 1
    //   }-${date.getFullYear()}`;
    return (
      <Card
        style={{margin: ResponsivePixels.size5}}
        key={item?.index}
        onPress={() => {}}>
        <View style={{margin: ResponsivePixels.size5, flexDirection: 'row'}}>
          <View
            style={{flexDirection: 'column', width: '100%', color: '#485780'}}>
            {/* <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: ResponsivePixels.size10 }}>{"12-12-2200"}</Text> */}
            <Text style={{fontSize: ResponsivePixels.size17, color: '#1B2655'}}>
              {item?.ShortTitle}
            </Text>
          </View>
        </View>
      </Card>
    );
  };

  
  renderCellNews = ({index}) => {
    const item = this.state.listDataNews[index];

    // var date = new Date(item.CreatedDate);
    // date.toISOString().substring(0, 10);

    // let myDate = `${date.getDate()}-${date.getMonth() + 1
    //   }-${date.getFullYear()}`;
    return (
      <Card
        style={{margin: ResponsivePixels.size5}}
        key={item?.index}
        onPress={() => {}}>
        <View style={{margin: ResponsivePixels.size5, flexDirection: 'row'}}>
          <View
            style={{flexDirection: 'column', width: '100%', color: '#485780'}}>
            {/* <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: ResponsivePixels.size10 }}>{"12-12-2200"}</Text> */}
            <Text style={{fontSize: ResponsivePixels.size17, color: '#1B2655'}}>
              {item?.ShortTitle}
            </Text>
          </View>
        </View>
      </Card>
    );
  };

  render() {
    const {data, refreshing, loading} = this.state;

    let {
      xTabOne,
      xTabTwo,
      xTabThree,
      translateX,
      active,
      translateXTabOne,
      translateXTabTwo,
      translateXTabThree,
      translateY,
      animatedWidth,
      listDataAnnouncement,
      listDataNews,
      holidayList,
      CountryName
    } = this.state;
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_Menu,
            onPress: () => {
              // this.handleSignOut()
              this.props.navigation.openDrawer();
            },
          },
          title: `Metro HRMS ${CountryName}`,
          hideUnderLine: true,
          light: true,
          isHome: true,
          right: [
            {
              image: Images.ic_edit,
              onPress: () => {push("atttttt")},
            },
          ],
        }}>
        <View style={styles.MainHeaderView}>
          <View style={styles.headerView}>
            <Text style={styles.firstTitle}>
              Hi {this.props.session?.user?.EmployeeName || ''}
            </Text>
          </View>
          <View style={styles.MainList}>
            <View style={{flex: 1}}>
              <View
                style={{
                  width: '90%',
                  height:"100%",
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: ResponsivePixels.size15,
                    marginBottom: 20,
                    height: ResponsivePixels.size40,
                    position: 'relative',
                  }}>
                  <Animated.View
                    style={{
                      position: 'absolute',
                      width: animatedWidth || '50%',
                      height: '100%',
                      top: 0,
                      left: 0,
                      backgroundColor: Colors.Red900,
                      borderRadius: 50,
                      transform: [
                        {
                          translateX,
                        },
                      ],
                    }}
                  />

                  <TouchableOpacity
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: Colors.Red900,
                      borderRadius: 50,
                      borderRightWidth: 0,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    onLayout={event =>
                      this.setState({
                        xTabOne: event.nativeEvent.layout.x,
                      })
                    }
                    onPress={() =>
                      this.setState(
                        {
                          active: 0,
                          animatedWidth: '25%',
                          announcementType: 2,
                          listData: [],
                        },
                        () => {
                        //  this.getAllAnnouncementNews();
                          this.handleSlide(xTabOne);
                        },
                      )
                    }>
                    <Text
                      style={{
                        color: active === 0 ? '#fff' : Colors.secondary500,
                      }}>
                      NEWS
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: Colors.Red900,
                      borderRadius: 1,
                      borderLeftWidth: 0,
                      borderRightWidth: 0,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    onLayout={event =>
                      this.setState({
                        xTabTwo: event.nativeEvent.layout.x,
                      })
                    }
                    onPress={() =>
                      this.setState(
                        {
                          active: 1,
                          animatedWidth: '50%',
                          announcementType: 1,
                          listData: [],
                        },
                        () => {
                       //   this.getAllAnnouncementNews();
                          this.handleSlide(xTabTwo);
                        },
                      )
                    }>
                    <Text
                      style={{
                        color: active === 1 ? '#fff' : Colors.secondary500,
                      }}>
                      ANNOUNCEMENTS
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: Colors.Red900,
                      borderRadius: 50,
                      borderLeftWidth: 0,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    onLayout={event =>
                      this.setState({
                        xTabThree: event.nativeEvent.layout.x,
                      })
                    }
                    onPress={() =>
                      this.setState({active: 2, animatedWidth: '25%'}, () =>
                        this.handleSlide(xTabThree),
                      )
                    }>
                    <Text
                      style={{
                        color: active === 2 ? '#fff' : Colors.secondary500,
                      }}>
                      HOLIDAYS
                    </Text>
                  </TouchableOpacity>
                </View>

                    
                 {active===0 && <MyFlatList
                      data={listDataNews || []}
                      renderItem={item => this.renderCellNews(item)}
                      style={{flex: 1}}
                      refreshing={refreshing}
                      loading={loading}
                      onRefresh={() => {
                        this.setState(
                          {
                            refreshing: true,
                            listDataNews: [],
                          },
                          () => {
                            this.getAllNews();
                            //   this.getAllNotification();
                          },
                        );
                      }}
                      horizontal={false}
                      scrollEnabled={true}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => 'key' + index}
                    />
}
                    
                    {active===1 &&  <MyFlatList
                      data={listDataAnnouncement || []}
                      renderItem={item => this.renderCellAnnouncement(item)}
                      style={{flex: 1}}
                      refreshing={refreshing}
                      loading={loading}
                      onRefresh={() => {
                        this.setState(
                          {
                            refreshing: true,
                            listDataAnnouncement: [],
                          },
                          () => {
                            this.getAllAnnouncement();
                            //   this.getAllNotification();
                          },
                        );
                      }}
                      horizontal={false}
                      scrollEnabled={true}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => 'key' + index}
                    />}
                   

               
               {active===2 &&  <MyFlatList
                      data={holidayList || []}
                      renderItem={item => this.renderHolidayCell(item)}
                      style={{flex: 1}}
                      refreshing={refreshing}
                      loading={loading}
                      onRefresh={() => {
                        this.setState(
                          {
                            refreshing: true,
                            holidayList: [],
                          },
                          () => {
                            this.getHolidayDetailsByToken();
                            //   this.getAllNotification();
                          },
                        );
                      }}
                      horizontal={false}
                      scrollEnabled={true}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => 'key' + index}
                    />}
                   


              </View>
            </View>
          </View>
        </View>
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
