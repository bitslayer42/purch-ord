import React, { Component } from 'react';

export default class Date extends Component {

  ////////////////////////////////////////////////////////
  onClick = (event) => { 
      this.props.onDateClick(this.props.date);
  }
  ////////////////////////////////////////////////////////

  render() {
    let date = this.props.date;
    return (
      <div className="Cal-date Cal-calbox" onClick={this.onClick}>
        <div className="Cal-date-head">
        { date.display }
        </div>
        {date.count>0 &&
        (
        <div className="Cal-count">
          {date.count}<br/>
          {date.count===1?"Order":"Orders"}
        </div>
        )
      }
      </div>
    )
  }
}
