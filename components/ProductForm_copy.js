import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
// const subCa = [
//   {
//     _id: "6443984dc1145f3704a15b97",
//     name: "Flip Top",
//     parent: "644397ccc1145f3704a15b93",

//     properties: [
//       {
//         name: "Ingredients",

//         values: ["1st Scent", "1st Scent", "3rd Scent"],
//       },
//     ],
//   },
//   {
//     _id: "6443984dc1145f3704a15b97",
//     name: "Pump",
//     parent: "644397ccc1145f3704a15b93",

//     properties: [
//       {
//         name: "Ingredients",

//         values: ["1st Scent", "1st Scent", "3rd Scent"],
//       },
//     ],
//   },
//   {
//     _id: "6443984dc1145f3704a15b97",
//     name: "Flip Top",
//     parent: "644397ccc1145f3704a15b93",

//     properties: [
//       {
//         name: "Ingredients",

//         values: ["1st Scent", "1st Scent", "3rd Scent"],
//       },
//     ],
//   },
//   {
//     _id: "6443984dc1145f3704a15b97",
//     name: "Oil-based",
//     parent: "644397ccc1145f3704a15b93",

//     properties: [
//       {
//         name: "Ingredients",

//         values: ["1st Scent", "1st Scent", "3rd Scent"],
//       },
//     ],
//   },
// ];

// const parentCa = [
//   { _id: "644397ccc1145f3704a15b93", name: "Custom Body Lotion" },
//   { _id: "644397ccc1145f3704a15b93", name: "Custom Body Scrub" },
//   { _id: "644397ccc1145f3704a15b93", name: "Custom Facial Cleanser" },
// ];

// const compo = [
//   {
//     composition: [
//       {
//         name: "Composition",
//         values: ["Carrier Oils", "Essential Oils", "Fixatives"],
//       },
//     ],
//     id: "64457ad520d684248fba76e6",
//     name: "Oil-based",
//     parent: "Custom Perfume",
//     parentId: "64457aa220d684248fba76e2",
//   },
//   {
//     composition: [
//       {
//         name: "Composition",
//         values: [
//           "Carrier Oils",
//           "Essential Oils",
//           "Fixatives",
//           "Essential Oils",
//         ],
//       },
//     ],
//     id: "64457ad520d684248fba76e2",
//     name: "Oil-based",
//     parent: "Custom Perfume",
//     parentId: "64457aa220d684248fba76e2",
//   },
//   {
//     composition: [
//       {
//         name: "Composition",
//         values: ["Carrier Oils", "Fixatives"],
//       },
//     ],
//     id: "64457ad520d684248fba76e1",
//     name: "Oil-based",
//     parent: "Custom Perfume",
//     parentId: "64457aa220d684248fba76e2",
//   },
// ];

