"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = requireRole;
/**
 * Middleware to enforce role-based access control
 * Usage: requireRole("officer"), requireRole("bank"), etc.
 */
function requireRole(requiredRole) {
    return (req, res, next) => {
        const role = req.headers["x-role"];
        // If role header is missing
        if (!role) {
            return res.status(401).json({
                error: "Role header missing"
            });
        }
        // If role does not match required role
        if (role !== requiredRole) {
            return res.status(403).json({
                error: `Access denied. Required role: ${requiredRole}`
            });
        }
        // Role is valid → allow request
        next();
    };
}
