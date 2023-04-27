import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  isStock: {
    type: Boolean,
    default: true,
  },
  date: Date,
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
