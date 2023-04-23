import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  image: existingImage,
  category: assignedCategory,
  quantity: existingQuantity,
  properties: assignedProperties,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const [price, setPrice] = useState(existingPrice || "");
  const [quantity, setQuantity] = useState(existingQuantity || "");
  const [image, setImage] = useState(existingImage || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imageSrc, setImageSrc] = useState();
  const router = useRouter();
  console.log(productProperties);
  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);
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

    console.log(imageData);

    setImageSrc(imageData.secure_url);
    setImage(imageData.secure_url);
    // setIsUploading(false);
    console.log(image);
    const data = {
      title,
      description,
      price,
      image: imageData.secure_url || image,
      category,
      quantity,
      properties: productProperties,
    };
    if (_id) {
      //update
      console.log(data);
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

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dkppw65bv/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    console.log(data);

    setImageSrc(data.secure_url);
    setImage(data);
    setIsUploading(false);
  }
  function updateImagesOrder(images) {
    setImages(images);
  }
  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  function imageOnChangeHandler(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setImage(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

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
      <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>
      {propertiesToFill.length > 0 &&
        propertiesToFill.map((p) => (
          <div key={p.name} className="">
            <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
            <div>
              <select
                value={productProperties[p.name]}
                onChange={(ev) => setProductProp(p.name, ev.target.value)}
              >
                {p.values.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      <label>Quantity</label>
      <input
        type="number"
        placeholder="quantity"
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
