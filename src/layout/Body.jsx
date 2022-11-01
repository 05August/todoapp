import React, { useState, useEffect } from "react";
import TodoItem from "../components/TodoItem.jsx";
import AddNewForm from "../shared/AddNewForm.jsx";
import DetailTask from "../shared/DetailTaskForm";
import { MODE, STATUS, POSITION_KEYWORD } from '../constants/Constant.js';
import { localStorageUlti } from "../functions/localStorage.js";


const { get, set } = localStorageUlti('todoItems', []);

const Body = ({ mode, handleChangeRenderMode }) => {
  const [todoItems, setTodoItems] = useState([]);

  const [filterText, setFilterText] = useState('');

  const [indexCurrentTask, setIndexCurrentTask] = useState(null);

  const [currentTask, setCurrentTask] = useState({ title: '', creator: '', description: '', status: STATUS.NEW });


  useEffect(() => {
    setTodoItems(get());
  }, []);

  useEffect(() => {
    const keyword = window.location.search.slice(POSITION_KEYWORD);
    setFilterText(keyword);
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: e.target[0].value,
      creator: e.target[1].value,
      description: e.target[2].value,
      status: STATUS.NEW,
    };

    const todoItemsLocalStorage = get();

    setTodoItems([data, ...todoItems]);
    set([data, ...todoItemsLocalStorage]);
    handleChangeRenderMode(MODE.SHOW_LIST);
  }

  const handleShowDetailTask = (item, index) => {
    setCurrentTask(item);
    setIndexCurrentTask(index);
    handleChangeRenderMode(MODE.DETAIL_TASK);
  };

  // const updateTask = (e, item) => {
  //   e.preventDefault();
  //   const todoItemsLocalStorage = get();
  //   todoItemsLocalStorage.splice(indexCurrentTask, 1, item);
  //   setTodoItems([...todoItemsLocalStorage]);
  //   set([...todoItemsLocalStorage]);
  //   handleChangeRenderMode(MODE.SHOW_LIST);
  // };



  // const deleteTask = (e) => {
  //   e.preventDefault();
  //   const todoItemsLocalStorage = get();
  //   todoItemsLocalStorage.splice(indexCurrentTask, 1);
  //   setTodoItems([...todoItemsLocalStorage]);
  //   set([...todoItemsLocalStorage]);
  //   handleChangeRenderMode(MODE.SHOW_LIST);
  // };

  //Merge deleteTask and updateTask into handleChangeTask function 
  const handleChangeTask = (e, item) => {
    e.preventDefault();
    const todoItemsLocalStorage = get();
    if (item) {
      todoItemsLocalStorage.splice(indexCurrentTask, 1, item);
    } else {
      todoItemsLocalStorage.splice(indexCurrentTask, 1);
    }
    setTodoItems([...todoItemsLocalStorage]);
    set([...todoItemsLocalStorage]);
    handleChangeRenderMode(MODE.SHOW_LIST);
  };

  const renderTodoItem = () => {
    return todoItems.filter((item) => item.title.includes(filterText)).map((item, index) => {
      return <TodoItem
        key={`${item.title}_${index}`}
        title={item.title}
        creator={item.creator}
        status={item.status}
        description={item.description}
        onClick={() => {
          handleShowDetailTask(item, index)
        }}
      />
    }
    )
  }

  const chooseMode = () => {
    switch (mode) {
      case MODE.SHOW_LIST:
        return renderTodoItem();
      case MODE.ADD_NEW:
        return (
          <AddNewForm
            handleSubmit={(e) => { handleSubmit(e) }}
          />
        );
      case MODE.DETAIL_TASK:
        return (
          <DetailTask
            currentTask={currentTask}
            handleChangeTask={handleChangeTask}
          />
        )
      default:
        return renderTodoItem();
    }
  };
  return (
    <div className="containerBody">
      {chooseMode()}
    </div>

  );
}

export default Body;