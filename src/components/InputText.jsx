const InputText = ({
  inputClass = "",
  label,
  placeholder,
  name,
  value,
  disabled,
  cursor,
  onChange,
  error = "",
}) => {
  const checkInputClass = () => {
    if (!value) return "";
    if (value && error) return "inputText--error";
    if (value && !error) return "inputText--valid";
  };
  return (
    <div className={`inputText ${inputClass} ${checkInputClass()}`}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        style={(cursor = { cursor })}
        onChange={onChange}
      />
      <p>{error}</p>
    </div>
  );
};

export default InputText;
