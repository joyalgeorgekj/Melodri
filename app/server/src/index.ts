import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { upload } from "./middleware/fileUpload";
import { validateFileType } from "./utils/validateFile";
import { validateInput } from "./utils/validateInput";
import { ffmpeg } from "./utils/ffmpeg";
import { spawn } from "child_process";

const app = express();

const PORT = process.env.PORT || 3000;
const URL = process.env.URL || "http://localhost";

app.use(express.json());

app.post("/process", upload.single("file"), async (req, res) => {
    let timestamp = req.body.timestamp || "00:00:00";

    if (!req.file) return res.status(400).json({ error: "File missing" });

    try {
        await validateFileType(req.file.path);
        validateInput(timestamp);

        const resFFMPEG = await ffmpeg(
            req.file.filename,
            req.file.path,
            timestamp,
        );

        console.log("Response from ffmpeg", resFFMPEG);

        return res
            .json({ path: req.file.path })
            .sendFile(resFFMPEG.output, { root: "/" });
            
    } catch (error) {
        if (error instanceof Error)
            return res.status(415).json({ response: error.message });
        else
            return res
                .status(500)
                .json({ response: "An unknown error occured!", error });
    }
});

app.get("/cleanup", (req, res) => {
    const filename = req.body.filename;

    if (!filename)
        return res.status(500).json({ message: "Filename not found." });

    spawn("rm", ["-f", process.env.OUTPUT_DIR + "/" + filename]);

    return res.status(200).json({ message: "Cleanup OK" });
});

app.listen(PORT, () => {
    console.log(`Server is running at ${URL}:${PORT}`);
});
