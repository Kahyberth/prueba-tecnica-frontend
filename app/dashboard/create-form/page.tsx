"use client"

import { Suspense } from "react"
import DashboardHeader from "@/components/Header/Dashboard/DashboardHeader"
import FormContainer from "@/components/Form/FormContainer/FormContainer"
import FormSkeleton from "@/components/Form/FormSkeleton/FormSkeleton"
import "./page.css"

export default function CreateFormPage() {
  return (
    <div className="create-form-page">
      <DashboardHeader />

      <main className="create-form-main">
        <Suspense fallback={<FormSkeleton />}>
          <FormContainer />
        </Suspense>
      </main>
    </div>
  )
}
