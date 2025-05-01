import express from "express"
import {isAdmin, isLoggedIn} from "../middleware/auth.middleware.js"
import { createProblem, deleteProblem, getAllProblems, getAllProblemsSolvedByUser, getProblemById, updateProblem } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/problems", isLoggedIn, isAdmin, createProblem);

router.get("/problems", isLoggedIn, getAllProblems);

router.get("/problems/:id", isLoggedIn, getProblemById);

router.put("/problems/:id",isLoggedIn, isAdmin, updateProblem);

router.delete("/problems/:id", isLoggedIn, isAdmin, deleteProblem);

router.get("/get-solved-problems", isLoggedIn, getAllProblemsSolvedByUser);

export default router;