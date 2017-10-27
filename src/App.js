import React, { Component } from 'react';
import axios from 'axios'; //ajax library
import moment from 'moment'; //date library
import './App.css';
//import Card from './Card';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      calendar: {},
      features: [],    //imported purchase order summary
      arcgis_url: '',
    };  
    //this.onClick = this.onClick.bind(this);
  }

  componentDidMount() { 
    this.createCal();
  }
  
  //Create 4 weeks of dates in an object
  createCal(){
    let numDays = 28;
    let startDateStr = '2017-06-04T00:00:00.000Z';
    let startDate    = moment(startDateStr);
    let endDate      = startDate.clone().add(numDays-1, 'days');
    let endDateStr   = endDate.format("YYYY-MM-DD"); 
    let calendar = {};
    let arcgis_url = 'https://arcgis.ashevillenc.gov/arcgis/rest/services/Financials/Financials/FeatureServer/5/query?where='
      + 'create_date%20between%20%27'
      + startDateStr
      + '%27%20and%20%27'
      + endDateStr
      + '%27&outFields=create_date&f=json';

    for(let i=0;i<numDays;i++){
      let dt = startDate.utc().clone().add(i, 'days'); 
      calendar[dt.unix()*1000] =  //.unix()*1000
      {
        moment: dt, 
        dow: i%7,
        week: parseInt(i/7,10),
        count: 0,
      }
    }
    this.setState({
      calendar,
      arcgis_url
    },()=> {
      //console.log('calendar',this.state.calendar); 
      this.fetchData();
    });
  }
  
  //Pull create_date list from Purch Ord Summary
  fetchData(){ 
    axios.get(this.state.arcgis_url)
    .then(res => { 
      const features = res.data.features; 

      //create assoc array keyed on date with counts as values
      var counts = features.reduce((p, feat) => {
        var date = feat.attributes.create_date; //date in unix timestamp format
        if (!p.hasOwnProperty(date)) {
          p[date] = 0;
        }
        p[date]++;
        return p;
      }, {});

      this.setState({
        features: counts
      },()=>{
        console.log('features',this.state.features);
        this.addCounts();
      });
    })
    .catch(err => {
      console.log(err);
    }); 
  }

  addCounts(){
    const features = this.state.features;
    let copyCal = Object.assign({}, this.state.calendar); //copy 
    
    //merge counts into calendar object
    Object.keys(features).forEach(function(key) {    
      copyCal[key].count = features[key]; 
    });

    //now that we have merged, convert it to array for display
    let newCal = Object.keys(copyCal).map(function(key) {
      return copyCal[key];
    });

    this.setState({
      calendar: newCal
    },()=>{
      console.log('calendar',this.state.calendar); 
    });
  }

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Development Services Department</h1>
          Calendar
        </header>
        <div className="App-body">
          <div className="App-cal">
          {
            // this.state.calendar
            // //.filter((feature)=>{return feature.properties.ut_station!==0;})
            // //.sort((a,b)=>{return parseInt(a.properties.ut_station, 10) - parseInt(b.properties.ut_station, 10)})
            // .map((date,ix) => {
            //   return (
            //     <div key={ix} style={{width:"800px",margin:"0 auto",position:"relative"}}>
            //       <div className="App-date">{moment(date.moment).format("MM/DD/YYYY")}</div>
            //     </div>
            //   )
            // })
          } 
          </div>        
        </div>
      </div>
    );
  }
}

export default App;
