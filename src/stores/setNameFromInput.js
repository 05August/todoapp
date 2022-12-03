import { makeObservable, observable, action } from "mobx";

class SetNameFromInput {
  value = "";
  name = "";
  constructor() {
    makeObservable(this, {
      value: observable,
      name: observable,
      changeValue: action,
      handleSubmit: action,
    });
  }

  changeValue(value) {
    this.value = value;
  }

  handleSubmit() {
    this.name = this.value;
  }
}

const setNameFromInput = new SetNameFromInput();

export default setNameFromInput;
