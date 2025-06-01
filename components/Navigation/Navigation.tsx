"use client";

import { usePathname, useRouter } from "next/navigation";
import { List, Plus } from "lucide-react";
import "./Navigation.css";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveTab = () => {
    if (pathname === "/dashboard") {
      return "lista";
    } else if (pathname === "/create-form") {
      return "crear";
    }
    return "lista";
  };

  const activeTab = getActiveTab();

  const handleTabClick = (tab: string) => {
    if (tab === "lista") {
      router.push("/dashboard");
    } else if (tab === "crear") {
      router.push("/dashboard/create-form");
    }
  };

  const prefetchRoutes = () => {
    router.prefetch("/dashboard");
    router.prefetch("/create-form");
  };

  if (typeof window !== "undefined") {
    prefetchRoutes();
  }

  return (
    <nav className="navigation">
      <button
        className={`nav-tab ${activeTab === "lista" ? "nav-tab--active" : ""}`}
        onClick={() => handleTabClick("lista")}
      >
        <List size={16} />
        Lista Formulario
      </button>
      <div className="nav-divider"></div>
      <button
        className={`nav-tab ${activeTab === "crear" ? "nav-tab--active" : ""}`}
        onClick={() => handleTabClick("crear")}
      >
        <Plus size={16} />
        Crear Formulario
      </button>
    </nav>
  );
}
