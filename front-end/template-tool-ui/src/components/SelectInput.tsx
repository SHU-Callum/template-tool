interface SelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
}

// Dropdown component for selecting a value from a list of options
function SelectInput({ value, onChange, options, label }: SelectInputProps) {
  return (
    <div className="flex items-center">
      <label className="mr-2 sm:mr-3 min-w-12 sm:min-w-16">{label}</label>
      <select
        className="border rounded p-1 sm:p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          option &&
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;