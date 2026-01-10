import mongoose, { Document, Schema } from "mongoose";

export interface IDriver extends Document {
  fullname: string;
  telNb: number;
  buscode: string;
  startstation: string;
  endstation: string;
}


const DriverSchema = new Schema<IDriver>(
  {
    fullname: {type: String, required: true},
    telNb: { type: Number, required: true},
    buscode: { type: String, required: true },
    startstation: { type: String, required: true },
    endstation: { type: String, required: true}
  },
  { timestamps: true }
);

export const Driver = mongoose.model<IDriver>("Driver", DriverSchema);
