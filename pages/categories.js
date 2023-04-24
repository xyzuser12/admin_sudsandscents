import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

import * as React from "react";
import { styled, Box } from "@mui/material";

import classes from "../styles/products/AllProducts.module.css";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  const [parentCateg, setParentCateg] = useState([]);
  const [subCateg, setSubCateg] = useState([]);
  console.log(properties);
  useEffect(() => {
    fetchCategories();
  }, []);
  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      const categories = result.data;
      setCategories(categories);
      const topLevelCategories = getTopLevelCategories(categories);
      const subCategories = getSubCategories(categories);
      setParentCateg(topLevelCategories);
      setSubCateg(subCategories);
    });
  }

  function getTopLevelCategories(categ) {
    const topLevelCategories = [];

    categ.forEach((category) => {
      if (!category.parent) {
        topLevelCategories.push({
          id: category._id,
          name: category.name,
        });
      }
    });

    return topLevelCategories;
  }

  function getSubCategories(categ) {
    console.log(categ);
    const subCategories = [];
    categ.forEach((category) => {
      if (category.parent) {
        const parentCategory = category.parent.name;
        const parentCategoryId = category.parent._id;
        const parentCategoryProperties = category.properties;
        console.log(parentCategoryProperties);
        subCategories.push({
          id: category._id,
          name: category.name,
          parent: parentCategory,
          parentId: parentCategoryId,
          properties: parentCategoryProperties,
        });
      }
    });

    return subCategories;
  }

  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: "Composition",
        values: p.values.split(",").map((v) => v.trim()),
      })),
    };
    console.log(editedCategory);
    if (editedCategory) {
      data._id = editedCategory.id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    setParentCategory("");
    setProperties([]);
    fetchCategories();
  }
  function editCategory(category) {
    console.log(category);
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parentId);
    setProperties(
      category?.properties?.map(({ values }) => ({
        name: "Composition",
        values: values.join(","),
      }))
    );
  }
  function deleteCategory(category) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { id } = category;
          await axios.delete("/api/categories?_id=" + id);
          fetchCategories();
        }
      });
  }
  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handlePropertyValuesChange(e, index) {
    const { value } = e?.target;
    setProperties((prev) => {
      return prev.map((property, i) => {
        if (i === index) {
          return { ...property, values: value };
        }
        return property;
      });
    });
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
        <label>
          {editedCategory
            ? `Edit category ${editedCategory.name}`
            : "Create new category"}
        </label>
        <form onSubmit={saveCategory}>
          <div className="flex gap-1">
            <input
              type="text"
              placeholder={"Category name"}
              onChange={(ev) => setName(ev.target.value)}
              value={name}
            />
            <select
              onChange={(ev) => setParentCategory(ev.target.value)}
              value={parentCategory}
            >
              <option value="">No parent category</option>
              {parentCateg.length > 0 &&
                parentCateg.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-2">
            <button
              onClick={addProperty}
              type="button"
              className="btn-default text-sm mb-2"
            >
              Add a composition
            </button>

            {properties?.length > 0 && (
              <div className="flex gap-1 mb-2">
                <p>Composition: </p>
                <input
                  type="text"
                  className="mb-0"
                  onChange={(e) => handlePropertyValuesChange(e, 0)}
                  value={properties[0].values}
                  placeholder="values, comma separated"
                />
              </div>
            )}
          </div>
          <div className="flex gap-1">
            {editedCategory && (
              <button
                type="button"
                onClick={() => {
                  setEditedCategory(null);
                  setName("");
                  setParentCategory("");
                  setProperties([]);
                }}
                className="btn-default"
              >
                Cancel
              </button>
            )}
            <button type="submit" className="btn-primary py-1">
              Save
            </button>
          </div>
        </form>
        {!editedCategory && (
          <React.Fragment>
            <br></br>
            <h4>Parent Categories</h4>
            <table className="basic mt-4">
              <thead>
                <tr>
                  {/* <td>ID</td> */}
                  <td>Catogory Name</td>
                  <td>action buttons</td>
                </tr>
              </thead>
              <tbody>
                {parentCateg.length > 0 &&
                  parentCateg.map((category) => (
                    <tr key={category.id}>
                      {/* <td>{category.id}</td> */}
                      <td>{category?.name}</td>
                      <td>
                        <button
                          onClick={() => editCategory(category)}
                          className="btn-default mr-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCategory(category)}
                          className="btn-red"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <br></br>
            <h4>Subcategories</h4>
            <table className="basic mt-4">
              <thead>
                <tr>
                  {/* <td>ID</td> */}
                  <td>Catogory Name</td>
                  <td>Parent Category</td>
                  <td>Action buttons</td>
                </tr>
              </thead>
              <tbody>
                {subCateg.length > 0 &&
                  subCateg.map((category) => {
                    console.log(category);
                    return (
                      <tr key={category.id}>
                        {/* <td>{category.id}</td> */}
                        <td>{category?.name}</td>
                        <td>{category?.parent}</td>
                        <td>
                          <button
                            onClick={() => editCategory(category)}
                            className="btn-default mr-1"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteCategory(category)}
                            className="btn-red"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </React.Fragment>
        )}
      </Box>
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
