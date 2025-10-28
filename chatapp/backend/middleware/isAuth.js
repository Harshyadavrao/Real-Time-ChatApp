import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token; //  using cookies
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SEXRET);

    req.userId = decoded.userId;  // must match key from genToken
    next();
  } catch (error) {
    return res.status(403).json({ message: `Auth error: ${error.message}` });
  }
};

export default isAuth;