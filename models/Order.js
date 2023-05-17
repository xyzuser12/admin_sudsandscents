import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    line_items: { type: Object },
    name: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    city: { type: String },
    postalCode: { type: String },
    streetAddress: { type: String },
    country: { type: String },
    paymentMethod: { type: String },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);
