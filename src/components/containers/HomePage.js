import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/homeActions';
import ReactEcharts from 'echarts-for-react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
var moment = require('moment');

var jsonArray = [
	{
		id: 1,
		nickname: "norwaySalmonWeekly",
		category: "Salmonids",
		specie: "Atlantic salmon",
		origin: "Norway",
		type: "farmed",
		title: "Norwegian farmed salmon, Fish Pool Index",
		short_title: "Atlantic salmon, Norway",
		prices: [
		57.44,
		58.61,
		57.56,
		60.74,
		66.85,
		70,
		59.78,
		60.41,
		70.04,
		75.62,
		72.38,
		69.52,
		78.74,
		78.17,
		68.44,
		60.75,
		58.87,
		60.39,
		59.33,
		null,
		57.46,
		55.56,
		52.62,
		53.54,
		55.45,
		60.98,
		null,
		64.86,
		65.88,
		63.89,
		61.9,
		66.86,
		64.84,
		66.18,
		69.44,
		74.9,
		79.37,
		78.75,
		79.69,
		75.83,
		74.37,
		71.22,
		65.96,
		65.27,
		64.66,
		63.29,
		59.17,
		58.3,
		63.22,
		64.18,
		63.57,
		62.81,
		64.91,
		65.52,
		62.94,
		66.64,
		72.39,
		74.69,
		74.27,
		67.36,
		71.81,
		68.81,
		71.06,
		70.73,
		65.46,
		63.86,
		65.06,
		60.64,
		null,
		56.75,
		53.07,
		54.34,
		51.97,
		53.03,
		50.94,
		52,
		54.81
		],
		caption: "NOK per kilo",
		currency: "NOK",
		frequency: "weekly",
		color: "seagreen",
		description: "The Fish Pool Index reflects the average weekly spot price of buying and selling of fresh Atlantic Salmon, FCA Oslo, for salmon of 3-6 kilos, superior quality, head-on gutted. The index is composed of the following three elements: the Nasdaq Salmon Index, Statistics Norway’s customs statistics and the Fish Pool European Buyers Index. Prices are in Norwegian krone (NOK) per kilo. The most recent price is often preliminary and may be updated at a later stage. <a href='http://fishpool.eu/price-information/spot-prices/fish-pool-index/'>Click here</a> for more details on how the index is calculated.",
		size: "3-6kg",
		point_of_trade: "FCA Oslo",
		firstYear: 2016,
		firstWeek: 15
	},
	{
	id: 116,
	nickname: "thaishrimp_80_weekly",
	category: "Shellfish",
	specie: "Pandalus vannamei",
	origin: "Thailand",
	type: "farmed",
	title: "Thailand vannamei ex-farm, 80 pieces/kg",
	short_title: "Vannamei, Thailand",
	prices: [
	132.5,
	127.5,
	127.5,
	130,
	137.5,
	147.5,
	162.5,
	167.5,
	165,
	170,
	167.5,
	170,
	171,
	170,
	165,
	167.5,
	167.5,
	167.5,
	155,
	162.5,
	160,
	160,
	152.5,
	140,
	142.5,
	140,
	137.5,
	137.5,
	140,
	152.5,
	157.5,
	162.5,
	162.5,
	167.5,
	177.5,
	180,
	177.5,
	182.5,
	187.5,
	187.5,
	181.5,
	180,
	177.5,
	187.5,
	190,
	182.5,
	187.5,
	187.5,
	175,
	157.5,
	157.5,
	155,
	150,
	144.5,
	140,
	147.5,
	157.5,
	155,
	155,
	160,
	157.5,
	157.5,
	155,
	155,
	157.5,
	157.5,
	155,
	152.5,
	152.5,
	152.5,
	160,
	157.5,
	155,
	152.5,
	152.5,
	152.5,
	147.5
	],
	caption: "THB per kilo",
	currency: "THB",
	frequency: "weekly",
	color: "emerald",
	description: "Ex-farm prices of vannamei, standard grade, size 80 pieces per kilo. Prices are in Thai baht per kilo. The figures are averages of weekly price ranges from the Talay Thai market, the largest shrimp auction market in central Thailand, as provided to Undercurrent News by sources. Shrimp at the Talay Thai market, located in Samut Sakorn province, are supplied from farms throughout Thailand.",
	size: "80 pcs/kg",
	point_of_trade: "Thailand, markets",
	firstYear: 2016,
	firstWeek: 16
	},
	{
	id: 120,
	nickname: "coldwaterIceland_150_250",
	category: "Shellfish",
	specie: "Pandalus borealis",
	origin: "Iceland",
	type: "wild",
	title: "Iceland cooked and peeled coldwater shrimp, 150/250",
	short_title: "Coldwater shrimp, Iceland",
	prices: [
	7.4,
	7.2,
	7.4,
	7.4,
	7.7,
	7.7,
	7.7,
	7.8,
	7.9,
	7.8,
	7.4,
	7.4,
	7.4,
	7.8,
	8,
	8.5,
	8.9
	],
	caption: "GBP per kilo",
	currency: "GBP",
	frequency: "monthly",
	color: "lightPink",
	description: "Cooked and peeled coldwater shrimp (Pandalus borealis) from Iceland, 150/250, gross weight prices in British pound per kilo. Prices provided by industry sources. NB: The most recent price is often preliminary and may be updated at a later stage.",
	size: "150/250",
	point_of_trade: "United Kingdom",
	firstYear: 2017,
	firstWeek: 30
	}
];

