import { Router } from "express";
import { 
    changePasswordValidator,
    resetPasswordValidator,
    userLoginValidator, 
    userRegistrationValidator 
} from "../validators/auth.validator.js"
import {
    changeCurrentPassword,
    forgotPasswordRequest,
    getCurrentUser,
    login,
    logout,
    refreshAccessToken,
    register,
    resetForgottenPassword,
    verifyEmail,
} from "../controllers/auth.controller.js" 
import { validate } from "../middleware/validate.middleware.js";
import {isLoggedIn} from '../middleware/auth.middleware.js';

const router = Router();

router.post("/register", userRegistrationValidator(), validate, register);
  
router.post("/login", userLoginValidator(), validate, login);
router.post("/refresh-access-token", refreshAccessToken);
router.post("/reset-password/:token", isLoggedIn, resetPasswordValidator(), validate, resetForgottenPassword);
router.post("/change-password", isLoggedIn, changePasswordValidator(), validate, changeCurrentPassword);

router.get("/logout", isLoggedIn, logout);
router.get("/verify/:token", verifyEmail);
router.get("/forget-password", isLoggedIn, forgotPasswordRequest);
router.get("/my-profile", isLoggedIn, getCurrentUser);

export default router 