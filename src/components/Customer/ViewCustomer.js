import React, { Component } from 'react'
import { Text, View,Image } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Images } from '../../utils';
import {
    MainContainer
  } from '../common';
export class ViewCustomer extends Component {
    render() {
        return (
            <MainContainer
            header={{
              left: {
                image: Images.ic_BackWhite,
                onPress: () => this.props.navigation.goBack(),
              },
              title: 'View Customer',
              hideUnderLine: true,
              light: true,
            }}>


        <View style={{ padding: 4 ,marginTop:15,marginLeft:15}}>
        <View style={{backgroundColor:'#F1F5FB',borderRadius:5, width:180,textAlign:'center',marginTop:20,}}>
        <Text style={{ textAlign: 'left', fontSize: 19,color:'$687799',margin:2}}>Customer Category</Text>
        </View>

        <Text style={{ textAlign: 'left', fontSize: 25,marginTop:15,color:'$1B2655'}}>ITC's Group</Text>
        <Text style={{ textAlign: 'left', fontSize: 16,marginTop:20,color:'$485780'}}>Megha shah</Text>
        <View style={{backgroundColor:'#F1F5FB',borderRadius:5, width:140,textAlign:'center',marginTop:20,}}>
        <Text style={{ textAlign: 'left', fontSize: 19,color:'$687799',margin:2}}>Customer Type</Text>
        </View>
        <Text style={{ textAlign: 'left', fontSize: 16,marginTop:35,color:'$1B2655'}}>CONTACT</Text>

        <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop:25
        }}>
                <Image source={Images.ic_Call} style={{width:25,height:25,resizeMode:'contain',}} />

            <Text style={{
                    fontSize: 19,
                    color: "black",
                    marginLeft:10,
                    color:'#485780'
                }}>9725499721</Text>
        </View>

        <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop:25
        }}>
                <Image source={Images.ic_Email} style={{width:25,height:25,resizeMode:'contain',}} />

            <Text style={{
                    fontSize: 19,
                    color: "black",
                    marginLeft:10,
                    color:'#485780'
                }}>shahilce@gmail.com</Text>
        </View>
        </View>
          </MainContainer>
        )
    }
}

export default ViewCustomer
