import mongoose, { model, models, Schema } from "mongoose";

const UsersSchema = new Schema({
  name: { type: String },
  email: { type: String },
  image: { type: String },
});

export const User = models?.User || model("User", UsersSchema);
