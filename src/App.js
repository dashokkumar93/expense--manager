import React, { Component } from 'react';
import './App.css';
import Navigate from './Navigation'
import Signin from './Signin'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
class App extends Component {
  render() {
    return (
    <Router>
  <div>

    <Route exact path="/" component={Navigate}/>
    <Route exact path="/" component={Signin}/>
    <Route exact path="/" component={Main}/>
  </div>
</Router>
    );
  }
}

export default App;
