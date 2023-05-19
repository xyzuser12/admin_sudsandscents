import { model, models, Schema } from "mongoose";

const DeliverySchema = new Schema(
  {
    bookMyOwn: { type: Number },
    sameDayDelivery: { type: Number },
    nextDayDelivery: { type: Number },
    standardDelivery: { type: Number },
    provincialDelivery: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const Delivery = models?.Delivery || model("Delivery", DeliverySchema);
