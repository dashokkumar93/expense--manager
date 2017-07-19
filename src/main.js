import React, {Component} from 'react';
import {Textfield, Button, Grid, Cell} from 'react-mdl';

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
      userId:null
    }
console.log(firebase.auth().user)
  }  componentDidMount(){
      var base=this;
     firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     base.setState({
          userId:user
        });
    } else {
        base.setState({
          userId:null
        });
    }
  });
    }
  SaveValues() {
var userId=this.state.userId.uid;
var expenseCategory=this.expenseCategory;
var expenseAmount=this.expenseAmount;
    firebase.database().ref('/users/' + userId+"/expense").once('value').then(function(snapshot) {
var objectValues=snapshot.val();
var count;
if(objectValues===null)
{
  count=0
}else {
  count=(Object.entries(objectValues).length);
}
console.log(count)
firebase.database().ref('users/' + userId+"/expense/"+count).set({

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
          this.expenseCategory = event.target.value
          }} label="Expense Category..." style={{
            width: '200px'
          }}/><Textfield onChange={(event) => {
        this.expenseAmount = event.target.value
      }} pattern="-?[0-9]*(\.[0-9]+)?" error="Input is not a number!" label="Amount" style={{
        width: '200px'
      }}/>
          <Button raised accent ripple onClick={this.SaveValues}>Add</Button>
        </Cell>
      </Grid>
    )
  }
}
export default Main;
