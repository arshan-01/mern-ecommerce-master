const cryptoJs = require("crypto-js");
const User = require("../models/User");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//verifyTokenAndAuthorization VERIFY TOKEN AND ALSO CHECK IF USER IS HIMSELF BY USING TOKEN OR IT IS AN ADMIN
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  //IF USER ENTERED ANY NEW PASSWORD WE WILL ENCRYPT AGAIN AND SAVE
  if (req.body.password) {
    req.body.password = cryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE USER

//verifyTokenAndAuthorization VERIFY TOKEN AND ALSO CHECK IF USER IS HIMSELF BY USING TOKEN OR IT IS AN ADMIN
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER

// verifyTokenAndAuthorization VERIFY TOKEN AND ALSO CHECK IF USER IS AN ADMIN
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
