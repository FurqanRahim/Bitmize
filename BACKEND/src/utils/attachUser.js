

import { verifyToken } from "./helper.js";
import User from "../models/user.model.js";

const attachUser = async (req, res, next) => {
    try {
        // Clean previous user data if exists
        delete req.user;
        
        // Get token from cookies
        const token = req.cookies?.accessToken;
        
        if (!token) {
            console.log("No access token provided");
            return next(); // Continue without authentication
        }

        // Basic token format validation
        if (typeof token !== 'string' || !token.split('.').length === 3) {
            console.log("Malformed token format");
            return next();
        }

        // Verify token
        const decoded = verifyToken(token);
        if (!decoded?.id) { // Assuming your JWT has an 'id' field
            console.log("Invalid or expired token");
            return next();
        }

        // Fetch user
        const user = await User.findById(decoded.id)
            .select('-password -__v') // Exclude sensitive fields
            .lean(); // Return plain JS object

        if (!user) {
            console.log("User not found in database");
            return next();
        }

        // Attach sanitized user data
        req.user = user;
        return next();
        
    } catch (error) {
        console.error("Authentication middleware error:", error);
        // Consider returning 401 for critical errors
        return next();
    }
}



export default attachUser;