import React,{Component} from 'react';
import firebase from './FirebaseAuth';
class GetValues extends Component
{
constructor(props)
{
  super();
  this.funFunction=this.funFunction.bind(this);
  console.log(props)
}
funFunction(){
  console.log(this.props)
}
  componentDidMount(){


//   var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
// starCountRef.on('value', function(snapshot) {
//   updateStarCount(postElement, snapshot.val());
// });
}
render(){
  return(
    <div>
      <h1 onClick={this.funFunction}>Hello</h1>
    </div>
  )
}
}
export default GetValues;
