"use client";

import { useState } from "react";
import {
  Zap,
  Target,
  LineChart,
  Building2,
  School,
  ChevronRight,
  User,
} from "lucide-react";

import Link from "next/link";
import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";
import { useAuthFormStore } from "@/src/lib/stores/auth_store";
import SideDiv from "@/src/components/auth_components/left-section";

type AccountType = "school" | "organization" | "individual" | null;

export default function AccountTypePage() {
  const [selectedType, setSelectedType] = useState<AccountType>(null);
  const { values } = useAuthFormStore();

  // Button is enabled only when both conditions are met
  const isContinueEnabled =
    selectedType !== null && values.institutionName.trim().length > 0;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans">
      {/* Left Section - Features Sidebar */}
      <SideDiv />
      {/* Right Section - Account Type Selection */}
      <div className="flex-1 bg-white flex items-center justify-center px-6 py-12 lg:px-0">
        <div className="w-full max-w-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What best describes you?
          </h2>
          <p className="text-gray-600 mb-10">
            This helps us tailor XAM to your needs.
          </p>

          {/* Account Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
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
            {/*I added an individual button for user who are not affiliated with an organization or school but want to use xam for tests or teacheing etc*/}
            <button
              type="button"
              onClick={() => setSelectedType("individual")}
              className={`p-6 rounded-2xl border-2 transition-all text-left ${
                selectedType === "individual"
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <div className="bg-gray-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="font-semibold text-lg mb-1">Individual</h3>
              <p className="text-sm text-gray-600">
                Teachers, Professors, or Instructor
              </p>
            </button>
          </div>

          {/* Institution Name Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name of your {selectedType || "institution"}
            </label>
            <Input
              type={"text"}
              placeholder="e.g. Greenfield High School"
              labelFor="institutionName"
              value={values.institutionName}
              icon
              IconChildren={<Building2 className="w-4 h-4" color="#71717b" />}
              required
            />
          </div>

          {/* Continue Button - Disabled until both fields are filled */}
          <Button
            disabled={!isContinueEnabled}
            className={`mt-4 w-full flex flex-nowrap items-center justify-center ${
              !isContinueEnabled ? "opacity-60 cursor-not-allowed" : ""
            }`}
            asChild={isContinueEnabled}
          >
            {isContinueEnabled ? (
              <Link href="/dashboard">
                Continue
                <ChevronRight className="w-5 h-5 ml-2 " />
              </Link>
            ) : (
              <span>
                Continue
                <ChevronRight className="w-5 h-5 ml-2" />
              </span>
            )}
          </Button>

          <p className="mt-6 text-center text-sm text-gray-600">
            <Link
              href="/signin"
              className="font-medium text-gray-900 hover:underline"
            >
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
