const RadioCheckboxButton = ({
  radioCheckboxClass,
  title,
  type,
  style,
  onChange,
  name,
  disabled,
  isChecked,
  value,
}) => {
  return (
    <div
      className={`radioCheckboxClass ${radioCheckboxClass}`}
      style={{
        ...style,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <input
        type={type}
        checked={isChecked}
        name={name}
        value={value}
        onChange={onChange}
      />
      <span />
      <label htmlFor={name}>{title}</label>
    </div>
  )
}

export default RadioCheckboxButton;