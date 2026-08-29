"use server";

import { addSubscriber } from "@/lib/subscribers";

export type SubscribeState = { status?: "ok" | "error"; message?: string };

export async function subscribeAction(
  _prevState: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  // Honeypot: real visitors never fill this hidden field; bots that
  // autofill every input do, so silently pretend success and drop it.
  if (String(formData.get("website") ?? "").length > 0) {
    return { status: "ok", message: "Inscrito! Você vai receber um aviso a cada novo post." };
  }

  const email = String(formData.get("email") ?? "");
  const result = await addSubscriber(email);

  if (result === "invalid") {
    return { status: "error", message: "Digite um e-mail válido." };
  }
  if (result === "already_subscribed") {
    return { status: "ok", message: "Esse e-mail já está inscrito." };
  }
  return { status: "ok", message: "Inscrito! Você vai receber um aviso a cada novo post." };
}
