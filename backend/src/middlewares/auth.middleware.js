import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
    try {
        // Token le from cookie or Authorization header
        const token =
            req.cookies?.token ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized: No token provided");
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // User find karo
        const user = await User.findById(decoded._id).select("-password");
        if (!user) {
            throw new ApiError(401, "Unauthorized: User not found");
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ success: false, message: "Invalid or expired token" });
    }
};
