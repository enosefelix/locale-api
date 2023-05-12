import { NextFunction, Request, Response } from "express";

function validateRequiredFields(fields: string[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        const missingFields = fields.filter((field) => !(field in req.body));
        if (missingFields.length > 0) {
            res.status(400).json({
                error: `Missing required fields: ${missingFields.join(', ')}`,
            });
        } else {
            next();
        }
    };
}

export {validateRequiredFields}