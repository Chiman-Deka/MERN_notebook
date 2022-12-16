const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchuser');

var JWT_SECRET = "Harryisagoodb&oy";

// ROUTE1: Create a User using: POST "/api/auth/createuser" .... Doesnt require Auth...No Login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password can not be blank").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return bad request and the errors
    const errors = await validationResult(req); // errors return object
    if (!errors.isEmpty()) {
      // if errors.isEmpty() does not return true
      return res.status(400).json({ success, errors: errors.array() }); // using a validation make sure that if aal baal or empty input, app doesnot crash
    }
    try {
      // check whether the user with this email exits already
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      // console.log(authtoken)
      // res.json(user)
      success = true;
      res.json({success, authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send( success, "Some Internal server Error occured");
    }
  }
);

// ROUTE2:  Authenticate a User using: POST "/api/auth/login" ..No Login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password can not be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return bad request and the errors
    const errors = validationResult(req); // errors return object
    if (!errors.isEmpty()) {
      // if errors.isEmpty() does not return true
      return res.status(400).json({ errors: errors.array() }); // using a validation make sure that if aal baal or empty input, app doesnot crash
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        // if there is no matching email in the database(No such email exists)
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please try to log in with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password); // comparing password already present in the database and the password user entered....it returns true or false
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please try to log in with correct credential" });
      }
      const data = {
        // if the password is true we are passing this data
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal server Error occured");
    }
  }
);
// ROUTE3: Get loggedIn user Details Authenticate a User using: POST "/api/auth/getuser" .....Login required
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        userId = req.user.id; 
        const user  = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal server Error occured");
    }
  }
);
module.exports = router;
