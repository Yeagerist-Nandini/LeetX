import express from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { getAllSubmissions, getSubmissionsByProblem, getAllSubmissionsForProblem } from "../controllers/submission.controller.js";

const router = express.Router();



router.get("/get-all-submissions" , isLoggedIn , getAllSubmissions)

router.get("/get-submissions/:problemId" , isLoggedIn , getSubmissionsByProblem)

router.get("/get-submissions-count/:problemId" , isLoggedIn , getAllSubmissionsForProblem)




export default router;