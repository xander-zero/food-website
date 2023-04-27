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

  if (req.method === "DELETE") {
    try {
      const { userId } = req.query;
      await User.deleteOne({ _id: userId });
      res
        .status(200)
        .json({ status: "success", nessage: "user deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ status: "faild", message: "problem with connection DB" });
    }
  }
  if (req.method === "PUT") {
    const { userId } = req.query;
    const data = req.body.data;

    try {
      const user = await User.findOne({ _id: userId });
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.isAdmin = data.isAdmin;
      user.phoneNumber = data.phoneNumber;

      user.save();
      res
        .status(200)
        .json({ status: "success", message: "user updated succesfully" });
    } catch (error) {
      console.log("error", error);
      res
        .status(500)
        .json({ status: "faild", message: "problem with connection DB" });
    }
  }
}
