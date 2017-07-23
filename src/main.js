import React, {Component} from 'react';
import {Textfield, Button, Grid, Cell} from 'react-mdl';
import GetValues from "./getValues";
import firebase from './FirebaseAuth';
class Main extends Component {
  constructor() {
    super();
    this.SaveValues = this.SaveValues.bind(this);
    this.props = {
      expenseCategory: null,
      expenseAmount: null
    }
    this.state={
      expenseCategory:"",
      expenseAmount:"",
        userId:null
    }

  }  componentDidMount(){
      var base=this;
     firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     base.setState({
          userId:user
        });
        base.props.userId
    } else {
        base.setState({
          userId:null
        });
    }
  });
    }
  SaveValues() {
var userId=this.state.userId.uid;
var expenseCategory=this.state.expenseCategory;
var expenseAmount=this.state.expenseAmount;
var base=this;
    firebase.database().ref('/users/' + userId+"/expense").once('value').then(function(snapshot) {
var objectValues=snapshot.val();
var count;
if(objectValues===null)
{
  count=0
}else {
  count=(Object.entries(objectValues).length);
}
base.setState({expenseCategory:"",expenseAmount:""})

firebase.database().ref('users/' + userId+"/expense/").push({

"expenseCategory": expenseCategory,
"expenseAmount" : expenseAmount
});
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
          <Textfield onChange={(event) => {
          this.setState({expenseCategory : event.target.value})
        }} value={this.state.expenseCategory}label="Expense Category..." type={"text"} style={{
            width: '200px'
          }}/>
          <Textfield value={this.state.expenseAmount}onChange={(event) => {
        this.setState({expenseAmount: event.target.value})
      }} type={"text" }label="Amount" style={{
        width: '200px'
      }}/>
          <Button raised accent ripple onClick={this.SaveValues}>Add</Button>
        </Cell><Cell col={4}></Cell>
        <GetValues userId={this.state.userId}></GetValues>
      </Grid>
    )
  }
}
export default Main;
