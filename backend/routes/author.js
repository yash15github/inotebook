const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'I@mthebe$t';
var fetchuser = require('../middlewares/fetchuser');

router.post('/createUser', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
   // Check whether the user with this email exists already
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({success, error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
    })
    const data = {
        user:{
          id: user.id
        }
      }
      const authortoken = jwt.sign(data, JWT_SECRET);
      // res.json(user)
      success = true;
      res.json({success, authortoken});

    // user = new User(req.body);
    // await user.save();
    // res.status(201).json(user);
  } catch (error)  {
    res.status(500).json({success , error: 'Server Error' });
    console.error(error);
  }
});
 //login user
  router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').exists().withMessage('Password cannot be blank'),
  ], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const{email,password} = req.body;
    try{
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ error: "Enter valid userlogin credentials" });

        // const passwordcomp = await bcrypt.compare(password,user.password );
        // if(!passwordcomp){
        //     return res.status(400).json({ error: "Enter valid passlogin credentials" });
        // }
        
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
          return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        

        const data = {
            user:{
              id: user.id
            }
        }
          const authortoken = jwt.sign(data, JWT_SECRET);
          // res.json(user)
          success = true;
          res.json({ success, authortoken })        
            

    }catch (error) {
        res.status(500).json({ error: 'Server Error' });
        console.error(error);
    }
});

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
});

module.exports = router;

//  (req, res)=>{ 
//     // console.log(req.body);
//     // const user = User(req.body);
//     // user.save()
//     // res.send(req.body);
//     const result = validationResult(req);
//     if (result.isEmpty()) {
//       return res.send(`Hello, ${req.body.person}!`);
//     }
  
//     res.send({ errors: result.array() });
// })

// module.exports = router;