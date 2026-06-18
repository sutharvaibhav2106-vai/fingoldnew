import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function triggerAuthModal(mode: "login" | "register" = "register") {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-auth", { detail: { mode } }));
  }
}
