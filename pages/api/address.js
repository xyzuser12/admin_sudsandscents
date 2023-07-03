import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Address } from "@/models/Address";

export default async function handle(req, res) {
  await mongooseConnect();
  if (req.method === "GET") {
    if (req.query.userId) {
      res.json(await Address.findOne({ userId: req.query.userId }));
    } else {
      res.json(await Address.find());
    }
  }

  // if (req.method === "PUT") {
  //   try {
  //     const userAddress = await Address.findOne({ userId: req.body.userId });

  //     if (userAddress) {
  //       await Address.findByIdAndUpdate(userAddress._id, req.body);
  //       res.json(req.body);
  //     } else {
  //       const newAddress = await Address.create(req.body);
  //       res.json(newAddress);
  //     }
  //   } catch (error) {
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // }

  if (req.method === "PUT") {
    // const { email, _id } = req.body;
    const address = await Address.findOne({ userEmail: req.body.email });
    console.log(address);
    console.log(req.body);
    const {
      name,
      phoneNumber,
      email,
      city,
      streetAddress,
      postalCode,
      country,
      userId,
    } = req.body;
    console.log(address);
    await Address.updateOne(
      { userId },
      { name, phoneNumber, email, city, streetAddress, postalCode, country }
    );
    res.json(true);
  }

  if (req.method === "DELETE") {
    if (req.query?.id) {
      await Address.deleteOne({ userId: req.query?.userId });
      res.json(true);
    }
  }
}
