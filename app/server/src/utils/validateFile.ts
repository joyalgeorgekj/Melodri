import { spawn } from "child_process";
import { fileTypeFromFile } from "file-type";

export async function validateFileType(filePath: string) {
    const type = await fileTypeFromFile(filePath);
    const allowedTypes = ["audio/mpeg", "audio/wav", "audio/mp3", "video/mp4"];

    if (!type || !allowedTypes.includes(type.mime)) {
        console.log("Unsupported file format.", type?.mime);
        spawn('rm', ['-f', filePath]);
        throw new Error("Unsupported file format.");
    }

    return type;
}