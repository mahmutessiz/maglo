"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toastSuccess, toastError } from "@/lib/toast";
import { useAuthStore } from "@/stores/authStore";
import type { LoginResponse } from "@/types/types";


const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { setAuth, isAuthenticated, _hasHydrated } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData): Promise<LoginResponse> => {
      const res = await fetch("/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Login failed");
      }

      return responseData;
    },
    onSuccess: (data) => {
      toastSuccess(data.message, { duration: 3000, position: "top-center" });

      // Store in Zustand (persists to localStorage automatically)
      setAuth(data.data.user, data.data.accessToken);

      router.push("/dashboard");
    },
    onError: (error) => {
      toastError(error.message, { duration: 3000, position: "top-center" });
    },
  });

  // Redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (_hasHydrated && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, _hasHydrated, router]);

  // Don't render the login form if the user is authenticated
  if (_hasHydrated && isAuthenticated) {
    return null;
  }

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex bg-white min-h-screen">
      {/* Left Section */}
      <div className="relative flex flex-col flex-1 justify-between px-10 md:px-24 py-10">
        <Link
          href="/login"
          className="flex items-center gap-3 mx-auto w-full max-w-sm font-bold text-[#1B212D] text-lg"
        >
          <Image
            src="/maglo-logo.svg"
            alt="Maglo Logo"
            className="w-[30px] h-[30px]"
            width={30}
            height={30}
          />
          Maglo.
        </Link>

        {/* Centered form */}
        <div className="flex flex-col flex-grow justify-center items-center">
          <div className="w-full max-w-sm">
            <h1 className="font-semibold text-[#1B212D] text-3xl">Sign In</h1>
            <p className="mt-2 font-normal text-[#78778B] text-[16px]">
              Welcome back! Please enter your details
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
              <div>
                <label
                  htmlFor="email"
                  className="block font-medium text-[#1B212D] text-sm"
                >
                  Email
                </label>
                <input
                  type="email"
                  disabled={loginMutation.isPending}
                  placeholder="example@gmail.com"
                  {...register("email")}
                  className={`mt-1 px-4 py-2 border border-[#F2F2F2] rounded-[10px] focus:outline-none focus:ring-2 text-sm text-[#78778B] w-full placeholder-[#78778B] ${
                    errors.email
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-lime-400"
                  }`}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block font-medium text-[#1B212D] text-sm"
                >
                  Password
                </label>
                <input
                  type="password"
                  disabled={loginMutation.isPending}
                  placeholder="•••••••"
                  {...register("password")}
                  className={`mt-1 px-4 py-2 border border-[#F2F2F2] rounded-[10px] focus:outline-none text-sm text-[#78778B] focus:ring-2 w-full placeholder-[#78778B] ${
                    errors.password
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-lime-400"
                  }`}
                />
                {errors.password && (
                  <p id="password-error" className="mt-1 text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                aria-disabled={loginMutation.isPending}
                disabled={loginMutation.isPending}
                className="bg-lime-400 hover:bg-lime-500 disabled:opacity-60 py-2 rounded-lg w-full font-semibold text-[#1B212D] text-[16px] transition-colors cursor-pointer"
              >
                {loginMutation.isPending ? "Signing in..." : "Sign In"}
              </button>

              <button
                type="button"
                disabled
                className="flex justify-center items-center gap-2 hover:bg-gray-50 py-2 border border-gray-300 rounded-lg w-full transition-colors cursor-not-allowed placeholder-gray-500"
              >
                <Image
                  src="/DeviconGoogle.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                <span className="font-bold text-[#78778B] text-[16px]">
                  Sign in with Google
                </span>
              </button>
            </form>

            <p className="mt-6 text-[#78778B] text-sm text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="inline-block relative font-medium text-[#1B212D] text-[14px] hover:scale-110 transition-transform"
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
