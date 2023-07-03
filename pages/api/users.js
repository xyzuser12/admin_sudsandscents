// import { Product } from "@/models/Product";
import { User } from "@/models/Users";
import { mongooseConnect } from "@/lib/mongoose";
// import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  // await isAdminRequest(req, res);

  if (method === "GET") {
    console.log(req.query?.id);
    if (req.query?.id) {
      console.log(req.query.id);
      res.json(await User.findOne({ _id: req.query.id }));
    } else {
      res.json(await User.find());
    }
  }

  if (method === "POST") {
    const { email } = req.body;
    const useDoc = await User.create({
      email,
    });
    res.json(useDoc);
  }

  if (method === "PUT") {
    const { name, email, _id } = req.body;
    await User.updateOne({ _id }, { name, email });
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await User.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
