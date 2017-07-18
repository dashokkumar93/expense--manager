import React, { Component } from 'react';
import './App.css';
import Navigate from './Navigation'
import Signin from './Signin'
import firebase from './FirebaseAuth';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Main from './main'

class App extends Component {
  constructor(){
    super();
    this.state={
      users:null
    }
  }
  componentDidMount(){
    var base=this;
   firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
   base.setState({
        user:user
      });
  } else {  
      base.setState({
        user:null
      });
  } 
});
  }
  render() {
    return (
    <Router>
  <div>

    <Route exact path="/" component={Navigate}/>
{this.state.user? <Route exact path="/" component={Main}/>:
   <Route exact path="/" component={Signin}/>
}
   
  </div>
</Router>
    );
  }
}

export default App;
