import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ListTodoItem from "../components/ListTodoItem";
import Footer from "../layout/Footer";
import { STATUS, ITEM_PER_PAGE } from "../constants/Constant";
import usePagination from "../hooks/usePagination";
import clientServer from "../server/clientServer";
import { localStorageUlti } from "../functions/localStorage";

const { get } = localStorageUlti("data");

const Doing = () => {
  const [todoItems, setTodoItems] = useState([]);

  const [searchParams] = useSearchParams();

  const { jumpPage, currentData, currentPage, maxPage } = usePagination(
    todoItems,

    ITEM_PER_PAGE
  );

  const creator = get().creator;

  useEffect(() => {
    clientServer
      .get(`todoList?creator=${creator}`)
      .then((res) => {
        const listTodoItem = res.data.filter(
          (item) =>
            item.status === STATUS.DOING &&
            item.title.toLowerCase().includes(searchParams.get("keyword") || "")
        );
        setTodoItems(listTodoItem);
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

export default Doing;
