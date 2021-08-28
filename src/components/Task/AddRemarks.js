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
import { Images,Colors } from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import { ImageButton, MainContainer,ProgressDialog } from '../common';
import TaskApi from './apis/TaskApi';


export default class AddRemarks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      TaskActivityID:this.props?.route?.params?.TaskActivityID || 0,
      remarksArray:[],
      remarks:''
    };
  }


  componentDidMount() {
    this.getAllActivityList()
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
  
  getAllActivityList = () => {
    const { TaskActivityID} = this.state
    ProgressDialog.show()

    const params = {
      TaskActivityID: TaskActivityID,
    };
   
    TaskApi.getAllRemarsk(
      params,
      res => {
        ProgressDialog.hide()
        const { Table } = res;
        console.log('Table', Table);
        if (Table) {
        let remarksArray = []
          if (Array.isArray(Table)) {
            for (let index = 0; index < Table.length; index++) {
              const _table = Table[index];
            const {ID,Remarks,RemarksDate,UserName} = _table
            const date = this.createdDate(RemarksDate)

            let obj =  {id:ID, date:date, type:'in',  message: Remarks,userName:UserName}
            remarksArray.push(obj)
            }
          }else{
            const {ID,Remarks,RemarksDate,UserName} = Table
            const date = this.createdDate(RemarksDate)
            let obj =  {id:ID, date:date, type:'in',userName:UserName,  message: Remarks}
            remarksArray.push(obj)
          }
          this.setState({
            remarksArray
          },()=>{
            console.log("this.state.remarksArray",this.state.remarksArray)
          })
        }
      },
      () => {
        this.setState({
          remarksArray:[]
        })
    ProgressDialog.hide()
      },
    );
  };
  deleteRemarks= (ID)=>{
    ProgressDialog.show()

    const params = {
      ID,
      delType:1
    };
   
    TaskApi.deleteRemarks(
      params,
      res => {
        ProgressDialog.hide()
        this.getAllActivityList()
      },
      () => {
    ProgressDialog.hide()
      },
    );
  }
  sendRemarks = ()=>{
    const { TaskActivityID,remarks} = this.state
    ProgressDialog.show()

    const params = {
      TaskActivityID: TaskActivityID,
      Remarks:remarks
    };
   
    TaskApi.sendRemarks(
      params,
      res => {
        ProgressDialog.hide()
        this.setState({
          remarks:""
        },()=>{
          this.getAllActivityList()
        })
        // const { Table } = res;
        // Utils.toas
      },
      () => {
    ProgressDialog.hide()
      },
    );
  }
  renderDate = (date) => {
    return(
      <Text style={styles.time}>
        {date}
      </Text>
    );
  }

  render() {
    const {remarksArray} = this.state
    return (

      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => this.props.navigation.goBack(),
          },
          title: 'Add Remarks',
          hideUnderLine: true,
          light: true,
        }}>

      <View style={styles.container}>
        <FlatList style={styles.list}
          data={remarksArray||[]}
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
                  <Text>{item.message}</Text>
                  <Text style={{marginTop:ResponsivePixels.size10}}>{item.userName}</Text>
                {inMessage && this.renderDate(item.date)}
                </View>
              
             
              </View>
              <ImageButton
                              source={Images.ic_close}
                              imageStyle={{
                                width: ResponsivePixels.size15,
                                height: ResponsivePixels.size15,
                                color:"#808080",
                                marginRight:ResponsivePixels.size30
                              }}
                              onPress={() => {
                                this.deleteRemarks(item?.id)
                              }}
                            />
              </View>
            )
          }}/>
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Write a message..."
                underlineColorAndroid='transparent'
                value={this.state.remarks}
                onChangeText={(remarks) => this.setState({remarks})}/>
          </View>

            <TouchableOpacity style={styles.btnSend} onPress={()=>{
              this.sendRemarks()
            }}>
              <Image source={{uri:"https://img.icons8.com/small/75/ffffff/filled-sent.png"}} style={styles.iconSend}  />
            </TouchableOpacity>
        </View>
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
    height:40,
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
            