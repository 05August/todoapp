import { makeObservable, observable, action } from "mobx";

class CountStore {
  count = 0;
  step = 1;

  constructor() {
    makeObservable(this, {
      count: observable,
      step: observable,
      up: action,

      down: action,

      changeCount: action,
    });
  }

  up() {
    this.count = this.count + this.step;
    this.resetCount();
  }
  down() {
    this.count = this.count - this.step;
    this.resetCount();
  }

  resetCount() {
    if (this.count > 10 || this.count < -10) this.count = 0;
  }

  changeCount(value) {
    this.count = this.count + value;
  }

  setStep(value) {
    this.step = value;
  }

  get Count() {
    return this.count;
  }
}

const countStore = new CountStore();

export default countStore;
