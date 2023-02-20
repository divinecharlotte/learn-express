import jwt from "jsonwebtoken"
const authUser = (req, res, next) => {
    const token = req.header("auth-token");
    const JWT_SECRET = "secret_key";
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
 
      const userId = decodedToken.id;
      req.user = { userId };
      console.log(userId);
      next();
    } catch (error) {
      res.status(401).json({
        error: "Access Denied...!",
      });
      
    }
  };
  export default authUser