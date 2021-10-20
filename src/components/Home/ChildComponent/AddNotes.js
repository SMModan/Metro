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
import { Card } from 'react-native-paper';
import { store } from '../../../App';
import { setSessionField } from '../../../reducers/SessionReducer';
import { Images,Colors } from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import { Clickable, ImageButton, MainContainer,ProgressDialog } from '../../common';


export default class AddNotes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      remarksArray:[],
      remarks:''
    };
  }


  componentDidMount() {
    // this.getAllActivityList()

    const note= store.getState().session.note

    if(note){
      let _todo = JSON.parse(note)
      this.setState({
        remarksArray:_todo
      })
  
    }
    
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
          title: 'Add Todo',
          hideUnderLine: true,
          light: true,
        }}>

      <View style={styles.container}>
        <FlatList style={styles.list}
          data={remarksArray||[]}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={(item) => {
            console.log(item.item.todo);
            let inMessage = 'in';
            let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
            const item_id = item.item.id
            return (
              <Card
        style={{margin: ResponsivePixels.size5}}
        key={item?.index}
        onPress={() => {

          let _todo = this.state.remarksArray
          var index = _todo.findIndex(
            function (o) {
              return o.id === item_id;
            },
          );
          if (index !== -1)
          _todo.splice(index, 1);
        
          this.setState({
            remarksArray: _todo,
          });
          let stringifyData = JSON.stringify(_todo)
          store.dispatch(setSessionField('note', stringifyData));
        }}>
        <View style={{margin: ResponsivePixels.size5, flexDirection: 'row',padding:ResponsivePixels.size10}}>
          <View
            style={{flexDirection: 'column', width: '100%', color: '#485780'}}>
            {/* <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: ResponsivePixels.size10 }}>{"12-12-2200"}</Text> */}
            <Text style={{fontSize: ResponsivePixels.size17, color: '#1B2655'}}>
              {item.item.todo}
            </Text>
          </View>
        </View>

{/* <Clickable onPress={()=>{
  alert("testing")
 

}}>
        <Image
                    source={Images.ic_close}
                    style={{
                      width: ResponsivePixels.size15,
                      height: ResponsivePixels.size15,
                      position: 'absolute',
                      bottom: 5,
                      right: 10,
                      tintColor:Colors.Red900
                    }}
                    resizeMode={'cover'}
                  />
                  </Clickable> */}
      </Card>
           
            )
          }}/>
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Write a Task..."
                underlineColorAndroid='transparent'
                value={this.state.remarks}
                onChangeText={(remarks) => this.setState({remarks})}/>
          </View>

            <TouchableOpacity style={styles.btnSend} onPress={()=>{
             const {remarksArray} = this.state
              let _todo = this.state.remarksArray
              _todo.push({
                id:_todo.length+1,
                todo:this.state.remarks
              })
              const stringifyData = JSON.stringify(_todo)
              store.dispatch(setSessionField('note', stringifyData));
              this.setState({
                remarksArray:_todo,
                remarks:""
              })
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
    flex:1,
    marginTop:ResponsivePixels.size20
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
    backgroundColor:Colors.Red900,
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
    backgroundColor:"#eeeeee",
    borderRadius:300,
    paddingLeft:ResponsivePixels.size5,
    width:"100%",
    padding: ResponsivePixels.size15,
    borderRadius: 20,
    flexDirection:'row', width:'100%'
  },
}); 
            