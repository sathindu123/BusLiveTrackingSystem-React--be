import { Request, Response } from "express";
import { IUser, User } from "../models/user.modle";
import { signAccessToken, signRefreshToken } from "../utils/token"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { AuthRequest } from "../middleware/authMiddleware";
dotenv.config()

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string

export const userRegister = async (req: Request, res: Response) => {

    try{
        const {busNb,username,password,telNb}= req.body

        if(!busNb || !username || !password || !telNb){
            return res.status(400).json({ message: "All fields are required"})
        }

        const existingbusNb = await User.findOne({ busNb })
        if(existingbusNb){
            return res.status(400).json({ message: "BusNb alrady registered" })
        }

        const hashedpassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            busNb,
            username,
            password: hashedpassword,
            telNb
        })

        await newUser.save()
            res.status(201).json({
                message: "Author registered successfully. waiting for approvel"
             })

    } catch (err: any){
         res.status(500).json({ message: err?.message }) 
    }
}

export const login = async (req: Request, res: Response) => {
    try{
        const { username, password} = req.body
        const exitsingBus = await User.findOne({ username })
        if (!exitsingBus) {
            return res.status(401).json({ message: "Invalid credentials" })
        }
        const valid = await bcrypt.compare(password, exitsingBus.password)
        if (!valid) {
            return res.status(401).json({ message: "Invalid credensssstials" })
        }
  
        const accessToken = signAccessToken(exitsingBus)
        const refreshToken = signRefreshToken(exitsingBus)


        res.status(200).json({
            message: "success",
            data: {
                busNb: exitsingBus.busNb,
                accessToken,
                refreshToken
            }
        })

    }catch (err: any) {
        res.status(500).json({ message: err?.message })
    }
}


export const handleRefreshToken = async (req: Request, res:Response) => {
  try{
    const { token } = req.body
    if(!token){
      return res.status(400).json({ message: "Token Required"})
    }
    const payload = jwt.verify(token, JWT_REFRESH_SECRET)
    const user = await User.findById(payload.sub)
    if(!user){
      return res.status(400).json({ message: "invalid refresh token"})
    }
  }catch(err){
    res.status(403).json({message: "invalid expire token"})
  }
}

export const getMyDetails = async (req: AuthRequest, res: Response) => {
 
  const userId = req.user.sub
  const user =
    ((await User.findById(userId).select("-password")) as IUser) || null

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    })
  }

  const { busNb, username, password, telNb} = user

  res.status(200).json({
    message: "Ok",
    data: { busNb, username, password, telNb}
  })
}