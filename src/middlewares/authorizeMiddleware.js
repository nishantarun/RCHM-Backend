const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      res.status(403);
      return next(new Error("Access denied"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403);
      return next(
        new Error("You do not have permission to access this resource")
      );
    }

    next();
  };
};

export default authorize;
