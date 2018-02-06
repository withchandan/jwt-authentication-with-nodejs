const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const createToken = require('../auth/createJwt')
const verifyToken = require('../auth/verifyToken')
const User = require('../models/users')

// default route
// ==============================================================================================
router.get("/", verifyToken, (req, res) => {
  const name = req.name;
  const id = req.userId;
  res
    .status(200)
    .send({ auth: true, message: "verified route", user: name, id: id });
});
// ==============================================================================================

// register route
// ===============================================================================================
router.post("/register", (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  Promise.resolve(
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
  ).then(user => {
    const token = createToken(user.name, user._id);
    res.status(200).send({ auth: true, token: token });
  });
});

// ==================================================================================================

// login route
// ==================================================================================================
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send("Internal server error");
    if (!user) return res.status(404).send("User not found");

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid)
      return res.status(401).send("Invalid username/password");

    const token = createToken(user.name, user._id);

    res.status(200).send({ auth: true, token: token });
  });
});
//===================================================================================================

module.exports = router;
