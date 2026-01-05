import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  busNb: string;
  username: string;
  password: string;
  telNb: number;
}

const UserSchema = new Schema<IUser>(
  {
    busNb: {type: String, required: true},
    username: { type: String, required: true },
    password: { type: String, required: true },
    telNb: { type: Number, required: true}
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);