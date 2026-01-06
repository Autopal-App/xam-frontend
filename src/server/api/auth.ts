// src/server/actions/auth.ts
"use server";

import axios, { AxiosError } from "axios";
import {
  RegisterSchema,
  RegisterInput,
  sendEmailSchema,
  sendEmailInput,
  LoginInput,
  LoginSchema,
} from "@/src/lib/zod_schemas";
import { parse } from "set-cookie-parser";
import { createSession } from "../utils/session";
import { env } from "@/src/lib/config";
import { cookies } from "next/headers";

type ActionResponse = {
  success: boolean;
  message?: string;
  error?: string;
  data?: any;
  errors?: Record<string, string[]>;
};
export async function registerAction(
  data: RegisterInput,
): Promise<ActionResponse> {
  // 1. Input Validation (Zod) - Stop bad data early
  const validation = RegisterSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    //  Call External Backend using Axios
    const response = await axios.post(`${env.BACKEND_API_URL}/auth/register`, {
      email: validation.data.email,
      password: validation.data.password,
    });

    //console.log("responses:", response);

    const cookies = parse(response.headers["set-cookie"] || []);
    // Find the specific cookie named 'refresh_token'
    const refreshTokenCookie = cookies.find((c) => c.name === "refresh_token");
    const refreshToken = refreshTokenCookie?.value;
    const access_token = response.data?.data?.accessToken;
    console.log(
      `access_token:${access_token} and refreshToken:${refreshToken}`,
    );

    if (access_token && refreshToken) {
      await createSession(access_token, refreshToken);
    }

    return { success: true, data: response.data?.data?.user };
  } catch (error) {
    // 4. Axios Error Handling
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const backendMessage = error.response?.error || error.message;

      console.error(`Backend Error (${status}):`, backendMessage);

      // Handle "Email already taken" specifically if your backend sends 409
      if (status === 409) {
        return { success: false, message: "This email is already registered." };
      }

      return {
        success: false,
        message: backendMessage || "Registration failed",
      };
    }

    // Generic fallback for non-axios errors
    console.error("Unknown Error:", error);
    return { success: false, message: "Internal server error" };
  }
}

export async function sendEmailAction(
  data: sendEmailInput,
): Promise<ActionResponse> {
  const validation = sendEmailSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: validation.error.message };
  }
  try {
    const resp = await axios.post(`${env.BACKEND_API_URL}/auth/email`, {
      email: data.email,
      user_id: data.user_id,
    });

    return { success: true, data: resp.data };
  } catch (err) {
    console.error("Error sending email:", err);
    return { success: false, message: "Failed to send email" };
  }
}

export async function verifyEmailAction(
  token: string,
): Promise<ActionResponse> {
  try {
    const resp = await axios.put(
      `${env.BACKEND_API_URL}/auth/activate?token=${token}`,
    );
    return { success: true, data: resp.data };
  } catch (err) {
    console.error("Error verifying email:", err);
    console.log("resp", err.resp);
    return { success: false, message: "Failed to verify email" };
  }
  return;
}

export async function loginAction(data: LoginInput): Promise<ActionResponse> {
  const validate = LoginSchema.safeParse(data);
  if (!validate.success) {
    return { success: false, message: validate.error.message };
  }
  try {
    const resp = await axios.post(`${env.BACKEND_API_URL}/auth/login`, data);

    //Get cookies
    const cookies = parse(resp.headers["set-cookie"] || []);
    const refreshTokenCookie = cookies.find((c) => c.name === "refresh_token");
    const refreshToken = refreshTokenCookie?.value;

    const access_token = resp.data?.data?.accessToken;
    console.log(
      `access_token:${access_token} and refreshToken:${refreshToken}`,
    );

    if (access_token && refreshToken) {
      await createSession(access_token, refreshToken);
    }
    console.log("resp", resp.data);
    return { success: true, data: resp.data };
  } catch (err) {
    // 4. Axios Error Handling
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      const backendMessage = err.response?.data.error || err.message;
      console.log(err.response);

      console.error(`Backend Error (${status}):`, backendMessage);
      console.log(err.response?.data?.success);

      // Handle "Email already taken" specifically if your backend sends 409
      if (status === 409) {
        return { success: false, message: "Invalid credentials" };
      }
      if (err.response?.data?.success) {
        return {
          success: true,
          message:
            err.response?.data?.message ||
            "Login successful but email not verified",
          data: err.response.data?.data,
        };
      }
      return {
        success: false,
        message: backendMessage || "Login failed",
      };
    }
  }
}
