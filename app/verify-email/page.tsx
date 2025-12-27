"use client";

import { Zap, Target, LineChart, Mail, ChevronRight } from "lucide-react";
import FeatureCard from "../components/ui/FeatureCard";
import Button from "../components/ui/Button";
import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans">
      {/* Left Section - Features Sidebar (identical to signup/signin) */}
      <div 
        className="hidden lg:flex lg:w-5/12 xl:w-1/2 text-white flex-col justify-center px-12 relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/signup-bg.png')`, 
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold mb-12">Welcome to XAM</h1>

          <div className="space-y-6">
            <FeatureCard
                    icon={<Zap className="w-6 h-6 text-white" />}
                    title="Lightning Fast Examininations"
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

      {/* Right Section - Verification Message */}
      <div className="flex-1 bg-white flex items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-md text-center">
          {/* Large Mail Icon */}
          <div className="mx-auto mb-8 w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            <Mail className="w-10 h-10 text-gray-600" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Check your email
          </h2>

          <p className="text-gray-600 mb-8 leading-relaxed">
            We've sent a verification link to <span className="font-medium text-gray-900">your@email.com</span>.
            <br />
            Please click the link in the email to confirm your account.
          </p>

          <p className="text-sm text-gray-500 mb-8">
            Didn't receive the email? Check your spam folder or{" "}
            <button className="font-medium text-gray-900 hover:underline">
              resend verification email
            </button>.
          </p>

          <div className="space-y-4">
            <Button asChild>
              <Link href="/signin">
                Back to Sign In
                <ChevronRight className="w-5 h-5" />
              </Link>
            </Button>

            <p className="text-sm text-gray-600">
              Wrong email?{" "}
              <Link href="/signup" className="font-medium text-gray-900 hover:underline">
                Sign up with a different email
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}