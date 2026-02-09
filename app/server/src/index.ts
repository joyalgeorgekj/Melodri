import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { upload } from "./middleware/fileUpload";
import { validateFileType } from "./utils/validateFile";
import { validateTimestamp } from "./utils/validateTimestamp";
import { ffmpeg } from "./utils/ffmpeg";
import { rm } from "fs/promises";
import { errorHandle } from "./middleware/errorHandle";
import { asyncHandler } from "./utils/asyncHandler";
import path from "path";

const app = express();

// Dev ENV
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || "http://localhost";

app.use(express.json());

// Methods
app.post(
    "/process",
    upload.single("file"),
    asyncHandler(async (req, res) => {
        if (!req.file)
            return res.status(400).json({
                ok: false,
                code: "FILE_MISSING",
                message: "No file uploaded",
            });

        let dir = path.dirname(req.file.path);

        const timestamp = req.body.timestamp || "00:00:00.000";

        let cleaned = false;
        const clean = async () => {
            if (cleaned) return;
            cleaned = true;
            await rm(dir, { force: true, recursive: true });
        };

        res.on("finish", clean);
        res.on("close", clean);

        validateTimestamp(timestamp);
        console.log("Path", req.file.path);
        await validateFileType(req.file.path);

        const processed = await ffmpeg(
            req.file.filename,
            req.file.path,
            timestamp,
        );

        const { output } = processed;

        console.log("Response from ffmpeg", processed);

        res.setHeader("Content-Type", "audio/wav");
        return res.sendFile(output, {root: '/'});
    }),
);

// Middleware for Error Handle
app.use(errorHandle);

// Serving the server
app.listen(PORT, () => {
    console.log(`Server is running at ${URL}:${PORT}`);
});
