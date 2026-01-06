"use client";

import { useState } from "react";
import { Eye, EyeOff, ChevronRight } from "lucide-react";

export default function InvitePasswordPage({ params }: { params: { token: string } }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // In real app: send to backend with token to create account
      alert("Account created! Redirecting to login...");
      // Redirect to /signin
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 shadow-sm max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Input Your Password</h2>
        <p className="text-gray-600 mb-8">Enter your sub account password to get started.</p>

        <div className="space-y-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Confirm password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2 mt-8 disabled:opacity-60"
        >
          {isSubmitting ? "Creating..." : "Submit"}
          {!isSubmitting && <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}