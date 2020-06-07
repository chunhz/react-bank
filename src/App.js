import React, {Component} from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Debits from './components/Debits';
import Credits from './components/Credits';
import AccountBalance from './components/AccountBalance';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      },
      newCredit: 0,
      newDebit: 0,
      newAmount: 0,
    }
  }

handleDebit = (amount) => {
        this.setState({
          newAmount: amount,
          accountBalance: this.state.accountBalance - this.state.newAmount,
        });
}

handleCredit = (amount) => {
  this.setState({
    newAmount: amount,
    accountBalance: this.state.accountBalance - this.state.newAmount,
  })
}
  
  render() {
    const HomeComponent = () => (
    <Home accountBalance = {this.state.accountBalance} />
    )
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}/>
  );

    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>)
    
    const CreditComponent = () => (
      <div>
      <Credits 
      credit = {this.state.newCredit} 
      newCre = {this.handleCredit} 
      accountBalance = {this.state.accountBalance}
      />
      </div>
    )

    const DebitComponent = () => (
      <Debits 
      debit = {this.state.newDebit} 
      newDeb = {this.handleDebit}
      accountBalance = {this.state.accountBalance}
      />
      )
    return (
        <Router>
          <Switch>
            <Route exact path = "/" render={HomeComponent}/>
            <Route exact path = "/UserProfile" render ={UserProfileComponent} />
            <Route exact path = "/Login" render = {LogInComponent}/>
            <Route exact path = "/Debits" render = {DebitComponent}/>
            <Route exact path = "/Credits" render = {CreditComponent} />
          </Switch> 
        </Router>
    );
  }
}

export default App;