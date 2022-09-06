import React from 'react';

const styleTitle = {

  backgroundColor: 'red',

  fontSize: 20,

}
class TaskItem extends React.Component {
  render () { 
    return <h1 style={styleTitle}>Hello class Component</h1>
  }
}

export default TaskItem;