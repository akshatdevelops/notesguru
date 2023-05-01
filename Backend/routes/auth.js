const express = require("express")
const router = express.Router()
const User = require("../Models/User")
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const fetchuser=require("../middleware/fetchuser")
const jwt = require('jsonwebtoken')
const JWT_SECRET = "AstraTheBest"

//Route 1-create user
router.post("/createuser", [
  body("name", "enter the valid name").isLength({ min: 3 }),
  body("email", "email is not valid").isEmail(),
  body("password", "enter a valid password").isLength({ min: 5 })

], async (req, res) => {
  let success=false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const salt = bcrypt.genSaltSync(10)
  const secPass = await bcrypt.hash(req.body.password, salt)
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: secPass,
  })
  const data = {
    user: {
      id: user.id
    }
  }
  const authToken = jwt.sign(data, JWT_SECRET)
  success=true
  res.json({success,authToken})
})
//Route 2-login
router.post("/login", [
  body("email", "email is not valid").isEmail(),
  body("password", "Please enter valid password").exists()

], async (req, res) => {
  let success=false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: "Please enter valid credential" })
    }
    const passCompare = await bcrypt.compare(password, user.password)
    if (!passCompare) {
      return res.status(400).json({ error: "Please enter valid credential" })
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET)
    success=true
    res.json({success,authToken})

  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error")
  }

})
//Route 3-get user
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    
    let userId = req.user.id
    const user = await User.findById(userId).select("-password")
    
    res.send(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error")
  }
})

module.exports = router