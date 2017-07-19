import React,{Component} from 'react'
import {Button,Grid,Cell}from 'react-mdl'
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
	console.log(firebase.auth().currentUser);
     }
  componentDidMount()
  {  var base=this;
    firebase.auth().onAuthStateChanged(function(user) {
		console.log(user)
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
    login(){
 
          auth.signInWithRedirect(provider) 
    .then((result) => {
      const user = result.user;
      this.setState({
        user:user
      });
    });
    }
    render(){
        return(
             <Grid>
               <Cell col={4}></Cell><Cell style={{textAlign: "center"}}col={4}> 
            <Button className="signIn__Button"raised ripple accent onClick={this.login}>Sign In</Button></Cell>
        </Grid>
        )
    }
}

export default Signin;