"use server";

import { put } from "@vercel/blob";
import { isAdmin } from "@/lib/auth";

export type UploadResult = { url: string } | { error: string };

const MAX_BYTES = 50 * 1024 * 1024; // 50MB

export async function uploadMedia(formData: FormData): Promise<UploadResult> {
  if (!(await isAdmin())) return { error: "Não autorizado." };

  const file = formData.get("file");
  if (!(file instanceof File)) return { error: "Arquivo inválido." };

  if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
    return { error: "Apenas imagens ou vídeos são permitidos." };
  }

  if (file.size > MAX_BYTES) {
    return { error: "Arquivo muito grande (máx. 50MB)." };
  }

  const blob = await put(`posts/${Date.now()}-${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return { url: blob.url };
}
