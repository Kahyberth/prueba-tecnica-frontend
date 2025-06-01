"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header/Header";
import Login from "@/components/Login/Login";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (!isLoading && isAuthenticated) {
    return null;
  }

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
