import { decode } from 'html-entities';
import React, { Component } from 'react';
import {
  StyleSheet, View
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Colors, Images } from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';
import { MainContainer } from '../../common';

export default class AnnouncementDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      detailedDescription:""
    };
  }


  componentDidMount() {
    let htmlContentn = this.props.route.params.item?.DetailedDescription
    htmlContentn = decode(htmlContentn)
    
    console.log("this.props.route.params.item.detailedDescription",htmlContentn)
    this.setState({
      detailedDescription:htmlContentn
    })
  }



  render() {
    // const { width } = useWindowDimensions();
    const {detailedDescription} = this.state
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => this.props.navigation.goBack(),
          },
          title: 'Announcement Details',
          hideUnderLine: true,
          light: true,
          isHome:true
        }}>

      <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: detailedDescription}}
      />
      {/* <RenderHTML contentWidth="100%"  source={{ detailedDescription }} /> */}
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
            