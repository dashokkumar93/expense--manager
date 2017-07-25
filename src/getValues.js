import React,{Component} from 'react';
import firebase from './FirebaseAuth';
import{ DataTable,TableHeader} from 'react-mdl'
class GetValues extends Component
{
constructor(props)
{
  super();
  this.funFunction=this.funFunction.bind(this);
  console.log(props);
  this.state={
    userId:null,
    expenseValues:{

    }
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
  var base=this;
  firebase.database().ref('/users/' + id+"/expense").once('value').then(function(snapshot) {
var objectValues=snapshot.val();
base.setState({expenseValues:objectValues})
});
}

render(){
  return(
    <div>
      <DisplayValues previousValues={this.state.expenseValues}></DisplayValues>
    </div>
  )
}
}
class DisplayValues extends Component{
  constructor(){
    super();
    this.state={
      previousValues:""
    }
  }
  componentWillReceiveProps(){
    console.log(this.state.previousValues)
  }
  componentDidMount(){
    console.log(this.props.previousValues)
  }
  renderValues(values){
    var a=[];
for(var property in values)
{if(values[property].expenseAmount!==undefined)
a.push({category:values[property].expenseCategory,amount:values[property].expenseAmount})
}console.log(a)
return<DataTable className="mdl-data-table mdl-shadow--2dp"
    shadow={0}
    rows={a}
>
    <TableHeader name="category" tooltip="Expense Category">Category</TableHeader>
    <TableHeader numeric name="amount" tooltip="Expense Amount">Amount</TableHeader>
</DataTable>
  }
  render(){
    return(
      <div className="mdl-cell mdl-cell--4-col">
        {
    this.renderValues(this.props.previousValues)
        }
    </div>
    )
  }
}

export default GetValues;
