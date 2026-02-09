import { ErrorRequestHandler } from "express";
import { MulterError } from "multer";

export const errorHandle: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof MulterError)
        return res
            .status(400)
            .json({ ok: false, code: err.code, message: err.message });

    return res.status(500).json({
        ok: false,
        code: "Internal Server Error",
        message: err instanceof Error ? err.message : "Internal Server Error",
    });
};
