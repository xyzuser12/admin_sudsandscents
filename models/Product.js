import mongoose, { model, Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    quantity: { type: Number },
    composition: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Product = models.Product || model("Product", ProductSchema);
