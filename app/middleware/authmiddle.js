const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

exports.verifyToken = (req, res, next) => {
  //let token = req.headers["x-access-token"];

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    const user = jwt.verify(token, secret);
    req.user = user;
    console.log("from Middleware user : ", user);
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next();
};
