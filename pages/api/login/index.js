import connectDB from "src/utils/connectDB";
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

  if (req.method === "PUT") {
    const data = req.body.data;

    if (!data.email || !data.password)
      return res.status(422).json({ status: "faild", message: "Invalid Data" });

    const user = await User.findOne({ email: data.email });

    try {
      const userExist = await User.find({ email: data.email });

      if (userExist.email === data.email) {
        return res.status(200).json({
          status: "success",
          message: "user login successfully",
          data: userExist[0],
        });
      }
    } catch (error) {
      console.log("error", error);
      res
        .status(500)
        .json({ status: "failed", message: "error in stroing data in DB" });
    }
  }
}
