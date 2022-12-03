import React, { useState } from "react";

import { ALERT } from "../constants/Constant.js";

import { localStorageUlti } from "../functions/localStorage.js";

const AlertContext = React.createContext(null);

const { get } = localStorageUlti("data", false);

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(ALERT.NONE);

  const [alertText, setAlertText] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(get().isLoggedIn);

  const [callBack, setCallBack] = useState({
    label: "",

    action: () => {},
  });

  return (
    <AlertContext.Provider
      value={{
        alert: alert,
        alertText: alertText,
        callBack,
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        success: (text, timeout, callBack) => {
          setAlertText(text);
          setAlert(ALERT.SUCCESS);
          callBack && setCallBack(callBack);
          setTimeout(() => {
            setAlert(ALERT.NONE);
          }, timeout * ALERT.MINIMUM_TIME_MS || ALERT.MAXIMUM_TIME_MS);
        },
        error: (text, timeout, callBack) => {
          setAlertText(text);
          setAlert(ALERT.ERROR);
          callBack && setCallBack(callBack);
          setTimeout(() => {
            setAlert(ALERT.NONE);
          }, timeout * ALERT.MINIMUM_TIME_MS || ALERT.MAXIMUM_TIME_MS);
        },
        clear: () => setAlert(ALERT.NONE),
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export { AlertProvider };
export default AlertContext;
