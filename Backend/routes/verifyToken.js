const { decode } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Get the JWT from the cookie
  const token = req.cookies.token;
  // If there is no token, return an unauthorized error
  if (!token) {
    return res.status(401).json("You are not authenticated");
  }
  // Verify if token present
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    // If the JWT is still valid, return it to the client
    req.user = user;
    //AFTER GO TO NEXT FUNCTION
    next();
    
  } catch (error) {
    // if token is expired then check for this condition and generate token.
    if (error.message === "jwt expired") {
      // decode(token);
      const user = decode(token);
      // If the JWT is valid, check if it has expired
      if (Date.now() >= user.exp * 1000) {
        // If the JWT has expired, issue a new JWT
        const newToken = jwt.sign(
          { id: user.id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
          );
          
          res.cookie("token", newToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3 * 24 * 60 * 60 * 1000, // valid for 3 Days
          });
        //RETURN USER FORM JWT PAYLOAD
        req.user = user;
        //AFTER GO TO NEXT FUNCTION
        next();
      }
      //for other error go on
    }
  }
};

//THIS WILL VERIFY TOKEN AND ALSO CHECK IF USER IS HIMSELF BY USING TOKEN OR IT IS AN ADMIN
const verifyTokenAndAuthorization = (req, res, next) => {
  //First it will verify token and next it will execute call back function and then next ()
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to that !");
    }
  });
};

//THIS WILL VERIFY IT IS AN ADMIN OR NOT
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
