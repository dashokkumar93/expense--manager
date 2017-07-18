import React,{Component} from 'react';
import {Textfield,Button,Grid,Cell} from 'react-mdl'
class Main extends Component{
    render()
{
    return (<Grid><Cell col={4}></Cell><Cell col={4} style={{textAlign: "center"}} >
        <Textfield
    onChange={() => {}}
    label="Expense Category..."
    style={{width: '200px'}}
/><Textfield
    onChange={() => {}}
    pattern="-?[0-9]*(\.[0-9]+)?"
    error="Input is not a number!"
    label="Amount"
    style={{width: '200px'}}
/>
<Button raised accent ripple>Add</Button></Cell></Grid>)
}
}
export default Main ;