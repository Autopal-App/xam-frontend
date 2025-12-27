"use client";

import { useState } from "react";
import { Zap, Target, LineChart, Building2, School, ChevronRight } from "lucide-react";
import FeatureCard from "../../components/ui/FeatureCard";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Link from "next/link";

type AccountType = "school" | "organization" | null;

export default function AccountTypePage() {
  const [selectedType, setSelectedType] = useState<AccountType>(null);
  const [institutionName, setInstitutionName] = useState("");

  // Button is enabled only when both conditions are met
  const isContinueEnabled = selectedType !== null && institutionName.trim().length > 0;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans">
      {/* Left Section - Features Sidebar */}
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

      {/* Right Section - Account Type Selection */}
      <div className="flex-1 bg-white flex items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What best describes you?
          </h2>
          <p className="text-gray-600 mb-10">
            This helps us tailor XAM to your needs.
          </p>

          {/* Account Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <button
              type="button"
              onClick={() => setSelectedType("school")}
              className={`p-6 rounded-2xl border-2 transition-all text-left ${
                selectedType === "school"
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <div className="bg-gray-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <School className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="font-semibold text-lg mb-1">School</h3>
              <p className="text-sm text-gray-600">
                Secondary, college, or university
              </p>
            </button>

            <button
              type="button"
              onClick={() => setSelectedType("organization")}
              className={`p-6 rounded-2xl border-2 transition-all text-left ${
                selectedType === "organization"
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <div className="bg-gray-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="font-semibold text-lg mb-1">Organization</h3>
              <p className="text-sm text-gray-600">
                Company, nonprofit, or training center
              </p>
            </button>
          </div>

          {/* Institution Name Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name of your {selectedType || "institution"}
            </label>
            <Input
              placeholder="e.g. Greenfield High School"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
            />
          </div>

          {/* Continue Button - Disabled until both fields are filled */}
          <Button 
  disabled={!isContinueEnabled}
  className={`mt-4 w-full ${!isContinueEnabled ? 'opacity-60 cursor-not-allowed' : ''}`}
  asChild={isContinueEnabled}
>
  {isContinueEnabled ? (
    <Link href="/dashboard">
      Continue
      <ChevronRight className="w-5 h-5 ml-2" />
    </Link>
  ) : (
    <span>
      Continue
      <ChevronRight className="w-5 h-5 ml-2" />
    </span>
  )}
</Button>

          <p className="mt-6 text-center text-sm text-gray-600">
            <Link href="/signin" className="font-medium text-gray-900 hover:underline">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}