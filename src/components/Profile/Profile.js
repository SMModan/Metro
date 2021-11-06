import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import {Card} from 'react-native-paper';
import { goBack } from '../../navigation/Navigator';

import {Images, Colors} from '../../utils';
import ResponsivePixels from '../../utils/ResponsivePixels';
import {MainContainer, ProgressDialog} from '../common';
import UserProfileApi from './Api/UserProfileApi';

export default class Profile extends Component {
constructor(props) {
    super(props)

    this.state = {
         data:{}
    }
}



componentDidMount() {
    this.getProfile()
}






    
  getProfile = () => {
    ProgressDialog.show();

    UserProfileApi.GetBasicUserProfile(
      {},
      res => {
        ProgressDialog.hide();

        if (res) {
          const Table = res.Table;
          if (Table) {
         console.log("Table",Table)
         this.setState({
             ...Table
         })
          }
        }
      },
      () => {
        ProgressDialog.hide();
      },
    );
  };
  render() {
        //  {"DOB": "1985-07-18", "Department": "IT", "DesignationName": "ERP - CRM Head", "Email": "Harshil.Thaker@metrotelworks.com", "Id": 2, "MobileNo1": 9824555637,
        //  "Name": "Harshil Thaker - MT-W-1075", "Phone1": ""}
const {DOB,Department,DesignationName,Email,MobileNo1,Name} = this.state
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => goBack(),
          },
          title: 'Profile',
          hideUnderLine: true,
          light: true,
          isHome: true,
        }}>
        <Card
          style={{
            marginTop: ResponsivePixels.size25,
            marginLeft: ResponsivePixels.size15,
            marginRight: ResponsivePixels.size15,
            marginBottom: ResponsivePixels.size15,
          }}>
              <View 
               style={{
                width: ResponsivePixels.size150,
                height: ResponsivePixels.size150,
                borderColor: Colors.secondary500,
                backgroundColor:Colors.secondary500,
                margin:ResponsivePixels.size15,
                borderWidth: 2,
                borderRadius: 75,
                alignSelf: 'center',
                alignItems:"center",
                alignContent:"center",
                justifyContent:"center"
              }}>

<Image
            source={Images.ic_Person}
            style={{
              width: ResponsivePixels.size90,
              height: ResponsivePixels.size90,
                tintColor:Colors.white
            }}
            resizeMode={'contain'}
          />


              </View>
     
              <Text
                  style={{
                    fontSize: ResponsivePixels.size25,
                    color: Colors.Red900,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: ResponsivePixels.size15,
                    marginBottom:ResponsivePixels.size5

                  }}>
                  {Name}
                </Text>

                
              <Text
                  style={{
                    fontSize: ResponsivePixels.size20,
                    color: Colors.gray,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  {DesignationName}
                </Text>

                <Text
                  style={{
                    fontSize: ResponsivePixels.size20,
                    color: Colors.gray,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginTop: ResponsivePixels.size5,
                    marginBottom:ResponsivePixels.size10
                  }}>
                  {Department}
                </Text>
        </Card>

        <Card style={{margin: ResponsivePixels.size10,
        padding:ResponsivePixels.size20}}>
        <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginTop: ResponsivePixels.size10,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: ResponsivePixels.size40,
                  height: ResponsivePixels.size40,
                  borderRadius: 100 / 2,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.Red900,

                }}>
                <Image
                  source={Images.ic_Call}
                  style={{
                    width: ResponsivePixels.size20,
                    height: ResponsivePixels.size20,
                    tintColor:Colors.white
                  }}
                  resizeMode={'center'}
                />
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: ResponsivePixels.size20,
                }}>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size17,
                    color: Colors.grayColor,
                  }}>
                  Phone Number
                </Text>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size17,
                    color: Colors.black,
                    fontWeight: 'bold',
                  }}>
                 {MobileNo1}
                </Text>
              </View>
            </View>


            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginTop: ResponsivePixels.size10,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: ResponsivePixels.size40,
                  height: ResponsivePixels.size40,
                  borderRadius: 100 / 2,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.Red900,
                }}>
                <Image
                  source={Images.ic_Email}
                  style={{
                    width: ResponsivePixels.size20,
                    height: ResponsivePixels.size20,
                    tintColor:Colors.white
                  }}
                  resizeMode={'center'}
                />
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: ResponsivePixels.size20,
                }}>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size17,
                    color: Colors.grayColor,
                  }}>
                  Email
                </Text>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size17,
                    color: Colors.black,
                    fontWeight: 'bold',
                  }}>
                 {Email}
                </Text>
              </View>
            </View>


            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginTop: ResponsivePixels.size10,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: ResponsivePixels.size40,
                  height: ResponsivePixels.size40,
                  borderRadius: 100 / 2,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.Red900,
                }}>
                <Image
                  source={Images.ic_dob}
                  style={{
                    width: ResponsivePixels.size20,
                    height: ResponsivePixels.size20,
                    tintColor:Colors.white
                  }}
                  resizeMode={'center'}
                />
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: ResponsivePixels.size20,
                }}>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size17,
                    color: Colors.grayColor,
                  }}>
                  Birth Date
                </Text>
                <Text
                  style={{
                    fontSize: ResponsivePixels.size17,
                    color: Colors.black,
                    fontWeight: 'bold',
                  }}>
                 {DOB}
                </Text>
              </View>
            </View>
        </Card>
      </MainContainer>
    );
  }
}
