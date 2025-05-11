import { db } from "../utils/db.js";
import { submitBatch, getLanguage, pollBatchResults } from "../utils/judge0.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js"

export const getAllSubmissions = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const submissions = await db.submission.findMany({
        where: { userId: userId }
    });

    return res
        .status(200)
        .json(new ApiResponse(200, submissions, "submissions fetched successfully"));
})


export const getSubmissionsByProblem = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { problemId } = req.params;

    const submissions = await db.submission.findMany({
        where: {
            userId: userId,
            problemId: problemId
        }
    });

    if(!submissions) throw new ApiError(404, "Submissions not found")

    return res
        .status(200)
        .json(new ApiResponse(200, submissions, "submissions fetched successfully"));
})


export const getAllSubmissionsForProblem = asyncHandler(async (req, res) => {
    const { problemId } = req.params;

    const submissions = await db.submission.count({
        where: {
            problemId: problemId
        }
    });

    if(!submissions) throw new ApiError(404, "Submissions not found")

    return res
        .status(200)
        .json(new ApiResponse(200, submissions, "submissions fetched successfully"));
})