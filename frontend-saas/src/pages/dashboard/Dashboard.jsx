import { useEffect, useState } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import {
  MdOutlineStarBorder,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getCarts,
  getProducts,
  getUsers,
} from "../../services/FakeStoreServices";
import "./DashboardStyles.css";

const Dashboard = () => {
  const [cardItems, setCardItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProducts();
      const usersData = await getUsers();
      const cartsData = await getCarts();

      setProducts(productsData);
      setUsers(usersData);
      setCarts(cartsData);

      setCardItems([
        {
          id: 1,
          title: "Total Products",
          value: productsData.length,
          icon: MdProductionQuantityLimits,
          link: "/products",
        },
        {
          id: 2,
          title: "Total Users",
          value: usersData.length,
          icon: CiUser,
          link: "/users",
        },
        {
          id: 3,
          title: "Total Orders",
          value: cartsData.length,
          icon: MdOutlineStarBorder,
          link: "/orders",
        },
        {
          id: 4,
          title: "Highest Price",
          value: productsData.length
            ? `$${Math.max(...productsData.map((p) => p.price))}`
            : "$0",
          icon: BsCurrencyDollar,
          link: "/products",
        },
      ]);
    };
    fetchData();
  }, []);

  // Grafik verileri
  const categoryData = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  const categoryChartData = Object.entries(categoryData).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const usersChartData = users.map((u, i) => ({
    name: `User ${i + 1}`,
    value: 1,
  }));

  const ordersChartData = carts.map((c, i) => ({
    name: `Order ${i + 1}`,
    value: 1,
  }));

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard Overview</h1>

      <div className="cards-grid">
        {cardItems.map((c) => {
          const IconComponent = c.icon;
          return (
            <Link to={c.link} key={c.id} className="dashboard-card">
              <div className="icon-wrapper">
                <IconComponent size={40} />
              </div>
              <div className="card-info">
                <h3>{c.title}</h3>
                <p>{c.value}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3>Products per Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={categoryChartData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#fff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Users Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={usersChartData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#fff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Orders per User</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={ordersChartData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#fff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
