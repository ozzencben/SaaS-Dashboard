import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import CustomInput from "../../../components/customInput/CustomInput";
import { getProducts } from "../../../services/FakeStoreServices";
import "./ProductsStyles.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🔹 Düzeltildi
  const [selectedCategory, setSelectedCategory] = useState("all"); // 🔹 Yeni state

  // 🔹 Filtreleme
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" || product.category === selectedCategory)
  );

  // 🔹 Ürünleri çekme
  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res);
    } catch (err) {
      console.error(
        "An error occured while retrieving the products",
        err.message
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Dinamik kategoriler (products verisinden)
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return (
    <div className="productpage">
      <div className="search-container">
        <div className="searchbox">
          <CustomInput
            placeholder="Search"
            icon={CiSearch}
            iconColor="white"
            iconSize={24}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // 🔹 Düzeltildi
          />
        </div>

        <div className="category-select">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                <img src={p.image} alt={p.title} className="image" />
              </td>
              <td>{p.title}</td>
              <td>{p.category}</td>
              <td>{p.price}</td>
              <td>{p.rating.rate}</td>
              <td>
                <button>View</button>
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
