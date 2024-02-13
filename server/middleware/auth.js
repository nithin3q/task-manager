const jwt = require('jsonwebtoken');

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Unauthorized. Please add a valid token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId, name: decoded.name }; // Attach user info to request
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Unauthorized. Please add a valid token' });
  }
};

module.exports = authenticationMiddleware;
