import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decrypt, encrypt } from "@/src/server/utils/session"; // Your session helpers
import { env } from "@/src/lib/config"; // Your env variables
import axios from "axios";

export async function POST() {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get("session")?.value;

  //  Validation: Do we even have a session?
  if (!sessionValue) {
    return NextResponse.json({ error: "No session found" }, { status: 401 });
  }

  try {
    // Decrypt to get the Refresh Token
    const session = await decrypt(sessionValue);

    if (!session?.refreshToken) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    //  Call  Backend to get NEW tokens
    // We send the refresh token in the Cookie header as per the backend requirements
    const response = await axios.post(
      `${env.BACKEND_API_URL}/auth/refresh`,
      {}, // Body is empty
      {
        headers: {
          Cookie: `refresh_token=${session.refreshToken}`,
        },
      },
    );

    const newTokens = response?.data?.access_token;
    console.log(newTokens);

    // 4. Update the Session with NEW Access Token
    // We keep the old user data, but update the tokens and expiration
    const newExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day

    const newSession = await encrypt({
      ...session, // Keep user info (id, email, etc)
      accessToken: newTokens.access_token,
      // If backend rotates refresh tokens, update it. If not, keep old one.
      refreshToken: newTokens.refresh_token || session.refreshToken,
      expiresAt: newExpiresAt,
    });

    // 5. Overwrite the Cookie in the Browser
    cookieStore.set("session", newSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: newExpiresAt,
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Refresh failed:", error);
    // If refresh fails (e.g. refresh token is also expired), clear cookie
    cookieStore.delete("session");
    return NextResponse.json({ error: "Refresh failed" }, { status: 401 });
  }
}
