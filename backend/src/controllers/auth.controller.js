import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler, AsyncHandler } from "../utils/asyncHandler.js";
import cryto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../utils/db.js"
import {
    sendEmail,
    forgotPasswordMailgenContent,
    emailVerificationMailgenContent
} from '../utils/mail.js'
import { UserRole } from "../../generated/prisma/index.js";



const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id: userId
            }
        })

        const refreshToken = jwt.sign(
            {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        );

        const accessToken = jwt.sign(
            { id: user.id },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )

        await db.user.update({
            where: { id: user.id },
            data: { refreshToken }
        })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}


const register = asyncHandler(async (req, res) => {
    const { name, email, image, password } = req.body;

    //validation => express validator
    //image => multer

    //check for existing user
    const existing_user = await db.user.findUnique({
        where: {
            email
        }
    })
    if (existing_user) {
        throw new ApiError(400, "User already exists");
    }

    // hashing password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    //creating new user
    let user = await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            image,
            role: UserRole.USER
        }
    })
    if (!user) {
        throw new ApiError(400, "User registration failed.");
    }

    //generate verification token 
    const emailVerificationToken = cryto.randomBytes(32).toString('hex');
    const emailVerificationExpiry = Date.now() + (20 * 60 * 1000);

    user = await db.user.update({
        where: { id: user.id },
        data: {
            emailVerificationToken,
            emailVerificationExpiry
        }
    });

    //send it through mail
    const emailVerificationUrl = `${process.env.BASE_URL}/api/v1/user/verify/${emailVerificationToken}`
    const mailOptions = {
        email: user.email,
        subject: "LeetX Email Verification",
        mailgenContent: emailVerificationMailgenContent(user.name, emailVerificationUrl)
    }
    sendEmail(mailOptions);

    return res
        .status(200)
        .json(new ApiResponse(200, user, "user registration successfull"));
})


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //get user
    const user = await db.user.findUnique({
        where: {
            email,
        }
    })
    if (!user) {
        throw new ApiError(404, "User is not verified");
    }

    //check password
    const hashedPassword = await bcrypt.hash(password, 10);
    const isPasswordMatching = await bcrypt.compare(user.password, hashedPassword)

    //check if password is matching
    if (!isPasswordMatching) {
        throw new ApiError(400, "Invalid email or password");
    }

    //check if user is verified 
    if (!user.isEmailVerified) {
        throw new ApiError(400, "User is not verified");
    }

    //get access token
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user.id);

    //save the token in cookie
    const cookieOptions = {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 10 //10 days
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, user, "User login successfully"))
})


const verifyEmail = asyncHandler(async (req, res) => {

})


const logout = asyncHandler(async (req, res) => {
    //clear the cookies to logout 
    await db.user.update({
        where: { id: user.id },
        data: { refreshToken: null }
    })

    const cookieOptions = {
        httpOnly: true,
        secure: true
    }

    return res
           .status(200)
           .clearCookie("accessToken", cookieOptions)
           .clearCookie("refreshToken", cookieOptions)
           .json(new ApiResponse(200, {}, "User logged Out"))
})


const refreshAccessToken = asyncHandler(async (req, res) => {

})

const changeCurrentPassword = asyncHandler(async (req, res) => {

})

const forgotPasswordRequest = asyncHandler(async (req, res) => {

})

const resetForgottenPassword = asyncHandler(async (req, res) => {

})


const getCurrentUser = asyncHandler(async (req, res) => {

})


const resendEmailVerification = asyncHandler(async (req, res) => {

})


export {
    changeCurrentPassword,
    forgotPasswordRequest,
    getCurrentUser,
    login,
    logout,
    refreshAccessToken,
    register,
    resendEmailVerification,
    resetForgottenPassword,
    verifyEmail,
};  