"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import FormBuilder from "@/components/Form/FormBuilder/FormBuilder"
import FormFooter from "@/components/Form/FormFooter/FormFooter"
import FormSkeleton from "@/components/Form/FormSkeleton/FormSkeleton"
import LoadingScreen from "@/components/Skeleton/LoadingScreen"
import { useMerchantForm } from "@/hooks/useMerchantForm"
import "./FormContainer.css"

export default function FormContainer() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const editIdParam = searchParams.get("edit")
  const isEditMode = !!editIdParam
  const [isRedirecting, setIsRedirecting] = useState(false)

  const {
    formData,
    errors,
    isLoading,
    isSubmitting,
    departments,
    availableMunicipios,
    editId,
    updateField,
    handleSubmit,
    loadMerchantData,
    validateField,
    getChangedFields,
  } = useMerchantForm()

  useEffect(() => {
    if (editIdParam && departments.length > 0) {
      const merchantId = parseInt(editIdParam, 10)
      if (!isNaN(merchantId)) {
        loadMerchantData(merchantId)
      }
    }
  }, [editIdParam, departments.length, loadMerchantData])

  const handleFormSubmit = async (): Promise<void> => {
    const success = await handleSubmit()
    if (success && !isEditMode) {
      setIsRedirecting(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 3500) 
    }
  }

  if (isRedirecting) {
    return <LoadingScreen message="Redirigiendo al dashboard..." showLogo={false} />
  }

  if (isLoading) {
    return <FormSkeleton />
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h1 className="form-title">
          {isEditMode ? `Editar comerciante ${editId ? `#${editId}` : ''}` : "Crear Nuevo comerciante"}
        </h1>
        {!isEditMode && (
          <button 
            className="edit-mode-btn" 
            onClick={handleFormSubmit}
            disabled={isSubmitting || isRedirecting}
          >
            {isSubmitting ? "Creando..." : isRedirecting ? "Redirigiendo..." : "Añadir nuevo comerciante"}
          </button>
        )}
      </div>

      <FormBuilder 
        formData={formData}
        errors={errors}
        departments={departments}
        availableMunicipios={availableMunicipios}
        updateField={updateField}
        validateField={validateField}
        isEditMode={isEditMode}
      />

      {isEditMode && (
        <FormFooter 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isEditMode={isEditMode}
          merchantId={editId}
          getChangedFields={getChangedFields}
        />
      )}
    </div>
  )
}
