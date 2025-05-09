import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error";

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);

    if(errors.isEmpty()){
        // return next();
        next();
    }

    const extractedErrors = [];
    errors.array().map((err) => {
        extractedErrors.push({
            [err.path]: err.msg
        })
    })

    throw new ApiError(422, "Recieved data is not valid", extractedErrors);
}