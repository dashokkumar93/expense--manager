import React,{Component} from 'react';
import firebase from './FirebaseAuth';
class GetValues extends Component
{
constructor(props)
{
  super();
  this.funFunction=this.funFunction.bind(this);
  console.log(props);
  this.state={
    userId:null
  }
}
funFunction(){
  console.log(this.props)
}
componentDidUpdate()
{var id=this.props.userId.uid;

  if(id!=this.state.userId)
  {
    if(this.state.userId!==id)
    {
    this.setState({userId:id});
    this.getValuesForUserId(id);
    }
  }
}
getValuesForUserId(id){
  console.log(id);
  firebase.database().ref('/users/' + id+"/expense").once('value').then(function(snapshot) {
var objectValues=snapshot.val();
console.log(objectValues,id);
});
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
