import { useEffect, useState } from "react";
import {
  getCarts,
  getProducts,
  getUsers,
} from "../../services/FakeStoreServices";
import "./OrdersStyles.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);

        const usersData = await getUsers();
        setUsers(usersData);

        const cartsData = await getCarts();
        setOrders(cartsData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // Tabloya uygun formata dönüştür
  const tableOrders = orders.map((cart) => {
    const user = users.find((u) => u.id === cart.userId);
    const userName = user
      ? `${user.name.firstname} ${user.name.lastname}`
      : "Unknown";

    const productsList = cart.products
      .map((p) => {
        const product = products.find((prod) => prod.id === p.productId);
        return product ? `${product.title} x${p.quantity}` : "";
      })
      .join(", ");

    const totalPrice = cart.products.reduce((sum, p) => {
      const product = products.find((prod) => prod.id === p.productId);
      return sum + (product ? product.price * p.quantity : 0);
    }, 0);

    return {
      id: cart.id,
      userName,
      productsList,
      totalPrice: totalPrice.toFixed(2),
      date: cart.date,
    };
  });

  // Sıralama fonksiyonu
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedOrders = [...tableOrders].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredOrders = sortedOrders.filter((order) =>
    order.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="orders-container">
      <h2>Orders</h2>

      <input
        type="text"
        placeholder="Search by user..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>ID</th>
              <th onClick={() => handleSort("userName")}>User</th>
              <th onClick={() => handleSort("productsList")}>Products</th>
              <th onClick={() => handleSort("totalPrice")}>Total</th>
              <th onClick={() => handleSort("date")}>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userName}</td>
                <td>{order.productsList}</td>
                <td>${order.totalPrice}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
