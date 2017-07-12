import React,{Component} from 'react'
import {Button}from 'react-mdl'
import firebase, { auth, provider } from './FirebaseAuth';
class Signin extends Component{
     constructor() {  
           super();
           this.login = this.login.bind(this); // <-- add this line
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null 
    }
     }
    login(){
          auth.signInWithPopup(provider) 
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
    }
    render(){
        return(
            <Button raised ripple accent onClick={this.login}>Sign In</Button>
        )
    }
}

export default Signin;