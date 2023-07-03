import { prisma } from "../../lib/prismaClient";

export default async function handler(req, res) {
  const { method } = req;
  if (method === "GET") {
    await prisma.category.create({
      data: {
        name: "Custom Perfume",
        description: "lorem ipsum lorem ipsumlorem ipsumlorem ipsum",
      },
    });
  }
  // if (method === "GET") {
  //   try {
  //     const adminId = req.query?.id;
  //     console.log(adminId);
  //     if (adminId) {
  //       const admin2 = await prisma.user.findFirst({
  //         where: {
  //           id: adminId,
  //           role: "ADMIN",
  //         },
  //       });
  //       //   select: { data: true },
  //       // });
  //       console.log(admin2);
  //       return res.json(admin2);
  //     } else {
  //       const admin = await prisma.user.findMany({
  //         where: {
  //           role: "ADMIN",
  //         },
  //       });
  //       // console.log(admin);
  //       return res.json(admin);
  //     }
  //   } catch (error) {
  //     return res.status(500).json({ error: "Something went wrong" });
  //   }
  // }
}
