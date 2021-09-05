import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button
} from 'react-native';
import { Images,Colors } from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import HelpDeskApi from '../Api/HelpDeskApi';
import { ImageButton, MainContainer,ProgressDialog } from '../../common';


export default class MyCheckin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      TransactionTypeID:this.props?.route?.params?.TransactionTypeID || 0,
      HeaderID:this.props?.route?.params?.HeaderID || 0,
      CheckInOutListing:[],
      remarks:''
    };
  }


  componentDidMount() {
    this.getAllCheckInOutList()
  }

  createdDate = (strDate)=>{
    let date = ""
    if(strDate){
      const TStartSplit =  strDate.split('T');
      const sDate =  TStartSplit[0]
      date =`${sDate}`
    }
    return date
  }
  
  getAllCheckInOutList = () => {
    const { TransactionTypeID,HeaderID} = this.state
    ProgressDialog.show()

    const params = {
      TransactionTypeID: TransactionTypeID,
      HeaderID: HeaderID,
      DetailID: 0,
    };
   
    HelpDeskApi.getAllCheckInCheckOutList(
      params,
      res => {
        ProgressDialog.hide()
        const { Table } = res;
        console.log('Table', Table);
        if (Table) {
        let CheckInOutListing = []
          if (Array.isArray(Table)) {
            CheckInOutListing = [...Table]

            
          }else{
             CheckInOutListing = [
              {...Table}
            ];
          }
          this.setState({
            CheckInOutListing
          },()=>{
            console.log("this.state.remarksArray",this.state.CheckInOutListing)
          })
        }
      },
      () => {
        this.setState({
          CheckInOutListing:[]
        })
    ProgressDialog.hide()
      },
    );
  };
 
  inTime = (strDate)=>{
    let date = ""
    if(strDate){
      const TStartSplit =  strDate.split('T');
      const sDate =  TStartSplit[0]
      let time = TStartSplit[1]
      time = time.split(":")
      date =`${sDate} ${time[0]}:${time[1]}`
    }
    return date
  }

  outTime = (strDate)=>{
    let date = ""
    if(strDate){
      const TStartSplit =  strDate.split('T');
      const sDate =  TStartSplit[0]
      let time = TStartSplit[1]
      time = time.split(":")
      date =`${sDate} ${time[0]}:${time[1]}`
    }
    return date
  }

  renderDate = (date) => {
    return(
      <Text style={styles.time}>
        {date}
      </Text>
    );
  }

  render() {
    const {CheckInOutListing} = this.state
    return (

      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => this.props.navigation.goBack(),
          },
          title: 'My CheckIn',
          hideUnderLine: true,
          light: true,
        }}>

      <View style={styles.container}>
        <FlatList style={styles.list}
          data={CheckInOutListing||[]}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={(message) => {
            console.log(item);
            const item = message.item;
            let inMessage = item.type === 'in';
            let itemStyle = inMessage ? styles.itemIn : styles.itemOut;

            return (
              <View style={styles.main}>
              <View style={[styles.item, itemStyle]}>
                <View style={[styles.balloon]}>

                  <View style={{width:'100%',flexDirection:"row",flex:1,marginTop:ResponsivePixels.size5}}>
                  <Text style={{width:"50%",alignItems:"flex-start"}}>In Time</Text>
                  <Text style={{width:"50%",alignItems:"flex-start"}}>{this.inTime(item.CheckInTime)}</Text>
                  </View>
                  
                  <View style={{width:'100%',flexDirection:"row",flex:1,marginTop:ResponsivePixels.size5}}>
                  <Text style={{width:"50%",alignItems:"flex-start"}}>Out Time</Text>
                  <Text style={{width:"50%",alignItems:"flex-start"}}>{this.outTime(item.CheckOutTime)}</Text>
                  </View>

                  <View style={{width:'100%',flexDirection:"row",flex:1,marginTop:ResponsivePixels.size5}}>
                  <Text style={{width:"50%",alignItems:"flex-start"}}>Total Time Spent</Text>
                  <Text style={{width:"50%",alignItems:"flex-start"}}>{item.TotalTimeSpend} Hours</Text>
                  </View>
                  <View style={{width:'100%',flexDirection:"row",flex:1,marginTop:ResponsivePixels.size5}}>
                  <Text style={{width:"50%",alignItems:"flex-start"}}>Checkout - Remarks</Text>
                  <Text style={{width:"50%",alignItems:"flex-start"}}>{item.CheckoutRemarks}</Text>
                  </View>
                </View>
              
             
              </View>
             
              </View>
            )
          }}/>
      
      </View>
      </MainContainer>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  list:{
    paddingHorizontal: 17,
  },
  footer:{
    flexDirection: 'row',
    height:60,
    backgroundColor: '#eeeeee',
    paddingHorizontal:10,
    padding:5,
  },
  btnSend:{
    backgroundColor:Colors.headerTitleColor,
    width:40,
    height:30,
    borderRadius:360,
    alignItems:'center',
    justifyContent:'center',
    padding:ResponsivePixels.size5
  },
  iconSend:{
    width:25,
    height:25,
    alignSelf:'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    height:40,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    marginRight:10,
  },
  inputs:{
    height:40,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  balloon: {
   
  },
  itemIn: {
    alignSelf: 'flex-start'
  },
  itemOut: {
    alignSelf: 'flex-end'
  },
  time: {
    fontSize:12,
    color:"#808080",
    alignSelf: 'baseline',
    marginTop:ResponsivePixels.size10
  },
  item: {
    marginVertical: 14,
    flexDirection: 'row',
    borderRadius:300,
    width:"97%",
    padding: ResponsivePixels.size15,
  },
  main: {
    marginVertical: 14,
    backgroundColor:"#eeeeee",
    borderRadius:300,
    paddingLeft:ResponsivePixels.size5,
    width:"100%",
    padding: ResponsivePixels.size15,
    borderRadius: 20,
    flexDirection:'row', width:'100%'
  },
}); 
            