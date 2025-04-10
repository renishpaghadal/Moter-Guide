const jwt = require("jsonwebtoken");
 // Ensure you load environment variables
const JWT_SECRET= "jwtsecret"
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization") || req.header("authorization") || req.query.token || req.body.token;
    // Extract token from Bearer header

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const cleanToken = token.startsWith("Bearer ") ? token.split(" ")[1]: token;
    const verified = jwt.verify(cleanToken, JWT_SECRET); // Verify token
    req.user = verified; // Attach decoded user info to request object
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;
