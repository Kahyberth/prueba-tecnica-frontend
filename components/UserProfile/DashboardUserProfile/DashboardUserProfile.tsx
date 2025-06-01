"use client"

import { useState, useRef, useEffect } from "react"
import { User, ChevronDown } from "lucide-react"
import "./DashboardUserProfile.css"
import UserDropdown from "@/components/UserDropdown/UserDropdown"
import { useAuth } from "@/contexts/AuthContext"

export default function DashboardUserProfile() {
  const { user } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const closeDropdown = () => {
    setIsDropdownOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown()
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <div className="dashboard-user-info">
      <span className="benefits-text">Beneficios por renovar</span>
      <div className="user-details" ref={dropdownRef}>
        <button 
          className="user-profile-button"
          onClick={toggleDropdown}
        >
          <div className="avatar">
            <User size={16} />
          </div>
          <div className="user-text">
            <span className="welcome-text">{user?.nombre || 'Ana Torres'}</span>
            <span className="role-text">{user?.rol || 'Administrador'}</span>
          </div>
          <ChevronDown 
            size={14} 
            className={`chevron ${isDropdownOpen ? 'chevron--open' : ''}`}
          />
        </button>

        {isDropdownOpen && (
          <UserDropdown onClose={closeDropdown} />
        )}
      </div>
    </div>
  )
}
