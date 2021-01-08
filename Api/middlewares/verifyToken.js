const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log('Verifying');

  const token = req.header('auth-token');

  if (!token) return res.status(401).send('Access Denied!');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    console.log(verified);

    req.user = verified;

    next();
  } catch (error) {
    res.status(400).json({
      status: 'Error',
      msg: 'Invalid Token',
    });
  }
};
