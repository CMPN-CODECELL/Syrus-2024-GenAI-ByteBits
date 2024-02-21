// MODULES //
const express = require("express");
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// MODELS //
const User = require("../models/User");

// DEFINE ROUTER //
const router = express.Router();

// ROUTE: Create a User using: POST "/auth/createUser" .
router.post(
  "/createUser",
  [
    body("username", "Enter a valid Name").notEmpty(),
    body("email", "Enter a valid EmailId").notEmpty().isEmail(),
    body("password", "Enter a Strong Password").notEmpty().isStrongPassword(),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      try {
        const salt = bcrypt.genSaltSync(10);
        const secPass = bcrypt.hashSync(req.body.password, salt);

        // Check if the user already exists in the database
        let user = await User.findOne({ email: req.body.email });

        if (user) {
          // If user exists, return Bad Request with an error message
          return res.status(400).json({
            success: false,
            error: "A user with this email already exists.",
          });
        } else {
          // If user does not exist, create a new User
          user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: secPass,
          });

          // Create a token for the user
          const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET);

          res.json({ success: true, authtoken: token });
        }
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, msg: "Internal Server Error" });
      }
    } else {
      // If validation errors exist, return the errors
      const errorMessages = result
        .array()
        .map((error) => error.msg)
        .join(", ");
      success = false;
      console.log("Sending Error Message: ", errorMessages); // Debug log
      res.status(400).json({ success, error: errorMessages });
    }
  }
);

//ROUTE: Login a User using: POST "/auth/login".
router.post(
  "/login",
  [
    body("username", "Enter a valid EmailId").notEmpty(),
    body("password", "Enter your Password").notEmpty(),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      try {
        //Checks if the user exists in the database
        let user = await User.findOne({ username: req.body.username });
        if (user) {
          //Compares the given password with the password in the database
          const passwordCompare = await bcrypt.compare(
            req.body.password,
            user.password
          );
          //If password matches...
          if (passwordCompare) {
            //stores user's id in the object:data
            const data = {
              user: user._id,
            };
            //creates the token
            const token = jwt.sign(data, process.env.JWT_SECRET);
            success = true;
            res.json({ success, authtoken: token });
          } else {
            success = false;
            res
              .status(400)
              .json({ success, error: "Please enter correct credentials." });
          }
        } else {
          success = false;
          res
            .status(400)
            .json({ success, error: "Please enter correct credentials." });
        }
      } catch (error) {
        success = false;
        res.status(400).json({ success, error: "Internal Server Error." });
      }
    } else {
      console.log("Sending Error Message: ", errorMessages); // Debug log
      const errorMessages = result
        .array()
        .map((error) => error.msg)
        .join(", ");
      success = false;
      console.log("Sending Error Message: ", errorMessages); // Debug log
      res.status(400).json({ success, error: errorMessages });
    }
  }
);

module.exports = router;
