import connectDB from "src/utils/connectDB";

export default async function handler(req, res) {
  await connectDB();
  if (req.method === "POST") {
    const { name } = req.body;
    if (!name || name.length <= 3) {
      res.status(422).json({ message: "Invalid Data", status: "failed" });
      return;
    }
    res
      .status(201)
      .json({ status: "success", message: "Data Created", data: { name } });
  }
}
