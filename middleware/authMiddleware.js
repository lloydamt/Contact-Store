import jwt from "jsonwebtoken";
import config from "config";

const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Not authorized" });
  }

  try {
    jwt.verify(token, config.get("jwtSecret"), (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ msg: "Authentication failed, user not authorized" });
      }

      req.user = decoded.user;
    });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Token is invalid");
  }
};

export default authMiddleware;
