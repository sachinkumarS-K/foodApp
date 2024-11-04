import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/userModel.js";

export const verifyJwt = async(req, res, next) => {
    try {
       const token =
         req.cookies.accessToken ||
         req.headers["authorization"]?.replace("Bearer ", "");
        console.log(req.cookies)

        if (!token) {
            return next(new ApiError(404, "Unauthorized User"))
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id).select("-password -refreshToken")

        req.user = user;
        next()
    } catch (error) {
        return next(new ApiError(401, error.message || "Unauthorized User"));
    }
}