import React, {Component} from 'react';
import {View, Text, Image, Linking, ActivityIndicator} from 'react-native';
import {Clickable, MainContainer} from '../../common';
import {connect} from 'react-redux';
import styles from './Contact.style';
import {Images, Colors, FontName} from '../../../utils';
import {Card, Title, FAB, Searchbar} from 'react-native-paper';
import {push} from '../../../navigation/Navigator';
import SectionListContacts from 'react-native-sectionlist-contacts';
import {Button} from 'native-base';
import contactApi from '../Apis/ContactApi';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import _ from "lodash"

class Contacts extends Component {
  state = {
    selectedIndex: 0,
    page: 0,
    totalPage: 0,
    refreshing: false,
    loading: true,
    loadMore: false,
    isLast: false,
    apiResponseData: [],
    listData: [],
    showSearch: false,
    searchQuery: false,
  };

  _renderItem = (item, index, section) => {
    return (
      <Card
        style={{margin: 7, marginLeft: 15, marginRight: 25}}
        key={index}
        onPress={() => {
          push('ViewContact');
        }}>
        <View style={{margin: 15, flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
              backgroundColor: this._getRandomColor(),
              justifyContent: 'center',
              marginRight: 15,
            }}>
            <Text
              style={{textAlign: 'center', fontSize: 20, fontWeight: '600'}}>
              {item?.name[0]}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Title style={{fontSize: 16}}>{item?.name}</Title>
            <Text style={{fontSize: 12, color: Colors.grayColor, marginTop: 3}}>
              {item?.company}
            </Text>
          </View>
          <Clickable
            onPress={() => {
              Linking.openURL(`tel:${item?.MobileNo}`);
            }}>
            <Image
              source={Images.ic_Call}
              style={{width: 30, height: 30, marginRight: 10}}
              resizeMode="center"
            />
          </Clickable>
        </View>
      </Card>
    );
  };

  _renderHeader = params => {
    return (
      <View>
        <Text
          style={{margin: 10, marginLeft: 20, fontSize: 17, fontWeight: '600'}}>
          {params.key}
        </Text>
      </View>
    );
  };

 
  _getRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 256)},${Math.floor(
      Math.random() * 256,
    )},${Math.floor(Math.random() * 256)},0.75)`;
  };


  _renderFooter = params => {
    const {  loadMore, isLast } = this.state

    return (

      <Clickable
        onPress={() => {
          if (!loadMore && !isLast) {
            this.setState({
              page: this.state.page + 1,
              loadMore: true
            }, () => {
              this.getAllContacts()
            })
          }
        }}>
          <View style={{justifyContent:'center',
            textAlign: 'center',
            alignItems:'center',}}>
        <Title
          style={{
            fontSize: 16,
            width:ResponsivePixels.size120,
            justifyContent:'center',
            textAlign: 'center',
            alignItems:'center',
            padding: ResponsivePixels.size5,
            backgroundColor: Colors.gray2,
            color:Colors.white,
          }}>
          Load More
        </Title>
        </View>
      </Clickable>
    );
  };


  componentDidMount = () => {
    this.getAllContacts();
  };

  getAllContacts = () => {
    const { searchQuery } = this.state

    const params = {
      PageIndex: this.state.page,
      PageSize: 20,
      Filter: searchQuery || ""
    };
    this.setState({
      loading: !this.state.refreshing && !this.state.loadMore,
    });
    contactApi.getAllContactList(
      params,
      res => {
        const {Table} = res;
        let isLast = true;
        if (Table) {
          let totalPage = Table[0].Count / 10;
          isLast = this.state.page == totalPage;
          let data = [];

          for (let index = 0; index < Table.length; index++) {
            const _table = Table[index];
            let table = {
              name: _table.ContactPersonName||'',
              company: _table.CustomerName||'',
            };
            data.push(table);
          }

          this.setState(
            {
              listData: [...this.state.listData, ...data],
              apiResponseData:
                this.state.page > 0
                  ? [...this.state.apiResponseData, ...Table]
                  : Table,
              loading: false,
              refreshing: false,
              loadMore: false,
              isLast,
            },
            () => {
              console.log('listData', this.state.listData);
            },
          );
        }
      },
      () => {
        this.setState({
          loading: !this.state.refreshing && !this.state.loadMore,
        });
      },
    );
  };

  // renderFooter() {
  //   return (
  //     <View style={styles.footer}>
  //       {' '}
  //       <TouchableOpacity
  //         activeOpacity={0.9}
  //         onPress={()=>this.loadMoreData}
  //         style={styles.loadMoreBtn}>
  //         <Text style={styles.btnText}>Load More</Text>{' '}
  //         {/* {this.state.loading ? (
  //           <ActivityIndicator color="white" style={{marginLeft: 8}} />
  //         ) : null}{' '} */}
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  
  searchOpp = async () => {

    this.setState({
      listData:[],
      page: 0
    },()=>{
      this.getAllContacts()
    })
  }

  searchOppDelayed = _.debounce(this.searchOpp, 1000)


  render() {
    const {listData, refreshing, loading, loadMore, isLast,showSearch} = this.state;

    return (
      <>
        <MainContainer
          header={{
            left: {
              image: Images.ic_BackWhite,
              onPress: () => this.props.navigation.goBack(),
            },
            title: 'Contacts',
            hideUnderLine: true,
          light: true,
          onClickSearch: () => {
            this.searchOpp()
          },
          onChangeSearch: (text) => {
            this.setState({ searchQuery: text })
          },
          onCloseSearch: () => {
            this.setState({ showSearch: false, searchQuery: "", page: 0, refreshing: true,listData:[], }, () => {
              this.getAllContacts()
            })
          },
          showSearch,
          right: [{ image: Images.ic_Search, onPress: () => this.setState({ showSearch: true }), }],
        
        }}>
          <View style={styles.MainHeaderView}>

        {loading && <ActivityIndicator size={"large"} color={Colors.blueGray900} style={{ margin: 8 }} />}

            <SectionListContacts
              ref={s => (this.sectionList = s)}
              keyExtractor={(item, index) => 'key' + index}
              sectionListData={this.state.listData}
              initialNumToRender={this.state.listData.length}
              showsVerticalScrollIndicator={false}
              SectionListClickCallback={(item, index) => {}}
              otherAlphabet="#"
              renderHeader={this._renderHeader}
              // ListFooterComponent={this._renderFooter}
              renderItem={this._renderItem}
              letterViewStyle={{
                marginRight: -5,
              }}
              letterTextStyle={{
                fontFamily: FontName.regular,
                fontSize: 14,
                marginLeft: 4,
                fontWeight: '400',
                color: Colors.blue,
              }}

              refreshing={refreshing}
              footerComponent={() => {
                return (loadMore ? <ActivityIndicator size={"large"} color={Colors.blueGray900} style={{ margin: 8 }} /> : null)
              }}
              onRefresh={() => {
                this.setState({
                  page: 0,
                  refreshing: true
                }, () => {
                  this.getAllContacts()
                })
              }}
              // onEndReached={() => {
              //   console.log("End")
  
              //   if (!loadMore && !isLast) {
              //     this.setState({
              //       page: this.state.page + 1,
              //       loadMore: true
              //     }, () => {
              //       this.getAllContacts()
              //     })
  
              //   }
              // }}
            />

            {/* {this.renderFooter()} */}
          </View>
          <FAB
            style={styles.fab}
            icon="plus"
            color={Colors.white}
            onPress={() => {
              push('AddContacts');
            }}
          />
        </MainContainer>
       
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
