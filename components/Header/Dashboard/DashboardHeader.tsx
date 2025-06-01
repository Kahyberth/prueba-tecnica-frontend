import Image from "next/image";
import DashboardUserProfile from "@/components/UserProfile/DashboardUserProfile/DashboardUserProfile";
import "./DashboardHeader.css";
import Navigation from "@/components/Navigation/Navigation";

export default function DashboardHeader() {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header-top">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
        <Navigation />
        <DashboardUserProfile />
      </div>
    </header>
  );
}
