import connectDB from "src/utils/connectDB";
import User from "models/User.js";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      status: "failed",
      message: "error in connecting DB",
    });
    return;
  }
  if (req.method === "POST") {
    const data = req.body.data;
    if (!data.firstName || !data.lastName || !data.email)
      return res.status(400).json({ status: "faild", message: "Invalid Data" });
    try {
      const user = await User.create(data);
      res.status(201).json({
        status: "success",
        message: "user created successfully",
        data: user,
      });
    } catch (error) {
      console.log("error", error);
      res
        .status(500)
        .json({ status: "failed", message: "error in stroing data in DB" });
    }
  }

  if (req.method === "GET") {
    try {
      const users = await User.find();
      res.status(200).json({
        status: "success",
        message: "fetch users succesfully",
        data: users,
      });
    } catch (error) {
      console.log("error", error);
      res
        .status(500)
        .json({ status: "failed", message: "error in stroing data in DB" });
    }
  }
}
