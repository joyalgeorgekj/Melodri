import type { IdentificationResult } from "../types/result";
import { PLATFORMS } from "../utils/platforms";

export function ResultPanel({ result }: { result: IdentificationResult }) {
  return (
    <div className="mt-6 p-6 border border-neutral-700 bg-black/70 space-y-3">
      <div className="text-xs uppercase tracking-widest text-neutral-500">
        Identified Track
      </div>

      <div className="text-2xl font-black">{result.song ?? "Unknown"}</div>
      <div className="text-neutral-400">{result.artist ?? "Unknown Artist"}</div>

      {result.confidence && (
        <div className="text-xs text-neutral-500">
          Confidence: {(result.confidence * 100).toFixed(0)}%
        </div>
      )}

      <div className="flex gap-4">
        {result.song &&
          Object.entries(PLATFORMS).map(([name, url]) => (
            <a
              key={name}
              href={url + encodeURIComponent(result.song)}
              className="underline text-neutral-300"
            >
              {name}
            </a>
          ))}
      </div>
    </div>
  );
}
