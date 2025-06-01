"use client";

import ProtectedRoute from "../../components/auth/ProtectedRoute";
import { useAuth } from "../../contexts/AuthContext";
import DashboardHeader from "@/components/Header/Dashboard/DashboardHeader";
import DataTable from "@/components/DataTable/DataTable";
import "./dashboard.css";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  return (
    <div className="dashboard-page">
      <DashboardHeader />

      <main className="dashboard-main">
        <DataTable />
      </main>

      <footer className="dashboard-footer">
        <p>Prueba Técnica De Uso Exclusivo de OL Software S.A.</p>
      </footer>
    </div>
  );
}
