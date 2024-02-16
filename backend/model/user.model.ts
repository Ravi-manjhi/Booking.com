import mongoose from "mongoose";
import bcrypt from "bcrypt";

const HASH = Number(process.env.PASSWORD_HASH);

export type IUserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const UserSchema = new mongoose.Schema<IUserType>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, HASH);
  }
  next();
});

const UserModel = mongoose.model<IUserType>("User", UserSchema);
export default UserModel;
