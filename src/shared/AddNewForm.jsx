import React, { useState } from 'react';
import InputText from "../components/InputText.jsx";
import Button from "../components/Button.jsx";

const AddNewForm = ({ formClass, handleSubmit }) => {
  const [form, setForm] = useState({
    title: '',
    creator: '',
    description: '',
  });

  const [validData, setValidData] = useState({
    title: false,
    creator: false,
    description: true,
  });

  const { title, creator, description } = form;

  const formField = [
    {
      label: 'Title',
      placeholder: 'Type Title',
      name: 'title',
      value: title,
      regExPattern: /^.{6,18}$/,
      messageError: 'Please type title, it has length from 6 to 18',
    },
    {
      label: 'Creator',
      placeholder: 'Name of Creator',
      name: 'creator',
      value: creator,
      regExPattern: /^.{6,12}$/,
      messageError: 'Please type Name of Creator, it has length from 6 to 12',
    },
    {
      label: 'Description',
      placeholder: 'Description Details',
      name: 'description',
      value: description,
      regExPattern: /^.{0,150}$/,
      messageError: 'Please type Description, it has length from 0 to 150',
    }
  ];

  const handleChangeForm = (e, item) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    if (value) {
      setValidData({
        ...validData,
        [name]: item.regExPattern.test(value),
      })
    }
  };

  const renderForm = () => {
    return formField.map((item, index) => (
      <InputText
        {...item}
        key={`${item.name}_${index}`}
        onChange={(e) => handleChangeForm(e, item)}
        error={!item.value || validData[item.name] ? '' : item.messageError} />
    ));
  };

  const checkValidData = () => validData.title && validData.creator && validData.description;


  return (
    <form className={`formClassContainer ${formClass}`} onSubmit={handleSubmit}>
      {renderForm()}
      <div>
        <Button title={'Save'} type={'submit'} disabled={!checkValidData()} />
      </div>
    </form>
  );
};

export default AddNewForm;