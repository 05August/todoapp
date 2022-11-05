import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ListTodoItem from "../components/ListTodoItem";
import Footer from "../layout/Footer";
import { LIST_TO_DO_KEY, STATUS, ITEM_PER_PAGE } from "../constants/Constant";
import { localStorageUlti } from "../functions/localStorage";
import usePagination from "../hooks/usePagination";
import clientServer from "../server/clientServer";

const { get } = localStorageUlti(LIST_TO_DO_KEY, []);

const New = () => {
  const [todoItems, setTodoItems] = useState([]);

  const [searchParams] = useSearchParams();

  const { jumpPage, currentData, currentPage, maxPage } = usePagination(
    todoItems,

    ITEM_PER_PAGE
  );

  useEffect(() => {
    const listTodo = get().filter(
      (item) =>
        item.status === STATUS.NEW &&
        item.title.toLowerCase().includes(searchParams.get("keyword") || "")
    );
    setTodoItems(listTodo);
    // clientServer.get("todoitems").then((todoItems) => {
    //   setTodoItems(
    //     todoItems.data.filter(
    //       (item) =>
    //         item.status === STATUS.NEW &&
    //         item.title.toLowerCase().includes(searchParams.get("keyword") || "")
    //     )
    //   );
    // });
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

export default New;
