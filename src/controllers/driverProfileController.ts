import { Request, Response } from "express";
import { Driver } from "../models/driver.modle";
import { signAccessToken, signRefreshToken } from "../utils/token"
import dotenv from "dotenv"
import { AuthRequest } from "../middleware/authMiddleware";
import { Route } from "../models/routeDetails.model";
dotenv.config()

export const saveProfile = async (req: Request, res: Response) => {
    try{
        const {fullname,telNb,buscode,startstation,endstation} = req.body

        if (!fullname || !telNb || !buscode || !startstation || !endstation) {
            return res.status(400).json({ message: "All fields are required" })
        }
        
        const existingDriver = await Driver.findOne({ buscode })

        if (existingDriver) {
            existingDriver.fullname = fullname
            existingDriver.telNb = telNb
            existingDriver.startstation = startstation
            existingDriver.endstation = endstation

            await existingDriver.save()

            return res.status(200).json({
                message: "Profile updated successfully ",
                driver: existingDriver
            })
        }

        const newDriver = new Driver({
            fullname,
            telNb,
            buscode,
            startstation,
            endstation
        })

        await newDriver.save()
        res.status(201).json({
            message: "Driver registered successfully.",
            driver: newDriver
        })
    }catch (err: any) {
        return res.status(500).json({ message: err?.message })
    }
}

export const getDriverProfileDetails = async (req: Request, res: Response) => {
  try {
    const buscode = req.query.busCode as string; // capital C match කරන්න
  
    if (!buscode) {
      return res.status(400).json({ message: "Bus code is required" });
    }

    const route = await Driver.findOne({ buscode: buscode }); // database field name: buscode
    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    res.status(200).json({ message: "Ok", data: route });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


export const getrouteDetails = async (req: Request, res: Response) => {
  try {
    const endstation = req.query.endstation as string; 
  
    if (!endstation) {
      return res.status(400).json({ message: "not availble to toute" });
    }

    const route = await Route.findOne({ endstation: endstation }); 
    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    res.status(200).json({ message: "Ok", data: route });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};