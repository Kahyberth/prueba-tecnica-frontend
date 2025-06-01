"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Button from "@/components/Button/Button"
import ActionButtons from "@/components/ActionButton/ActionButton"
import TableSkeleton from "@/components/Skeleton/TableSkeleton"
import LoadingScreen from "@/components/Skeleton/LoadingScreen"
import "./DataTable.css"
import StatusBadge from "../StatusBadge/StatusBadge"
import Pagination from "../Pagination/Pagination"
import { useMerchants } from "@/hooks/useMerchants"
import { useCSVExport } from "@/hooks/useCSVExport"
import { useAuth } from "@/contexts/AuthContext"

export default function DataTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()

  const { merchants, meta, isLoading, fetchMerchants } = useMerchants({ 
    page: currentPage, 
    limit: itemsPerPage 
  })

  const { isExporting, exportMerchantsCSV } = useCSVExport()
  const { user } = useAuth()

  const isAdmin = user?.rol === "Administrador"

  useEffect(() => {
    fetchMerchants({ page: currentPage, limit: itemsPerPage })
  }, [currentPage, itemsPerPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items)
    setCurrentPage(1) 
  }

  const handleCreateForm = () => {
    setIsNavigating(true)
    setTimeout(() => {
      router.push("/dashboard/create-form")
    }, 800)
  }

  const handleExportCSV = async () => {
    await exportMerchantsCSV()
  }

  if (isNavigating) {
    return <LoadingScreen message="Cargando formulario de creación..." />
  }

  return (
    <div className="data-table-container">
      <div className="table-header">
        <h1 className="table-title">Lista Formularios Creados</h1>
        <div className="table-actions">
          <Button 
            variant="primary" 
            size="small" 
            onClick={handleCreateForm}
            disabled={isNavigating}
          >
            Crear Formulario Nuevo
          </Button>
          {isAdmin && (
            <Button 
              variant="secondary" 
              size="small"
              onClick={handleExportCSV}
              disabled={isExporting}
            >
              {isExporting ? "Generando CSV..." : "Descargar Reporte en CSV"}
            </Button>
          )}
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Razón Social</th>
              <th>Teléfono</th>
              <th>Correo Electrónico</th>
              <th>Fecha Registro</th>
              <th>No. Establecimientos</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton />
            ) : (
              merchants.map((merchant) => (
                <tr key={merchant.id}>
                  <td>{merchant.nombreRazonSocial}</td>
                  <td>{merchant.telefono || 'N/A'}</td>
                  <td>{merchant.correoElectronico || 'N/A'}</td>
                  <td>{new Date(merchant.fechaRegistro).toLocaleDateString()}</td>
                  <td>{merchant.establecimientos.length}</td>
                  <td>
                    <StatusBadge status={merchant.estado} />
                  </td>
                  <td>
                    <ActionButtons 
                      status={merchant.estado} 
                      companyId={merchant.id}
                      onStatusChange={() => fetchMerchants({ page: currentPage, limit: itemsPerPage })}
                      onDelete={() => fetchMerchants({ page: currentPage, limit: itemsPerPage })}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
        isLoading={isLoading}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        totalPages={meta?.totalPages || 1}
      />
    </div>
  )
}
