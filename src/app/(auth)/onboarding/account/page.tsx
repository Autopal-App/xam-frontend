"use client";

import { Building2, School, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";
import SideDiv from "@/src/components/auth_components/left-section";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSetupSchema, AccountSetupInput } from "@/src/lib/zod_schemas";
import { useAccountSetup } from "@/src/hooks/use_auth_hook";

type AccountType = "school" | "organization" | "individual" | null;

export default function AccountTypePage() {
  // const [selectedType, setSelectedType] = useState<AccountType>(null);
  const { mutate, isPending } = useAccountSetup();
  //Seting up form
  const form = useForm<AccountSetupInput>({
    resolver: zodResolver(accountSetupSchema),
    defaultValues: { name: "", type: "" as any },
  });

  // Button is enabled only when both conditions are met
  const { isValid } = form.formState;
  console.log("isValid", isValid);

  //Ths is jus to handle wat user select insead of using a useState hook
  const handleSelect = (value: AccountType) => {
    form.setValue("type", value, { shouldValidate: true });
  };

  // Didnt use getvalue here cuz that jus a snapshot of the value and it not reactive meaning wen u update it ti doesnt change
  const selectedType = form.watch("type");
  const inputIcon =
    selectedType === "school" ? (
      <School className="w-4 h-4" color="#71717b" />
    ) : selectedType === "organization" ? (
      <Building2 className="w-4 h-4" color="#71717b" />
    ) : (
      <User className="w-4 h-4" color="#71717b" />
    );

  const onSubmit = (values: AccountSetupInput) => {
    mutate(values);
  };
  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans">
      {/* Left Section - Features Sidebar */}
      <SideDiv />
      {/* Right Section - Account Type Selection */}
      <div className="flex-1 bg-white flex items-center justify-center px-6 py-12 lg:px-0">
        <form
          className="w-full max-w-lg"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
              onClick={() => {
                handleSelect("school");
              }}
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
              onClick={() => handleSelect("organization")}
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
              onClick={() => handleSelect("individual")}
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
              {selectedType === "individual"
                ? "Enter username"
                : ` Name of your ${selectedType || "institution"}`}
            </label>
            <Input
              type={"text"}
              placeholder="e.g. Greenfield High School"
              labelFor="institutionName"
              {...form.register("name")}
              icon
              IconChildren={inputIcon}
              required
            />
          </div>

          {/* Continue Button - Disabled until both fields are filled */}
          <Button
            disabled={!isValid}
            className={`mt-4 w-full flex flex-nowrap items-center justify-center ${
              !isValid ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {isPending ? (
              <>
                <div className="w-3 h-3 animate-pulse bg-white rounded-full" />{" "}
                <div className="w-3 h-3 animate-pulse bg-white rounded-full" />{" "}
                <div className="w-3 h-3 animate-pulse bg-white rounded-full" />{" "}
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="w-5 h-5 ml-2 " />
              </>
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
        </form>
      </div>
    </div>
  );
}
