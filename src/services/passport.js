import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateToken = (admin) => {
  const expiresIn = "1d";
  const payload = {
    name: admin.name,
    email: admin.email,
    adminId: admin._id,
  };
  const JWT_SECRET = "secret_key";
  return jwt.sign({id: admin._id}, JWT_SECRET,{expiresIn:"1d"});
};