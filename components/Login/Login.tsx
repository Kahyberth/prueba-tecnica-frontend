"use client"

import { useState } from "react"
import { z } from "zod"
import Checkbox from "@/components/CheckBox/CheckBox"
import Button from "@/components/Button/Button"
import "./Login.css"
import FormInput from "@/components/Form/FormInput/FormInput"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/contexts/ToastContext"

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo electrónico es obligatorio")
    .email("Ingresa un correo electrónico válido"),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  terms: z
    .boolean()
    .refine(val => val === true, "Debes aceptar los términos y condiciones")
})

const emailSchema = loginSchema.pick({ email: true })
const passwordSchema = loginSchema.pick({ password: true })

type LoginFormData = z.infer<typeof loginSchema>

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [terms, setTerms] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()
  const { showSuccess, showError } = useToast()

  const validateField = (field: keyof LoginFormData, value: any) => {
    try {
      if (field === "email") {
        emailSchema.parse({ email: value })
        setErrors(prev => ({ ...prev, email: undefined }))
      } else if (field === "password") {
        passwordSchema.parse({ password: value })
        setErrors(prev => ({ ...prev, password: undefined }))
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors[0]?.message
        setErrors(prev => ({ ...prev, [field]: fieldError }))
        return fieldError
      }
    }
    return null
  }

  const handleEmailBlur = () => {
    if (email.trim()) {
      validateField("email", email)
    }
  }

  const handlePasswordBlur = () => {
    if (password.trim()) {
      validateField("password", password)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      const validatedData = loginSchema.parse({
        email,
        password,
        terms
      })

      await login(validatedData)
      let userFromStorage = null
      if (typeof window !== 'undefined') {
        const userStr = localStorage.getItem('user')
        if (userStr) {
          try {
            userFromStorage = JSON.parse(userStr)
          } catch {}
        }
      }
      if (userFromStorage && userFromStorage.nombre && userFromStorage.rol) {
        showSuccess(`Inicio de sesión exitoso: ${userFromStorage.nombre} (${userFromStorage.rol})`)
      } else {
        showSuccess("Inicio de sesión exitoso")
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            const field = err.path[0] as keyof LoginFormData
            fieldErrors[field] = err.message
          }
        })
        setErrors(fieldErrors)
        const firstErrorField = Object.keys(fieldErrors)[0]
        if (firstErrorField) {
          const element = document.getElementById(firstErrorField)
          element?.focus()
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      } else {
        showError("Credenciales inválidas")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Debes iniciar sesión para acceder a la plataforma</h1>
      <p className="login-subtitle">
        Digita tu documento de identidad del propietario o representante legal y la contraseña
      </p>
      <form className="form-container" onSubmit={handleSubmit}>
        <FormInput 
          id="email" 
          label="Correo electrónico" 
          type="email" 
          value={email} 
          onChange={setEmail}
          onBlur={handleEmailBlur}
          placeholder="Ingresa tu correo electrónico"
          error={errors.email}
          required
        />
        <FormInput 
          id="password" 
          label="Contraseña" 
          type="password" 
          value={password} 
          onChange={setPassword}
          onBlur={handlePasswordBlur}
          placeholder="Ingresa tu contraseña"
          error={errors.password}
          required
        />
        <div>
          <Checkbox 
            id="terms" 
            label="Acepto termino y condiciones" 
            checked={terms}
            onChange={setTerms}
          />
          {errors.terms && (
            <span className="error-message">{errors.terms}</span>
          )}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </form>
    </div>
  )
}
