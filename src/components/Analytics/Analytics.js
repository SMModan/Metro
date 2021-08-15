import React, {Component} from 'react';
import {View, Text, ScrollView, Image, Dimensions} from 'react-native';
import {
  MainContainer,
  ScrollContainer,
  Clickable,
  Button,
  EditText,
  CustomDatePicker,
  ProgressDialog,
} from '../common';
import {connect} from 'react-redux';
import {Images, Colors, Utils} from '../../utils';
import {VictoryPie} from 'victory-native';
import {Chip, Card} from 'react-native-paper';
import ResponsivePixels from '../../utils/ResponsivePixels';
import AnalyticsApi from './apis/AnalyticsApi';
import moment from 'moment';

const windowWidth = Dimensions.get('window').width;
const ChartColors = {
  purple: '#A800F4',
  orange: '#FF9E2D',
  blue: '#2262F7',
  red: '#FF4B42',
  green: '#79C82E',
};

class Analytics extends Component {
  state = {
    selectedIndex: 0,
    StartDate: new Date(),
    EndDate: new Date(),
    chartsData: [
      {
        title: 'Product Category',
        data: [
          {x: ChartColors.purple, y: 25, legend: 'Purple'},
          {x: ChartColors.orange, y: 12.5, legend: 'Orange'},
          {x: ChartColors.blue, y: 22.5, legend: 'Blue'},
          {x: ChartColors.red, y: 15, legend: 'Red'},
          {x: ChartColors.green, y: 25, legend: 'Green'},
        ],
      },
      {
        title: 'Salesman',
        data: [
          {x: ChartColors.purple, y: 25, legend: 'Purple'},
          {x: ChartColors.orange, y: 37, legend: 'Orange'},
          {x: ChartColors.red, y: 18, legend: 'Red'},
          {x: ChartColors.green, y: 20, legend: 'Green'},
        ],
      },
    ],
  };

  onTextChanged = (key, value) => {
    this.setState({
      [key]: value,
    });
  };


  getRelatedToByEntityID = async (EntityID, flag) => {

    ProgressDialog.show();
    const list = await AnalyticsApi.getProductCategoryOppoprtunityData({
      EntityID,
      Prefix: '',
    });
    ProgressDialog.hide();
    if (flag) this.setState({RelatedList: list});
    else
      this.setState({
        RelatedList: list,
        EntityFieldID: '',
        EntityFieldName: '',
        ProductCategoryRes:{},
        SalesManWiseOppoRes:{},
        OpportunityStageOppoRes:{},
        ProductBrandOppoRes:{},
        SalesStageOppoRes:{},
        SourceWiseOppoRes:{},
        TerritoryWiseOppoRes:{}
      });
  };

  componentDidMount() {
     this.getProductCategoryOppoprtunity()

     this.getSalesManWiseOppoprtunity()
     this.getTerritoryWiseOpportunityDataForDashboardChart()
      this.GetSourceWiseOpportunityDataForDashboardChart()
     this.GetSalesStageWiseOpportunityDataForDashboardChart()
     this.GetProductBrandWiseOpportunityDataForDashboardChart()
     this.GetOpportunityStageWiseOpportunityDataForDashboardChart()
  }
  
  
  getProductCategoryOppoprtunity = () => {
    const {StartDate,EndDate} = this.state
    ProgressDialog.show()
    AnalyticsApi.getProductCategoryOppoprtunityData(
      {fromDate:StartDate?moment(StartDate).format("DD-MM-YYYY"):"",
      toDate:EndDate?moment(EndDate).format("DD-MM-YYYY"):""},
      res => {
        ProgressDialog.hide()
        console.log('res1 ====>', res.AmountChart);
        this.setState({
          ProductCategoryRes:res
        })
      },
      error => {
        ProgressDialog.hide()
        Utils.showToast(error);
      },
    );
  };

  
  getSalesManWiseOppoprtunity = () => {
    const {StartDate,EndDate} = this.state
    ProgressDialog.show()

    AnalyticsApi.GetSalesmanWiseOpportunityDataForDashboardChart(
      {fromDate:StartDate?moment(StartDate).format("DD-MM-YYYY"):"",
      toDate:EndDate?moment(EndDate).format("DD-MM-YYYY"):""},
      res => {
    ProgressDialog.hide()

        console.log('res2 ====>', res.AmountChart);
        this.setState({
          SalesManWiseOppoRes:res
        })
     
      },
      error => {
    ProgressDialog.hide()

        Utils.showToast(error);
      },
    );
  };

  getTerritoryWiseOpportunityDataForDashboardChart = () => {
    const {StartDate,EndDate} = this.state
    ProgressDialog.show()

    AnalyticsApi.GetTerritoryWiseOpportunityDataForDashboardChart(
      {fromDate:StartDate?moment(StartDate).format("DD-MM-YYYY"):"",
      toDate:EndDate?moment(EndDate).format("DD-MM-YYYY"):""},
      res => {
        console.log('res3 ====>', res.AmountChart);
    ProgressDialog.hide()
    this.setState({
      TerritoryWiseOppoRes:res
    })
   
      },
      error => {
    ProgressDialog.hide()

        Utils.showToast(error);
      },
    );
  };

  GetSourceWiseOpportunityDataForDashboardChart = () => {
    const {StartDate,EndDate} = this.state
    ProgressDialog.show()

    AnalyticsApi.GetSourceWiseOpportunityDataForDashboardChart(
      {fromDate:StartDate?moment(StartDate).format("DD-MM-YYYY"):"",
      toDate:EndDate?moment(EndDate).format("DD-MM-YYYY"):""},
      res => {
        console.log('res4 ====>', res.AmountChart);
    ProgressDialog.hide()
    this.setState({
      SourceWiseOppoRes:res
    })
  
      },
      error => {
    ProgressDialog.hide()

        Utils.showToast(error);
      },
    );
  };

