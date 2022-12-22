import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ListTodoItem from "../components/ListTodoItem";
import Footer from "../layout/Footer";
import { STATUS, ITEM_PER_PAGE } from "../constants/Constant";
import usePagination from "../hooks/usePagination";
import clientServer from "../server/clientServer";
import { observer } from "mobx-react";
import todoStore from "../stores/todoStore";

const Doing = () => {
  const [searchParams] = useSearchParams();

  const { jumpPage, currentData, currentPage, maxPage } = usePagination(
    todoStore.Todos,

    ITEM_PER_PAGE
  );

  useEffect(() => {
    clientServer
      .get("todoItems")
      .then((res) => {
        const listTodoItem = res.data.filter(
          (item) =>
            item.status === STATUS.DOING &&
            item.title.toLowerCase().includes(searchParams.get("keyword") || "")
        );
        todoStore.setTodos(listTodoItem);
      })
      .catch((err) => {
        console.error("error:", err);
      });
  }, [searchParams]);

  return (
    <>
      <ListTodoItem todoItems={currentData} />

      {maxPage > 1 && (
        <Footer currentPage={currentPage} jumpPage={jumpPage} maxPage={maxPage} />
      )}
    </>
  );
};

export default observer(Doing);
