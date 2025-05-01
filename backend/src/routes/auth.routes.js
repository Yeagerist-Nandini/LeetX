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
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    registerUser,
    resetForgottenPassword, 
    verifyEmail
} from "../controllers/auth.controller.js" 
import { validate } from "../middlewares/validator.middleware.js";
import {isLoggedIn} from '../middlewares/auth.middleware.js';

const router = Router();

router.post("/register", userRegistrationValidator(), validate, registerUser);
  
router.post("/login", userLoginValidator(), validate, loginUser);
router.post("/refresh-access-token", refreshAccessToken);
router.post("/reset-password/:token", isLoggedIn, resetPasswordValidator(), validate, resetForgottenPassword);
router.post("/change-password", isLoggedIn, changePasswordValidator(), validate, changeCurrentPassword);

router.get("/logout", isLoggedIn, logoutUser);
router.get("/verify/:token", verifyEmail);
router.get("/forget-password", isLoggedIn, forgotPasswordRequest);
router.get("/my-profile", isLoggedIn, getCurrentUser);

export default router 