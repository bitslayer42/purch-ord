import React, { Component } from 'react';
import axios from 'axios'; //ajax library
import moment from 'moment'; //date library
import Date from './Date';
import './Cal.css';

export default class Cal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      startDateStr: this.props.startDateStr,
      calendar: [],
    };  
    //this.onClick = this.onClick.bind(this);
  }
  ////////////////////////////////////////////////////////
  componentDidMount() { 
    if (this.props.startDateStr) {
      this.buildCal(this.props.startDateStr);
    }
  }
  ////////////////////////////////////////////////////////
  componentWillReceiveProps(nextProps) { 
    if (this.state.startDateStr !== nextProps.startDateStr) {
      this.buildCal(nextProps.startDateStr);
    }
  }
  ////////////////////////////////////////////////////////
  buildCal(startDateStr){ 
    let numDays = this.props.numDays;
    let startDate    = moment(startDateStr);
    let endDate      = startDate.clone().add(numDays-1, 'days');
    let endDateStr   = endDate.format("YYYY-MM-DD"); 
    let calendarObj = {};
    let counts = {};
    let arcgis_url = 'https://arcgis.ashevillenc.gov/arcgis/rest/services/Financials/Financials/FeatureServer/5/query?where='
      + 'create_date%20between%20%27'
      + startDateStr
      + '%27%20and%20%27'
      + endDateStr
      + '%27&outFields=create_date&f=json';

    for(let i=0;i<numDays;i++){
      let dt = startDate.utc().clone().add(i, 'days'); 
      calendarObj[dt.unix()*1000] = 
      {
        moment: dt, 
        display: dt.format("MMM DD"),
        dow: i%7,
        week: parseInt(i/7,10),
        count: 0,
      }
    }
  
    //Pull create_date list from Purch Ord Summary
    axios.get(arcgis_url)
    .then(res => { 
      const features = res.data.features; 

      //create assoc array keyed on date with counts as values
      counts = features.reduce((p, feat) => {
        let date = feat.attributes.create_date; //date in unix timestamp format
        if (!p.hasOwnProperty(date)) {
          p[date] = 0;
        }
        p[date]++;
        return p;
      }, {});

      //add counts
      let copyCal = Object.assign({}, calendarObj); //copy 
      
      //merge counts into calendar object
      Object.keys(counts).forEach(function(key) {    
        copyCal[key].count = counts[key]; 
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
    })
    .catch(err => {
      console.log(err);
    }); 
  }

  ////////////////////////////////////////////////////////
  render() {
    
    return (
      <div>
        {this.state.calendar.length>0 &&
        <div>
          <div className="Cal-cal">
            { /*day of week header*/ 
              this.state.calendar
              .filter((date,ix)=>{return ix < 7;})
              .map((date,ix) => {
                return (
                  <div key={ix} className="Cal-calbox">
                    { date.moment.format("ddd") }           
                  </div>
                )
              })
            } 
            {
              this.state.calendar.map((date,ix) => {
                return (
                <Date date={date} key={ix} onDateClick={this.props.onDateClick}/>
                )
              })
            } 
          </div>  
          Click a date to view orders.
        </div>
        }
      </div>      
    );
  }
}



