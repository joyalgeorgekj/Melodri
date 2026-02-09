import { spawn } from "child_process";

export const ffmpeg = (
    inputFileName: string,
    inputPath: string,
    timestamp: string,
) => {
    return new Promise<{ output: string; response: string }>(
        (resolve, reject) => {
            const outputPath = inputPath.replace(inputFileName, "output.wav");

            console.log("FFMPEG:", inputPath, "→", outputPath, "@", timestamp);

            const ff = spawn("ffmpeg", [
                "-y",
                "-i",
                inputPath,
                "-ss",
                timestamp,
                "-t",
                "30",
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
                reject(new Error("ffmpeg timeout"));
            }, 15000);

            ff.stderr.on("data", (data) => {
                console.error("ffmpeg:", data.toString());
            });

            ff.on("error", (err) => {
                clearTimeout(timeout);
                reject(err);
            });

            ff.on("close", (code) => {
                clearTimeout(timeout);
                if (code === 0) {
                    resolve({ output: outputPath, response: "OK" });
                } else if(code === 1) reject(new Error(`Invalid input file content`));
                else reject(new Error(`ffmpeg exited with code ${code}`));
            });
        },
    );
};
