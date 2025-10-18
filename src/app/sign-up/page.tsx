"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toastSuccess, toastError } from "@/lib/toast";
import { useAuthStore } from "@/stores/authStore";
import type { User } from "@/stores/authStore";

type SignupResponse = {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
};

const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&._*]/, "Password must contain at least one special character (!@#$%^&._*)"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const registerMutation = useMutation({
    mutationFn: async (data: SignupFormData): Promise<SignupResponse> => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to register");
      }

      return res.json();
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

  const onSubmit = (data: SignupFormData) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="flex bg-white min-h-screen">
      {/* Left Section */}
      <div className="flex flex-col flex-1 justify-between px-10 md:px-24 py-10">
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

        {/* form */}
        <div className="flex flex-col flex-grow justify-center items-center">
          <div className="w-full max-w-sm">
            <h1 className="font-semibold text-gray-900 text-3xl">
              Create new account
            </h1>
            <p className="mt-2 text-gray-500">
              Welcome! Please enter your details
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
              <div>
                <label className="block font-medium text-gray-700 text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("fullName")}
                  className={`mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 w-full placeholder-gray-500 ${
                    errors.fullName
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-lime-400"
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  {...register("email")}
                  className={`mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 w-full placeholder-gray-500 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-lime-400"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 text-sm">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="•••••••"
                  {...register("password")}
                  className={`mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 w-full placeholder-gray-500 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-lime-400"
                  }`}
                />
                {errors.password && (
                  <div className="space-y-1 mt-2">
                    {errors.password.message && (
                      <p className="text-red-500 text-sm">
                        • {errors.password.message}
                      </p>
                    )}
                  </div>
                )}
                {!errors.password && (
                  <p className="mt-2 text-gray-500 text-xs">
                    Password must contain: uppercase, lowercase, number, and special character (!@#$%^&*)
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="bg-lime-400 hover:bg-lime-500 disabled:opacity-60 py-2 rounded-lg w-full font-semibold text-gray-900 transition-colors"
              >
                {registerMutation.isPending ? "Creating..." : "Create Account"}
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
                  Sign up with Google
                </span>
              </button>
            </form>

            <p className="mt-6 text-gray-600 text-sm text-center">
              Already have an account?{" "}
              <Link
                href="/"
                className="inline-block relative font-bold hover:scale-110 transition-transform"
              >
                Sign in
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
      <div className="hidden md:flex flex-1 justify-center items-center">
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