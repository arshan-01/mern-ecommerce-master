const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER USER

router.post("/register", async (req, res) => {
  !req.body.username && res.status(401).json("username can't be blank");
  !req.body.email && res.status(401).json("email can't be blank");
  //Checking if user exsist in database
  const newRegister = await User.findOne({
    email: req.body.email,
  });
  newRegister && res.status(401).json("User already exist!");

  if (req.body.password) {
    let encryptedPassword = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: encryptedPassword,
    });

    try {
      // saving as new user
      const savedUser = await newUser.save();
      const {password , ...other } = savedUser._doc;
      res.status(201).json(other); //201 for successfully edit
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.status(401).json("Password field Can't be empty");
  }
});

//Login USER

router.post("/login", async (req, res) => {
  !req.body.password && res.status(401).json("Password can't be blank");
  !req.body.email && res.status(401).json("Email can't be blank");
  try {
    //Checking if user exsist in database
    const loginUser = await User.findOne({
      email: req.body.email,
    });
    
    !loginUser && res.status(401).json("Wrong Credential or Something");
    //Decrypting Password to compare with req.body.password
    const decrypted = CryptoJS.AES.decrypt(
      loginUser.password,
      process.env.PASS_SECRET
    );
    const decryptedPass = decrypted.toString(CryptoJS.enc.Utf8);
    decryptedPass != req.body.password &&
      res.status(401).json("Wrong Credential or Something");

    // when user will be logged, then token generate
    const accessToken = jwt.sign(
      {
        id: loginUser._id,
        isAdmin: loginUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password, ...other } = loginUser._doc;
       // Set the JWT as an HTTP-only cookie
       res.cookie("token", accessToken, { 
        httpOnly: true,
        secure: true,
        sameSite: "none",
         maxAge: 3 * 24 * 60 * 60 * 1000 // valid for 3 Days
        })

        res.status(201).json({ ...other }); //201 for successfully edit

  } catch (error) {
    res.status(500).json(error);
  }
});



router.get('/logout', (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  })
  res.json('You are logged out');
});


module.exports = router;

