"use client"

import "./CheckBox.css"

interface CheckboxProps {
  id: string
  label: string
  checked?: boolean
  onChange?: (checked: boolean) => void
}

export default function Checkbox({ id, label, checked, onChange }: CheckboxProps) {
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        id={id}
        className="custom-checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <label htmlFor={id} className="checkbox-label">
        {label}
      </label>
    </div>
  )
}
