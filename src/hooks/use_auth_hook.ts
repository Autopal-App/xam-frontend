import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LoginInput, RegisterInput, sendEmailInput } from "../lib/zod_schemas";
import {
  loginAction,
  registerAction,
  sendEmailAction,
  verifyEmailAction,
} from "../server/api/auth";
import { useAuthFormStore } from "../lib/stores/auth_store";

// import { toast } from 'sonner' //add later

export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterInput) => registerAction(data),
    onSuccess: (result) => {
      if (result.success) {
        //Todo pick the best optionhere
        // OPTION A: The "Instant" Update (Best Performance)
        // We manually tell React Query Here is the data for 'current-user', don't fetch it.
        queryClient.setQueryData(["current-user"], result.data);

        // OPTION B: The "Safe" Update (Best Consistency)
        // If your backend didn't return the full user object, just tell React Query to re-fetch.
        // queryClient.invalidateQueries({ queryKey: ['current-user'] })
        router.push("/verify-email"); // If auto-login is enabled
        //router.refresh();
      } else {
        // ❌ Logic failure (e.g. Email taken)
        // You can handle this in the UI via the 'data' property returned by the hook
      }
    },
    onError: (err) => {
      // ❌ Network failure (Server Action crashed completely)

      console.error("Registration Error:", err);
    },
  });
}

export function useSendEmail() {
  return useMutation({
    mutationFn: (data: sendEmailInput) => sendEmailAction(data),
    onSuccess: (result) => {
      if (result.success) {
        // TODO:ADD toast message
        // toast.success("Email sent successfully");
      } else {
        // ❌ Logic failure (e.g. Email taken)
        // You can handle this in the UI via the 'data' property returned by the hook
      }
    },
    onError: (err) => {
      // ❌ Network failure (Server Action crashed completely)
      console.error(" Error:", err);
    },
  });
}

export function useVerifyEmail() {
  const { setError } = useAuthFormStore();
  return useMutation({
    mutationFn: (token: string) => verifyEmailAction(token),
    onSuccess: (result) => {
      if (result?.success) {
      } else {
        setError("Verification failed, please resend");
      }
    },
    onError: (err) => {
      // ❌ Network failure (Server Action crashed completely)
      setError("Network connection error. Please try again.");
      console.error(" Error:", err);
    },
  });
}
export function useLogin() {
  const { setError } = useAuthFormStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginInput) => loginAction(data),
    onSuccess: (result) => {
      if (result.success) {
        //Todo pick the best optionhere
        // OPTION A: The "Instant" Update (Best Performance)
        // We manually tell React Query Here is the data for 'current-user', don't fetch it.

        console.log(result);
        // TODO(FOR Rooqx tho): Send refresh token from the backend too so wen user refresh the cache can use the /me route to get user detalis
        const redirectUrl = result.data?.redirect_url;
        console.log("redirecturl", redirectUrl);

        if (redirectUrl) {
          setError("Please verify your email first.");
          console.log("works");

          console.log(result.data?.user);
          //Checking if user opject is present
          if (result.data?.user) {
            //Backend send use data so so we can pull the use email from there so wen user wants to resend verification code
            queryClient.setQueryData(["current-user"], result.data?.user);
            console.log("caching user");
          }
          router.push(/*result.data?.redirect_url */ "/verify-email");
          console.log("redirecting");

          // router.refresh();
          setError("Login successful but email not verified'");

          return;
        }
        queryClient.setQueryData(["current-user"], result.data);
        //  router.push("/verify-email"); // If auto-login is enabled
        //router.refresh();
      } else {
        setError(result.message || "Login failed");
      }
    },
    onError: (err) => {
      // ❌ Network failure (Server Action crashed completely)
      setError("Network connection error. Please try again.");
      console.error("Login Error:", err);
    },
  });
}
