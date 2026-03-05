


const CustomInputField = ({
  label,
  name,
  id,
  type = 'text',
  value,
  onBlur,
  onChange,
  placeholder = '',
  required = false,
  autocomplete = 'off',
  className = '',
  dynamicStyles = "",
  dynamicWidth = "w-full",
  dynamicHeight = "38px"

}) => {
  const inputId = id || name;
  return (
    <div className={`relative w-full  ${className}`}>
      <input
        type={type}
        name={name}
        id={inputId}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        autoComplete={autocomplete}
        className={`border border-gray-300 ${dynamicWidth} ${dynamicStyles} px-2 py-1 text-[13.7px] font-[500] ${className}`}
        style={{ height: dynamicHeight }}
      />

      <label
        htmlFor={inputId}
        className="absolute left-3 -top-3.5 bg-white px-1 text-sm floating_textbox_label_lineheight text-gray-500 transition-all 
          peer-placeholder-shown:top-2.5 
          peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-500"
      >
        {label}
      </label>
    </div>
  );
};

export default CustomInputField;
