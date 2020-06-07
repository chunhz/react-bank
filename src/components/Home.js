import React, { Component } from 'react';
import AccountBalance from './AccountBalance'
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
        <div>
          <img src="https://letstalkpayments.com/wp-content/uploads/2016/04/Bank.png" alt="bank"/>
          <h1>Bank of React</h1>
          <strong><AccountBalance accountBalance = {this.props.accountBalance}/> </strong>
          <div><Link></Link></div>
          <div><Link to = "/UserProfile">User Profile</Link></div>
          <div><Link to = "/Login">Log In</Link></div>
          <div><Link to = "/Debits">Debits</Link></div>
          <div><Link to = "/Credits">Credits</Link></div>
        </div>
    );
  }
}

export default Home;