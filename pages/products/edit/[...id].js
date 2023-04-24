import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";
import { styled, Box, Typography, Button } from "@mui/material";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const subCa = [
  {
    id: "6443984dc1145f3704a15b97",
    name: "Flip Top",
    parent: "Custom Body Lotion",
    parentId: "644397ccc1145f3704a15b93",
  },
  {
    id: "6443984dc1145f3704a15b97",
    name: "Flip Top",
    parent: "Custom Body Lotion",
    parentId: "644397ccc1145f3704a15b93",
  },
  {
    id: "6443984dc1145f3704a15b97",
    name: "Flip Top",
    parent: "Custom Body Lotion",
    parentId: "644397ccc1145f3704a15b93",
  },
  {
    id: "6443984dc1145f3704a15b97",
    name: "Flip Top",
    parent: "Custom Body Lotion",
    parentId: "644397ccc1145f3704a15b93",
  },
];

const parentCa = [
  { id: "644397ccc1145f3704a15b93", name: "Custom Body Lotion" },
  { id: "644397ccc1145f3704a15b93", name: "Custom Body Scrub" },
  { id: "644397ccc1145f3704a15b93", name: "Custom Facial Cleanser" },
];

const existingSubCaId = "6445ec6a7368a64905f2c977";
export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const [categ, setCateg] = useState([]);
  const [parentCateg, setParentCateg] = useState([]);
  const [subCateg, setSubCateg] = useState([]);
  const [parentCaId, setParentCaId] = useState("");

  console.log(productInfo);
  console.log(parentCaId);
  console.log(subCateg);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  useEffect(() => {
    fetchCategories();
  }, []);
  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      const categories = result.data;
      setCateg(categories);
      // const topLevelCategories = getTopLevelCategories(categories);
      const subCategories = getSubCategories(categories);
      // setParentCateg(topLevelCategories);
      const parentId = getParentId(subCategories, productInfo?.category);
      console.log(parentId);
      setSubCateg(subCategories);
      setParentCaId(parentId);
    });
  }
  // function getTopLevelCategories(categ) {
  //   const topLevelCategories = [];

  //   categ.forEach((category) => {
  //     if (!category.parent) {
  //       topLevelCategories.push({
  //         id: category._id,
  //         name: category.name,
  //       });
  //     }
  //   });

  //   return topLevelCategories;
  // }

  function getSubCategories(categ) {
    // console.log(categ);
    const subCategories = [];
    categ.forEach((category) => {
      if (category.parent) {
        // console.log(category);

        const parentCategory = category.parent.name;
        const parentCategoryId = category.parent._id;
        const parentCategoryProperties = category.properties;
        // console.log(parentCategoryProperties);
        subCategories.push({
          id: category._id,
          name: category.name,
          parent: parentCategory,
          parentId: parentCategoryId,
          composition: parentCategoryProperties,
        });
      }
    });

    return subCategories;
  }

  function getParentId(subCa, existingSubCaId) {
    console.log(subCa);
    console.log(existingSubCaId);
    const foundSubCa = subCa.find((sc) => sc.id === existingSubCaId);
    if (foundSubCa) {
      return foundSubCa.parentId;
    } else {
      return "Subcategory not found";
    }
  }
  return (
    <Layout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflow: "hidden",
          margin: "3rem 1rem",
        }}
      >
        <DrawerHeader />
        <h1>Edit product</h1>
        {productInfo && <ProductForm {...productInfo} />}
      </Box>
    </Layout>
  );
}
