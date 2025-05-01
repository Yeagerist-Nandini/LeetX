import express from "express"
import {isAdmin, isLoggedIn} from "../middleware/auth.middleware.js"
import {executeCode} from "../controllers/executeCode.controller.js"

const router = express.Router();

router.post("/", isLoggedIn, executeCode);


export default router;