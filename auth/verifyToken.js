const jwt = require("jsonwebtoken");
const secret = require('./secretKey');

module.exports = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token)
    return res.status(400).send({ auth: false, message: "token not provided" });

  jwt.verify(token, secret.secret, (err, decoded) => {
      if(err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'  })
    req.userId = decoded.id;
    req.name = decoded.name;
    next();
  });
};
