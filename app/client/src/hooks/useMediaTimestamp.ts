import { useRef, useState } from "react";
import { formatForFFmpeg } from "../utils/formatForFFmpeg";

export function useMediaTimestamp() {
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement | null>(null);
  const [timestamp, setTimestamp] = useState("00:00:00.000");

  const capture = () => {
    if (!mediaRef.current) return;
    setTimestamp(formatForFFmpeg(mediaRef.current.currentTime));
  };

  return { mediaRef, timestamp, capture };
}