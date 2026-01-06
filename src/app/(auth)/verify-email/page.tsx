"use client";

import { Mail, ChevronRight } from "lucide-react";
import Button from "@/src/components/ui/Button";
import Link from "next/link";
import SideDiv from "@/src/components/auth_components/left-section";
import { useEffect, useState } from "react";
import { useSendEmail } from "@/src/hooks/use_auth_hook";
import { useUser } from "@/src/hooks/use_user_hook";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const [timeLeft, setTimeLeft] = useState(30);
  const { data: user } = useUser();
  const router = useRouter();
  const { mutate: resendEmail, isPending } = useSendEmail();
  console.log("user", user);

  const handleResendEmail = async () => {
    if (user) {
      setTimeLeft(30);
      resendEmail({ email: user?.email, user_id: user?.id });
    }
  };

  useEffect(() => {
    if (timeLeft === 0) return;

    // Create a timer that runs every second
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // Cleanup stop the timer when component unmounts or hits 0
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  if (!user) {
    router.push("/signin");
  }
  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans">
      {/* Left Section - Features Sidebar (identical to signup/signin) */}
      <SideDiv />
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
            We've sent a verification link to {user?.email}
            <span className="font-medium text-gray-900"></span>.
            <br />
            Please click the link in the email to confirm your account.
          </p>

          <p className="text-sm text-gray-500 mb-8">
            Didn't receive the email? Check your spam folder or{" "}
            <button
              className="font-medium text-gray-900 hover:underline"
              onClick={handleResendEmail}
              disabled={timeLeft > 0}
            >
              {timeLeft > 0
                ? `Resend available in ${timeLeft}s`
                : "Resend verification email"}
            </button>
            .
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
              <Link
                href="/signup"
                className="font-medium text-gray-900 hover:underline"
              >
                Sign up with a different email
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
