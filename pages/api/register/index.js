import connectDB from "src/utils/connectDB";
import { hashPassword } from "src/utils/auth";
import User from "models/User.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

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

    const exisitingUser = await User.findOne({ email: data.email });

    if (exisitingUser)
      return res
        .status(422)
        .json({ status: "faild", message: "User Exist Already" });

    const hashedPassword = await hashPassword(data.password);

    const newUser = await User.create({ ...data, password: hashedPassword });

    res
      .status(201)
      .json({ status: "success", message: "User created successfully" });

    console.log("newUser", newUser);
  }
}
