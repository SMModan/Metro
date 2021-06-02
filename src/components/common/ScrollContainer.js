import { Content } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';

export class ScrollContainer extends Component {
  render() {
    return (

      // // this.props.scrollEnabled ?
      // <Content style={{flex:1}} bounces={false} showsVerticalScrollIndicator={false} 
      // contentContainerStyle={{flexGrow:1}} keyboardShouldPersistTaps='handled'>
      //     <View style={{flex:1}}>
      //     {this.props.children}
      //     </View>
      // </Content>
      // // : <View style={{flex:1}}>
      // // {this.props.children}
      // // </View>

      <Content scrollEnabled={this.props.scrollEnabled || true}
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        {...this.props}
      >
        <View style={{ flex: 1 }}>
          {this.props.children}
        </View>
      </Content>

    )
  }
}

export default ScrollContainer