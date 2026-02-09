import path from "path";
import { fileTypeFromFile } from "file-type";

const ALLOWED_MIME = [
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/x-wav",
    "video/mp4",
];

const ALLOWED_EXT = [".wav", ".mp3", ".mp4"];

export async function validateFileType(filePath: string) {
    const type = await fileTypeFromFile(filePath);
    const ext = path.extname(filePath).toLowerCase();

    console.log("Detected type:", type);
    console.log("Extension:", ext);

    // Case 1: file-type detected MIME
    if (type && ALLOWED_MIME.includes(type.mime)) {
        return type;
    }

    // Case 2: file-type could not detect, fallback to extension
    if (!type && ALLOWED_EXT.includes(ext)) {
        return { mime: `fallback/${ext.slice(1)}`, ext };
    }

    throw new Error("Unsupported file format.");
}
