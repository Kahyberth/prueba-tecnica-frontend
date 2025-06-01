"use client"

import "./FormSelect.css"

interface Option {
  value: string
  label: string
}

interface FormSelectProps {
  id: string
  label: string
  value: string
  options: Option[]
  onChange: (value: string) => void
  required?: boolean
  disabled?: boolean
}

export default function FormSelect({ 
  id, 
  label, 
  value, 
  options, 
  onChange, 
  required,
  disabled = false 
}: FormSelectProps) {
  return (
    <div className="form-select-group">
      <label htmlFor={id} className="form-select-label">
        {label}
        {required && <span className="required-asterisk">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`form-select ${disabled ? 'form-select--disabled' : ''}`}
        required={required}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
