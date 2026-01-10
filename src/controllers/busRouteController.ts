import { Request, Response } from "express";
import { Route } from "../models/routeDetails.model"; 
import { signAccessToken, signRefreshToken } from "../utils/token"
import dotenv from "dotenv"
dotenv.config()



export const busroteSave = async (req: Request, res: Response) => {
    console.log("hi")
    try{
        console.log("hi am back")
        const { buscode, startstation, endstation, startTime, endTime, shAvilable, startORoffline  } = req.body
        
        console.log("bus",buscode)
        console.log("st",startstation)
        console.log("en", endstation)
        console.log("st t", startTime)
        console.log("end t", endTime)

         if(!buscode || !startstation || !endstation || !startTime || !endTime ){
            return res.status(400).json({ message: "All fields are required"})
        }

        console.log("hhihihs")
        const existingDriver = await Route.findOne({ buscode })
           if (existingDriver) {
            existingDriver.startstation = startstation
            existingDriver.endstation = endstation
            existingDriver.startTime = startTime
            existingDriver.endTime = endTime
            existingDriver.shAvilable = shAvilable
            existingDriver.startORoffline = startORoffline

            await existingDriver.save()

            return res.status(200).json({
                message: "Profile updated successfully ",
                driver: existingDriver
            })
        }

        
         const newBus = new Route({
                    buscode,
                    startstation,
                    endstation,
                    startTime,
                    endTime,
                    shAvilable,
                    startORoffline
                })
        

          await newBus.save()
            res.status(201).json({
                message: "Succsess"
             })

    }catch (err: any) {
        res.status(500).json({ message: err?.message })
    }
}

