import React, {Component} from 'react';
import {Textfield, Button, Grid, Cell, Snackbar} from 'react-mdl';
import GetValues from "./getValues";
import firebase from './FirebaseAuth';
import './main.css';
class Main extends Component {
  constructor() {
    super();
    this.SaveValues = this.SaveValues.bind(this);
    this.props = {
      expenseCategory: null,
      expenseAmount: null
    }
    this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
    this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
    this.handleClickActionSnackbar = this.handleClickActionSnackbar.bind(this);
    this.state = {
      expenseCategory: "",
      expenseAmount: "",
      userId: null,
      isSnackbarActive: false
    }

  }
  componentDidMount() {
    var base = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        base.setState({userId: user});

      } else {
        base.setState({userId: null});
      }
    });
  }
  handleTimeoutSnackbar() {
    this.setState({isSnackbarActive: false});
  }
  handleClickActionSnackbar() {
    this.setState({btnBgColor: 'red'});
  }
  handleShowSnackbar() {
    this.setState({
      isSnackbarActive: true,
      btnBgColor: '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16)
    });
  }
  SaveValues() {
    var userId = this.state.userId.uid;
    var expenseCategory = this.state.expenseCategory;
    var expenseAmount = this.state.expenseAmount;
    var base = this;
    if(expenseCategory===""|| expenseAmount==="")
    {
        this.handleShowSnackbar();
        return;
    }
    firebase.database().ref('/users/' + userId + "/expense").once('value').then(function(snapshot) {

      base.setState({expenseCategory: "", expenseAmount: ""})

      firebase.database().ref('users/' + userId + "/expense/").push({"expenseCategory": expenseCategory, "expenseAmount": expenseAmount});
    });

  }
  render()
  {

    return (
      <Grid>
        <Cell col={4}></Cell>
        <Cell col={4} style={{
          textAlign: "center"
        }}>
          <Textfield label="Expense Category..." onChange={(event) => {
            this.setState({expenseCategory: event.target.value})
          }} value={this.state.expenseCategory} type={"text"} style={{
            width: '200px'
          }}/>
          <Textfield onChange={(event) => {
            this.setState({expenseAmount: event.target.value})
          }} label="Amount" value={this.state.expenseAmount} type={"text"} style={{
            width: '200px'
          }}/>
          <Button raised accent ripple onClick={this.SaveValues}>Add</Button>
        </Cell>
        <Cell col={4}></Cell>
        <Cell col={4}></Cell>
        <GetValues userId={this.state.userId}></GetValues>
        <Cell col={4}></Cell>

        <Snackbar active={this.state.isSnackbarActive} onClick={this.handleClickActionSnackbar} onTimeout={this.handleTimeoutSnackbar} action="Warning">Please Enter the value to proceed further.</Snackbar>
      </Grid>
    )
  }
}
export default Main;
