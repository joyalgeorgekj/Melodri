import { useState } from "react";
import type { IdentificationResult } from "../types/result";

export function useN8nRequest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IdentificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async (file: File, timestamp: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("timestamp", timestamp);

    try {
      const res = await fetch("http://localhost:5679/webhook/start", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.ok === false) throw new Error(json.message || "Failed");

      setResult(json.data ?? json);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, result, error, run };
}
