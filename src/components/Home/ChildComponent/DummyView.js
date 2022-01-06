import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import {
  MainContainer
} from '../../common';
import styles from '../styles/Home.style';

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
