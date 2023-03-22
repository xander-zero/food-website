import mongoose from "mongoose";

async function connectDB() {
  try {
    if (mongoose.connection[0].readyState) return;

    await mongoose.connect(process.env.MONGO_URI);
    console.log("CONNECTED TO DB");
  } catch (error) {
    console.log("connection faild!");
  }
}

export default connectDB;
