import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECREAT_KEY;

//  generate JWT tokens -> Access Token
const generateToken = (user) => {
  const payload = {
    //id: user.id,
    //name: user.name,
    email:user.email,
    password:user.password,
  };

  return jwt.sign(payload, secretKey, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY, //1hr
  });
};

//verifying the token
const verifyToken = async (req, res, next) => {
  //getting the token from header
  const headerToken = await req.headers.authorization;
  try {
    if (!headerToken || !headerToken.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing." });
    }
    const token = await headerToken.split(" ")[1];

    //after verifying the token ->getting data in decoded
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token." });

      // storing data for later use
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export { generateToken, verifyToken };
