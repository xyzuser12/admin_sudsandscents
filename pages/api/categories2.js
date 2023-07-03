import { prisma } from "../../lib/prismaClient";

export default async function handler(req, res) {
  const { method } = req;

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

  // if (method === "POST") {
  //   try {
  //     // await prisma.admin.deleteMany();
  //     const { name, username, email, password, phone_number, image } = req.body;
  //     const hashedPassword = await bcrypt.hash(password, 10);

  //     console.log(Buffer.from(image, "base64"));

  //     const admin = await prisma.user.create({
  //       data: {
  //         name,
  //         username,
  //         email,
  //         password: hashedPassword,
  //         phone_number,
  //         role: "ADMIN",
  //         // image: Buffer.from(image, "base64"), // Convert base64 image to buffer
  //       },
  //     });

  //     res.status(200).json(admin);
  //   } catch (error) {
  //     console.error(error);
  //     res
  //       .status(500)
  //       .json({ error: "An error occurred while uploading the admin." });
  //   }
  // }

  // if (method === "PUT") {
  //   console.log(method);
  //   try {
  //     const { id, name, username, email, password, phone_number, image } =
  //       req.body;
  //     console.log("===========");
  //     console.log(req.body);

  //     // Find the existing admin record
  //     const existingAdmin = await prisma.user.findFirst({
  //       where: {
  //         id,
  //         role: "ADMIN",
  //       },
  //     });

  //     // if (!existingAdmin) {
  //     //   return res.status(404).json({ error: "Admin not found." });
  //     // }

  //     // If password is provided, hash it
  //     let hashedPassword = existingAdmin.password; // Keep existing password if not provided

  //     console.log(existingAdmin);
  //     if (password !== existingAdmin.password) {
  //       hashedPassword = await bcrypt.hash(password, 10);
  //     }

  //     // Update the admin record
  //     const updatedAdmin = await prisma.user.update({
  //       where: {
  //         id,
  //       },
  //       data: {
  //         name,
  //         username,
  //         email,
  //         password: hashedPassword,
  //         phone_number,
  //         role: "ADMIN",
  //         // image: Buffer.from(image, "base64"), // Convert base64 image to buffer
  //       },
  //     });

  //     res.status(200).json(updatedAdmin);
  //   } catch (error) {
  //     console.error(error);
  //     res
  //       .status(500)
  //       .json({ error: "An error occurred while updating the admin." });
  //   }
  // }

  // if (method === "DELETE") {
  //   try {
  //     const adminId = req.query?.id;
  //     console.log("2222222222222222222");
  //     console.log(adminId);

  //     await prisma.user.delete({
  //       where: {
  //         id: adminId, // Use `{ equals: adminId }` to specify the value of id
  //       },
  //     });

  //     res.status(200).json({ message: "Admin deleted successfully." });
  //   } catch (error) {
  //     console.error(error);
  //     res
  //       .status(500)
  //       .json({ error: "An error occurred while deleting the admin." });
  //   }
  // }
}
