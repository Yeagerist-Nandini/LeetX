import { db } from "../utils/db.js";
import { submitBatch, getLanguageId, pollBatchResults } from "../utils/judge0.js";
import asyncHanlder from "../utils/asyncHandler.js"
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js"

export const createProblem = asyncHanlder(async (req, res) => {
    const {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        // hints,
        // editorial,
        testcases,
        codeSnippets,
        referenceSolutions
    } = req.body;

    //checking if reference solution is valid for each language
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
        const languageId = getLanguageId(language);

        if (!languageId) throw new ApiError(400, `Language ${language} is not supported`);

        const submissions = testcases.map(({ input, output }) => ({
            source_code: solutionCode,
            language_id: languageId,
            stdin: input,
            expected_output: output
        }));

        const submissionResults = await submitBatch(submissions, res);

        const tokens = submissionResults.map(res => res.token);

        const results = await pollBatchResults(tokens);

        for (let i = 0; i < results.length; i++) {
            const result = results[i];

            console.log(result);

            if (result.status.id !== 3) {
                throw new ApiError(400, `Testcase ${i + 1} failed for ${language}`);
            }
        }
    }

    const new_problem = await db.problem.create({
        data: {
            title,
            description,
            difficulty,
            tags,
            examples,
            constraints,
            // hints,
            // editorial,
            testcases,
            codeSnippets,
            referenceSolutions,
            userId: req.user.id,
        }
    });

    if (!new_problem) throw new ApiError(500, "Error while creating problem");

    return res.status(200).json(new ApiResponse(200, new_problem, "Problem created successfully"))
})


export const getAllProblems = asyncHanlder(async (req, res) => {
    const problems = await db.problem.findMany();

    if (!problems) throw new ApiError(404, "No problems found");

    return res
        .status(200)
        .json(new ApiResponse(200, problems, "Problems fetched successfully"));
})


export const getProblemById = asyncHanlder(async (req, res) => {
    const { problemId } = req.params;

    const problem = await db.problem.findUnique({
        where: { id: problemId }
    });

    if (!problem) throw new ApiError(404, "Problem not found");

    return res
        .status(200)
        .json(new ApiResponse(200, problem, "Problem fetched successfully"));
})


export const updateProblem = asyncHanlder(async (req, res) => {
    const { problemId } = req.params;

    const problem = await db.problem.findUnique({ where: { id: problemId } });
    if (!problem) throw new ApiError(404, "Problem not found");

    const {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions
    } = req.body;

    for(const [language, solutionCode] in Object.entries(referenceSolutions)){
        const languageId = getLanguageId(language);

        if (!languageId) throw new ApiError(400, `Language ${language} is not supported`);

        const submissions =  testcases.map(({input, output}) => ({
            source_code: solutionCode,
            sdtin: input,
            expected_output: output, 
            language_id: languageId
        }));
        
        const submissionResults = await submitBatch(submissions, res);

        const tokens = submissionResults.map((result) => result.token);

        const results = await pollBatchResults(tokens);

        for(let i=0;i<results.length;i++){
            const result = results[i];

            if(result.status!==3) throw new ApiError(400, `Testcase ${i + 1} failed for ${language}`);
        }
    }

    const updatedProblem = await db.problem.update({
        where: { id: problemId },
        data: {
            title,
            description,
            difficulty,
            tags,
            examples,
            constraints,
            testcases,
            codeSnippets,
            referenceSolutions
        }
    })

    return res
        .status(200)
        .json(new ApiResponse(200, updatedProblem, "Problem updated successfully"));
})


export const deleteProblem = asyncHanlder(async (req, res) => {
    const { problemId } = req.params;

    const problem = await db.problem.findUnique({
        where: { id: problemId }
    });
    if (!problem) throw new ApiError(404, "Problem not found");

    const deletedProblem = await db.problem.delete({ where: { id: problemId } });
    if (!deleteProblem) throw new ApiError(404, "Problem not deleted");

    return res
        .status(200)
        .json(new ApiResponse(200, deletedProblem, "Problem deleted successfully"));
})


export const getAllProblemsSolvedByUser = asyncHanlder(async (req, res) => {

})