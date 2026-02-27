


const CustomInputField =({ name, label, type = "text", onChange })  =>{
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        // required
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
      />
    </div>
  );
};


export default CustomInputField;