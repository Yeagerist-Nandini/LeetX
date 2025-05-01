import { db } from "../utils/db.js";
import { submitBatch, getLanguageId, pollBatchResults } from "../utils/judge0.js";
import asyncHanlder from "../utils/asyncHandler.js"
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js"

export const executeCode = asyncHanlder(async(req, res)=> {
    const {} = req.body
})