  GetSalesStageWiseOpportunityDataForDashboardChart = () => {
    const {StartDate,EndDate} = this.state
    ProgressDialog.show()

    AnalyticsApi.GetSalesStageWiseOpportunityDataForDashboardChart(
      {fromDate:StartDate?moment(StartDate).format("DD-MM-YYYY"):"",
      toDate:EndDate?moment(EndDate).format("DD-MM-YYYY"):""},
      res => {
        console.log('res5 ====>', res.AmountChart);
    ProgressDialog.hide()
    this.setState({
      SalesStageOppoRes:res
    })
   
      },
      error => {
    ProgressDialog.hide()

        Utils.showToast(error);
      },
    );
  };

  GetProductBrandWiseOpportunityDataForDashboardChart = () => {
    const {StartDate,EndDate} = this.state
    ProgressDialog.show()

    AnalyticsApi.GetProductBrandWiseOpportunityDataForDashboardChart(
      {fromDate:StartDate?moment(StartDate).format("DD-MM-YYYY"):"",
      toDate:EndDate?moment(EndDate).format("DD-MM-YYYY"):""},
      res => {
        console.log('res6 ====>', res.AmountChart);
    ProgressDialog.hide()
    this.setState({
      ProductBrandOppoRes:res
    })
   
      },
      error => {
    ProgressDialog.hide()

        Utils.showToast(error);
      },
    );
  };



  
  GetOpportunityStageWiseOpportunityDataForDashboardChart = () => {
    const {StartDate,EndDate} = this.state
    ProgressDialog.show()

    AnalyticsApi.GetOpportunityStageWiseOpportunityDataForDashboardChart(
      {fromDate:StartDate?moment(StartDate).format("DD-MM-YYYY"):"",
      toDate:EndDate?moment(EndDate).format("DD-MM-YYYY"):""},
      res => {
    ProgressDialog.hide()

        console.log('res7 ====>', res.AmountChart);
        this.setState({
          OpportunityStageOppoRes:res
        })
      },
      error => {
    ProgressDialog.hide()

        Utils.showToast(error);
      },
    );
  };

  render() {
    const {StartDate, EndDate} = this.state;
    return (
      <MainContainer
        header={{
          left: {
            image: Images.ic_BackWhite,
            onPress: () => this.props.navigation.goBack(),
          },
          title: 'Analytics',
          hideUnderLine: true,
          light: true,
        }}>
        <ScrollContainer style={{flex: 1, backgroundColor: Colors.secondary50}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: 10,
              marginLeft: 15,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 13}}>Filter</Text>
            <View
              style={{
                height: ResponsivePixels.size10,
                width: 1,
                backgroundColor: Colors.secondary200,
                margin: 5,
              }}
            />
            <ScrollView horizontal={true}>
              {['Revnue', 'Count', 'Quantity'].map((item, index) => (
                <Chip
                  key={index}
                  style={{
                    margin: 5,
                    backgroundColor:
                      this.state.selectedIndex === index
                        ? Colors.Orange500
                        : Colors.secondary200,
                  }}
                  textStyle={{
                    fontSize: 13,
                    color:
                      this.state.selectedIndex === index
                        ? Colors.white
                        : Colors.black,
                  }}
                  onPress={() => {
                    this.setState({selectedIndex: index});
                  }}>
                  {item}
                </Chip>
              ))}
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 15,
            }}>
            <CustomDatePicker
              selectedDate={StartDate}
              onDateChanged={date => {
                this.onTextChanged('StartDate', date);
              }}
              label={'Start Date'}
              containerStyle={{flex: 1}}
            />
            <Text style={{color: '#1B2655', fontSize: 25}}> → </Text>
            <CustomDatePicker
              selectedDate={EndDate}
              onDateChanged={date => {
                this.onTextChanged('EndDate', date);
              }}
              label={'End Date'}
              containerStyle={{flex: 1}}
            />
          </View>

          {/* <Text style={{ fontWeight: '800', color:'#1B2655', fontSize: 16, marginLeft:15 }}>
            1 May’21
            <Text style={{color:'#1B2655', fontSize: 25 }}> → </Text>
            29 May’21
          </Text> */}
          {this.state.chartsData.map(cData => (
            <Card style={{margin: 15}}>
              <Text
                style={{
                  fontWeight: '900',
                  color: '#1B2655',
                  fontSize: 16,
                  marginLeft: 15,
                  marginTop: 15,
                }}>
                {' '}
                {cData.title}{' '}
              </Text>
              <VictoryPie
                colorScale={cData.data.map(d => d.x)}
                innerRadius={windowWidth * 0.15}
                animate={true}
                width={windowWidth * 0.85}
                height={windowWidth * 0.85}
                labels={({datum}) => ''}
                data={cData.data}
              />
              {cData.data.map(d => (
                <View
                  style={{
                    flexDirection: 'row',
                    margin: 10,
                    marginLeft: 30,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: d.x,
                      width: 25,
                      height: 25,
                      borderRadius: 8,
                    }}
                  />
                  <Text
                    style={{color: '#1B2655', fontSize: 16, marginLeft: 15}}>
                    {' '}
                    {`${d.legend}: ${d.y}%`}{' '}
                  </Text>
                </View>
              ))}
              <View style={{height: 20}} />
            </Card>
          ))}
        </ScrollContainer>
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
