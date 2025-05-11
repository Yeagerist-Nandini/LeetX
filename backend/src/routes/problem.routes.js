import express from "express"
import {isAdmin, isLoggedIn} from "../middleware/auth.middleware.js"
import { createProblem, deleteProblem, getAllProblems, getAllProblemsSolvedByUser, getProblemById, updateProblem } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/create-problem", isLoggedIn, isAdmin, createProblem);

router.get("/", isLoggedIn, getAllProblems);

router.get("/:problemId", isLoggedIn, getProblemById);

router.put("/:problemId",isLoggedIn, updateProblem);

router.delete("/:problemId", isLoggedIn, isAdmin, deleteProblem);

router.get("/get-solved-problems", isLoggedIn, getAllProblemsSolvedByUser);

export default router;