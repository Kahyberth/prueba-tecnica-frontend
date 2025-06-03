"use client";

import Image from "next/image";
import Header from "@/components/Header/Header";
import Login from "@/components/Login/Login";
import { withPublicRoute } from "@/components/auth/PublicRoute";

function LoginPage() {
  return (
    <div className="login-page">
      <div className="background-container">
        <Image src="/background.jpg" alt="Background" fill priority />
      </div>

      <Header />

      <main className="main-content">
        <Login />
      </main>
    </div>
  );
}

export default withPublicRoute(LoginPage);
