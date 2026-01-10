import mongoose, { Document, Schema } from "mongoose";

export interface IRoute extends Document {
  buscode: string;
  startstation: string;
  endstation: string;
  startTime: string;
  endTime: string;
  shAvilable: boolean;
  startORoffline: boolean;

}


const RouteSchema = new Schema<IRoute>(
  {
    buscode: { type: String, required: true },
    startstation: { type: String, required: true },
    endstation: { type: String, required: true},
    startTime: { type: String, required: true},
    endTime: { type: String, required: true},
    shAvilable: { type: Boolean, required: true},
    startORoffline: { type: Boolean, required: true}
  },
  { timestamps: true }
);

export const Route = mongoose.model<IRoute>("Route", RouteSchema);
