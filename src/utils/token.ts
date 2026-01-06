import dotenv from "dotenv";
import { IUser } from "../models/user.modle";
import jwt from "jsonwebtoken";
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET as string
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET as string

export const signAccessToken = (user: IUser): string => {
  console.log("ACCESS_TOKEN_SECRET =", ACCESS_TOKEN_SECRET)
  console.log("USER ID =", user?._id)
  return jwt.sign(
    {
      sub: user._id.toString(),
      username: user.username,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
};



export const signRefreshToken = (user: IUser): string => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      username: user.username,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};