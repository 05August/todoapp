const Input = ({ name, type, label, disabled, value, handleOnChange }) => {
  return (
    <input
      className="form-group__input"
      type={type}
      // id={id}
      name={name}
      value={value}
      onChange={(e) => handleOnChange(e)}
      placeholder={label}
      disabled={disabled}
      required
      minLength="6"
    />
  );
};

export default Input;
