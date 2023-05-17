import { model, Schema, models } from "mongoose";

const UsersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String },
});

export const Users = models.User || model("User", UsersSchema);
