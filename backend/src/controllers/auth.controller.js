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
    const emailVerificationUrl = `${process.env.BASE_URL}:${process.env.PORT}/api/v1/verify/${emailVerificationToken}`

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
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, user, "User login successfully"))
})


const logout = asyncHandler(async (req, res) => {
    //clear the cookies to logout 
    await db.user.update({
        where: { id: req.user.id },
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


const verifyEmail = asyncHandler(async (req, res) => {
    //get token from url
    const { token } = req.params;

    //check if token is valid
    const user = await db.user.findUnique({
        where: {
            emailVerificationToken: token,
            emailVerificationExpriy: { gt: Date.now() }
        }
    })

    if (!user) {
        throw new ApiError(404, "Invalid verifiction token");
    }

    // verify user
    const verifiedUser = await db.user.update({
        where: { id: user.id },
        data: {
            emailVerificationToken: null,
            emailVerificationExpiry: null,
            isEmailVerified: true
        }
    })

    if (!verifiedUser) {
        throw new ApiError(500, "Email verification failed");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user.id, "Email verification successfull"));
})


const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { password, new_password } = req.body;

    //check if user is logged in 
    const userId = req.user.id;

    //get and check if user exists
    let user = await db.user.findUnique({
        where: { id: userId }
    })
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // check if old password is matching
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
        throw new ApiError(400, "Invalid password");
    }

    const newHashedPassword = await bcrypt.hash(new_password, 10);

    //change the password
    user = await db.user.update({
        where: { id: userId },
        data: { password: newHashedPassword }
    });
    if(!user) throw new ApiError(500, "Error while updating user password");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Password changed successfully!"));
})


const forgotPasswordRequest = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    //check if user exists
    const user = await db.user.findUnique({
        where: { id: userId }
    })
    if (!user) throw new ApiError(404, "User not found");

    //generate reset password url
    const token = cryto.randomBytes(32).toString("hex");
    const resetPasswordUrl = `${process.env.BASE_URL}:${process.env.PORT}/api/v1/reset-password/${token}`

    //save it in db
    const updated_user = await db.user.update({
        where: { id: userId },
        data: {
            forgotPasswordToken: token,
            forgotPasswordExpiry: Date.now() + (1000 * 60 * 20)
        }
    });
    if (!updated_user) throw new ApiError(500, "Error while updating user");

    //send it through mail
    const mailOptions = {
        email: user.email,
        subject: "Reset Your Password",
        mailgenContent: forgotPasswordMailgenContent(user.name, resetPasswordUrl)
    }
    sendEmail(mailOptions);

    return res
        .status(200)
        .json(new ApiResponse(200, resetPasswordUrl, "Reset password link sent to your email."))
})


const resetForgottenPassword = asyncHandler(async (req, res) => {
    //get token from url
    const { token } = req.params;
    if (!token) {
        throw new ApiError(400, "Invalid token")
    }

    const { password } = req.body;

    //check if token is valid
    const user = await db.user.findUnique({
        where: {
            forgotPasswordToken: token,
            forgotPasswordExpiry: { gt: Date.now() }
        }
    })

    if (!user) {
        throw new ApiError(404, "Invalid reset password token");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // update password
    const updatedUser = await db.user.update({
        where: { id: user.id },
        data: {
            forgotPasswordToken: null,
            forgotPasswordExpiry: null,
            password: hashedPassword
        }
    });

    if (!updatedUser) {
        throw new ApiError(500, "Email verification failed");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user.id, "New password created successfully"));
})


const getCurrentUser = asyncHandler(async (req, res) => {
    const { userId } = req.user.id;

    const user = await db.user.findUnique({
        where: { id: userId },
        select: {
            email: true,
            name: true,
            image: true,
            role: true
        }
    });
    if (!user) throw new ApiError(404, "User not found");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Fetched current user successfully"));
})


const refreshAccessToken = asyncHandler(async (req, res) => {
    //get refresh token
    const oldRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if(!oldRefreshToken) throw new ApiError(401, "unauthorized request");

    // get payload from token
    const decodedToken = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    //check if user exists
    const user = await db.user.findUnique({
        where: { id: decodedToken.id }
    });
    if (!user) {
        throw new ApiError(401, "Invalid refresh token")
    }

    //check if refresh token is expired 
    if(oldRefreshToken !== user.refreshToken){
        throw new ApiError(401, "Refresh token is expired or used");
    }

    //get new accesstoken, refresh token 
    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user.id);

    // save it in cookies
    const cookieOptions = {
        httpOnly: true,
        secure: true
    }

    return res
           .status(200)
           .cookie("accessToken",accessToken, cookieOptions)
           .cookie("refreshToken",refreshToken, cookieOptions)
           .json(new ApiResponse(200, {accessToken, refreshToken}, "Access token refreshed"))
})


// const resendEmailVerification = asyncHandler(async (req, res) => {

// })


export {
    changeCurrentPassword,
    forgotPasswordRequest,
    getCurrentUser,
    login,
    logout,
    refreshAccessToken,
    register,
    resetForgottenPassword,
    verifyEmail,
};  