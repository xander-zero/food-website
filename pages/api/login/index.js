import connectDB from "src/utils/connectDB";
import { verifyPassword } from "src/utils/auth";
import User from "models/User.js";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

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

    const secretKey = process.env.SECRET_KEY;

    const expiration = 24 * 60 * 60;

    if (!data.email || !data.password)
      return res.status(422).json({ status: "faild", message: "Invalid Data" });

    const user = await User.findOne({ email: data.email });

    if (!user)
      return res
        .status(404)
        .json({ status: "faild", message: "User dose not exist" });

    const isValid = verifyPassword(data.password, user.password);

    if (!isValid)
      return res.status(422).json({
        status: "faild",
        message: "Username or Password is incorrect",
      });

    const token = sign({ email: data.email }, secretKey, {
      expiresIn: expiration,
    });

    const serializeed = serialize("token", token, {
      httpOnly: true,
      maxAge: expiration,
      path: "/",
    });

    res
      .status(200)
      .setHeader("Set-Cookie", serializeed)
      .json({ status: "success", message: "Loged in successfully" });
  }
}
