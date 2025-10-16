"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      fullName: string;
      email: string;
      role: string;
      isActive: boolean;
      lastLoginAt: string;
      lastLoginIP: string;
      createdAt: string;
      updatedAt: string;
    };
    accessToken: string;
  };
};

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginMutation = useMutation({
    mutationFn: async (): Promise<LoginResponse> => {
      const res = await fetch("/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      return data;
    },
    onSuccess: (data) => {
      alert("🎉 " + data.message);
      console.log("Logged in user:", data.data.user);
      if (data.data.accessToken) {
        localStorage.setItem("accessToken", data.data.accessToken);
      }
      router.push("/dashboard");
    },
    onError: (error: any) => {
      alert("❌ " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <div className="flex bg-white min-h-screen">
      {/* Left Section */}
      <div className="relative flex flex-col flex-1 justify-between px-10 md:px-24 py-10">
        {/* Logo aligned to top */}
        <div className="flex items-center gap-3 mx-auto w-full max-w-sm font-bold text-[#1B212D] text-lg">
          <Image
            src="/maglo-logo.svg"
            alt="Maglo Logo"
            className="w-[30px] h-[30px]"
            width={30}
            height={30}
          />
          Maglo.
        </div>

        {/* Centered form */}
        <div className="flex flex-col flex-grow justify-center items-center">
          <div className="w-full max-w-sm">
            <h1 className="font-semibold text-gray-900 text-3xl">Sign In</h1>
            <p className="mt-2 text-gray-500">
              Welcome back! Please enter your details
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 mt-8">
              <div>
                <label className="block font-medium text-gray-700 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 w-full placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 text-sm">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="•••••••"
                  className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 w-full placeholder-gray-500"
                />
              </div>

              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="bg-lime-400 hover:bg-lime-500 disabled:opacity-60 py-2 rounded-lg w-full font-semibold text-gray-900 transition-colors"
              >
                {loginMutation.isPending ? "Signing in..." : "Sign In"}
              </button>

              <button
                type="button"
                className="flex justify-center items-center gap-2 hover:bg-gray-50 py-2 border border-gray-300 rounded-lg w-full transition-colors placeholder-gray-500"
              >
                <Image
                  src="/DeviconGoogle.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                <span className="font-bold text-gray-500 text-sm">
                  Sign in with Google
                </span>
              </button>
            </form>

            <p className="mt-6 text-gray-600 text-sm text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="inline-block relative font-bold hover:scale-110 transition-transform"
              >
                Sign up
                <span className="bottom-[-4px] left-0 absolute">
                  <svg
                    width="50"
                    height="6"
                    viewBox="0 0 60 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 3C10 5 20 5 30 3C40 1 50 1 59 3"
                      stroke="#A3E635"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex flex-1 justify-center items-center bg-gray-100">
        <Image
          src="/Image.png"
          alt="Clock Hand"
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
