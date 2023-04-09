import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    minLength: 3,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  phoneNumber: String,
  address: String,
  postalCode: Number,
  date: Date,
  products: {
    type: Array,
    default: [],
  },
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

const User = models.User || model("User", UserSchema);

export default User;
