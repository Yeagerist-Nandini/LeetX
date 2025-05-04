import { db } from "../utils/db.js";
import { submitBatch, getLanguage, pollBatchResults } from "../utils/judge0.js";
import asyncHanlder from "../utils/asyncHandler.js"
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js"

export const getAllSubmissions = asyncHanlder(async (req, res) => {
    const userId = req.user.id;

    const submissions = await db.submission.findMany({
        where: userId
    });

    return res
        .status(200)
        .json(new ApiResponse(200, submissions, "submissions fetched successfully"));
})


export const getSubmissionsByProblem = asyncHanlder(async (req, res) => {
    const userId = req.user.id;
    const { problemId } = req.params;

    const submissions = await db.submission.findMany({
        where: {
            userId,
            problemId
        }
    });

    return res
        .status(200)
        .json(new ApiResponse(200, submissions, "submissions fetched successfully"));
})


export const getAllSubmissionsForProblem = asyncHanlder(async (req, res) => {
    const { problemId } = req.params;

    const submissions = await db.submission.count({
        where: {
            problemId
        }
    });

    return res
        .status(200)
        .json(new ApiResponse(200, submissions, "submissions fetched successfully"));
})