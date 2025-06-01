"use client"

import type { ReactNode } from "react"
import "./Button.css"

interface ButtonProps {
  children: ReactNode
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary"
  size?: "small" | "medium" | "large"
  disabled?: boolean
  onClick?: () => void
}

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`custom-button custom-button--${variant} custom-button--${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
