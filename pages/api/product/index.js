import connectDB from "src/utils/connectDB";
import Product from "models/Product";

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
    if (!data.title || !data.price || !data.description)
      return res.status(400).json({ status: "faild", message: "Invalid Data" });
    try {
      const product = await Product.create(data);
      res.status(201).json({
        status: "success",
        message: "product created successfully",
        data: product,
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
      const products = await Product.find();
      res.status(200).json({
        status: "success",
        message: "fetch products succesfully",
        data: products,
      });
    } catch (error) {
      console.log("error", error);
      res
        .status(500)
        .json({ status: "failed", message: "error in stroing data in DB" });
    }
  }
}
