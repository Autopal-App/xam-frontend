// app/signin/page.tsx
"use client";

import { useState } from "react";
import { Zap, Target, LineChart, Eye, EyeOff, ChevronRight } from "lucide-react";
import FeatureCard from "../components/ui/FeatureCard";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const API_BASE = "https://xam-backend.onrender.com/api/v1";

  // Google Login - redirects to backend
  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/auth/google`;
  };

  // Email/Password Login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      
      if (data.token) {
        localStorage.setItem("accessToken", data.token);
        


        // Redirect to main dashboard
        router.push("/dashboard");
      } else {
        throw new Error("No token received");
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans">
      {/* Left: Features */}
      <div
        className="hidden lg:flex lg:w-5/12 xl:w-1/2 text-white flex-col justify-center px-12 relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/signup-bg.png')` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold mb-12">Welcome to XAM</h1>
          <div className="space-y-6">
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-white" />}
              title="Lightning Fast Examinations"
              description="Create hundreds of questions in minutes with AI-powered automation"
            />
            <FeatureCard
              icon={<Target className="w-6 h-6 text-white" />}
              title="Smart Proctoring"
              description="AI-driven integrity monitoring with human review for fair, flexible exams"
            />
            <FeatureCard
              icon={<LineChart className="w-6 h-6 text-white" />}
              title="Track Your Progress"
              description="Monitor examinations all in one dashboard"
            />
          </div>
        </div>
      </div>

      {/* Right: Sign In Form */}
      <div className="flex-1 bg-white flex items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Welcome Back</h2>
          <p className="text-gray-600 mb-8">Sign in to your XAM account to continue.</p>

          {/* Google Button */}
          <Button variant="google" onClick={handleGoogleLogin} className="mb-6">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">or</span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailLogin} className="space-y-5">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm">
                <input type="checkbox" className="mr-2 rounded border-gray-300" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-gray-900 hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" disabled={isLoading} className="mt-8">
              {isLoading ? "Signing in..." : (
                <>
                  Sign in
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="font-medium text-gray-900 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}