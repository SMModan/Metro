import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import {
  Clickable,
  MainContainer,
} from '../../common';
import { connect } from 'react-redux';
import styles from '../../HomeDetails/styles/HelpDesk.style';
import { Images, Colors, FontName } from '../../../utils';
import { Card, Title, FAB, Searchbar } from 'react-native-paper';
import { push } from '../../../navigation/Navigator';
import SectionListContacts from 'react-native-sectionlist-contacts'
import ResponsivePixels from '../../../utils/ResponsivePixels';
import contactApi from '../../Contacts/Apis/ContactApi';
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
  };

  _renderItem = (item, index, section) => {
    return (
      <Card style={{ margin: 7, marginLeft: 15, marginRight: 25 ,padding:10}} key={index}>
         <View style={{flexDirection:'row'}}>
         <Title style={{ fontSize: 16 ,width:'50%'}}>Customer Category</Title>
         <View style={{backgroundColor:'#F1F5FB',borderRadius:5, width:'50%',textAlign:'center',justifyContent:'center',paddingLeft:5}}>
        <Text style={{ textAlign: 'left', fontSize: 15,color:'$687799',margin:2}}>{item.customerType}</Text>
        </View>
         </View>
         <Title style={{ fontSize: 12,color:'#485780' }}>{item.name}</Title>
         <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop:5
        }}>
                <Image source={Images.ic_Call} style={{width:15,height:15,resizeMode:'contain',}} />

            <Text style={{
                    fontSize: 15,
                    color: "black",
                    marginLeft:10,
                    color:'#485780'
                }}>{item.phone}</Text>
        </View>

        <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop:10
        }}>
                <Image source={Images.ic_Email} style={{width:15,height:15,resizeMode:'contain',}} />

            <Text style={{
                    fontSize: 15,
                    color: "black",
                    marginLeft:10,
                    color:'#485780'
                }}>{item.email}</Text>
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
    this.getAllCustomer();
  };

  getAllCustomer = () => {
    const params = {
      PageIndex: this.state.page,
      PageSize: 10,
      Filter: '',
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
          let totalPage = Table[0].Count / 10;
          isLast = this.state.page == totalPage;
          let data = [];

          for (let index = 0; index < Table.length; index++) {
            const _table = Table[index];
            let table = {
              name: _table.CustomerOwnerName||'',
              customerType: _table.CustomerType||'',
              email:_table.EmailID||'',
              phone:_table.Phone||''
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

  render() {
    const {listData, refreshing, loading, loadMore, isLast} = this.state;

    return (
      <>
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => this.props.navigation.goBack(),
          },
          title: '',
          hideUnderLine: true,
          light: true,
        }}>
        <View style={styles.MainHeaderView}>
          <SectionListContacts
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
      <Searchbar placeholder={'Search Customer'} style={{ position: 'absolute', top:10,height:40,width:'80%', marginLeft: 50, marginRight: 20, backgroundColor: 'rgba(0, 0, 0, 0.2)',  shadowColor: 'transparent' }} inputStyle={{ color:'white'}}  placeholderTextColor={'#8F9BB3'} iconColor={'#8F9BB3'}/>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
