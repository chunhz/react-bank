import React, { Component } from 'react';
import AccountBalance from './AccountBalance'
import {Link} from 'react-router-dom';
import axios from 'axios';

class Debits extends Component{
  constructor(props){
    super(props);
    this.state = {
      debitAmount: null,
      dataArr: [],
      input: "",
      todayDate: "",
      newDebit: 0,
      accountBalance: 0,
    }
    
  }
  // Calls the API when component is mounted
  componentDidMount = () =>{
    this.fetchDebit();
    
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
    this.props.newDeb(320.34)
  }

  // Fetches the API and restore it into dataArr
  fetchDebit = () => {

    axios.get(`https://moj-api.herokuapp.com/debits`)
    .then ((res) => {
      const data = res.data;
      console.log(data);
      this.setState({ dataArr: data})
    })
    .catch((err) => console.log(err));
  }
  
  handleSubmitDebit = (event) => {
    event.preventDefault();
    this.props.newDeb(this.state.newDebit);
    console.log(this.state.newDebit);
    this.state.dataArr.forEach( (data) => { 
     
      if(data.description !== this.state.input) {
        let newObj = Object.assign({}, data); 
        newObj.date = this.state.todayDate;
        newObj.description = this.state.input; 
        this.props.newDeb(newObj.amount);
        this.setState({
          dataArr: [newObj, ...this.state.dataArr],
          input: "",
        });
        newObj.amount = this.state.newDebit;
      }
    });
  }

  handleChange = (event) => {
    this.setState({ input: event.target.value});
  }
  handleAmount = (event) => {
    this.setState({ newDebit: event.target.value});
  }
  render() {
    const display = this.state.dataArr.map( (data) => {
      return (
        <div>
        <li>Description: {data.description}</li>
        <p>Debit: ${data.amount}</p> 
        <p>At date: {data.date.substring(0, 10)}</p>
        </div>
      ) 
    })
    return (
      //newObj.date
        <div>
          <h1>Debits: </h1>
          <a>Today's Date: {this.state.todayDate}</a>
          <p></p>
          <div><Link to = "/" >Home</Link></div>
          
          <form onSubmit={this.handleSubmitDebit}>
          <p></p>
          <strong><AccountBalance accountBalance={this.props.accountBalance}/> </strong>
          <p></p>
          <input type="text" name="newDebit" placeholder = "Enter Description Here " onChange = {this.handleChange} />
         
          <input type="text" name="newDebit" placeholder = "Enter Amount Here " onChange={this.handleAmount}/>
          <button onChange = {this.handleAmount} onClick = {this.handleSubmitDebit}>Add Debit</button>

           </form>
          <p></p>
          <div><ul>{display}</ul></div>
        </div>
    );
  }
}
export default Debits;