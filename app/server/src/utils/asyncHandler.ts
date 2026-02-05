import { RequestHandler } from "express";

export const asyncHandler =
    (processFunction: RequestHandler): RequestHandler =>
    (req, res, next) =>
        Promise.resolve(processFunction(req, res, next)).catch(next);
