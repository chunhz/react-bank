import React, { Component } from 'react';
import AccountBalance from './AccountBalance'
import {Link} from 'react-router-dom';
import axios from 'axios'


class Credits extends Component{
  constructor(props){
    super(props);
    this.state = {
      newCredit: 0,
      creData: [],
      todayDate: "",
      accountBalance: 0,
    }
  }
  componentDidMount = () => {
    this.fetchCredit();

    // Get today's date into yyyy-mm-dd format
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    const today = [year, month, day].join('-');
    this.setState({todayDate: today});
    this.props.newCre(-500)
  }
  fetchCredit = () => {
    // fetch to credit API
    axios.get(`https://moj-api.herokuapp.com/credits`)
    .then ((res) => {
      const data = res.data;
      console.log(data);
      this.setState({ creData: data})
    })
    .catch((err) => console.log(err));
  }

  // handles when submit button is clicked
  handleSubmitCredit = (event) => {
    event.preventDefault();
    
    console.log(this.state.newCredit)
    
    this.state.creData.map( (data) => { 
      this.props.newCre(this.state.newCredit);
      // if(data.description !== this.state.input) {
        let newObj = Object.assign({}, data); 
        newObj.date = this.state.todayDate;
        newObj.description = this.state.input; 
        newObj.amount = this.state.newCredit;
        this.setState({
          creData: [newObj, ...this.state.creData],
          input: "",
        });
        this.props.newCre(newObj.amount);
      // }
    });
    this.props.newCre(this.state.newCredit);
  }

  // when description input box has been entered
  handleChange = (event) => {
    this.setState({ input: event.target.value});
  }

  //// when amount input box has been entered
  handleAmount = (event) => {
    this.setState({ newCredit: event.target.value});
  }

 
  render(){

    const display = this.state.creData.map((data) => {
      return(
      <div>
        <div>
        <li>Transaction: {data.description}</li>
        <p>Credit: ${data.amount}</p>
        <p>At date: {data.date.substring(0, 10)}</p>
        </div>
        </div>
      )
    })
    return(
      <div> 
        <h1>Credits</h1>
        <p></p>
        <a>Today's Date: {this.state.todayDate}</a>
        <p></p>
        <div><Link to = "/" >Home</Link></div>
        <p></p>
          <p></p>
          <form onSubmit = {this.handleSubmitCredit}>
          <p></p>
          <strong><AccountBalance accountBalance={this.props.accountBalance}/> </strong>
          <p></p>
          <input type="text" name="newDebit" placeholder = "Enter Description Here " onChange={this.handleChange} />
          <input type="text" name="newDebit" placeholder = "Enter Amount Here " onChange={this.handleAmount} />
          <button onClick={this.handleSubmitCredit}>Add Credit</button>
           </form> 
          <p></p>
          <div><ul>{display}</ul></div>
      </div>
    
    )
  }
}

export default Credits;