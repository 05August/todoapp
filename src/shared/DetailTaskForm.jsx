import React, { useState, useEffect } from "react";
import InputText from "../components/InputText.jsx";
import Button from "../components/Button.jsx";
import RadioCheckboxButton from "../components/RadioCheckboxButton.jsx";
import { STATUS } from "../constants/Constant.js";

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

const DetailTaskForm = ({ formClass, currentTask, handleChangeTask }) => {
  const [form, setForm] = useState({
    title: "",
    creator: "",
    description: "",
    status: STATUS.NEW,
  });

  const [validData, setValidData] = useState({
    title: false,
    creator: false,
    description: true,
  });

  useEffect(() => {
    setDefaultValue();
  }, []);

  const setDefaultValue = (e) => {
    e && e.preventDefault();
    setForm(currentTask);
    setValidData({
      title: formField[0].regExPattern.test(currentTask.title),
      creator: formField[1].regExPattern.test(currentTask.creator),
      description: formField[2].regExPattern.test(currentTask.description),
    });
  };

  const { title, creator, description } = form;

  const formField = [
    {
      label: "Title",
      placeholder: "Type title",
      name: "title",
      value: title,
      regExPattern: /^.{6,18}$/,
      messageError: "Please type title, it has length from 6 to 18",
    },
    {
      label: "Creator",
      placeholder: "Type name of Creator",
      name: "creator",
      value: creator,
      regExPattern: /^.{6,12}$/,
      messageError: "Please type Name of Creator, it has length from 6 to 12",
    },
    {
      label: "Description",
      placeholder: "Type description details",
      name: "description",
      value: description,
      regExPattern: /^.{0,150}$/,
      messageError: "Please type Description, it has length from 0 to 150",
    },
  ];

  const handleChangeForm = (e, item = null) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    if (value && item) {
      setValidData({
        ...validData,
        [name]: item.regExPattern.test(value),
      });
    }
  };

  const renderForm = () => {
    return formField.map((item, index) => {
      return (
        <InputText
          {...item}
          key={`${item.name}_${index}`}
          onChange={(e) => {
            handleChangeForm(e, item);
          }}
          error={!item.value || validData[item.name] ? "" : item.messageError}
        />
      );
    });
  };

  const renderRadioButton = () => {
    return radioList.map((item) => (
      <RadioCheckboxButton
        key={`${item.value}`}
        title={item.title}
        type="radio"
        onChange={(e) => handleChangeForm(e)}
        name={"status"}
        value={item.value}
        isChecked={form.status === item.value}
      />
    ));
  };

  const checkValidate = () =>
    validData.title && validData.creator && validData.description;

  return (
    <form
      onSubmit={(e) => {
        handleChangeTask(e, form);
      }}
      className={`formClassContainer ${formClass}`}
    >
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
      <div style={{ display: "flex", width: 324, justifyContent: "space-between" }}>
        <Button title={"Save"} disabled={!checkValidate()} />
        <Button title={"Reset"} onClick={setDefaultValue} />
        <Button title={"Delete"} onClick={handleChangeTask} />
      </div>
    </form>
  );
};

export default DetailTaskForm;
