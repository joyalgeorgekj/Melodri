import type { RefObject } from "react";

export function MediaPreview({
  file,
  mediaRef,
}: {
  file: File;
  mediaRef: RefObject<HTMLAudioElement | HTMLVideoElement>;
}) {
  return file.type.startsWith("audio") ? (
    <audio ref={mediaRef} controls src={URL.createObjectURL(file)} />
  ) : (
    <video ref={mediaRef as RefObject<HTMLVideoElement>} controls src={URL.createObjectURL(file)} />
  );
}
