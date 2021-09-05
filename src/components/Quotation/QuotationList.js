import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView,Image, ActivityIndicator, PermissionsAndroid } from 'react-native';
import {
  Clickable,
  MainContainer, MyFlatList,
} from '../common';
import { connect } from 'react-redux';
import styles from '../HomeDetails/styles/HelpDesk.style';
import { strings } from '../../language/Language';
import { Images, Colors, Utils } from '../../utils';
import { Card, Title, FAB } from 'react-native-paper';
import { push } from '../../navigation/Navigator';
import _ from "lodash"
import QuotationApis from './QuotationApis';
import { ProgressDialog} from '../common';
import RNFetchBlob from 'rn-fetch-blob';
import ResponsivePixels from '../../utils/ResponsivePixels';
// import RNShare from 'react-native-share';
import Share from 'react-native-share';

class QuotationList extends Component {

  state = {
    selectedIndex: 0,
    page: 0,
    totalCount: 0,
    refreshing: false,
    loading: true,
    loadMore: false,
    isLast: false,
    showSearch: false,
    searchQuery: false,
    listData: [],
    quotationCanExport:false
  };

  renderCell = ({ index }) => {
    const {quotationCanExport} = this.state
    const item = this.state.listData[index];
    
    console.log("itemitem=======>",item);
    var date = new Date(item.Date);
    date.toISOString().substring(0, 10);

    let myDate = `${date.getDay()}-${date.getMonth() + 1
      }-${date.getFullYear()}`;

    return (
  
      <Card  style={{ margin: 5 }} key={index}  onPress={()=>{
        this.props.navigation.push('QuotationView', { QuotationID:item.ID,QuotationNo:item.QuotationNo })
      }}>
      <View style={{ margin: 15 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 13, width: '80%', }}>{item.QuotationNo}</Text>
          <View style={{ width: '20%', backgroundColor: Colors.BlueColor50, borderRadius: 5 }}>
            <Text style={{ textAlign: 'center', fontSize: 12, color: Colors.BlueColor500,  margin: 3 }}>{myDate}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row',width:"100%" }}>
        <View style={{width:"90%" }}>
        <Title style={{ fontSize: 16, marginTop: 8 }}>Created By {item.QuotationOwnerName}</Title>
        <Text style={{ fontSize: 12, color: Colors.darkGray, }}>{item.OpportunityName}</Text>
        <Text style={{ fontSize: 15, color: Colors.darkGray, marginTop: 4 }}>{item.CustomerName}</Text>
        </View>

        {quotationCanExport ?<View style={{width:"10%",alignSelf:"flex-end",flexDirection:"row" }}>
          <Clickable 
          onPress={()=>{
            // this.downloadFile()
            this.getQuatationPDF(item.QuotationNo,item.ID,"download")
          }}>
        <Image source={Images.ic_download_arrow}
        style={{  resizeMode: 'stretch', marginRight:ResponsivePixels.size10,alignItems: 'flex-start',width:ResponsivePixels.size30,height:ResponsivePixels.size30}} />
      </Clickable>
      {/* <Clickable 
          onPress={()=>{
            // this.downloadFile()
            this.getQuatationPDF(item.QuotationNo,item.ID,"share")
          }}>
        <Image source={Images.ic_share} style={{  resizeMode: 'stretch',marginRight:ResponsivePixels.size10, alignItems: 'flex-start',width:ResponsivePixels.size30,height:ResponsivePixels.size30}} />
        </Clickable> */}
        </View>:null}
        
        </View>

      </View>
    </Card>
    );
  };

  
  getQuatationPDF = (QuotationNo, QuotationID,type) => {

    console.log("QuotationNo",QuotationNo)
    console.log("QuotationID",QuotationID)
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
        },()=>{

          if(FilePath){
            this.downloadFile(FilePath,type)
            }
        });
        console.log('uri ===>', FilePath);
      },
      error => {
        ProgressDialog.hide();

        // let totalPage = this.state.totalCount / 10
        // let isLast = this.state.page == totalPage
        Utils.showToast(error);
      },
    );
  };


  componentDidMount = () => {
    const quotationCanExport =this.props.session.quotationCanExport

    this.setState({
      quotationCanExport
    },()=>{
      this.getAllQuatation()
    })
  }


  searchOpp = async () => {
    this.getAllQuatation()

  }

  searchOppDelayed = _.debounce(this.searchOpp, 1000)

  getAllQuatation = () => {
    const { searchQuery } = this.state
    const params = {
      PageIndex: this.state.page,
      PageSize: 10,
      Filter: searchQuery || ""
    }
    this.setState({
      loading: !this.state.refreshing && !this.state.loadMore
    })
    ProgressDialog.show()

    QuotationApis.getAllQuotation(params, (res) => {
      if(res){
        const { Table } = res
        console.log("Table", Table)
        let isLast = true
        if (Table) {
          ProgressDialog.hide()
  
          if (Array.isArray(Table)) {
  
          this.setState({ totalCount: Table[0].TotalCount })
          let totalPage = Table[0].TotalCount / 10
          isLast = this.state.page == totalPage
          this.setState({
            listData: this.state.page > 0 ? [...this.state.listData, ...Table] : Table,
            loading: false, refreshing: false, loadMore: false, isLast
          })
        } else {
          this.setState({
            loading: false, refreshing: false, loadMore: false, isLast: true
          })
        }
      }else{
        let results = [
          {...Table}
        ];
        this.setState({
          listData: results,
          loading: false, refreshing: false, loadMore: false, isLast
        })
      }
      }else{
        this.setState({
          listData: results,
          loading: false, refreshing: false, loadMore: false, isLast
        })
      }
     
    }, () => {
      ProgressDialog.hide()
      this.setState({
        loading: false, refreshing: false, loadMore: false, isLast:true
      })
    })
  }

  actualDownload = (FilePath,type) => {
    const { dirs } = RNFetchBlob.fs;
   RNFetchBlob.config({
     fileCache: true,
     addAndroidDownloads: {
     useDownloadManager: true,
     notification: true,
     mediaScannable: true,
     title: `Quotation.pdf`,
     path: `${dirs.DownloadDir}/Quotation.pdf`,
     },
   })
     .fetch('GET', FilePath, {})
     .then((res) => {
       if(type!='download'){
        console.log('The file saved to ', res.path());
        this.ShareMessage(res.path())
       }
       
     })
     .catch((e) => {
       console.log(e)
     });
 }
 
 shareBill = async (title,billPdfPath) => {

  if (!billPdfPath) {
    return;
  }

  // const newPath = `${RNFetchBlob.fs.dirs.CacheDir}/${title}.pdf`;

  // await RNFetchBlob.fs.cp(billPdfPath, newPath);

  const shareOptions = {
    title: title,
    subject: `${strings('emailSubject')} – ${title}`,
    message: `${title} bill`,
    url: `file://${billPdfPath}`,
    type: 'application/pdf',
    failOnCancel: true,
  };

  try {
    await RNShare.open(shareOptions);
  } catch (err) {
    // do something here
  } finally {
    RNFetchBlob.fs.unlink(newPath);
  }
};


