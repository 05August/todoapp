import Input from "./InputLoginComponent";

const LoginForm = ({
  mode,
  valueFormLogin,
  valueFormSignup,
  hanldeSubmit,
  handleOnChange,
}) => {
  return (
    <form
      onSubmit={(e) => {
        hanldeSubmit(e);
      }}
    >
      <div className="form-block__input-wrapper">
        <div className="form-group form-group--login">
          <Input
            type="text"
            // id="username"
            label="user name"
            name="accountLogin"
            value={valueFormLogin.accountLogin}
            handleOnChange={handleOnChange}
            disabled={mode === "signup"}
          />
          <Input
            type="password"
            // id="password"
            label="password"
            name="passwordLogin"
            value={valueFormLogin.passwordLogin}
            handleOnChange={handleOnChange}
            disabled={mode === "signup"}
          />
        </div>
        <div className="form-group form-group--signup">
          <Input
            type="text"
            // id="username"
            label="user name"
            name="accountSignUp"
            value={valueFormSignup.accountSignUp}
            handleOnChange={handleOnChange}
            disabled={mode === "login"}
          />
          <Input
            type="email"
            // id="email"
            label="email"
            name="email"
            value={valueFormSignup.email}
            handleOnChange={handleOnChange}
            disabled={mode === "login"}
          />
          <Input
            type="password"
            // id="createpassword"
            label="password"
            name="passwordSignUp"
            value={valueFormSignup.passwordSignUp}
            handleOnChange={handleOnChange}
            disabled={mode === "login"}
          />
          <Input
            type="password"
            // id="repeatpassword"
            label="repeat password"
            name="repeatpassword"
            value={valueFormSignup.repeatpassword}
            handleOnChange={handleOnChange}
            disabled={mode === "login"}
          />
        </div>
      </div>
      <button className="button button--primary full-width" type="submit">
        {mode === "login" ? "Log In" : "Sign Up"}
      </button>
    </form>
  );
};

export default LoginForm;
