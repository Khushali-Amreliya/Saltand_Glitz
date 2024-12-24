import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is installed
import * as XLSX from "xlsx";
import { formatCurrency } from "../Utils/formateCurrency";

const Adashbord = () => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  console.log(products);


  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: sku,
      title: name,
      price: productPrice,
      image01: productImage,
      category: productCategory,
    };

    setProducts([...products, newProduct]);
    setProductName("");
    setProductPrice("");
    setProductImage("");
    setProductCategory("");
    setSku("")
    setName("")
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const newProducts = jsonData.map((row) => ({
        id: row.SKU,
        // ttl: row.Title,
        title: row.title,
        price: row.price || 0,
        image01: row.image01 || "",
        category: row.category || "Miscellaneous",
      }));

      // Filter out duplicate products
      const filteredProducts = newProducts.filter((newProduct) => {
        return !products.some(
          (existingProduct) =>
            existingProduct.title === newProduct.title &&
            existingProduct.category === newProduct.category
        );
      });

      // Add only the new products (non-duplicates)
      setProducts([...products, ...filteredProducts]);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const handleUploadToBackend = async () => {
    try {
      const response = await axios.post("http://localhost:5000/v1/upload/post_upload", {
        products,
      });
      alert("Data uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Failed to upload data. Please try again.");
    }
  };

  return (
    <div>
      <div className="container my-4">
        {/* <h2 className="mb-4">Add New Product</h2> */}
        {/* <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              className="form-control"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">
              Price (₹)
            </label>
            <input
              type="number"
              className="form-control"
              id="productPrice"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productImage" className="form-label">
              Product Image URL
            </label>
            <input
              type="url"
              className="form-control"
              id="productImage"
              value={productImage}
              onChange={(e) => setProductImage(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productCategory" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="productCategory"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Ring">Ring</option>
              <option value="Earring">Earring</option>
              <option value="Bracelet">Bracelet</option>
              <option value="Pendents">Pendents</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form> */}
        <div className="mt-4">
          <label htmlFor="fileUpload" className="form-label">
            Upload Excel File
          </label>
          <input
            type="file"
            id="fileUpload"
            accept=".xlsx, .xls"
            className="form-control"
            onChange={handleFileUpload}
          />
        </div>
        <button className="btn btn-success" onClick={handleUploadToBackend}>
          Upload to Backend
        </button>
        <h2 className="mt-5 mb-4">Product List</h2>
        <div className="row g-4" id="productList">
          {products.map((product, index) => (
            <div key={index} className="col-md-3">
              <div className="product-card">
                <img
                  src={product.image01 || "https://via.placeholder.com/150"}
                  alt={product.title}
                  className="img-fluid"
                />
                <div className="product-info">
                  {/* <p>{product.id}</p> */}
                  <h5>{product.title}</h5>
                  {/* <p>Category: {product.ttl}</p> */}
                  <p>SKU: {product.id}</p>
                  <p className="price">{formatCurrency(product.price)}</p>
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => handleDelete(index)}
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Adashbord;
