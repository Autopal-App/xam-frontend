"use client";

import { useVerifyEmail } from "@/src/hooks/use_auth_hook";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, Suspense } from "react"; //
import { CheckCircle2, XCircle, AlertTriangle, Loader2 } from "lucide-react";
import Link from "next/link";

function ActivateAccountContent() {
  const { mutate, data, isPending } = useVerifyEmail();
  console.log("data", data);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  console.log("token", token);

  // Fix for React Strict Mode (Double Firing)
  const hasRun = useRef(false); // This is important cuz of the use strict in th main.tsx

  useEffect(() => {
    if (token && !hasRun.current) {
      mutate(token);
      hasRun.current = true; // Mark as run so it doesn't fire again
    }
  }, [token, mutate]);

  // Determine Icon
  let StatusIcon = AlertTriangle;
  let colorClass = "text-gray-800";

  if (isPending) {
    StatusIcon = Loader2; // Spinner
    colorClass = "text-blue-600 animate-spin";
  } else if (data?.success) {
    StatusIcon = CheckCircle2;
    colorClass = "text-black";
  } else if (token) {
    StatusIcon = XCircle;
    colorClass = "text-gray-800";
  }

  // Determine Message
  const title = isPending
    ? "Activating..."
    : data?.success
    ? "Account Activated"
    : "Activation Failed";

  const message = isPending
    ? "Please wait while we verify your account."
    : data?.data?.message || "Invalid or expired token.";

  return (
    <div className="w-full max-w-[480px] p-10 text-center border border-gray-200 rounded-2xl shadow-sm bg-white">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <StatusIcon className={`w-20 h-20 ${colorClass}`} strokeWidth={1} />
      </div>

      {/* Typography */}
      <h1 className="text-3xl font-bold tracking-tight text-black mb-3">
        {title}
      </h1>
      <p className="text-gray-600 text-lg leading-relaxed mb-8">{message}</p>

      {/* Actions */}
      {!isPending && (
        <div>
          {data?.success ? (
            <Link
              href="/login"
              className="flex w-full items-center justify-center rounded-lg bg-black px-6 py-4 text-base font-semibold text-white hover:bg-gray-800 transition-all focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Proceed to Login
            </Link>
          ) : (
            <div className="space-y-4">
              <Link
                href="/login"
                className="block w-full rounded-lg border-2 border-black px-6 py-4 text-base font-semibold text-black hover:bg-gray-50 transition-all"
              >
                Back to Login
              </Link>
              <p className="text-sm text-gray-500">
                Need help?{" "}
                <Link
                  href="/contact"
                  className="underline underline-offset-2 hover:text-black"
                >
                  Contact Support
                </Link>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ActivateAccountPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-white px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ActivateAccountContent />
      </Suspense>
    </main>
  );
}
