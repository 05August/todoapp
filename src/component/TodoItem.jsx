import React from 'react';
import './style.css';


const styleTitle={
  fontWeight: 'bold',
}
class TodoItem extends React.Component {
  render() {
    return(
      <div className="box">
        <div style={styleTitle}>Title: task 1</div>
        <div>Creator: Loc</div>
        <div style={{color:'blue',fontWeight: 'bold'}}>Status: New</div>
        <hr></hr>
        <div style={styleTitle}>Description:</div>
        <div className="content">This is a task,This is a task,This is a task,This is a task,This is a task,this is a task,this is a task,this is a task</div>
      </div>
      
    );
  }
}

export default TodoItem;