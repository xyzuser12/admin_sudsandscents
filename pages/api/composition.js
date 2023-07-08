import { prisma } from "../../lib/prismaClient";

export default async function handler(req, res) {
  const { method } = req;
  console.log(method);
  if (method === "GET") {
    // await prisma.category.deleteMany();
    // await prisma.composition.create({
    //   data: {
    //     name: "test1",
    //     description: "lorem ipsum lorem ipsumlorem ipsumlorem ipsum",
    //     categoryId: 7,
    //   },
    // });
    const mode = req.query?.mode;
    const compoId = parseInt(req.query?.id);
    const categoryId = parseInt(req.query?.categoryId);
    const compositionId = parseInt(compoId);
    // console.log(compositionId);
    // console.log(categoryId);
    if (mode === "NEW_INGREDIENT") {
      const ids = JSON.parse(req.query?.categIds);
      // console.log(ids);
      const composition = await prisma.composition.findMany({
        where: {
          categoryId: {
            in: ids,
          },
        },
        include: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
      // console.log(composition);

      return res.json(composition);
    } else if (compositionId && categoryId) {
      try {
        console.log("eme");
        console.log(compositionId);
        console.log(categoryId);
        const composition = await prisma.composition.findFirst({
          where: {
            id: compositionId,
            categoryId,
          },
        });
        console.log("++++++++++++++++++++++++++++++++++");
        console.log(composition);
        return res.json(composition);
      } catch (error) {
        return res.status(500).json({
          error: `Something went wrong fetching composition!: ${error}`,
        });
      }
    } else if (categoryId && !compositionId) {
      try {
        const composition = await prisma.composition.findMany({
          where: {
            categoryId,
          },
        });
        console.log("==================================");
        console.log(composition);
        return res.json(composition);
      } catch (error) {
        return res.status(500).json({
          error: `Something went wrong fetching composition!: ${error}`,
        });
      }
    }
  }

  if (method === "POST") {
    try {
      const {
        name,
        description,
        newCompoCategId: categoryId,
        ingredientsLimit: ingredient_limit,
      } = req.body;
      console.log(req.body);

      const category = await prisma.composition.create({
        data: {
          name,
          description,
          categoryId: parseInt(categoryId),
          ingredient_limit,
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
      const {
        id,
        name,
        description,
        ingredientsLimit: ingredient_limit,
      } = req.body;
      const updateComposition = await prisma.composition.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name,
          description,
          ingredient_limit,
        },
      });

      res.status(200).json(updateComposition);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: `An error occurred while updating the admin: ${error}`,
      });
    }
  }

  if (method === "DELETE") {
    try {
      const id = parseInt(req.query?.id);
      console.log("2222222222222222222");
      console.log(id);

      await prisma.composition.delete({
        where: {
          id,
        },
      });

      res.status(200).json({ message: "Composition deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: `An error occurred while deleting the composition: ${error}`,
      });
    }
  }
}
