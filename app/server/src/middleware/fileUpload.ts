import { mkdirSync } from "fs";
import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";

const MAX_FILESIZE = 50 * 1024 * 1024;
const DIR = process.env.DIR || "tmp/"

export const upload = multer({
    storage: multer.diskStorage({
        destination: function (_req, _file, cb) {
            let newDir = DIR + nanoid(12);
            console.log(newDir);
            mkdirSync(newDir, {recursive: true});
            cb(null, newDir);
        },
        filename: function (_req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, `input${ext}`);
        },
    }),
    limits: {
        fileSize: MAX_FILESIZE,
    },
});