ShareMessage = async (file) => {
  try {
    await Share.share({
     title: 'Share',
     message: 'About.pdf',
     subject: 'Share information from your application',
     url: `file://${file}`,
    });
  } catch (error) {
    console.log(error.message);
  }
};


 downloadFile =async (FilePath,type) => {
   try {
       const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         this.actualDownload(FilePath,type);
       } else {
         Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
       }
     } catch (err) {
       console.warn(err);
     } 
 }


  render() {
    const { listData, refreshing, loading, loadMore, isLast, showSearch } = this.state
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => this.props.navigation.goBack(),
          },
          title: 'Quotation',
          hideUnderLine: true,
          light: true,
          onClickSearch: () => {
            this.searchOpp()
          },
          onChangeSearch: (text) => {
            this.setState({ searchQuery: text })
          },
          onCloseSearch: () => {
            this.setState({ showSearch: false, searchQuery: "", page: 0, refreshing: true, }, () => {
              this.getAllQuatation()
            })
          },
          showSearch,
          right: [{ image: Images.ic_Search, onPress: () => this.setState({ showSearch: true }), }],
        }}>
        <View style={styles.MainHeaderView}>
          <View style={styles.MainList}>
            <MyFlatList
              data={listData}
              renderItem={item => this.renderCell(item)}
              style={{ flex: 1, margin: 10 }}
              loading={loading}
              refreshing={refreshing}
              onRefresh={() => {
                this.setState({
                  page: 0,
                  refreshing: true
                }, () => {
                  this.getAllQuatation()
                })
              }}
              footerComponent={() => {
                return (loadMore ? <ActivityIndicator size={"large"} color={Colors.blueGray900} style={{ margin: 8 }} /> : null)
              }}
              onEndReached={() => {
                console.log("End")

                if (!loadMore && !isLast) {
                  this.setState({
                    page: this.state.page + 1,
                    loadMore: true
                  }, () => {
                    this.getAllQuatation()
                  })
                }
              }}
            />
          </View>
        </View>
        {/* <FAB
          style={styles.fab}
          icon="plus"
          color={Colors.white}
          onPress={() => {
            this.props.navigation.push('AddOpportunity')
          }}
        /> */}
      </MainContainer>
    );
  }
}


const mapStateToProps = (state) => ({
  session: state.session
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(QuotationList);
