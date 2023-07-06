import { prisma } from "../../lib/prismaClient";

export default async function handler(req, res) {
  const { method } = req;
  console.log(method);
  if (method === "GET") {
    // await prisma.composition.deleteMany({
    //   where: {
    //     categoryId: null,
    //   },
    // });
    // const category = await prisma.category.findMany({
    //   where: {
    //     id: {
    //       in: [10, 9],
    //     },
    //   },
    // });
    // console.log(category.map((categ) => ({ id: categ.id })));
    // console.log(category);
    // const ingredient = await prisma.ingredients.create({
    //   data: {
    //     name: "test2",
    //     description: "lorem ipsum test",
    //     price: 100,
    //     milliliter: 50,
    //     quantity: 20,
    //     category: {
    //       connect: [{ id: 7 }],
    //     },
    //     compositionId: 13,
    //   },
    // });

    // const getIngredient = await prisma.ingredients.findFirst({
    //   where: {
    //     id: 19,
    //   },
    //   include: {
    //     category: {
    //       select: {
    //         id: true,
    //         name: true,
    //       },
    //     },
    //     composition: {
    //       select: {
    //         id: true,
    //         name: true,
    //         description: true,
    //       },
    //     },
    //   },
    // });
    const getIngredient = await prisma.ingredients.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        composition: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });
    console.log(getIngredient);
    return res.json(getIngredient);
  }

  if (method === "POST") {
    // await prisma.ingredients.deleteMany({
    //   where: {
    //     image: null,
    //   },
    // });
    try {
      const {
        name,
        description,
        price,
        image,
        milliliter,
        quantity,
        categories,
        composition: compositionId,
      } = req.body;
      console.log(req.body);
      console.log(Buffer.from(image, "base64"));
      // const ingredient = await prisma.ingredients.create({
      //   data: {
      //     name,
      //     description,
      //     price,

      //     image: Buffer.from(image, "base64"),
      //     milliliter,
      //     quantity,
      //     category: {
      //       connect: JSON.parse(categories),
      //     },
      //     compositionId: composition,
      //   },
      // });

      const ingredient = await prisma.ingredients.create({
        data: {
          name,
          description,
          image: Buffer.from(image, "base64"),

          price,
          milliliter,
          quantity,
          category: {
            connect: JSON.parse(categories),
          },
          compositionId,
        },
      });

      res.status(200).json(ingredient);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: `An error occurred while uploading the ingredient: ${error}`,
      });
    }
  }

  if (method === "PUT") {
    console.log(method);
    try {
      const {
        id,
        name,
        description,
        price,
        image,
        milliliter,
        quantity,
        categories,
        composition: compositionId,
        isChangingImage,
      } = req.body;
      let updateCategory;
      if (isChangingImage) {
        updateCategory = await prisma.ingredients.update({
          where: {
            id: parseInt(id),
          },
          data: {
            name,
            description,
            image: Buffer.from(image, "base64"),

            price,
            milliliter,
            quantity,
            category: {
              connect: JSON.parse(categories),
            },
            compositionId,
          },
        });
      } else {
        updateCategory = await prisma.ingredients.update({
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
}
