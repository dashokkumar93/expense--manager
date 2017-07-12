import React, { Component } from 'react';
import './App.css';
import Navigate from './Navigation'
import Signin from './Signin'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigate></Navigate>
         <Signin></Signin>
      </div>
    );
  }
}

export default App;
