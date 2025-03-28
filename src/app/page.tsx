"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <main className="flex flex-col items-center p-8 max-w-md">
        <h1 className="text-gray-600 text-3xl font-bold mb-8">
          Welcome to the Application
        </h1>

        <LoginForm />

        <div className="text-center text-gray-600 text-sm mt-4">
          <p>Access the application by logging in with your credentials</p>
        </div>
      </main>

      <footer className="mt-auto p-4 text-center text-gray-500 text-sm">
        <p>Struts2Java Frontend &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
