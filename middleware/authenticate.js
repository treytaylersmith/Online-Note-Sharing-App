const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Expecting 'Bearer TOKEN'
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
