import "./UserProfile.css"
import { Handshake } from "lucide-react"

export default function UserProfile() {
  return (
    <div className="user-info">
      <span className="benefits-text">Beneficios por renovar</span>
      <div className="avatar">
        <Handshake />
      </div>
    </div>
  )
}
