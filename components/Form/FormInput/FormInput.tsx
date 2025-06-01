"use client"

import "./FormInput.css"

interface FormInputProps {
  id: string
  label: string
  type: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  required?: boolean
  error?: string
}

export default function FormInput({ id, label, type, value, onChange, onBlur, placeholder, required, error }: FormInputProps) {
  return (
    <div className="form-input-group">
      <label htmlFor={id} className="form-input-label">
        {label}
        {required && <span className="required-asterisk">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`form-input ${error ? 'form-input-error' : ''}`}
        placeholder={placeholder}
        required={required}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}
