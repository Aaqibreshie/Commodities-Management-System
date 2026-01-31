"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  requireManager?: boolean;
}

export default function ProtectedLayout({
  children,
  requireManager = false,
}: ProtectedLayoutProps) {
  const { user, isLoading, isManager } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      } else if (requireManager && !isManager) {
        router.push("/products");
      }
    }
  }, [user, isLoading, isManager, requireManager, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requireManager && !isManager) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
