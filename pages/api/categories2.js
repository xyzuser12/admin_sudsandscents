import { prisma } from "../../lib/prismaClient";

export default async function handler(req, res) {
  const { method } = req;
  console.log(method);
  if (method === "GET") {
    // await prisma.category.deleteMany();
    // await prisma.category.create({
    //   data: {
    //     name: "Custom Perfume",
    //     description: "lorem ipsum lorem ipsumlorem ipsumlorem ipsum",
    //   },
    // });
    const categId = req.query?.id;
    const categoryId = parseInt(categId);
    // console.log(categoryId);
    if (categoryId) {
      try {
        console.log("eme");
        console.log(categoryId);

        const category = await prisma.category.findFirst({
          where: {
            id: categoryId,
          },
        });
        console.log("++++++++++++++++++++++++++++++++++");
        console.log(category);
        return res.json(category);
      } catch (error) {
        return res.status(500).json({
          error: `Something went wrong fetching categories!: ${error}`,
        });
      }
    }
    if (!categoryId) {
      try {
        const category = await prisma.category.findMany();
        console.log("==================================");
        console.log(category);
        return res.json(category);
      } catch (error) {
        return res.status(500).json({
          error: `Something went wrong fetching categories!: ${error}`,
        });
      }
    }
  }

  if (method === "POST") {
    try {
      const { name, description, image } = req.body;
      console.log(req.body);
      console.log(Buffer.from(image, "base64"));
      const category = await prisma.category.create({
        data: {
          name,
          description,
          image: Buffer.from(image, "base64"),
        },
      });

      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while uploading the category." });
    }
  }
  if (method === "PUT") {
    console.log(method);
    try {
      const { id, name, description, image, isChangingImage } = req.body;
      let updateCategory;
      if (isChangingImage) {
        updateCategory = await prisma.category.update({
          where: {
            id: parseInt(id),
          },
          data: {
            name,
            description,
            image: Buffer.from(image, "base64"),
          },
        });
      } else {
        updateCategory = await prisma.category.update({
          where: {
            id: parseInt(id),
          },
          data: {
            name,
            description,
          },
        });
      }

      res.status(200).json(updateCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: `An error occurred while updating the admin: ${error}`,
      });
    }
  }

  if (method === "DELETE") {
    try {
      const categId = req.query?.id;
      const categoryId = parseInt(categId);
      console.log("2222222222222222222");
      console.log(categoryId);

      await prisma.category.delete({
        where: {
          id: categoryId, // Use `{ equals: adminId }` to specify the value of id
        },
      });

      res.status(200).json({ message: "Category deleted successfully." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: `An error occurred while deleting the admin: ${error}`,
        });
    }
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
