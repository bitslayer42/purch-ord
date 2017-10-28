import React, { Component } from 'react';
import axios from 'axios'; //ajax library
//import moment from 'moment'; //date library
import './Orders.css';

export default class Orders extends Component {

  constructor(props) {
    super(props);

    this.state = {
      orderDate: this.props.orderDate, //moment
      orders: null,
    };  
    //this.onClick = this.onClick.bind(this);
  }
  ////////////////////////////////////////////////////////
  componentDidMount() { 
    if (this.props.orderDate) { 
      this.getData(this.props.orderDate);
    }
  }
  ////////////////////////////////////////////////////////
  componentWillReceiveProps(nextProps) { 
    if (!nextProps.orderDate) {
      this.setState({
        orders: null,
      });
    } else if (this.state.orderDate !== nextProps.orderDate) {
      this.getData(nextProps.orderDate);
    }
  }
  ////////////////////////////////////////////////////////
  getData(orderDate){ 
    let orderDateStr   = orderDate.format("YYYY-MM-DD"); 

    let arcgis_url = 'https://arcgis.ashevillenc.gov/arcgis/rest/services/Financials/Financials/FeatureServer/5/query?where='
      + 'create_date=%27'
      + orderDateStr
      + '%27&outFields=*&f=json';

    //Pull orders for this date from Purch Ord Summary
    axios.get(arcgis_url)
    .then(res => { 
      const features = res.data.features; 

      this.setState({
        orders: features
      },()=>{
        console.log('orders',this.state.orders); 
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
        {this.state.orders &&
        <div>
          <div className="Orders">
            { this.state.orders
              .map((order,ix) => {
                let ord = order.attributes;
                return (
                  <div key={ix} className="Orders-box">
                    <div className="Orders-item">
                      { ord.requisition_number }        
                    </div>   
                    <div className="Orders-item">
                      { ord.description }        
                    </div>   
                    <div className="Orders-item">
                      { ord.ordered_amount }        
                    </div>   
                  </div>
                )
              })
            } 
          </div>  
        </div>
        }
      </div>      
    );
  }
}



