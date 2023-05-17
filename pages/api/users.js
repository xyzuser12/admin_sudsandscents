// import { Product } from "@/models/Product";
import { Users } from "@/models/Users";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    console.log(req.query?.id);
    if (req.query?.id) {
      res.json(await Users.findOne({ _id: req.query.id }));
    } else {
      res.json(await Users.find());
    }
  }

  if (method === "POST") {
    const { email } = req.body;
    const adminDoc = await Users.create({
      email,
    });
    res.json(adminDoc);
  }

  if (method === "PUT") {
    const { email, _id } = req.body;
    await Users.updateOne({ _id }, { email });
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Users.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
