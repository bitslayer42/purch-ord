import React, { Component } from 'react';
import axios from 'axios'; //ajax library
import moment from 'moment'; //date library
import './App.css';
//import Card from './Card';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      calendar: [],
      features: [], //imported purchase order summary
    };  
    //this.onClick = this.onClick.bind(this);
  }

  componentDidMount() { 
    this.createCal();
    this.fetchData();
  }
  
  createCal(){
    let startDate = moment('2017-06-04T00:00:00.000Z');
    let calDates = [];
    for(let i=0;i<28;i++){
      let dt = moment(startDate).add(i, 'days');
      calDates.push(
        {unix: dt.unix(),
         moment: dt, 
         dow: i%7,
         week: parseInt(i/7,10)}
      )
    }
    this.setState({
      calendar: calDates
    },()=>{console.log('calendar',this.state.calendar)});
  }
  
  //Pull create_date list from Purch Ord Summary
  fetchData(){ 
    axios.get('https://arcgis.ashevillenc.gov/arcgis/rest/services/Financials/Financials/FeatureServer/5/query?where=create_date%20%3E=%20%272017-06-04T00:00:00.000Z%27&outFields=create_date&f=json')
    .then(res => { 
      const features = res.data.features; 
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
      },()=>{console.log('features',this.state.features)});
    })
    .catch(err => {
      console.log(err);
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
          {/* {}
        {
          this.state.features
          //.filter((feature)=>{return feature.properties.ut_station!==0;})
          //.sort((a,b)=>{return parseInt(a.properties.ut_station, 10) - parseInt(b.properties.ut_station, 10)})
          .map((feature,ix) => {
            return (
              <div key={ix} style={{width:"800px",margin:"0 auto",position:"relative"}}>
                <div className="App-ut-num">{moment(feature.attributes.create_date).format("MM/DD/YYYY")}</div>
              </div>
            )
          })
        }          */}
        </div>
      </div>
    );
  }
}

export default App;
