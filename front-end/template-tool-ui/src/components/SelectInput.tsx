interface SelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
}

function SelectInput({ value, onChange, options, label }: SelectInputProps) {
  return (
    <div className="flex items-center">
      <label className="mr-2">{label}</label>
      <select
        className="border rounded p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;