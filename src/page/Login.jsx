import React, { useState, useEffect, useContext } from "react";
import LoginForm from "./LoginForm";
import clientServer from "../server/clientServer";
import AlertContext from "../context/AlertContext";
import { localStorageUlti } from "../functions/localStorage.js";
import { ALERT, ROUTE } from "../constants/Constant.js";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

const DEFAULT_VALUE_SIGNUP = {
  accountSignUp: "",
  email: "",
  passwordSignUp: "",
  repeatpassword: "",
};

const DEFAULT_VALUE_LOGIN = {
  accountLogin: "",
  passwordLogin: "",
};

const { set } = localStorageUlti("data", { isLoggedIn: false, creator: "" });
const Login = () => {
  const [mode, setMode] = useState("login");
  const [userList, setUserList] = useState([]);
  const [accountList, setAccountList] = useState([]);
  const [valueFormSignup, setValueFormSignup] = useState(DEFAULT_VALUE_SIGNUP);
  const [valueFormLogin, setValueFormLogin] = useState(DEFAULT_VALUE_LOGIN);

  useEffect(() => {
    clientServer
      .get("account")
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        console.error("error:", err);
      });
  }, [mode]);

  useEffect(() => {
    clientServer
      .get("account")
      .then((res) => {
        const list = [];
        res.data.forEach((item) => {
          list.push(item.account);
        });
        setAccountList(list);
      })
      .catch((err) => {
        console.error("error:", err);
      });
  }, [mode]);

  useEffect(() => {
    setValueFormSignup(DEFAULT_VALUE_SIGNUP);
    setValueFormLogin(DEFAULT_VALUE_LOGIN);
  }, [mode]);

  const navigate = useNavigate();

  const { setIsLoggedIn, success, error } = useContext(AlertContext);
  const handleChangeForm = (e) => {
    const { value, name } = e.target;
    if (mode === "login") {
      setValueFormLogin({
        ...valueFormLogin,
        [name]: value,
      });
    } else {
      setValueFormSignup({
        ...valueFormSignup,
        [name]: value,
      });
    }
  };

  const hanldeSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      const check = userList.findIndex((item) => {
        return (
          item.account === valueFormLogin.accountLogin &&
          item.password === valueFormLogin.passwordLogin
        );
      });
      if (check !== -1) {
        setIsLoggedIn(true);
        set({ isLoggedIn: true, creator: valueFormLogin.accountLogin });
        success("Đăng nhập thành công.", ALERT.DEFAULT_TIME);
        navigate(ROUTE.All);
      } else {
        error(
          "Tài khoản hoặc mật khẩu không đúng vui lòng kiểm tra lại.",
          ALERT.DEFAULT_TIME
        );
      }
    } else {
      if (!accountList.includes(valueFormSignup.accountSignUp)) {
        if (valueFormSignup.passwordSignUp === valueFormSignup.repeatpassword) {
          clientServer
            .post("account", {
              id: nanoid(),
              account: valueFormSignup.accountSignUp,
              email: valueFormSignup.email,
              password: valueFormSignup.passwordSignUp,
            })
            .then(() => {
              success("Đăng ký thành công.", ALERT.DEFAULT_TIME);
              setMode("login");
            })
            .catch((err) => {
              error(err.message, ALERT.DEFAULT_TIME);
            });
        } else {
          error("Mật khẩu và nhập lại mật khẩu không trùng nhau.", ALERT.DEFAULT_TIME);
        }
      } else {
        error("Tài khoản này đã có người dùng.", ALERT.DEFAULT_TIME);
      }
    }
  };

  return (
    <div>
      <div className={`form-block-wrapper form-block-wrapper--is-${mode}`}></div>
      <section className={`form-block form-block--is-${mode}`}>
        <header className="form-block__header">
          <h1>{mode === "login" ? "Welcome back!" : "Sign up"}</h1>
          <div className="form-block__toggle-block">
            <span
              onClick={() => {
                return setMode(mode === "login" ? "signup" : "login");
              }}
            >
              {mode === "login" ? "Don't" : "Already"} have an account? Click here &#8594;
            </span>
            {/* <input id="form-toggler" type="checkbox" /> */}
            <label htmlFor="form-toggler"></label>
          </div>
        </header>
        <LoginForm
          mode={mode}
          valueFormLogin={valueFormLogin}
          valueFormSignup={valueFormSignup}
          hanldeSubmit={hanldeSubmit}
          handleOnChange={handleChangeForm}
        />
      </section>
    </div>
  );
};

export default Login;
