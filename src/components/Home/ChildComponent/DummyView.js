import React, {Component} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {
  MainContainer,
  ScrollContainer,
  Clickable,
  Button,
  EditText,
} from '../../common';
import {connect} from 'react-redux';
import styles from '../styles/Home.style';
import {Images, Colors} from '../../../utils';

class DummyView extends Component {

  render() {
    return (
      <MainContainer
        header={{
          title: '',
          hideUnderLine: true,
          light: true,
        }}>
        <View style={styles.MainHeaderView}>
          <View style={{alignItems:'center', marginTop: '50%'}}>
            <Text style={styles.firstTitle}>Under Development</Text>
          </View>
        </View>
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DummyView);
