import React, { Component } from 'react';
import './App.css';
import Cal from './Cal';
import CalStartDate from './CalStartDate';
import Orders from './Orders';
export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      calStartDate: "2017-06-04T00:00:00.000Z",
      orderDate: null,
    };  
    //this.onChange = this.onChange.bind(this); 
  }

  onChange = (event) => {
    this.setState({
      calStartDate: event.target.value,
      orderDate: null,
    },()=>{
      //console.log('calStartDate',this.state.calStartDate); 
    });
  }

  onDateClick = (event) => {
    console.log('dateclick',event); 
    this.setState({
      orderDate: event.moment
    },()=>{
      //console.log('orderDate',this.state.orderDate); 
    });
  }

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">City of Asheville</h1>
          Purchase Order Calendar
        </header>
        <div className="App-body">
          <p>
          Showing counts of purchase orders with given start date.
          
          </p>
          <CalStartDate calStartDate={this.state.calStartDate} onChange={this.onChange} />
          <Cal numDays="28" startDateStr={this.state.calStartDate} onDateClick={this.onDateClick}/>
          <Orders orderDate={this.state.orderDate} />
        </div>
      </div>
    );
  }
}

