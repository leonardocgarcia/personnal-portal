"use server";

import { put } from "@vercel/blob";
import { isAdmin } from "@/lib/auth";

export type UploadResult = { url: string } | { error: string };

const MAX_BYTES = 50 * 1024 * 1024; // 50MB

export async function uploadMedia(formData: FormData): Promise<UploadResult> {
  if (!(await isAdmin())) return { error: "Not authorized." };

  const file = formData.get("file");
  if (!(file instanceof File)) return { error: "Invalid file." };

  if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
    return { error: "Only images or videos are allowed." };
  }

  if (file.size > MAX_BYTES) {
    return { error: "File too large (max 50MB)." };
  }

  const blob = await put(`posts/${Date.now()}-${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return { url: blob.url };
}
