import mongoose, { model, models, Schema } from "mongoose";

const AddressSchema = new Schema({
  userEmail: { type: String },
  userId: { type: String },
  name: String,
  phoneNumber: String,
  email: String,
  city: String,
  postalCode: String,
  streetAddress: String,
  country: String,
});

export const Address = models?.Address || model("Address", AddressSchema);
