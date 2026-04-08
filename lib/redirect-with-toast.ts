import { redirect } from "next/navigation";

export function redirectWithToast(
  path: string,
  type: "success" | "error" | "info" | "warning",
  message: string
) {
  const url = `${path}?type=${type}&message=${encodeURIComponent(message)}`;
  redirect(url);
}