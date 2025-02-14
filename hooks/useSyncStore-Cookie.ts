"use client";

import { useEffect } from "react";
import { useFormOrTemplateStore } from "@/../store/store";
import { getCookie } from "cookies-next";

export function useSyncStoreWithCookie() {
  const { selectedOption, syncWithCookie } = useFormOrTemplateStore();

  useEffect(() => {
    const interval = setInterval(() => {
      const cookieValue = getCookie("selectedOption");
      if (cookieValue && cookieValue !== selectedOption) {
        syncWithCookie();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedOption, syncWithCookie]);

  // Verificación inicial al montar el componente
  useEffect(() => {
    syncWithCookie();
  }, [syncWithCookie]);
}