export class HomePage extends React.Component {

  // Setting state of selected options
  state = {
    selectedOption: '',
    title: 'Atlantic salmon, Norway Dataset'
  }

  //On dropdown change of dates the graph updates the prices and dates its displaying
  handleChange = (selectedOption) => {
    var prices = jsonArray[parseInt(selectedOption.value)].prices;
    var week = jsonArray[parseInt(selectedOption.value)].firstWeek;
    var year = jsonArray[parseInt(selectedOption.value)].firstYear;
    this.setState({selectedOption, currentPrices: prices, currentDates: this.generateDates(prices, week, year), title: selectedOption.label})
  }

  //Load first dataset into the graph
  componentWillMount() {
      var prices = jsonArray[0].prices;
      var week = jsonArray[0].firstWeek;
      var year = jsonArray[0].firstYear;
      this.setState({currentPrices: prices, currentDates: this.generateDates(prices, week, year)})
  }

  //Function to generate datepoints on x axis

  generateDates(prices, week, year) {
    var dateArray = [];
    for(var i = 0; i < prices.length; i++) {
      if(week > 52) {
        week = 0;
        year++;
      }
      dateArray.push(moment().year(year).week(week).format("ll"));
      week++;
    }
    return dateArray;
  }


  //Manages the options for the chart, and holds state placeholders for Title, Xaxis and the series price data
  getOption = () => {
    return {
      title: {
        text: this.state.title
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:['Current Chart']
      },
      toolbox: {
        feature: {
          saveAsImage: {title:'Save Graph' }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : this.state.currentDates //price dates
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'Price',
          type:'line',
          stack: '',
          areaStyle: {normal: {}},
          data:this.state.currentPrices //prices here
        }
      ]
    };
  };

  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;


    return (
      <div className='parent' style={{marginTop: '5vh'}}>
        <h3> Viewing: {this.state.title} </h3>
        <h5> Select from the dropdown to see another dataset </h5>
        <Select
          name="form-field-name"
          value={value}
          onChange={this.handleChange}
          options={[
            { value: '0', label: 'Atlantic salmon, Norway Dataset' },
            { value: '1', label: 'Vannamei, Thailand' },
            { value: '2', label: 'Coldwater shrimp, Iceland' },
          ]}
        />
        <br/>
        <ReactEcharts
          option={this.getOption()}
          style={{height: '350px', width: '100%'}}
          className='react_for_echarts' />



      </div>
    );
  }
}

HomePage.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
