import _ from "lodash";
import React, { Component } from 'react';
import { ActivityIndicator, Image, Text, View,FlatList } from 'react-native';
import { Card, FAB, Title } from 'react-native-paper';
import SectionListContacts from 'react-native-sectionlist-contacts';
import { connect } from 'react-redux';
import { goBack, push } from '../../../navigation/Navigator';
import { Colors, FontName, Images } from '../../../utils';
import {
  Clickable,
  MainContainer
} from '../../common';
import styles from '../../HomeDetails/styles/HelpDesk.style';
import CustomerApi from '../Api/CustomerApi';


class Customer extends Component {
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

  _renderItem = ({index,item}) => {
    console.log("iitem---------------------",item)
    return (
      <Card style={{ margin: 7,padding:10}} key={index}
      onPress={() => {
        this.props.navigation.push('EditCustomer', { item })
      }}>
         <View style={{flexDirection:'row'}}>
         <Title style={{ fontSize: 16 ,width:'50%'}}>Customer Category</Title>
         <View style={{backgroundColor:'#F1F5FB',borderRadius:5, width:'50%',textAlign:'center',justifyContent:'center',paddingLeft:5}}>
        <Text style={{ textAlign: 'left', fontSize: 15,color:'$687799',margin:2}}>{item.CustomerType}</Text>
        </View>
         </View>
         <Title style={{ fontSize: 16 }}>{item.CustomerName}</Title>


         <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop:5
        }}>
                <Image source={Images.ic_Call} style={{width:15,height:15,resizeMode:'contain',}} />

            <Text style={{
                    fontSize: 15,
                    marginLeft:10,
                    color:'#485780'
                }}>{item.Phone}</Text>
        </View>

        <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop:10
        }}>
                <Image source={Images.ic_Email} style={{width:15,height:15,resizeMode:'contain',}} />

            <Text style={{
                    fontSize: 15,
                    marginLeft:10,
                    color:'#485780'
                }}>{item.EmailID}</Text>
        </View>
     
     
      </Card>
    )
  }

  _renderHeader = (params) => {
    return <View><Text style={{ margin: 10, marginLeft: 20, fontSize: 17, fontWeight: '600' }}>{params.key}</Text></View>
  }

  _getRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},0.75)`
  }


  
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
              this.getAllCustomer()
            })
          }
        }}>
       
      </Clickable>
    );
  };

  
  componentDidMount = () => {
    this.getAllCustomer();
  };

  getAllCustomer = () => {
    const { searchQuery } = this.state

    const params = {
      PageIndex: this.state.page,
      PageSize: 10,
      Filter: searchQuery || ""
    };
    this.setState({
      loading: !this.state.refreshing && !this.state.loadMore,
    });
    CustomerApi.getAllCustomerList(
      params,
      res => {
        const {Table} = res;
        let isLast = true;
        if (Table) {
          if (Array.isArray(Table)) {
            let totalPage = Table[0]?.Count / 10;
            isLast = this.state.page == totalPage;
            let data = [];
  
            console.log("TableTableTableTable",Table)
            for (let index = 0; index < Table.length; index++) {
              const _table = Table[index];
              data.push(_table);
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
          }else{
            console.log("table name name",Table.CustomerName)
          let results = [
              {...Table}
            ];

            this.setState({
              listData:results
            })
          }
        
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
      this.getAllCustomer()
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
          title: 'Customers',
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
              this.getAllCustomer()
            })
          },
          showSearch,
          right: [{ image: Images.ic_Search, onPress: () => this.setState({ showSearch: true }), }],
        
        }}>
        <View style={styles.MainHeaderView}>
        {loading && <ActivityIndicator size={"large"} color={Colors.blueGray900} style={{ margin: 8 }} />}

          {/* <FlatList
            ref={s => this.sectionList = s}
            keyExtractor={(item, index) => 'key' + index}
            sectionListData={this.state.listData}
            initialNumToRender={this.state.listData.length}
            showsVerticalScrollIndicator={false}
            SectionListClickCallback={(item, index) => {
              console.log('---SectionListClickCallback--:', item, index)
            }}
            otherAlphabet="#"
            renderHeader={this._renderHeader}
            renderItem={this._renderItem}
            letterViewStyle={{
              marginRight: -5,
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
                this.getAllCustomer()
              })
            }}
            onEndReached={() => {
              console.log("End")

              if (!loadMore && !isLast) {
                this.setState({
                  page: this.state.page + 1,
                  loadMore: true
                }, () => {
                  this.getAllCustomer()
                })

              }
            }}
            // ListFooterComponent={this._renderFooter}
            letterTextStyle={{
              fontFamily: FontName.regular,
              fontSize: 14,
              marginLeft:4,
              fontWeight: '400',
              color: Colors.blue
            }}
          /> */}


          <FlatList
            data={listData || []}
            renderItem={item => this._renderItem(item)}
            style={{flex: 1, margin: 10}}
            refreshing={refreshing}
            loading={loading}
            onRefresh={() => {
              this.setState(
                {
                  refreshing: true,
                  listData: [],
                },
                () => {
                  this.getAllCustomer();
                },
              );
            }}
            horizontal={false}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => 'key' + index}
            footerComponent={() => {
              return (loadMore ? <ActivityIndicator size={"large"} color={Colors.blueGray900} style={{ margin: 8 }} /> : null)
            }}
            onEndReached={() => {
              console.log("End")
              if (!loadMore && !isLast) {
                this.setState({
                  page: this.state.page + 1,
                  loadMore: true
                }, () => {
                  this.getAllCustomer()
                })
              }
            }}
          />
        </View>
        <FAB
          style={styles.fab}
          icon="plus"
          color={Colors.white}
          onPress={() => {
            push("AddCustomer")
          }}
        />
      </MainContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
