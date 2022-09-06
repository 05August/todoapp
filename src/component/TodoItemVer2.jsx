import React from 'react';
import style from './style.module.css';

class TodoItemVer2 extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <div className={style.item}>
          <p className={style.title}>Thuận đẹp chai số 1 cần thơ, say boyahhhhhhhhhhhhhhhhhhhh</p>
          <p className={style.deadline}>Deadline: 28/11/2021</p>
          <p className={style.level}>Level task: <span className={style.normal}>normal</span></p>
        </div>
        <div className={style.item}>
          <p className={style.title}>Thuận số 2 không ai số 1</p>
          <p className={style.deadline}>Deadline: 28/11/2021</p>
          <p className={style.level}>Level task: <span className={style.urgent}>urgent</span></p>
        </div>
      </div>

    );
  }
}

export default TodoItemVer2;