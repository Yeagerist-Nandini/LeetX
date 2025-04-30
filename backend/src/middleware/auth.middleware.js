import jwt from "jsonwebtoken"
import { ApiError } from "../utils/api-error.js"
import { db } from "../utils/db.js";
  
export const isLoggedIn = (req,res,next) => {
    try {
        const accessToken = req.cookies?.accessToken;

        if(!accessToken){
            throw new ApiError(401, "Authentication Failed")
        }

        const payload = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
        req.user = payload;

        next();
    } catch (error) {
        throw next(new ApiError(500, "Internal server error", [error]));
    }
}


export const isAdmin = async (req, res, next) => {
    try {
        const {id} = req.body.user;

        const user = await db.user.findUnique({
            where: {id},
            select: {role: true}
        });

        if(user.role !== "ADMIN"){
            throw next(new ApiError(401, "You are not authorized"));
        }

        next();
    } catch (error) {
        throw next(new ApiError(401, "You are not authorized", [error]));
    }
}