// const id = "64457ad520d684248fba76e6";
export default function ProductFormCopy({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  image: existingImage,
  category: assignedCategory,
  quantity: existingQuantity,
  composition: assignedComposition,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [composition, setComposition] = useState(assignedComposition || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [quantity, setQuantity] = useState(existingQuantity || "");
  const [image, setImage] = useState(existingImage || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  // const [categories, setCategories] = useState([]);
  const [imageSrc, setImageSrc] = useState();
  const router = useRouter();

  const [categ, setCateg] = useState([]);
  const [parentCateg, setParentCateg] = useState([]);
  const [subCateg, setSubCateg] = useState([]);
  const [subcategory, setSubcategory] = useState("");

  const [optionsSubCateg, setOptionsSubCateg] = useState([]);
  const [optionsCompo, setOptionsCompo] = useState([]);
  // console.log(composition);
  // console.log(subcategory);
  // console.log(optionsCompo);

  // useEffect(() => {
  //   axios.get("/api/categories").then((result) => {
  //     setCategories(result.data);
  //   });
  // }, []);
  useEffect(() => {
    fetchCategories();
  }, []);
  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      const categories = result.data;
      setCateg(categories);
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

  // console.log(parentCateg);
  // console.log(subCateg);
  async function saveProduct(e) {
    e.preventDefault();
    console.log(e.currentTarget);

    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "ml_default");

    let imageData = {};
    if (fileInput.files.length > 0) {
      imageData = await fetch(
        "https://api.cloudinary.com/v1_1/dkppw65bv/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());
    }

    setImageSrc(imageData.secure_url);
    setImage(imageData.secure_url);
    // setIsUploading(false);
    const data = {
      title,
      description,
      price,
      image: imageData.secure_url || image,
      category: subcategory,
      quantity,
      composition,
    };
    if (_id) {
      //update
      // console.log(data);
      await axios.put("/api/products", { ...data, _id });
    } else {
      //create
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/products");
  }
  async function uploadImage(e) {
    e.preventDefault();
    // console.log(e.currentTarget);

    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "ml_default");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dkppw65bv/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    // console.log(data);

    setImageSrc(data.secure_url);
    setImage(data);
    setIsUploading(false);
  }
  // function updateImagesOrder(images) {
  //   setImages(images);
  // }
  // function setProductProp(propName, value) {
  //   console.log(propName);
  //   console.log(value);
  //   setProductProperties({ Composition: value });
  // }

  // console.log(productProperties);

  function getUniqueSubcategories(categoryId, subcategories) {
    // console.log(categoryId);
    // console.log(subcategories);
    const subcategoriesWithParentId = subcategories.map((subcat) => {
      return {
        id: subcat.id,
        name: subcat.name,
        parent: subcat.parent,
        parentId: subcat.parentId,
        composition: subcat.composition,
      };
    });

    // console.log(subcategoriesWithParentId);
    const subcategoriesForCategory = subcategoriesWithParentId.filter(
      (subcat) => {
        // console.log(subcat.parent);

        return subcat.parentId == categoryId;
      }
    );
    // console.log(subcategoriesForCategory);
    // const uniqueSubcategories = Array.from(
    //   new Set(subcategoriesWithParentId.map((subcat) => subcat.name))
    // ).map((name) => {
    //   return {
    //     id: subcategoriesWithParentId.find((subcat) => subcat.name === name).id,
    //     name: name,
    //   };
    // });

    // console.log(uniqueSubcategories);
    return subcategoriesForCategory;
  }

  function findCompositionById(compo, id) {
    const matchedCompo = compo.find((c) => c.id === id);
    if (matchedCompo) {
      return matchedCompo.composition[0].values;
    } else {
      return [];
    }
  }

  function imageOnChangeHandler(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setImage(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  // const propertiesToFill = [];
  // if (subCateg.length > 0 && subcategory) {
  //   console.log(subCateg);
  //   console.log(subcategory);
  //   let catInfo = subCateg.find(({ id }) => id == subcategory);
  //   console.log(catInfo);
  //   propertiesToFill.push(...catInfo?.properties);
  // while (catInfo.parentId) {
  //   const parentCat = subCateg.find(({ id }) => id === catInfo.parentId);
  //   console.log(parentCat);
  //   propertiesToFill?.push(...parentCat?.properties);
  //   catInfo = parentCat;
  // }
  // }
  console.log(optionsSubCateg);
  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      <label>Price (php)</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <label>Category</label>
      <select
        value={category}
        onChange={(ev) => {
          setCategory(ev.target.value);
          const subcategories = getUniqueSubcategories(
            ev.target.value,
            subCateg
          );
          setOptionsSubCateg(subcategories);
          // console.log(subcategories);
        }}
      >
        <option value="">Uncategorized</option>
        {parentCateg.length > 0 &&
          parentCateg.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
      </select>
      {
        optionsSubCateg.length > 0 && (
          // optionsSubCateg.map((p) => (
          // <div key={p.name} className="">
          <div>
            <label>Subcategory</label>
            <select
              value={subcategory}
              onChange={(ev) => {
                setSubcategory(ev.target.value);
                setOptionsCompo(
                  findCompositionById(optionsSubCateg, ev.target.value)
                );

                // console.log(optionsCompo);
              }}
            >
              {/* {p?.values?.map((v) => ( */}
              <option value="">Uncategorized</option>
              {optionsSubCateg.length > 0 &&
                optionsSubCateg.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              {/* ))} */}
            </select>
          </div>
        )
        // ))
      }
      {
        optionsSubCateg.length > 0 && optionsCompo.length > 0 && (
          // optionsSubCateg.map((p) => (
          // <div key={p.name} className="">
          <div>
            <label>Composition</label>
            <select
              value={composition}
              onChange={(ev) => setComposition(ev.target.value)}
            >
              {/* {p?.values?.map((v) => ( */}
              <option value="">Uncategorized</option>
              {optionsCompo.length > 0 &&
                optionsCompo.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              {/* ))} */}
            </select>
          </div>
        )
        // ))
      }
      {/* {optionsSubCateg.length > 0 &&
        optionsSubCateg.map((p) => {
          console.log(p);
          console.log(p?.name);
          return (
            <div key={p.name} className="">
              <label>Composition</label>
              <div>
                <select
                  value={composition}
                  onChange={(ev) => setComposition(ev.target.value)}
                >
                  {p.values.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })} */}
      <label>Milliliter</label>
      <input
        type="number"
        placeholder="milliliter"
        value={quantity}
        onChange={(ev) => setQuantity(ev.target.value)}
      />
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        {isUploading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}
        {!isUploading && (
          <div className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
            <img
              src={!imageSrc ? image : imageSrc}
              alt=""
              className="rounded-lg"
            />
          </div>
        )}
        <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Add image</div>
          <input
            type="file"
            name="file"
            className="hidden"
            onChange={imageOnChangeHandler}
          />
        </label>
      </div>

      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
