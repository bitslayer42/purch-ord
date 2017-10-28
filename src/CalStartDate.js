import React, { Component } from 'react';

export default class CalStartDate extends Component {

  render() {
    
    return (
      <div>
        Calendar Start Date
        <select id="lang" onChange={this.props.onChange} value={this.props.calStartDate}>
            <option value="2017-06-04T00:00:00.000Z">06/04/2017</option>
            <option value="2017-07-02T00:00:00.000Z">07/02/2017</option>
            <option value="2017-07-30T00:00:00.000Z">07/30/2017</option>
            <option value="2017-08-27T00:00:00.000Z">08/27/2017</option>  
            <option value="2017-09-24T00:00:00.000Z">09/24/2017</option>
            <option value="2017-10-22T00:00:00.000Z">10/22/2017</option>            
        </select>
      </div>
    );
  }
}

