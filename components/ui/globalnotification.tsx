"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, redirect } from "next/navigation";
import { notification } from "@/lib/notification";

export function GlobalNotification() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const type = params.get("type") as
      | "success"
      | "error"
      | "info"
      | "warning"
      | null;

    const message = params.get("message");

    if (message) {
      notification({
        type: type ?? "info",
        message: message,
      });

      // ✅ optional: clean URL after showing toast
      router.replace(window.location.pathname);
    }
  }, [params, router]);

  return null;
}
