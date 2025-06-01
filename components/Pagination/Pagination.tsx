"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import "./Pagination.css"

interface PaginationProps {
  currentPage: number
  onPageChange: (page: number) => void
  isLoading?: boolean
  itemsPerPage?: number
  onItemsPerPageChange?: (items: number) => void
  totalPages?: number
}

export default function Pagination({ 
  currentPage, 
  onPageChange, 
  isLoading = false,
  itemsPerPage = 10,
  onItemsPerPageChange,
  totalPages = 50
}: PaginationProps) {

  const handlePageClick = (page: number) => {
    if (page !== currentPage && !isLoading) {
      onPageChange(page)
    }
  }

  const handlePrevious = () => {
    if (currentPage > 1 && !isLoading) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages && !isLoading) {
      onPageChange(currentPage + 1)
    }
  }

  const handleItemsPerPageChange = (items: number) => {
    if (onItemsPerPageChange) {
      onItemsPerPageChange(items)
    }
  }

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        <span>Items:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          className="items-select"
          disabled={isLoading}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

      <div className="pagination-controls">
        {isLoading && (
          <div className="loading-indicator">
            <Loader2 size={16} className="loading-spinner" />
            <span>Cargando...</span>
          </div>
        )}

        <button
          className={`page-btn page-btn--nav ${isLoading ? "page-btn--disabled" : ""}`}
          onClick={handlePrevious}
          disabled={currentPage === 1 || isLoading}
        >
          <ChevronLeft size={16} />
        </button>

        <button
          className={`page-btn ${currentPage === 1 ? "page-btn--active" : ""} ${isLoading ? "page-btn--disabled" : ""}`}
          onClick={() => handlePageClick(1)}
          disabled={isLoading}
        >
          1
        </button>

        {currentPage > 4 && <span className="page-ellipsis">...</span>}

        {currentPage > 3 && (
          <button
            className={`page-btn ${isLoading ? "page-btn--disabled" : ""}`}
            onClick={() => handlePageClick(currentPage - 2)}
            disabled={isLoading}
          >
            {currentPage - 2}
          </button>
        )}

        {currentPage > 2 && (
          <button
            className={`page-btn ${isLoading ? "page-btn--disabled" : ""}`}
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={isLoading}
          >
            {currentPage - 1}
          </button>
        )}

        {currentPage !== 1 && currentPage !== totalPages && (
          <button className={`page-btn page-btn--active ${isLoading ? "page-btn--disabled" : ""}`} disabled={isLoading}>
            {currentPage}
          </button>
        )}

        {currentPage < totalPages - 1 && (
          <button
            className={`page-btn ${isLoading ? "page-btn--disabled" : ""}`}
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={isLoading}
          >
            {currentPage + 1}
          </button>
        )}

        {currentPage < totalPages - 2 && (
          <button
            className={`page-btn ${isLoading ? "page-btn--disabled" : ""}`}
            onClick={() => handlePageClick(currentPage + 2)}
            disabled={isLoading}
          >
            {currentPage + 2}
          </button>
        )}

        {currentPage < totalPages - 3 && <span className="page-ellipsis">...</span>}

        {totalPages > 1 && (
          <button
            className={`page-btn ${currentPage === totalPages ? "page-btn--active" : ""} ${isLoading ? "page-btn--disabled" : ""}`}
            onClick={() => handlePageClick(totalPages)}
            disabled={isLoading}
          >
            {totalPages}
          </button>
        )}

        <button
          className={`page-btn page-btn--nav ${isLoading ? "page-btn--disabled" : ""}`}
          onClick={handleNext}
          disabled={currentPage === totalPages || isLoading}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
