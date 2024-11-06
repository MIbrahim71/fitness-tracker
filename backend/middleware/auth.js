const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token)
    return res.status(401).json({ message: "No token, authorisation denied" });

    try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.id;
    next();
    } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    
  }
  
};

module.exports = authMiddleware;
