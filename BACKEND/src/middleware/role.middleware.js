const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized - User not authenticated" });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ 
          message: `Forbidden - User with role ${req.user.role} is not authorized` 
        });
      }

      next();
    } catch (error) {
      console.error("Authorization error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};

export default authorizeRoles;