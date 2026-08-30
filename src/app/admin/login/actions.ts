"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createSession, destroySession, verifyPassword } from "@/lib/auth";
import { clearLoginAttempts, isLoginRateLimited, recordFailedLogin } from "@/lib/rate-limit";

export type LoginState = { error?: string };

async function clientIp(): Promise<string> {
  const hdrs = await headers();
  const forwardedFor = hdrs.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const ip = await clientIp();

  if (await isLoginRateLimited(ip)) {
    return { error: "Too many attempts. Please wait a few minutes and try again." };
  }

  const password = String(formData.get("password") ?? "");

  if (!password || !verifyPassword(password)) {
    await recordFailedLogin(ip);
    return { error: "Incorrect password." };
  }

  await clearLoginAttempts(ip);
  await createSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}
