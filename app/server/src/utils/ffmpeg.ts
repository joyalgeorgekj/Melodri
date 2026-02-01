import { spawn } from "child_process";

export const ffmpeg = (
    inputFileName: string,
    inputPath: string,
    timestamp: string,
) => {
    return new Promise<{output: string, response: string}>((resolve, reject) => {
        const outputPath = inputPath.replace(inputFileName, "output.wav");

        console.log("FFMPEG:", inputPath, "→", outputPath, "@", timestamp);

        const ff = spawn("ffmpeg", [
            "-y",
            "-ss",
            timestamp,
            "-t",
            "30",
            "-i",
            inputPath,
            "-ac",
            "1",
            "-ar",
            "16000",
            "-f",
            "wav",
            outputPath,
        ]);

        const timeout = setTimeout(() => {
            ff.kill("SIGKILL");
            reject(new Error("FFmpeg timeout"));
        }, 15000);

        ff.stderr.on("data", (data) => {
            console.error("FFmpeg:", data.toString());
        });

        ff.on("error", (err) => {
            clearTimeout(timeout);
            reject(err);
        });

        ff.on("close", (code) => {
            clearTimeout(timeout);
            if (code === 0) {
                resolve(
                    { output: outputPath, response: "OK" }
                );
            } else reject(new Error(`FFmpeg exited with code ${code}`));
        });
    });
};
