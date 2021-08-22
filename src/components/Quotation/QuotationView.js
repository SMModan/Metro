import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {MainContainer, MyFlatList, ProgressDialog} from '../common';
import {connect} from 'react-redux';
import styles from '../HomeDetails/styles/HelpDesk.style';
import {strings} from '../../language/Language';
import {Images, Colors, Utils} from '../../utils';
import {Card, Title, FAB} from 'react-native-paper';
import {goBack, push} from '../../navigation/Navigator';
import _ from 'lodash';
import QuotationApis from './QuotationApis';
import Pdf from 'react-native-pdf';

class QuotationView extends Component {
  state = {
    QuotationID: this.props?.route?.params?.QuotationID || 0,
    QuotationNo: this.props?.route?.params?.QuotationNo || 0,
    FilePath: '',
    uriObj: {},
  };

  componentDidMount = () => {
    this.getQuatationPDF();
  };

  getQuatationPDF = () => {
    const {QuotationNo, QuotationID} = this.state;
    const params = {
      QuotationNo,
      QuotationID,
    };
    ProgressDialog.show();

    QuotationApis.getQuotationPDF(
      params,
      res => {
        const {FilePath} = res;
        console.log('FilePath', FilePath);
        ProgressDialog.hide();

        const uriObj = {
          uri: FilePath,
          cache: true,
        };

        this.setState({
          uriObj,
          FilePath,
        });
        console.log('uri ===>', uriObj);
      },
      error => {
        ProgressDialog.hide();

        // let totalPage = this.state.totalCount / 10
        // let isLast = this.state.page == totalPage
        Utils.showToast(error);
      },
    );
  };

  render() {
    const {FilePath, uriObj} = this.state;
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => goBack(),
          },
          title: 'View Quotation',
          hideUnderLine: true,
          light: false,
        }}>
        <View style={styles.MainHeaderView}>
          <View style={styles.MainList}>
            {FilePath ? (
              <Pdf
                source={uriObj}
                onLoadComplete={(numberOfPages, uriObj) => {
                  console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                  console.log(`current page: ${page}`);
                }}
                onError={error => {
                  Utils.showToast(error);
                }}
                style={{flex: 1}}
              />
            ) : null}
          </View>
        </View>
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(QuotationView);
