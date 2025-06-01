import "./StatusBadge.css"

interface StatusBadgeProps {
  status: string
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const isActive = status === "Activo"

  return (
    <span className={`status-badge ${isActive ? "status-badge--active" : "status-badge--inactive"}`}>{status}</span>
  )
}
