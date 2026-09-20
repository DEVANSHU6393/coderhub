"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function login(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const sessionSecret = process.env.SESSION_SECRET || "super-secret-session-key";

  if (!adminPasswordHash) {
    console.error("ADMIN_PASSWORD_HASH is not set in environment variables");
    return { success: false, message: "Server misconfiguration. Please contact administrator." };
  }

  try {
    const passwordMatch = await bcrypt.compare(password, adminPasswordHash);

    if (username === adminUsername && passwordMatch) {
      // Create JWT
      const secret = new TextEncoder().encode(sessionSecret);
      const jwt = await new SignJWT({ username: adminUsername, role: "admin" })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(secret);

      const cookieStore = await cookies();
      cookieStore.set("admin_session", jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });
      
      return { success: true, redirect: true };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "An error occurred during login." };
  }

  return { success: false, message: "Invalid credentials" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}
