import React, { useState } from 'react';

const validTitle = function (titleValue) {
  return titleValue.length > 5 ? true : false;
}

const validCreator = function (creatorValue) {
  return (creatorValue.length > 5 && creatorValue.length < 20) ? true : false;
}

const validDescription = function (descriptionValue) {
  return descriptionValue.length < 50 ? true : false;
}

const Form = ({ handleSubmit }) => {
  const [inputValue, setValue] = useState({});
  const { titleValue, creatorValue, descriptionValue } = inputValue;
  return (
    <div id="layout-form">
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" placeholder="title" />
      </div>
      <div>
        <label htmlFor="creator">Creator</label>
        <input type="text" id="creator" name="creator" placeholder="creator" />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" placeholder="description" />
      </div>
      {

      }
      <button
        onClick={
          () => {
            if (validTitle(titleValue) && validCreator(creatorValue) && validDescription(descriptionValue)) {
              handleSubmit(inputValue);
            }
            else {
              alert("Input is invalid!");
            }
          }
        }
      >
        Save
      </button>
    </div>

  )
}
export default Form;