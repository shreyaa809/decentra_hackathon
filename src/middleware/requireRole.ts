import { Request, Response, NextFunction } from "express";

/**
 * Middleware to enforce role-based access control
 * Usage: requireRole("officer"), requireRole("bank"), etc.
 */
export function requireRole(requiredRole: string) {
  return (req: Request, res: Response, next: NextFunction) => {
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
