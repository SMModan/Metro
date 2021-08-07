import React, { Component } from 'react';
import {
  MainContainer,
} from '../common';
import { Image, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import { Colors, FontName, Images } from '../../utils'
import { ChildViews } from './AddHelpDesk';
import Solution from './Solution';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator();

class UpdateHelpDesk extends Component {

  render() {
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => this.props.navigation.goBack(),
          },
          title: 'Update Issue',
          hideUnderLine: true,
          light: true,
        }}>
        <Tab.Navigator
          initialRouteName="Issue"
          backBehavior="initialRoute"
          keyboardDismissMode="auto"
          tabBarOptions={{
            activeTintColor: 'white',
            labelStyle: { textTransform: 'none', fontSize: 15, fontFamily: FontName.regular, },
            style: { backgroundColor: Colors.secondary500 },
            showIcon: true,
            indicatorStyle: { backgroundColor: Colors.primaryColor500 },

          }}
        >
          <Tab.Screen
            name="Issue"
            component={ChildViews}
            options={{ title: 'Issue', tabBarIcon: ({ color }) => <Image style={{ tintColor: color, width: 16, height: 16, resizeMode: "contain" }} source={Images.ic_issue} /> }}
          />
          <Tab.Screen
            name="Solution"
            component={Solution}
            options={{ tabBarLabel: 'Solution', tabBarIcon: ({ color }) => <Image style={{ tintColor: color, width: 16, height: 16, resizeMode: "contain" }} source={Images.ic_solution} /> }}
          />
        </Tab.Navigator>
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateHelpDesk);
