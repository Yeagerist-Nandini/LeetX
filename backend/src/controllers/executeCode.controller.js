import { db } from "../utils/db.js";
import { submitBatch, getLanguage, pollBatchResults } from "../utils/judge0.js";
import asyncHanlder from "../utils/asyncHandler.js"
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js"

export const executeCode = asyncHanlder(async (req, res) => {
    const { source_code, languageId, stdin, expected_output } = req.body;
    const { problemId } = req.params;
    const userId = req.user.id;

    //validate test cases
    if (!Array.isArray(stdin) || stdin.length === 0 ||
        !Array.isArray(expected_output) || expected_output.length !== stdin.length
    )
        throw new ApiError(400, "Invalid or missing test cases");

    //prepare test cases for batch submission 
    const submissions = stdin.map((input) => ({
        source_code,
        language_id: languageId,
        stdin: input
    }));

    //submit batch of submission to judge0
    const submissionResults = await submitBatch(submissions, res);

    //get tokens
    const tokens = submissionResults.map((r) => r.token);

    //Poll for results of all submitted test cases
    const results = await pollBatchResults(tokens);

    // console.log("Result-------------");
    // console.log(results);

    //Analyze test case results
    let allTestCasesPassed = true;

    const detailedResults = results.map((result, i) => {
        const stdout = result.stdout?.trim();
        const expectedOutput = expected_output[i]?.trim();
        const passed = expectedOutput === stdout;

        if (!passed) allTestCasesPassed = false;

        return {
            testCase: i + 1,
            passed,
            stdout: stdout || null,
            expectedOutput,
            stderr: result.stderr || null,
            compiledOutput: result.compile_output || null,
            status: result.status.description,
            memory: result.memory ? `${result.memory} KB` : undefined,
            time: result.time ? `${result.time} sec` : undefined
        }

        // console.log(`Testcase #${i+1}`);
        // console.log(`Input for testcase #${i+1}: ${stdin[i]}`)
        // console.log(`Expected Output for testcase #${i+1}: ${expected_output}`)
        // console.log(`Actual output for testcase #${i+1}: ${stdout}`)

        // console.log(`Matched testcase #${i+1}: ${passed}`)
    });

    console.log(detailedResults);

    //store submission to DB
    const submission = await db.submission.create({
        data: {
            userId,
            problemId,
            source_code,
            language: getLanguage(languageId),
            stdin: stdin.join('\n'),
            stdout: JSON.stringify(detailedResults.map(r => r.stdout)),
            stderr: detailedResults.some(r => r.stderr)
                ? JSON.stringify(detailedResults.map(r => r.stderr))
                : null,
            compiledOutput: detailedResults.some(r => r.compiledOutput)
                ? JSON.stringify(detailedResults.map(r => r.compiledOutput))
                : null,
            status: allPassed ? "Accepted" : "Wrong Answer",
            memory: detailedResults.some(r => r.memory)
                ? JSON.stringify(detailedResults.map(r => r.memory))
                : null,
            time: detailedResults.some(r => r.time)
                ? JSON.stringify(detailedResults.map(r => r.time))
                : null,
        }
    });

    // if all testcases passed, mark problem as done for the user
    if (allTestCasesPassed) {
        await db.problemSolved.upsert({
            where: {
                userId,
                problemId
            },
            update: {},
            create: {
                userId,
                problemId
            }
        });
    }

    // save result for individual test cases
    const testCaseResults = detailedResults.map((result) => ({
        submissionId: submission.id,
        testCase: result.testCase,
        passed: result.passed,
        stdout: result.stdout,
        expectedOutput: result.expectedOutput,
        stderr: result.stderr,
        compiledOutput: result.compiledOutput,
        status: result.status,
        memory: result.memory,
        time: result.time
    }));

    await db.testCaseResult.creatMany({
        data: testCaseResults,
    });

    const submissionWithTestcases = await db.submission.findUnique({
        where: { id: submission.id },
        include: {
            testCases: true
        }
    });

    return res
        .status(200)
        .json(new ApiResponse(200, submissionWithTestcases, "Failed to execute code"));
});
