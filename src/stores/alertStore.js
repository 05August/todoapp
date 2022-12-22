import { makeObservable, observable, action } from "mobx";
import { ALERT } from "../constants/Constant";
class AlertStore {
  alertContent = {
    status: ALERT.NONE,
    text: "",
    callBack: {
      label: "",
      action: () => {},
    },
  };

  constructor() {
    makeObservable(this, {
      alertContent: observable,
      clear: action,
      success: action,
      error: action,
    });
  }

  clear() {
    this.alertContent = {
      status: ALERT.NONE,
      text: "",
      callBack: {
        label: "",
        action: () => {},
      },
    };
  }

  success(text, timeout, callBack) {
    this.alertContent = {
      status: ALERT.SUCCESS,
      text,
      callBack: callBack || {
        label: "",
        action: () => {},
      },
    };

    setTimeout(
      () => this.clear(),
      timeout * ALERT.MINIMUM_TIME_MS || ALERT.MAXIMUM_TIME_MS
    );
  }

  error(text, timeout, callBack) {
    this.alertContent = {
      status: ALERT.ERROR,
      text,
      callBack,
    };

    setTimeout(
      () => this.clear(),
      timeout * ALERT.MINIMUM_TIME_MS || ALERT.MAXIMUM_TIME_MS
    );
  }

  get AlertContent() {
    return this.alertContent;
  }
}

const alertStore = new AlertStore();

export default alertStore;
