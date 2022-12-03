import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { STATUS, ROUTE, FEATURES, ALERT } from "../constants/Constant";
import { initMessage } from "../functions/shared";
import InputText from "../components/InputText";
import Button from "../components/Button";
import RadioCheckboxButton from "../components/RadioCheckboxButton";
import { setValidateRule } from "../functions/validation";
import AlertContext from "../context/AlertContext";
import clientServer from "../server/clientServer";
import { localStorageUlti } from "../functions/localStorage";

const { get } = localStorageUlti("data");

const radioList = [
  {
    title: STATUS.NEW,
    value: STATUS.NEW,
  },

  {
    title: STATUS.DOING,
    value: STATUS.DOING,
  },

  {
    title: STATUS.DONE,
    value: STATUS.DONE,
  },
];

const getMessageAddNew = initMessage(FEATURES.ADD_NEW);
const getMessageEditTask = initMessage(FEATURES.EDIT_TASK);
const getMessageDeleteTask = initMessage(FEATURES.DELETE_TASK);

const EditAddNew = ({ isEditTask }) => {
  const alert = useContext(AlertContext);
  const creator = get().creator;
  const DEFAULT_VALUE = {
    id: "",
    title: "",
    creator: creator,
    description: "",
    status: STATUS.NEW,
  };
  const [form, setForm] = useState(DEFAULT_VALUE);
  const [validData, setValidData] = useState({
    title: false,
    creator: true,
    description: true,
  });

  const formValueRef = useRef(null);
  useEffect(() => {
    if (idTask) {
      clientServer
        .get(`todoList?creator=${creator}`)
        .then((res) => {
          const todoList = res.data;
          const currentTask = todoList.find((item) => item.id === idTask);
          const { description, title } = currentTask;
          setForm(currentTask);
          const formField = setValidateRule(currentTask);
          formValueRef.current = currentTask;
          setValidData({
            title: formField.title.regExPattern.test(title),
            creator: formField.creator.regExPattern.test(creator),
            description: formField.description.regExPattern.test(description),
          });
        })
        .catch((err) => {
          console.error("error:", err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();
  const { idTask } = useParams();

  const setDefaultValue = (e) => {
    e && e.preventDefault();
    const { description, title } = formValueRef.current;
    setForm(formValueRef.current);
    const formField = setValidateRule(formValueRef.current);
    setValidData({
      title: formField.title.regExPattern.test(title),
      // creator: formField.creator.regExPattern.test(creator),
      description: formField.description.regExPattern.test(description),
    });
  };

  const handleChangeForm = (e) => {
    const { value, name } = e.target;

    setForm({
      ...form,

      [name]: value,
    });

    if (name !== "status") {
      setValidData({
        ...validData,
        [name]: setValidateRule(form)[name].regExPattern.test(value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...form,
      id: nanoid(),
      status: STATUS.NEW,
    };

    clientServer
      .post("todoList", data)
      .then(() => {
        alert.success(
          getMessageAddNew("Task is created successfully!"),
          ALERT.DEFAULT_TIME
        );
        navigate(ROUTE.All);
      })

      .catch((err) => {
        alert.error(getMessageAddNew(err.message), ALERT.DEFAULT_TIME);
      });
  };

  const handleChangeTask = (e, isDelete) => {
    e.preventDefault();
    if (!isDelete) {
      clientServer
        .patch(`todoList/${idTask}`, form)
        .then(() => {
          alert.success(
            getMessageEditTask(`Task has been updated successfully!`),
            ALERT.DEFAULT_TIME
          );
          navigate(ROUTE.All);
        })
        .catch((err) => {
          alert.error(getMessageEditTask(err.message), ALERT.DEFAULT_TIME);
        });
    } else {
      clientServer
        .delete(`todoList/${idTask}`)
        .then(() => {
          alert.success(
            getMessageDeleteTask(`Task has been deleted!`),
            ALERT.DEFAULT_TIME
            // we temporarily disable Undo feature
            // {
            //   label: 'UNDO',
            //   action: () => {
            //     const todoItemsLocalStorage = get();
            //     todoItemsLocalStorage.splice(idTask, 0, deletedItem[0]);
            //     set(todoItemsLocalStorage);
            //     window.location.reload();
            //   },
            // }
          );
          navigate(ROUTE.All);
        })
        .catch((err) => {
          alert.error(getMessageDeleteTask(err.message), ALERT.DEFAULT_TIME);
        });
    }
  };

  const renderForm = () => {
    const formField = setValidateRule(form || DEFAULT_VALUE);
    return Object.keys(formField).map((keyItem, index) => {
      const { value, name, messageError } = formField[keyItem];
      // if (!isEditTask && keyItem !== "creator") {
      //   formField[keyItem].value = "";
      // }
      return (
        <InputText
          {...formField[keyItem]}
          key={`${name}_${index}`}
          disabled={name === "creator"}
          cursor={name === "creator" ? "not-allowed" : "text"}
          onChange={handleChangeForm}
          error={!value || validData[name] ? "" : messageError}
          mode={isEditTask}
        />
      );
    });
  };

  const checkValidate = () =>
    validData.title && validData.creator && validData.description;

  const renderRadioButton = () => {
    return radioList.map((item) => (
      <RadioCheckboxButton
        key={`${item.value}`}
        title={item.title}
        type="radio"
        handleOnChange={handleChangeForm}
        name={"status"}
        value={item.value}
        isChecked={form?.status === item.value}
      />
    ));
  };

  return (
    <form className={`formClassContainer`}>
      {isEditTask ? (
        <>
          {renderForm()}
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              marginTop: 40,
            }}
          >
            {renderRadioButton()}
          </div>
          <div
            style={{
              display: "flex",
              width: 324,
              justifyContent: "space-between",
            }}
          >
            <Button
              title={"Save"}
              disabled={!checkValidate()}
              onClick={handleChangeTask}
            />

            <Button title={"Reset"} onClick={setDefaultValue} />

            <Button title={"Delete"} onClick={(e) => handleChangeTask(e, true)} />
          </div>
        </>
      ) : (
        <>
          {renderForm()}
          <div>
            <Button
              title={"Save"}
              type={"submit"}
              disabled={!checkValidate()}
              onClick={handleSubmit}
            />
          </div>
        </>
      )}
    </form>
  );
};

export default EditAddNew;
