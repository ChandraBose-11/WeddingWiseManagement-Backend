import jwt from 'jsonwebtoken';
import User from '../Models/userModel.js';
import dotenv from 'dotenv';
dotenv.config()

export const authUser = async (req, res,next) => {
    const token = req.header("Authorization");
    //console.log(token);
    try {
      if (!token) {
        return res
          .status(401)
          .json({ message: "Unauthorized Access,token missing" });
      }
  
      let verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // console.log(verified);
  
      req.user = verified;
      next();
    } catch (e) {
      return res.status(500).json({ message: "Invalid Token" });
    }
  };
  