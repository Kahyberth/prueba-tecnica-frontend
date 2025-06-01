import Image from "next/image"
import "./Header.css"
import UserProfile from "../UserProfile/UserProfile"

export default function Header() {
  return (
    <header className="header">
      <Image 
        src="/logo.png" 
        alt="Logo" 
        width={100} 
        height={100} 
        className="logo"
      />
      <UserProfile />
    </header>
  )
}
