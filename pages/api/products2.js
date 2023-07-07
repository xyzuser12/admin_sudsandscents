import { prisma } from "../../lib/prismaClient";

export default async function handler(req, res) {
  const { method } = req;
  console.log(method);
  if (method === "GET") {
    const productId = parseInt(req.query?.id);
    if (productId) {
      try {
        console.log("eme");
        console.log(productId);

        const product = await prisma.ingredients.findFirst({
          where: {
            id: productId,
          },
          include: {
            category: true,
            composition: true,
          },
        });
        console.log("++++++++++++++++++++++++++++++++++");
        console.log(product);
        return res.json(product);
      } catch (error) {
        return res.status(500).json({
          error: `Something went wrong fetching products!: ${error}`,
        });
      }
    } else {
      try {
        const getIngredients = await prisma.ingredients.findMany();
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
        console.log(getIngredients);
        return res.json(getIngredient);
      } catch (error) {
        return res.status(500).json({
          error: `Something went wrong fetching categories!: ${error}`,
        });
      }
    }
    // await prisma.composition.deleteMany({
    //   where: {
    //     productId: null,
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

          price: price ? price : 0,
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

      let updateProduct;
      if (isChangingImage) {
        updateProduct = await prisma.ingredients.update({
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
        updateProduct = await prisma.ingredients.update({
          where: {
            id: parseInt(id),
          },
          data: {
            name,
            description,
            price,
            milliliter,
            quantity,
            category: {
              connect: JSON.parse(categories),
            },
            compositionId,
          },
        });
      }

      res.status(200).json(updateProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: `An error occurred while updating the admin: ${error}`,
      });
    }
  }
  if (method === "DELETE") {
    try {
      const prodId = req.query?.id;
      const productId = parseInt(prodId);
      console.log("2222222222222222222");
      console.log(productId);

      await prisma.ingredients.delete({
        where: {
          id: productId,
        },
      });

      res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: `An error occurred while deleting the product: ${error}`,
      });
    }
  }
}
